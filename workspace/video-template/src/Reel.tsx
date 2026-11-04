import React from 'react';
import {AbsoluteFill, OffthreadVideo, Img, delayRender, continueRender, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import '@fontsource-variable/unbounded';
import '@fontsource-variable/manrope';
import data from './data.json';

const HEAD = "'Unbounded Variable', sans-serif";
const BODY = "'Manrope Variable', sans-serif";
const fontHandle = delayRender('fonts');
Promise.all([
  document.fonts.load("900 100px 'Unbounded Variable'", 'Аа12'),
  document.fonts.load("800 70px 'Manrope Variable'", 'Аа12'),
  document.fonts.load("600 30px 'Manrope Variable'", 'Аа12'),
]).then(() => continueRender(fontHandle));

const BLUE = '#1A73D6';
const NAVY = '#0F1F3D';
const ACCENT = '#FFC94D';
const FPS = 30;

type Word = {i: number; text: string; s: number; e: number; seg: number};
const words = data.words as Word[];
const W = (i: number) => words.find((w) => w.i === i)!;
const f = (sec: number) => Math.round(sec * FPS);

// ---------- helpers ----------
const useAppear = (from: number, to: number, fadeOut = 8) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const inn = spring({frame: frame - from, fps, config: {damping: 16, stiffness: 140}});
  const out = interpolate(frame, [to - fadeOut, to], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const visible = frame >= from && frame <= to;
  return {inn, out, visible, frame};
};

const Card: React.FC<{style?: React.CSSProperties; children: React.ReactNode}> = ({style, children}) => (
  <div
    style={{
      position: 'absolute',
      left: 90,
      right: 150,
      background: 'rgba(15,31,61,0.80)',
      border: '1.5px solid rgba(255,255,255,0.14)',
      borderRadius: 36,
      backdropFilter: 'blur(16px)',
      boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
      padding: '34px 44px',
      color: 'white',
      ...style,
    }}
  >
    {children}
  </div>
);

const fmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const Counter: React.FC<{value: number; start: number; dur?: number; style?: React.CSSProperties}> = ({value, start, dur = 24, style}) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [start, start + dur], [0, value], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return <span style={style}>{fmt(v)}</span>;
};

// ---------- camera ----------
const CTA_START = f(W(90).s);
const accents = [33, 39, 56, 66].map((i) => f(W(i).s));

const Camera: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / FPS;
  const starts = data.segStarts;
  let seg = 0;
  for (let k = 0; k < starts.length; k++) if (t >= starts[k]) seg = k;
  const segStart = starts[seg];
  const segEnd = seg + 1 < starts.length ? starts[seg + 1] : data.duration;
  const base = seg % 2 === 0 ? 1.0 : 1.1;
  const push = interpolate(t, [segStart, segEnd], [0, 0.035]);
  let acc = 0;
  for (const a of accents) {
    if (frame >= a && frame < a + 40) {
      const up = spring({frame: frame - a, fps, config: {damping: 12, stiffness: 220}});
      const down = interpolate(frame, [a + 18, a + 40], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      acc = Math.max(acc, 0.06 * up * down);
    }
  }
  const cta = interpolate(frame, [CTA_START, CTA_START + 20], [0, 0.05], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scale = base + push + acc + cta;
  return (
    <AbsoluteFill style={{transform: `scale(${scale})`, transformOrigin: '53% 43%'}}>
      <OffthreadVideo src={staticFile('base.mp4')} style={{width: '100%', height: '100%'}} />
    </AbsoluteFill>
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        'radial-gradient(ellipse 75% 60% at 52% 44%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.42) 80%, rgba(0,0,0,0.62) 100%), linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.45) 100%)',
    }}
  />
);

