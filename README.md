# Math Tutor 6–12 — v0.2

A process-aware math tutoring prototype focused on student thinking rather than final-answer checking.

## v0.2
- Large student thinking canvas
- Touch/stylus drawing and Spacebar + mouse/trackpad Chromebook drawing
- Progressive support ladder: observe → reflect → focus → scaffold → mini-lesson
- “I’m stuck” escalation without immediately revealing the answer
- Human-confirmed math-line entry as the bridge to future handwriting recognition
- Misconception detection for equation/equality and distribution examples
- Automatic prerequisite mini-lessons after repeated difficulty
- Live Teacher Lens with process evidence

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

The included GitHub Actions workflow deploys `dist/` to GitHub Pages.
