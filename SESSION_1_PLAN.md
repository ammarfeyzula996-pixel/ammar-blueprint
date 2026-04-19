# Session 1 Plan — Build the Chassis

Duration: 2-3 hours
Goal: Ship a live, deployed Next.js app at a real URL.
No curriculum content yet. Skeleton only.

## Exit criteria
1. Next.js project running locally on http://localhost:3000
2. Project pushed to GitHub (public or private, user's choice)
3. Project deployed to Vercel with a live URL
4. Dashboard homepage + empty curriculum page exist and render
5. Mobile view works
6. Header navigation works

## Phase 1: Environment verification (10 min)
- Confirm node --version, git --version, npm --version all work
- Confirm Claude Code is open in Antigravity inside the project folder

## Phase 2: Scaffold Next.js (20 min)
- npx create-next-app@latest ammar-blueprint (with these flags: --typescript --tailwind --app --eslint --no-src-dir)
- cd into project, run npm run dev, verify localhost:3000 loads
- First dopamine hit: you have a running web app

## Phase 3: Add the 3 strategy files (5 min)
- Save PROJECT_BRIEF.md, CLAUDE.md, SESSION_1_PLAN.md to project root
- Restart Claude Code so it picks up CLAUDE.md

## Phase 4: Git + GitHub (20 min)
- git init (verify this was already done by create-next-app)
- Create repo on github.com, do NOT initialize with README
- git remote add origin, git push -u origin main
- Verify repo is live on GitHub

## Phase 5: Vercel deploy (10 min)
- Vercel dashboard -> Import Git Repository -> select ammar-blueprint
- Accept all defaults, click Deploy
- Second dopamine hit: live URL exists, bookmark it on phone

## Phase 6: Build the chassis (60-90 min)
- Replace default app/page.tsx with a minimal dashboard
- Create app/curriculum/page.tsx with a placeholder
- Create components/Header.tsx with nav
- Apply a visual identity: dark theme, custom accent color, one distinctive font
- Verify mobile view

## Phase 7: Commit + deploy v0.1 (10 min)
- git add, git commit -m "initial chassis"
- git push
- Vercel auto-deploys
- Third dopamine hit: your changes are live

## What we do NOT do in Session 1
- Curriculum content (Session 2)
- Progress tracking / localStorage (Session 2)
- Notes feature (Session 2)
- Authentication (never, single-user app)
- Database (never, JSON is enough)