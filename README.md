# Laksh Kathrotiya — Personal Website

A simple, one-page personal website with animated glowing effects, hosted for free on Netlify.

## Features
- Neon gradient name with a pulsing glow, plus a rotating glowing orb behind it
- Typing effect that cycles through your roles
- Floating glowing sparks in the background, and a soft glow that follows the cursor
- Cards with animated gradient borders and a 3D tilt on hover
- Sections fade in as you scroll
- A contact form that works with **Netlify Forms** (no server needed, free plan includes 100 submissions a month)
- Works on mobile, and respects the "reduce motion" accessibility setting

## Tech
Plain HTML, CSS and JavaScript. No frameworks, no build step.

```
netlify.toml        # Netlify config (publishes the /public folder)
public/
  index.html        # Page content: edit your text here
  styles.css        # Colours, glow effects, animations
  script.js         # Typing effect, sparks, tilt, form submission
  favicon.svg       # "LK" browser tab icon
```

## Customize
- **Text, projects and links:** edit `public/index.html` (About section, the 3 project cards, and the social links).
- **Typing words:** edit the `words` array at the top of `public/script.js`.
- **Colours:** change `--cyan`, `--purple` and `--pink` at the top of `public/styles.css`.

## Run locally
Open `public/index.html` in a browser, or run it with the Netlify CLI (this also emulates Netlify Forms):
```bash
npm install -g netlify-cli
netlify dev
```

## Deploy on Netlify (free)
1. Push this folder to a GitHub repository.
2. Go to [app.netlify.com](https://app.netlify.com), then **Add new project → Import an existing project**, and pick the repo.
3. Leave the build command empty. The publish directory is set to `public` by `netlify.toml`.
4. Click **Deploy**. Your site goes live at `https://<name>.netlify.app`.
5. Optional: rename the site under **Project configuration → Change project name**, or add your own domain under **Domain management**.

Or drag and drop the `public` folder at [app.netlify.com/drop](https://app.netlify.com/drop).

### Contact form messages
Submissions appear in the Netlify dashboard under **Forms → contact**. To get an email for each one, go to
**Project configuration → Notifications → Emails and webhooks → Form submission notifications**.
