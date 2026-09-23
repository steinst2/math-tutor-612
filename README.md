# Math Tutor 6–12 — v0.5

v0.5 closes the first tutoring loop: student ink → recognized/confirmed math line → deterministic diagnosis → contextual Socratic response → Teacher Lens evidence.

## Important prototype limitation
GitHub Pages is a static host, so this build does **not** send student handwriting to a third-party AI service or expose an API key in the browser. The canvas now has a `Read my work` bridge: students confirm the newest recognized line, and the tutoring engine analyzes it immediately. The recognition bridge is intentionally isolated so a secure handwriting/vision backend can replace it without changing the tutor engine.

## First diagnostic loop
For `3(x + 4) = 21`, the engine recognizes several meaningful states, including correct distribution, partial distribution, a dropped coefficient, isolating `3x`, and the final solution. `I'm stuck` now uses the latest analysis when available instead of only advancing a generic hint counter.
