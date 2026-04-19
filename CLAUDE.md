# CLAUDE.md

This file provides instructions to Claude Code when working in this project.
Read PROJECT_BRIEF.md for full context.

## User context
User is Ammar. Beginner with Next.js, React, Tailwind, Git, GitHub, Vercel.
User is technical enough to follow instructions precisely but has not built
a web app before. User uses Antigravity IDE.

## Working style

### Always
- Explain WHY before HOW. Every command gets a one-line rationale.
- One change at a time. Never batch unrelated changes.
- Ask before destructive actions (file deletions, force pushes, dependency removal).
- Prefer simple over clever. Boring code is good.
- When user is stuck, first ask what error they see, do not guess.
- Confirm the user has saved and committed before moving to the next step.

### Never
- Install dependencies without explaining what they do and why.
- Add a backend, database, or authentication before we explicitly need them.
- Skip ahead of user's current understanding to show off.
- Use TypeScript strict mode tricks or complex abstractions when plain JS/TS works.
- Refactor working code unless user asks.
- Run commands that modify global state without confirming.

## Writing style (for all code comments, UI text, copy)
- No em dashes. Use commas, parentheses, or separate sentences.
- No AI-sounding openers ("I'm excited to help you...", "Great question!", etc).
- Plain English, short sentences.
- No unnecessary exclamation marks.
- No buzzwords (leverage, spearhead, robust, seamless, cutting-edge).

## Tech stack (locked)
- Next.js 14 with App Router
- Tailwind CSS
- Static JSON for content
- Browser localStorage for state
- Deployed to Vercel via GitHub integration

Do not propose alternative stacks unless the user explicitly asks.

## Project structure (target)
ammar-blueprint/
  app/
    page.tsx                (dashboard home)
    curriculum/
      page.tsx              (curriculum overview)
      [weekSlug]/
        page.tsx            (individual week view)
    layout.tsx
    globals.css
  components/
    Header.tsx
    WeekCard.tsx
    ProgressBar.tsx
  data/
    curriculum.json         (90-day content - populated in Session 2)
  lib/
    storage.ts              (localStorage helpers)
  PROJECT_BRIEF.md
  CLAUDE.md
  SESSION_1_PLAN.md
  README.md

## Git workflow
- User is new to Git. Teach the workflow, do not assume it.
- After every meaningful change: explain what `git add`, `git commit`, `git push` do, then have user run them.
- Commit messages: short, present tense, lowercase ("add week card component").
- No force pushes. No rebasing. Standard linear workflow only.

## Session etiquette
- At the start of each session, ask what was shipped last time.
- At the end of each session, summarize what shipped and what is next.
- If a session runs long, suggest stopping at a clean commit boundary.