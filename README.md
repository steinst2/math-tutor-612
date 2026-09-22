# Math Tutor 6–12 — v0.1

A process-aware math tutoring prototype inspired by 1:1 tutoring: students work through mathematics, the system diagnoses steps rather than only final answers, and a Socratic tutor intervenes selectively.

## v0.1 includes
- Grade 6–9 starter problems
- Step-by-step reasoning trail
- Deterministic misconception rules for initial equation/distribution cases
- Socratic tutor responses
- Teacher Lens with misconception/prerequisite evidence
- Scratch-paper drawing canvas
- Chromebook mouse/trackpad drawing by holding **Space**
- Touch/stylus drawing
- GitHub Pages deployment workflow

## Run locally
```bash
npm install
npm run dev
```

## GitHub Pages
Push to `main`, then in GitHub open **Settings → Pages** and select **GitHub Actions** as the source.

## Architecture direction
Next milestones: structured math parser/equivalence engine, handwriting recognition, speech input, student skill graph, prerequisite mini-lessons, classroom dashboard, curriculum/standards library, and a secure backend for AI/voice/data. Never put AI API keys in the Vite client.
