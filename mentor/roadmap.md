# Learning roadmap

Chosen field: _not decided yet_. Decision checkpoint: ~2026-12-13 (may slip a week because of the hackathon sprint).
Current lean (to be tested, not assumed): AI/LLM applications & agents (AI product engineer).
Assumed budget: 5–8 h/week (range 4–10).

## Candidate fields

| Field | Why it fits them | Market reason | Trial project (1–2 weeks, ~6–8 h) |
|---|---|---|---|
| A. AI/LLM apps & agents (AI product engineer) | Loves product + users; fastest path from idea to something people use; matches content channel | Companies everywhere are building on LLM APIs; huge demand for people who can turn models into products; low barrier for a newcomer who ships | Student budgeting Telegram bot (spec below) |
| B. Applied ML / computer vision | Direct link to the Decentrathon case; tangible, demo-able | Banks/retail/security need video analytics; strong local demand (e.g. ForteBank case) | Rebuild a simplified Decentrathon case: pretrained detector (e.g. YOLO) on a short video + a rule ("person inside restricted zone for >N seconds" → alert). Every line written by them; AI only to explain |
| C. Fintech + AI | BBA + finance interest; Kaspi as a local scale story; banks running hackathons | Payments, fraud, credit scoring are big, regulated, data-rich problems | Overlaps with Trial A (budgeting = personal finance). Optional: fraud/anomaly flagging on a public Kaggle dataset + 1-page memo |

## Phase 0 — REPLANNED 2026-10-30 around Business Cup Hackathon 2.0 (Nov 14–15)

| Dates | Work (~4–10 h/week) | Ship |
|---|---|---|
| Oct 30–Nov 1 | REGISTER for Business Cup Hackathon 2.0 (deadline Nov 8; do it now). Check team-size rules on the form. Message 2–3 possible teammates (ideally ≥1 who codes confidently). | Registration confirmation; team list |
| Nov 2–8 | CS50P Lecture 0 + PS0 (~3 h; keeps the Python habit). Budgeting bot mini-MVP with their own hands: `/budget`, `/reserve`, `1200 еда` logging, "safe to spend today" (~4 h; AI may help, but they must be able to explain every line). Unit economics basics: CAC, LTV, margin, payback (~1 h). | Bot running on their own phone; repo on GitHub |
| Nov 9–13 | Hackathon prep: look up Zimran's products (guess the case type); 3-minute pitch template (problem → solution → demo → market → business model → team); set up the laptop (Python, GitHub, Telegram bot token, AI coding tool, deck template); a 2–3 h mock sprint with the team on a random case; agree roles. CS50P PAUSED (except PS0). | Pitch template + toolkit ready |
| Nov 14–15 | HACKATHON (24 h, in person, NU). Role: pitch/product lead + one component owned end to end. | Demo + pitch; their component in the repo under their name |
| Nov 16–22 | Retro (what I owned, where I got stuck). Resume CS50P Lectures 1–2. Bot to 5 classmates (the ones who go out a lot). | Retro note; 5 users onboarded |
| Nov 23–29 | CS50P Lectures 3–4. Bot v1.1 from user feedback. | Problem sets + bot update |
| Nov 30–Dec 13 | Trial B (CV rebuild). | 60 s demo video |
| ~Dec 13–20 | Field checkpoint: interest, aptitude, market, founder fit. | Decide field; write Phase 1 |

CS50P decision: pause problem sets Nov 9–15 only. At 4–10 h/week, splitting focus in the hackathon week would mean doing both badly. The bot build in Nov 2–8 is Python practice anyway. Resume Nov 16.

Rules:
- No AI writing code for CS50P problem sets (use CS50's duck debugger). For the bot and the hackathon, AI tools are fine for what you own, as long as you can explain every line.
- Everything goes on GitHub. Every phase ends with something shipped.

## Business Cup Hackathon 2.0 (verified 2026-10-30)
Source: https://www.bilim.expert/post/business-cup-hackathon-2-0-nazarbayev-university-%D0%BF%D1%80%D0%B8%D0%B3%D0%BB%D0%B0%D1%88%D0%B0%D0%B5%D1%82 (posted ~Oct 27, 2026; only "3 days ago" shown)
- Organisers: AIESEC in Astana + Zimran.
- Dates: Nov 14–15, 2026. Registration deadline: Nov 8, 2026. Registration link (from the article): https://aieseckz.vercel.app/r/bc2-ref-bilim-expert
- Format: in person, 24 hours, at Nazarbayev University, Astana. Real IT case from Zimran: idea → build a solution → present it.
- Eligibility: students, beginner developers, IT specialists.
- Prizes: 5,000,000 KZT prize pool (split not stated); feedback from Zimran; possible career prospects at Zimran; partner gifts.
- NOT stated: team size, language, fee, how the prize is split. Check on the registration form.
- Previous edition (spring 2026, business-cup.zimran.io): teams up to 3, niche → GTM/unit economics → MVP demo → pitch. Hackathon 2.0 is a different, shorter (24 h) format; don't assume the same rules.

## Hackathon role
- For Nov 14–15: pitch/product lead + ONE component owned end to end. Name it in hour one (e.g. the Telegram bot interface, a data/rules module, or the unit-economics + pricing slide backed by a small calculation), build it with your own hands, commit it under your name, explain it in the demo.
- Grow toward: builder / technical founder in the chosen field.

## Trial A spec: "Stipend" budgeting Telegram bot
The idea comes from the founder's own pain: making a 50,000 KZT/month stipend last. Touches fields A and C.
- MVP IN: `/budget 50000`; `/reserve <amount>` (medicine reserve subtracted first); logging by message like `1200 еда`; after each log, "safe to spend today" = (budget − reserve − spent) / days left; `/week` summary; SQLite or JSON storage.
- Default categories: еда, лекарства, такси, развлечения. Food is likely the biggest controllable line.
- MVP OUT (v2+): LLM categorisation of free text, cheaper-alternative suggestions, bank integration, charts, web app, reminders.
- First test users: classmates who go out a lot.
- Dogfooding: the founder logs their own spending daily.
- Success: 5 classmates each log at least 3 expenses across 2 days; the founder uses it 2+ weeks.
- Timing: mini-MVP Nov 2–8 (also hackathon rehearsal); 5 users Nov 16–22.

## Zimran Business Cup x AIESEC, spring 2026 (past)
business-cup.zimran.io: Mar 16–Apr 12, 2026, product sprint, teams ≤3, in person at NU, 2nd–4th year students, 3,000,000 KZT. Over. Any future spring edition: not announced.

## Phase 1 (draft, after checkpoint)
Depends on field. If A: finish CS50P → CS50 Web or a small backend course → ship 2 LLM products with real users. If B: finish CS50P → fast.ai Practical Deep Learning → 3Blue1Brown linear algebra → ship CV demo with real data. Startup fundamentals in parallel (The Mom Test first).