// ---------- captions ----------
type Chunk = {words: Word[]; s: number; e: number};
const SHORT = new Set(['в', 'на', 'и', 'а', 'я', 'для', 'до', 'из', 'что', 'но', 'без', 'не', 'ну', 'это', 'где', 'если']);
const chunks: Chunk[] = (() => {
  const res: Chunk[] = [];
  let cur: Word[] = [];
  const caps = words.filter((w) => w.i < 90);
  caps.forEach((w, idx) => {
    cur.push(w);
    const punct = /[.,!?:—]$/.test(w.text);
    const len = cur.reduce((a, b) => a + b.text.length, 0);
    const next = caps[idx + 1];
    if (punct || cur.length >= 3 || len > 16 || !next) {
      // don't end a line on a short function word: carry it to the next line
      if (!punct && next && cur.length > 1 && SHORT.has(w.text.toLowerCase())) {
        cur.pop();
        res.push({words: cur, s: cur[0].s, e: cur[cur.length - 1].e});
        cur = [w];
        return;
      }
      res.push({words: cur, s: cur[0].s, e: cur[cur.length - 1].e});
      cur = [];
    }
  });
  if (cur.length) res.push({words: cur, s: cur[0].s, e: cur[cur.length - 1].e});
  for (let k = 0; k < res.length; k++) res[k].e = k + 1 < res.length ? Math.min(res[k + 1].s, res[k].e + 0.5) : res[k].e + 0.4;
  return res;
})();

const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / FPS;
  const c = chunks.find((ch) => t >= ch.s - 0.05 && t < ch.e);
  if (!c || frame >= CTA_START) return null;
  const pop = spring({frame: frame - f(c.s), fps, config: {damping: 14, stiffness: 200}});
  return (
    <div style={{position: 'absolute', top: 1250, left: 80, right: 160, textAlign: 'center', transform: `scale(${0.9 + 0.1 * pop})`, opacity: pop}}>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: 20, rowGap: 4, fontFamily: BODY, fontWeight: 800, fontSize: 70, lineHeight: 1.15, letterSpacing: -0.5}}>
        {c.words.map((w) => {
          const active = t >= w.s && t < w.e + 0.08;
          const num = /\d/.test(w.text);
          return (
            <span
              key={w.i}
              style={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
                color: active || num ? ACCENT : 'white',
                transform: `scale(${active ? 1.08 : 1})`,
                textShadow: '0 4px 18px rgba(0,0,0,0.65), 0 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// ---------- graphics ----------
const Hook: React.FC = () => {
  const end = f(W(11).e + 0.35);
  const {inn, out, visible, frame} = useAppear(0, end);
  const {fps} = useVideoConfig();
  if (!visible) return null;
  const g = spring({frame: frame - f(W(1).s), fps, config: {damping: 13}});
  const a = spring({frame: frame - f(W(9).s), fps, config: {damping: 13}});
  return (
    <Card style={{top: 270, opacity: out * inn, transform: `translateY(${(1 - inn) * -40}px)`}}>
      <div style={{fontFamily: BODY, fontWeight: 800, fontSize: 30, color: ACCENT, letterSpacing: 3}}>TECH ORDA · 2026</div>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 22, marginTop: 10, opacity: g, transform: `translateY(${(1 - g) * -60}px)`}}>
        <span style={{fontFamily: HEAD, fontWeight: 900, fontSize: 104, color: 'white'}}>2 723</span>
        <span style={{fontFamily: BODY, fontWeight: 800, fontSize: 44}}>гранта</span>
      </div>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 22, opacity: a, transform: `translateY(${(1 - a) * 40}px)`}}>
        <Counter value={29600} start={f(W(9).s)} style={{fontFamily: HEAD, fontWeight: 900, fontSize: 104, color: ACCENT}} />
        <span style={{fontFamily: BODY, fontWeight: 800, fontSize: 44}}>заявок</span>
      </div>
    </Card>
  );
};

const LowerThird: React.FC = () => {
  const from = f(W(12).s);
  const to = f(W(18).e + 0.4);
  const {inn, out, visible} = useAppear(from, to);
  if (!visible) return null;
  return (
    <div
      style={{
        position: 'absolute',
        top: 1120,
        left: 70,
        transform: `translateX(${(1 - inn) * -500}px)`,
        opacity: out,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        background: BLUE,
        borderRadius: 999,
        padding: '18px 34px 18px 22px',
        boxShadow: '0 14px 40px rgba(26,115,214,0.45)',
      }}
    >
      <div style={{width: 18, height: 18, borderRadius: 9, background: ACCENT}} />
      <span style={{fontFamily: BODY, fontWeight: 800, fontSize: 40, color: 'white'}}>Ильяс · аналитик KAI</span>
    </div>
  );
};

const Person: React.FC<{color: string; s: number}> = ({color, s}) => (
  <svg width={58} height={96} viewBox="0 0 58 96" style={{transform: `scale(${s})`}}>
    <circle cx="29" cy="18" r="16" fill={color} />
    <path d="M6 96 V54 a23 23 0 0 1 46 0 V96 Z" fill={color} />
  </svg>
);

const IconRow: React.FC = () => {
  const from = f(W(28).s - 0.1);
  const to = f(W(34).e + 0.7);
  const {inn, out, visible, frame} = useAppear(from, to);
  const {fps} = useVideoConfig();
  if (!visible) return null;
  const lit = spring({frame: frame - f(W(30).s), fps, config: {damping: 10}});
  return (
    <Card style={{top: 270, opacity: out * inn, transform: `translateY(${(1 - inn) * -40}px)`}}>
      <div style={{fontFamily: HEAD, fontWeight: 900, fontSize: 64}}>
        ≈ <span style={{color: ACCENT}}>1</span> грант
      </div>
      <div style={{fontFamily: BODY, fontWeight: 800, fontSize: 40, opacity: 0.85, marginBottom: 22}}>на 11 заявок</div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {Array.from({length: 11}).map((_, k) => {
          const d = spring({frame: frame - from - k * 2, fps, config: {damping: 15}});
          return (
            <div key={k} style={{opacity: d, transform: `translateY(${(1 - d) * 30}px)`}}>
              <Person color={k === 0 ? (lit > 0.5 ? ACCENT : 'rgba(255,255,255,0.35)') : 'rgba(255,255,255,0.35)'} s={k === 0 ? 1 + 0.15 * lit : 1} />
            </div>
          );
        })}
      </div>
    </Card>
  );
};

const Bar: React.FC<{label: string; value: number; max: number; start: number; prefix?: string}> = ({label, value, max, start, prefix = ''}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const g = spring({frame: frame - start, fps, config: {damping: 18, stiffness: 90}});
  const vis = frame >= start - 4;
  return (
    <div style={{marginTop: 26, opacity: vis ? 1 : 0.25}}>
      <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: BODY, fontWeight: 800, fontSize: 38}}>
        <span>{label}</span>
        <span style={{fontFamily: HEAD, color: ACCENT}}>
          {prefix}
          <Counter value={value} start={start} dur={20} />
        </span>
      </div>
      <div style={{height: 34, borderRadius: 17, background: 'rgba(255,255,255,0.12)', marginTop: 12, overflow: 'hidden'}}>
        <div style={{height: '100%', width: `${(value / max) * 100 * Math.max(0, g)}%`, borderRadius: 17, background: `linear-gradient(90deg, ${BLUE}, #5AA8FF)`}} />
      </div>
    </div>
  );
};

