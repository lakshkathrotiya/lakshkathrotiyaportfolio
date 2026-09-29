# AGENTS.md

## Architecture
Static single-page personal site for Laksh Kathrotiya. There is no framework, no package.json and no build step.
`netlify.toml` publishes `public/` directly.

## Key files
- `public/index.html`: all content (hero, about, projects, contact, footer).
- `public/styles.css`: theme variables in `:root`, reusable `.glow-border`, `.btn-glow`, `.glow-text`, and keyframes at the bottom.
- `public/script.js`: typing words, cursor glow, IntersectionObserver `.reveal`, `.tilt` cards, canvas sparks, and the AJAX contact form.

## Conventions and decisions
- Keep it simple: vanilla HTML/CSS/JS only. Add dependencies only if the user asks.
- The contact form uses Netlify Forms (`name="contact"`, `data-netlify="true"`, honeypot `bot-field`). It is submitted via
  `fetch("/")` as `application/x-www-form-urlencoded`. That works because the site is static. Keep the hidden `form-name` input.
  Netlify Forms was enabled with the netlify-forms skill's `enable.cjs` script.
- All animations are disabled under `prefers-reduced-motion`.
- Project cards and social links are placeholders for the owner to fill in.
