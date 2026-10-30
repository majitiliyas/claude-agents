# claude-agents — Startup Media Team

A team of Claude Code agents that helps you (1) make content about startups and tech,
and (2) learn to become a founder.

You talk only to the **Manager** (the main Claude Code session in this folder). The
Manager hands work to specialised subagents and brings you back finished results.

```
                         YOU
                          │
                       MANAGER  (CLAUDE.md)
      ┌──────────────┬────┴─────────────────────────────────┐
      │              │                                      │
  CONTENT PIPELINE                                     TECH MENTOR
  tech-researcher → content-strategist → script-writer   (learning,
        → fact-checker → brand-manager → back to you      VC, field,
                                                         hackathons)
```

| Agent | Does |
|---|---|
| `tech-researcher` | Startups 2000 → today, AI models, funding, pivots, failures — with sources |
| `content-strategist` | Content & tech-media expert: scores virality, picks the angle, writes the hook |
| `script-writer` | Words you say on camera + timed shot list of photos/visuals |
| `fact-checker` *(added)* | Checks every number/date/quote so you never post something wrong |
| `brand-manager` *(added)* | Titles, thumbnails, captions, hashtags, platform cuts, posting plan, brand guide |
| `tech-mentor` | Startup basics, VC & stages, choosing your deep field, roadmap (CS50P, CS50AI, MIT…), hackathon role |

## How to use

Open Claude Code in this folder (`claude`), then:

| Command | What happens |
|---|---|
| `/video <topic>` | Full pipeline → ready script + visuals + title/thumbnail |
| `/ideas <theme>` | Top 3–5 ranked ideas with virality scores |
| `/script <your idea>` | Turns your own idea into a checked, packaged script |
| `/weekly` | Week's AI & startup news + 2 recommended videos |
| `/mentor <question>` | Session with your tech mentor (first time: short interview about you) |

Or just talk normally: *"Make me a 60-second video about why Quibi failed"*,
*"What's a SAFE?"*, *"Which field should I go deep in?"*.

## Where things go

```
workspace/research/    raw research with sources
workspace/ideas/       ranked ideas + hooks
workspace/scripts/     scripts with shot lists
workspace/factchecks/  claim-by-claim verification
workspace/packages/    titles, thumbnails, captions, posting plan
workspace/deliveries/  the final bundle the Manager gives you
workspace/idea-bank.md backlog of good unused ideas
brand/brand-guide.md   your channel's voice and look (fill it in with brand-manager)
mentor/                your profile, roadmap and progress log (the mentor's memory)
```

## First steps

1. `/mentor` — do the onboarding interview so the mentor knows you.
2. Ask the brand-manager to help fill in `brand/brand-guide.md` (name, platforms, tone).
3. `/ideas` — see what the team comes up with, pick one, then `/script` it.