const BarCard: React.FC = () => {
  const from = f(W(35).s - 0.1);
  const to = f(W(47).e + 0.8);
  const {inn, out, visible} = useAppear(from, to);
  if (!visible) return null;
  return (
    <Card style={{top: 270, opacity: out * inn, transform: `translateY(${(1 - inn) * -40}px)`}}>
      <div style={{fontFamily: BODY, fontWeight: 800, fontSize: 30, color: ACCENT, letterSpacing: 3}}>ЗАЯВОК НА 1 МЕСТО</div>
      <Bar label="Data Analyst" value={18} max={32} start={f(W(39).s)} />
      <Bar label="DevOps для новичков" value={30} max={32} start={f(W(46).s)} prefix="~" />
    </Card>
  );
};

const Warning: React.FC = () => {
  const from = f(W(50).s);
  const to = f(W(61).e + 0.4);
  const {inn, out, visible, frame} = useAppear(from, to);
  if (!visible) return null;
  const shake = frame - from < 8 ? Math.sin((frame - from) * 2.6) * 10 * (1 - (frame - from) / 8) : 0;
  return (
    <Card style={{top: 300, left: 150, right: 210, textAlign: 'center', opacity: out * inn, transform: `translateX(${shake}px) scale(${0.85 + 0.15 * inn})`, background: 'rgba(15,31,61,0.86)'}}>
      <div style={{fontSize: 64}}>⚠️</div>
      <div style={{fontFamily: HEAD, fontWeight: 900, fontSize: 70, marginTop: 6}}>
        заявки <span style={{color: ACCENT}}>≠</span> люди
      </div>
    </Card>
  );
};

