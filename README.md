# Joshua McKerracher — Portfolio

Angular 17 portfolio with Three.js 3D animation. Designed for Vercel.

## Stack

- **Angular 17** (standalone components, signals)
- **Three.js** — wireframe icosahedra + particle network with mouse parallax
- **SCSS** — CSS variables, grain texture, scroll-reveal animations
- **Fonts** — Cormorant Garamond · DM Sans · JetBrains Mono

## Local Development

```bash
npm install
npm start
# → http://localhost:4200
```

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option B — Vercel Dashboard

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import the repo
4. Vercel auto-detects Angular via `vercel.json` — no settings needed
5. Click **Deploy**

The `vercel.json` already configures:
- Build command: `npm run build`
- Output directory: `dist/portfolio/browser`
- SPA rewrite rules (all routes → `index.html`)

## Project Structure

```
src/
  app/
    components/
      nav/          ← Sticky nav with scroll-aware frosted glass
      hero/         ← Three.js 3D scene (icosahedra + particles)
      about/        ← Bio + tech stack
      experience/   ← Timeline of all roles
      projects/     ← Project card grid (5 projects)
      publications/ ← Research papers
      footer/       ← Contact + links
  styles.scss       ← Global styles + CSS variables
  index.html        ← Google Fonts
```
