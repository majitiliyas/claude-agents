# Learning roadmap

Chosen field: _not decided yet_. Decision checkpoint: week of 2026-12-07 (target 2026-12-13).
Current lean (to be tested, not assumed): AI/LLM applications & agents (AI product engineer).
Assumed budget: 5–8 h/week (range 4–10).

## Candidate fields

| Field | Why it fits them | Market reason | Trial project (1–2 weeks, ~6–8 h) |
|---|---|---|---|
| A. AI/LLM apps & agents (AI product engineer) | Loves product + users; fastest path from idea to something people use; matches content channel | Companies everywhere are building on LLM APIs; huge demand for people who can turn models into products; low barrier for a newcomer who ships | Telegram bot (they've built bots before) that calls an LLM API to solve ONE real problem for 5 classmates. Success = 5 real users, each uses it twice |
| B. Applied ML / computer vision | Direct link to the Decentrathon case; tangible, demo-able | Banks/retail/security need video analytics; strong local demand (e.g. ForteBank case) | Rebuild a simplified Decentrathon case: pretrained detector (e.g. YOLO) on a short video + a rule ("person inside restricted zone for >N seconds" → alert). Every line written by them; AI only to explain |
| C. Fintech + AI | BBA + finance interest; Kazakhstan has a world-class fintech scale story (Kaspi) and banks running hackathons | Payments, fraud, credit scoring are big, regulated, data-rich problems | Fraud/anomaly flagging on a public transactions dataset (Kaggle) with pandas + scikit-learn; 1-page "what I'd build for a bank" memo. Optional third trial; fintech is more a domain to layer on A or B than a separate skill |

## Phase 0 — Foundation + trials (2026-11-02 → 2026-12-13)

| Weeks | Dates | Work | Ship |
|---|---|---|---|
| 1 | Nov 2–8 | CS50P Lecture 0 (Functions, Variables) + Problem Set 0 | Repo on GitHub + 1 build-log post |
| 2 | Nov 9–15 | CS50P Lectures 1–2 (Conditionals, Loops) + problem sets | Problem sets pushed |
| 3 | Nov 16–22 | CS50P Lectures 3–4 (Exceptions, Libraries) + problem sets | Problem sets pushed |
| 4 | Nov 23–29 | Trial A: student budgeting bot (spec below) | Working bot + 5 users |
| 5–6 | Nov 30–Dec 13 | Trial B (CV rebuild); continue CS50P slowly (Unit Tests, File I/O) | Demo video (60 s) |
| Checkpoint | ~Dec 13 | Compare trials: interest (what did you do unprompted?), aptitude (where did you get stuck vs. unstuck?), market, founder fit | Decide field; write Phase 1 |

Rules for Phase 0:
- No AI writing code for CS50P problem sets (use CS50's own duck debugger). For trials, AI may explain, not write blocks you can't explain line by line.
- Everything goes on GitHub. Every phase ends with something shipped.
- Track hours honestly in the progress log.

## Hackathon role
- Now: product/pitch lead + one technical slice.
- Rule: at the next hackathon, own one component end to end (name it in hour one, write it, commit it, explain it in the demo).
- Grow toward: builder / technical founder in the chosen field.

## Trial A spec: "Stipend" budgeting Telegram bot (added 2026-10-30)
The idea comes from the founder's own pain: making a 50,000 KZT/month stipend last. It touches field A (product engineering) and field C (fintech).
- MVP IN: `/budget 50000` sets the monthly budget; any message like `1200 coffee` logs an expense; after each log the bot replies with today's "safe to spend" = (budget − spent) / days left; `/week` gives a weekly summary (total + top categories); data stored in SQLite or JSON.
- MVP OUT (v2+): LLM categorisation of free-text expenses ("shawarma and taxi 2500"), cheaper-alternative suggestions, bank/Kaspi integration, charts, web app, multi-currency, reminders.
- Dogfooding: the founder logs their own stipend spending every day, starting now (by hand in Notes until the bot exists).
- Success: 5 classmates each log at least 3 expenses across 2 different days, and the founder has used it for 2+ weeks. Bonus: one sentence from each user on what they'd change.
- Timing: build in week 4 (Nov 23–29); the LLM feature only after the MVP works.

## Business Cup (AIESEC at NU): date/format TBD
- If it's a case competition: the founder is strategy/finance lead and owns one section end to end (financial model OR market sizing). Differentiator: a tiny working prototype/demo if the case allows it.
- Prep once the date is known: unit economics basics, TAM/SAM/SOM, a simple 3-year model in Sheets, a 3-minute pitch structure.

## Phase 1 (draft, after checkpoint)
Depends on field. If A: finish CS50P → CS50 Web or a small backend course → ship 2 LLM products with real users. If B: finish CS50P → fast.ai Practical Deep Learning → 3Blue1Brown linear algebra → ship CV demo with real data. Startup fundamentals in parallel (The Mom Test first).
