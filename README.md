# MPS Lab @ ASU — Website

The official website for the **Make Programming Simple (MPS) Lab** at Arizona State University. Built with [Astro](https://astro.build/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/).

**Live Website:** [https://mpslab-asu.github.io](https://mpslab-asu.github.io)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 5 (static output) |
| UI Components | Astro (`.astro`) + React Islands |
| Styling | Tailwind CSS + SCSS (light/dark themes) |
| Icons | Lucide React |
| Search | Fuse.js (fuzzy search for publications) |
| Publications | BibTeX → `bibtex-parse-js` |
| Markdown | Custom `rehype-figure-caption` plugin for image captions |

---

## Project Structure

```
src/
├── components/
│   ├── astro/           # Navbar, Footer, MemberGrid
│   └── react/           # PublicationSearch, PublicationCard, ThemeToggle
├── content/             # Astro Content Collections
│   ├── members/         # Lab member profiles (47 files)
│   ├── news/            # News & announcements
│   ├── research/        # Research area pages
│   └── resources/       # Reading lists per research area
├── data/
│   └── publications.bib # BibTeX publication database
├── layouts/
│   └── Layout.astro     # Base HTML layout
├── pages/
│   ├── index.astro              # Home page
│   ├── people.astro             # People directory (tabbed by role)
│   ├── publications.astro       # Searchable publications
│   ├── contact.astro            # Contact page
│   ├── members/[...slug].astro  # Individual member profiles
│   ├── research/index.astro     # Research overview
│   ├── research/[...slug].astro # Individual research pages
│   └── research/resources/[...slug].astro  # Reading list pages
├── plugins/
│   └── rehype-figure-caption.mjs  # Image caption plugin
└── styles/
    ├── main.scss          # Global styles, prose formatting
    ├── _theme-light.scss  # Light theme variables
    └── _theme-dark.scss   # Dark theme variables
public/
├── images/              # Member photos, research images
└── docs/                # Resumes, documents
```

---

## Prerequisites

- **Node.js** v20+ (or Docker)

---

## Local Development

### Node.js

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

### Docker

```bash
docker compose up
```

Open [http://localhost:4321](http://localhost:4321). Stop with `docker compose down`.

---

## Build & Deploy

```bash
npm run build    # Type-check + static build → dist/
npm run preview  # Preview the built site locally
```

The site deploys as a static site to **GitHub Pages**. Ensure `site` in `astro.config.mjs` matches your deployment URL.

---

## Content Management

All content is managed through **Astro Content Collections** in `src/content/`. Schemas are defined in [`src/content/config.ts`](src/content/config.ts).

### Members (`src/content/members/`)

Each `.md` file represents a lab member.

```yaml
---
name: "Jane Doe"
role: "Ph.D."           # Faculty | Ph.D. | Masters | Undergraduate | Postdoc | Alumni | Visiting Student | Visiting Faculty
joinDate: "2023"
image: "/images/members/jane-doe.jpg"
email: "jdoe@asu.edu"          # optional
website: "https://..."         # optional
github: "https://github.com/..." # optional
linkedin: "https://..."        # optional
resume: "/docs/resumes/..."    # optional
researchInterests: ["Topic A"] # optional
isAlumni: false                # optional
currentPosition: "..."        # optional (for alumni)
---

Bio text goes here (markdown supported).
```

### News (`src/content/news/`)

```yaml
---
title: "Award Title"
date: 2024-06-26
type: "Award"          # Award | Publication | Event | Announcement | General
excerpt: "Short desc"  # optional
---

Full news body in markdown.
```

### Research Areas (`src/content/research/`)

```yaml
---
title: "Research Area Name"
status: "Active"       # Active | Extended
description: "One-line summary of the area."
image: "/images/research/hero.jpg"  # optional banner image
icon: "Cpu"            # optional, Lucide icon name (Cpu | Car | BookOpen | Brain | Shield | Zap)
order: 1               # optional, display order
---

Markdown content for the research page. Supports:
- **Bullet points** and numbered lists
- **Images with captions** — put caption text on the next line (no blank line):

![Alt Text](/images/research/figure.png)
This text becomes a styled caption under the image.
```

### Resources / Reading Lists (`src/content/resources/`)

One file per research area containing curated resources.

```yaml
---
researchArea: "Intelligent Transportation Systems"  # must match research title exactly
resources:
  - title: "Paper Title"
    type: "Paper"       # Paper | Book | Video | Tutorial | Tool | Publication
    url: "https://..."  # optional
    authors: "Authors"  # optional
    description: "..."  # optional
  - title: "Another Resource"
    type: "Book"
    url: "https://..."
---
```

The reading list page appears at `/research/resources/{slug}` and is linked from the corresponding research page via a **Reading List** button.

### Publications (`src/data/publications.bib`)

Publications are managed in a single **BibTeX** file. The site parses this at build time and powers the searchable `/publications` page, as well as the related publications lists on individual member/research pages.

Key custom BibTeX fields:
- `research` — Comma-separated research area tags (must match research page titles for filtering).
- `category` — Display type (Conference, Article, Proceedings, Patent, Masters Thesis, PhD Thesis, etc.).
- `website` — (Optional) A direct link to the project or publisher website (renders as a "Website" button).
- `url` — (Optional) Space/comma separated pairs of links to papers and slide decks. Format: `https://link.com/file.pdf, pdf https://link.com/slides.ppt, slides`.

**Example Entry:**
```bibtex
@inproceedings{Example2024,
  author   = {Jane Doe and John Smith},
  title    = {A Novel Approach to Embedded Systems},
  booktitle= {Proceedings of the International Conference on Cyber-Physical Systems},
  year     = {2024},
  research = {Cyber-Physical Systems, Intelligent Transportation Systems},
  category = {Conference},
  website  = {https://project-website.com},
  url      = {https://example.com/paper.pdf, pdf https://example.com/demo.mp4, video}
}
```

> **Note:** Thesis entries (`mastersthesis`, `phdthesis`, `bachelorthesis`) are automatically excluded from the "Recent Publications" section on individual research pages.

The publications page supports URL-based filtering:
- `/publications?q=search+term` — Pre-fills the search box
- `/publications?tag=Research+Area+Name` — Pre-selects the tag filter

---

## Theming

The site supports **light and dark modes** via CSS custom properties defined in `_theme-light.scss` and `_theme-dark.scss`. The `ThemeToggle` React component handles switching and persists the preference.

---

## Custom Plugins

### `rehype-figure-caption`

A custom rehype plugin (`src/plugins/rehype-figure-caption.mjs`) that converts markdown images followed by caption text into semantic `<figure>` + `<figcaption>` HTML. Just write:

```markdown
![Alt text](/path/to/image.png)
Caption text on the very next line (no blank line).
```

This renders as a styled figure with a centered, italic caption below the image.
