# Build, Deployment, and Troubleshooting

How to build the site, how it is deployed, and how to resolve common issues.

## Table of Contents

- [Commands](#commands)
- [What the Build Does](#what-the-build-does)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Commands

```bash
npm run dev      # local dev server at http://localhost:4321
npm run build    # type-check, static build, and Pagefind index
npm run preview  # serve the built site locally
```

Always run `npm run build` before opening a pull request.

## What the Build Does

`npm run build` runs three steps (see `package.json`):

1. `astro check` — type checks and validates all content frontmatter against the
   Zod schemas in `src/content/config.ts`. Invalid content fails here with a file
   path and message.
2. `astro build` — renders all pages to static HTML in `dist/`.
3. `pagefind --site dist` — generates the site-wide search index into
   `dist/pagefind/`.

Because search indexing happens at build time, **global search only works after a
build** — use `npm run build && npm run preview` to test it locally.

## Deployment

The site is published to GitHub Pages as a static site.

- Build output directory: `dist/`
- Search index: `dist/pagefind/`
- Default (production) branch: `master`

Typical flow:

1. Merge changes into `master`.
2. The static site is built and published to GitHub Pages.

See [MIGRATION.md](../MIGRATION.md) for the branch/deployment strategy and history.

## Troubleshooting

### Hydration error: "Failed to fetch dynamically imported module"

Symptom: the browser console shows
`Failed to fetch dynamically imported module: ...PublicationSearch.tsx` (or a
similar component), and the interactive widget does not load in dev.

Cause: stale HMR / module cache after rapid component edits.

Fix:

1. Stop the dev server.
2. Restart it with `npm run dev`.

### Content does not show up

1. Confirm the file is in the correct collection folder (the People page is
   **folder-driven** — the folder decides the section).
2. Validate frontmatter fields against `src/content/config.ts`.
3. Run `npm run build` and read any schema errors.

### Publication filters are missing options

1. Confirm entries in `src/data/publications.bib` include `category`, `author`,
   `year`, and `research`.
2. Confirm the members and research collections are populated — author and tag
   lists are derived from those.
3. Watch for inconsistent `category` capitalization (e.g. `Conference` vs
   `conference`), which splits a single type into two filter options.

### Global search returns nothing

Global search depends on the Pagefind index, which only exists after a build. Run
`npm run build && npm run preview` and test there rather than in `npm run dev`.
