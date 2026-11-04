# Reels montage template (Remotion)

Used for the first KAI Reels (Tech Orda, 2026-11-04).

1. `transcribe.py` — faster-whisper, word timestamps → `words.json`.
2. `build_base.py` — cuts pauses (segment list at the top), cleans audio (highpass, afftdn, loudnorm −14 LUFS),
   maps word timings to the cut timeline → `src/data.json` + `public/base.mp4`. Corrected caption text lives in `txt`.
3. `src/Reel.tsx` — camera punch-ins per segment, accent zooms, vignette, word-by-word captions, Hook / LowerThird /
   IconRow / BarCard / Warning / GuideCard / CTA / Source graphics tied to word indices; `Cover` still.
4. Render: `npx remotion render src/index.ts Reel out/reel.mp4` and `npx remotion still src/index.ts Cover out/cover.png`.

Fonts: @fontsource-variable/unbounded + manrope (bundled locally, Cyrillic).

Audio: after rendering, remux the clean audio once (`-c:v copy`, AAC 256k) so the voice is encoded only one time.

Color: iPhone footage is often HDR (HLG, bt2020). Tonemap to SDR BEFORE anything else, otherwise the face burns out/turns orange:
`zscale=t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p`
then grade in ffmpeg: `eq=contrast=1.04:saturation=1.02:gamma=0.96,colorbalance=rm=-0.02:rh=-0.04:bh=0.02,unsharp=5:5:0.6:5:5:0`.
No CSS filters on the video in Remotion; render with `--color-space=bt709`.
