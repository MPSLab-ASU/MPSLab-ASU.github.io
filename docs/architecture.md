# Architecture

How the site is built, structured, and how its interactive pieces work. Read this
before making code changes; for content-only changes see
[CONTRIBUTING.md](../CONTRIBUTING.md).

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Content and Data Sources](#content-and-data-sources)
- [Interactive Components (React Islands)](#interactive-components-react-islands)
- [Search](#search)
- [Theming](#theming)
- [Homepage Carousel](#homepage-carousel)
- [Accessibility](#accessibility)
- [Where to Edit What](#where-to-edit-what)

## Tech Stack

| Concern        | Technology                                   |
| -------------- | -------------------------------------------- |
| Site framework | Astro 5 (static output)                      |
| Interactivity  | React 19 islands (`client:*` directives)     |
| Styling        | Tailwind CSS + SCSS theme variables          |
| Content        | Astro content collections (Markdown + Zod)   |
| Publications   | BibTeX (`bibtex-parse-js`)                   |
| Page search    | Fuse.js (publications), Pagefind (site-wide) |

Astro renders all pages to static HTML at build time. React is used only for
components that need client-side interactivity; everything else is server-rendered
Astro.

## Project Structure

```text
src/
  components/astro/      Static layout blocks (Navbar, Footer, MemberGrid, Breadcrumbs)
  components/react/      Interactive UI (PublicationSearch, GlobalSearch, etc.)
  content/               Astro content collections (members, news, research, ...)
  content/config.ts      Zod schemas for every collection (source of truth)
  data/                  Data files (publications.bib, software.json, sponsors.json)
  layouts/               Page shell (Layout.astro)
  pages/                 Route files (see below)
  plugins/               Markdown/rehype plugins
  styles/                SCSS theme + global styles
  utils/                 Build-time helpers (e.g. bibtex.ts)
public/
  images/                Site images (members, research, software, sponsors, gallery)
  assets/                Downloadable assets (teaching, software)
  docs/                  Resume PDFs
  publications/          Paper, slides, and poster files
```

## Routes

Files in `src/pages/` map directly to URLs.

Top-level pages:

- `index.astro` — homepage
- `people.astro` — members listing (folder-driven)
- `publications.astro` — publications search
- `software.astro` — software/tools listing (its own page, **not** a publications tab)
- `teaching.astro` — teaching landing
- `faq.astro`, `contact.astro`

Nested / dynamic routes:

- `members/[...slug].astro` — individual member pages
- `news/index.astro`, `news/awards.astro`, `news/grants.astro` — news + filtered views
- `research/index.astro`, `research/[...slug].astro` — research areas
- `research/resources/[...slug].astro` — reading lists / resources
- `gallery/` — gallery pages
- `teaching/*.astro` — individual course pages (`mla`, `cse325`, `cse420`,
  `quantum-computation`, `older-courses`)

## Content and Data Sources

- **Collections** (`src/content/`): `members`, `news`, `research`, `resources`,
  `faq`, `gallery`. Each is validated by a Zod schema in
  `src/content/config.ts`.
- **Data files** (`src/data/`): `publications.bib`, `software.json`,
  `sponsors.json`.

The field reference and how-to for each collection and data file lives with its
content guide under [content/](content/README.md).

## Interactive Components (React Islands)

Located in `src/components/react/`:

- `PublicationSearch.tsx` — publication search and filter dropdowns
- `GlobalSearch.tsx` — site-wide modal search (Pagefind)
- `HomepageCarousel.tsx` — homepage image carousel
- `GalleryGrid.tsx` / `ImageLightbox.tsx` — gallery and lightbox
- `SoftwareCard.tsx` / `PublicationCard.tsx` — cards
- `ThemeToggle.tsx` — light/dark switch

Keep these focused on interactivity. Static markup belongs in Astro components.

## Search

The site has two independent search systems.

### Publications search (Fuse.js)

- UI logic: `src/components/react/PublicationSearch.tsx`
- Data source: `src/data/publications.bib`
- Behavior: client-side fuzzy search; filter dropdowns are derived from years
  and categories in BibTeX, member names from the members collection, and
  research tags from the research collection.

If filters appear empty or wrong:

1. Confirm BibTeX entries include `year`, `category`, `author`, `research`.
2. Run `npm run build` to validate the data flow.
3. Restart the dev server if the hydration cache is stale.

### Global site search (Pagefind)

- UI logic: `src/components/react/GlobalSearch.tsx`
- Index: generated into `dist/pagefind/` during `npm run build`.
- Behavior: runtime dynamic import of `/pagefind/pagefind.js`. Works reliably
  only after a build — use `npm run build && npm run preview` to test it.

## Theming

- Tailwind utilities plus SCSS theme variables (CSS custom properties).
- Theme files:
  - `src/styles/_theme-light.scss`
  - `src/styles/_theme-dark.scss`
  - `src/styles/main.scss`

When changing colors or contrast, verify the result in **both** light and dark
modes.

## Homepage Carousel

- Reads JPG/JPEG files from `public/images/homepage/`.
- Randomly selects 3 images per page load, so new images can be added without
  crowding the homepage.
- HEIC source images can be converted with `scripts/convert-heic-to-jpg.sh`
  (it also deletes the original HEIC files after a successful conversion).

## Accessibility

When editing interactive UI:

- Keep controls keyboard-focusable (`button`, `a`).
- Keep `aria-label`s on icon-only buttons.
- Verify color contrast in both light and dark mode.

## Where to Edit What

| Goal                         | Edit                                                  |
| ---------------------------- | ----------------------------------------------------- |
| Homepage copy/layout         | `src/pages/index.astro`                               |
| People listing behavior      | `src/pages/people.astro`                              |
| Publications search behavior | `src/components/react/PublicationSearch.tsx`          |
| Software listing             | `src/data/software.json` + `src/pages/software.astro` |
| Sponsors strip               | `src/data/sponsors.json`                              |
| Navigation / footer          | `src/components/astro/Navbar.astro`, `Footer.astro`   |
| Content schema rules         | `src/content/config.ts`                               |
| Colors / theme               | `src/styles/_theme-light.scss`, `_theme-dark.scss`    |
