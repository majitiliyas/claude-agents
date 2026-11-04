# Reels montage template (Remotion)

Used for the first KAI Reels (Tech Orda, 2026-11-04).

1. `transcribe.py` — faster-whisper, word timestamps → `words.json`.
2. `build_base.py` — cuts pauses (segment list at the top), cleans audio (highpass, afftdn, loudnorm −14 LUFS),
   maps word timings to the cut timeline → `src/data.json` + `public/base.mp4`. Corrected caption text lives in `txt`.
3. `src/Reel.tsx` — camera punch-ins per segment, accent zooms, vignette, word-by-word captions, Hook / LowerThird /
   IconRow / BarCard / Warning / GuideCard / CTA / Source graphics tied to word indices; `Cover` still.
4. Render: `npx remotion render src/index.ts Reel out/reel.mp4` and `npx remotion still src/index.ts Cover out/cover.png`.

Fonts: @fontsource-variable/unbounded + manrope (bundled locally, Cyrillic).