const GuideCard: React.FC = () => {
  const from = f(W(76).s);
  const to = f(W(89).e + 0.3);
  const {inn, out, visible} = useAppear(from, to);
  if (!visible) return null;
  return (
    <Card style={{top: 270, background: BLUE, opacity: out, transform: `translateY(${(1 - inn) * 500}px) rotate(${(1 - inn) * -6}deg)`}}>
      <div style={{display: 'inline-block', background: ACCENT, color: NAVY, fontFamily: BODY, fontWeight: 800, fontSize: 28, borderRadius: 12, padding: '6px 16px', letterSpacing: 2}}>ГАЙД</div>
      <div style={{fontFamily: HEAD, fontWeight: 900, fontSize: 60, lineHeight: 1.1, marginTop: 18}}>IT-профессии 2026–2030</div>
      <div style={{fontFamily: BODY, fontWeight: 600, fontSize: 36, marginTop: 14, opacity: 0.9}}>что растёт · почему · где учиться</div>
    </Card>
  );
};

const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < CTA_START) return null;
  const inn = spring({frame: frame - CTA_START, fps, config: {damping: 12}});
  const word = spring({frame: frame - f(W(93).s), fps, config: {damping: 10, stiffness: 180}});
  const pulse = 1 + 0.04 * Math.sin(((frame - f(W(93).s)) / FPS) * Math.PI * 2.2) * (word > 0.9 ? 1 : 0);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(10,20,40,0.75) 75%)', opacity: inn}} />
      <div style={{position: 'absolute', top: 1130, left: 0, right: 70, textAlign: 'center', opacity: inn, transform: `translateY(${(1 - inn) * 60}px)`}}>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 16, fontFamily: BODY, fontWeight: 800, fontSize: 50, color: 'white', textShadow: '0 3px 14px rgba(0,0,0,0.6)'}}>
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.4 8.4 0 0 1-12.2 7.5L3 21l2-5.6A8.5 8.5 0 1 1 21 11.5z" />
          </svg>
          Напиши в комментариях
        </div>
        <div style={{marginTop: 26, opacity: word, transform: `scale(${(0.6 + 0.4 * word) * pulse})`}}>
          <span style={{display: 'inline-block', fontFamily: HEAD, fontWeight: 900, fontSize: 104, color: NAVY, background: ACCENT, borderRadius: 28, padding: '14px 40px', boxShadow: '0 18px 50px rgba(255,201,77,0.45)'}}>
            ПРОФЕССИИ
          </span>
        </div>
        <div style={{marginTop: 26, fontFamily: BODY, fontWeight: 800, fontSize: 40, color: 'white', opacity: interpolate(frame, [f(W(95).s), f(W(95).s) + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), textShadow: '0 3px 14px rgba(0,0,0,0.6)'}}>
          и я пришлю тебе гайд
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Source: React.FC = () => {
  const frame = useCurrentFrame();
  const show = (frame >= 0 && frame < f(W(11).e + 0.35)) || (frame >= f(W(28).s) && frame < f(W(47).e + 0.8));
  if (!show) return null;
  return (
    <div style={{position: 'absolute', top: 1505, left: 80, right: 160, textAlign: 'center', fontFamily: BODY, fontWeight: 600, fontSize: 26, color: 'rgba(255,255,255,0.75)', textShadow: '0 2px 8px rgba(0,0,0,0.7)'}}>
      Источник: витрина Tech Orda, Astana Hub, 2026
    </div>
  );
};

export const Reel: React.FC = () => (
  <AbsoluteFill style={{background: 'black'}}>
    <Camera />
    <Vignette />
    <Hook />
    <LowerThird />
    <IconRow />
    <BarCard />
    <Warning />
    <GuideCard />
    <Captions />
    <Source />
    <CTA />
  </AbsoluteFill>
);

export const Cover: React.FC = () => (
  <AbsoluteFill style={{background: 'black'}}>
    <Img src={staticFile('cover_bg.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.08)', transformOrigin: '53% 43%', }} />
    <Vignette />
    <div style={{position: 'absolute', top: 290, left: 80, right: 150}}>
      <div style={{fontFamily: BODY, fontWeight: 800, fontSize: 36, color: ACCENT, letterSpacing: 4}}>TECH ORDA · Я ПОСЧИТАЛ</div>
      <div style={{fontFamily: HEAD, fontWeight: 900, fontSize: 116, lineHeight: 1.02, color: 'white', marginTop: 14, textShadow: '0 8px 30px rgba(0,0,0,0.55)'}}>
        <span style={{color: ACCENT}}>1</span> ГРАНТ<br />НА <span style={{color: ACCENT}}>11</span> ЗАЯВОК
      </div>
    </div>
  </AbsoluteFill>
);
