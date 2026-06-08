# Migration Plan: v3 → master

This document describes how to deploy the v3 Astro site to production and,
when the time comes, fully migrate master to serve as the canonical source branch.

---

## Current State

|              | `master`                                                         | `v3`                               |
| ------------ | ---------------------------------------------------------------- | ---------------------------------- |
| Content      | Single `index.html` redirect → `aviral.lab.asu.edu`; legacy PDFs | Full Astro 5 site (this codebase)  |
| Deployed via | GitHub Pages (branch deploy)                                     | Not yet deployed                   |
| Commits      | v3 contains all of master's history + 20+ additional commits     | Ahead of master; nothing to rebase |

---

## Phase 1 — Deploy v3 Alongside master (current phase)

This phase deploys the new site without touching master at all.

### Steps

1. One-time GitHub repo setting (do this once in the browser)

Go to: `github.com/MPSLab-ASU/MPSLab-ASU.github.io → Settings → Pages`

- Under **Source**, change from **"Deploy from a branch"** to **"GitHub Actions"**

1. Push v3 with the workflow

The deploy workflow already exists at `.github/workflows/deploy.yml`. Commit and push:

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions deploy workflow for v3"
git push origin v3
```

1. Verify deployment

Go to the **Actions** tab on GitHub. The `Deploy v3 to GitHub Pages` workflow will run automatically. First deploy takes ~2 minutes. The site will be live at `https://mpslab-asu.github.io`.

### What is preserved

- `master` branch is **completely untouched**
- Old redirect and legacy PDFs remain in master's git history
- `labs.engineering.asu.edu` continues to proxy the GitHub Pages URL — no ASU server changes needed

---

## Phase 2 — Full Migration to master (when old site is deprecated)

Run this after the old `aviral.lab.asu.edu` site has been officially retired.

### Step 1 — Archive the old master (optional but recommended)

```bash
git checkout master
git tag archive/old-redirect
git push origin archive/old-redirect
```

This permanently preserves the old state in git history under the tag `archive/old-redirect`.

### Step 2 — Hard-reset master to v3

```bash
git checkout master
git reset --hard origin/v3
git push origin master --force
```

master is now identical to v3.

### Step 3 — Update the workflow trigger

In `.github/workflows/deploy.yml`, change the trigger branch from `v3` to `master`:

```yaml
on:
  push:
    branches:
      - master
```

Commit and push:

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: switch deploy trigger from v3 to master"
git push origin master
```

### Step 4 — Update default branch on GitHub (if needed)

Go to: `Settings → General → Default branch` and confirm it is set to `master`.

### Step 5 — Future development workflow

Option A — work directly on `master`.
Option B — keep `v3` (or feature branches) and merge PRs into `master`. The deploy triggers on every merge.

---

## Notes

### labs.engineering.asu.edu

This domain is managed on ASU's server side (DNS CNAME or reverse proxy pointing to `mpslab-asu.github.io`). Changing GitHub Pages content does not require any changes to that configuration — visitors via that URL will automatically receive the new Astro site once Phase 1 is complete.

### Search index

The site uses [Pagefind](https://pagefind.app/) for static search. The search index is generated automatically during the CI build step (`pagefind --site dist`) and is included in every deployment. No separate action is needed.

### Local development

```bash
npm run dev        # dev server (search not available — no index)
npm run build      # full build + generates search index in dist/pagefind/
npm run preview    # preview built output locally (search works here)
```
