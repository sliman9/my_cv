# Sulaiman Hashimi — Digital CV

An interactive, liquid-glass single-page CV. Auto light/dark, fully responsive, zero build step — it's one `index.html`. Tested with Playwright and deployed to GitHub Pages via GitHub Actions.

**Live:** `https://<your-username>.github.io/<repo-name>/`

---

## What's in here

```
index.html                      The entire site (HTML + CSS + JS, no build needed)
package.json                    Scripts + dev dependencies
playwright.config.ts            Test runner config (starts a local server itself)
tests/cv.spec.ts                The test suite
.github/workflows/deploy.yml    CI: run tests, then publish to Pages if green
```

---

## 1. Put it on GitHub

You need [Git](https://git-scm.com) installed and a free GitHub account.

**a. Create an empty repo** on GitHub: click **+ → New repository**, give it a name (e.g. `cv`), leave it empty (no README), and click **Create**.

**b. Push these files** from your computer. Open a terminal in this folder and run — replacing `YOUR-USERNAME` and `REPO`:

```bash
git init
git add .
git commit -m "Initial commit: interactive CV"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/REPO.git
git push -u origin main
```

## 2. Turn on GitHub Pages (Actions mode)

In your repo on GitHub: **Settings → Pages → Build and deployment → Source → "GitHub Actions"**.

That's the only setting to change. Do **not** pick "Deploy from a branch" — this project deploys through the workflow.

## 3. It deploys itself

Every push to `main` triggers `.github/workflows/deploy.yml`, which:

1. installs dependencies and runs the **Playwright tests**, then
2. **only if the tests pass**, publishes `index.html` to GitHub Pages.

Watch it run under the **Actions** tab. When the green check appears, your site is live at `https://YOUR-USERNAME.github.io/REPO/`. If a test fails, the deploy is skipped and the old site stays up — that's the safety net.

---

## Running the tests locally

```bash
npm install
npx playwright install        # downloads the browsers (first time only)
npm test                      # run the full suite
npm run test:ui               # interactive runner
npm run report                # open the last HTML report
```

To just preview the site locally: `npm run serve`, then open `http://localhost:3000`.

### What the tests cover

Page title and metadata, the typed-out role, all six nav links, the theme toggle cycle, the animated stat counters, service-card detail modals, the skill filter tabs, the full experience timeline, all twelve certifications, both diplomas, every contact link, the back-to-top button, and the hero-chip jump-to-skills behaviour. Tests run on both desktop Chromium and mobile WebKit.

---

## Using your own domain (testingwithsul.com)

If you want this on `testingwithsul.com` instead of the `github.io` URL:

1. In the `deploy` job's "Assemble site" step in `deploy.yml`, add your domain to the published files:
   ```bash
   echo "testingwithsul.com" > _site/CNAME
   ```
2. In **Settings → Pages → Custom domain**, enter `testingwithsul.com` and save.
3. At your DNS provider, point the domain at GitHub Pages (four `A` records for the apex, or a `CNAME` record for a `www`/subdomain pointing to `YOUR-USERNAME.github.io`). GitHub's *Settings → Pages* screen shows the exact records.

To keep the page at the old `/application/` path, name the repo so the path matches, or move `index.html` into an `application/` folder and update the workflow's copy step accordingly.
