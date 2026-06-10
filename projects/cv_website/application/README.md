# sulaiman-cv

Personal CV website — static HTML/CSS/JS, no build step required.

## Project structure

```
sulaiman-cv/
├── index.html          # Main website (all styles + JS embedded)
├── data/
│   └── cv.json         # ← Edit all your content here
├── assets/
│   └── photo.jpg       # ← Drop your profile photo here
├── tests/
│   └── cv.spec.ts      # Playwright tests (data-cy selectors)
├── playwright.config.ts
├── package.json
├── netlify.toml
└── .gitignore
```

## Editing content

Open `data/cv.json` in VSCode and change whatever you want:

- `personal` — name, bio, email, phone, location, company
- `profilePhoto` — path to photo (default: `"assets/photo.jpg"`)
- `stats` — the 4 numbers shown in the stats bar
- `services` — What I Do cards
- `skillTabs` — skill bars with percentages
- `pills` / `hlPills` — tech stack tags
- `experience` — job history
- `certifications` — cert list
- `education` — degrees
- `i18n` — Dutch / Spanish / French / German translations

Save the file, commit, push — Netlify deploys automatically.

## Adding your photo

1. Copy your photo to `assets/photo.jpg`
2. Make sure `cv.json` has `"profilePhoto": "assets/photo.jpg"`
3. Commit and push

## Local development

```bash
npm install          # install Playwright (one-time)
npm start            # starts http://localhost:3000
```

> The site uses `fetch('data/cv.json')` so it needs a local server — opening `index.html` directly as a file won't work.

## Running tests

```bash
npm test             # run all Playwright tests (headless)
npm run test:headed  # run with browser visible
npm run test:ui      # open Playwright UI mode
npm run test:report  # view last HTML report
```

Tests use `data-cy` attributes as selectors, e.g.:

```typescript
await page.locator('[data-cy="hero-name"]').toContainText('Sulaiman');
```

## Deploying to Netlify

1. Push this folder to a GitHub repo
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**
3. Connect GitHub, select the repo
4. Build command: *(leave empty)*  
   Publish directory: `.`
5. Click **Deploy**

Every `git push` to `main` now redeploys automatically.

## Deploying to GitHub Pages (alternative)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

Then enable GitHub Pages in repo Settings → Pages → Source: `gh-pages` branch.
