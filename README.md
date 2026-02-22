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
| Markdown | `marked` (for FAQ) + Custom `rehype-figure-caption` plugin |

---

## Project Structure

```
src/
├── components/
│   ├── astro/           # Navbar, Footer, MemberGrid
│   └── react/           # PublicationSearch, GalleryGrid, ImageLightbox, ThemeToggle
├── content/             # Astro Content Collections
│   ├── members/         # Lab member profiles
│   ├── news/            # News & announcements
│   ├── research/        # Research area pages
│   ├── resources/       # Reading lists per research area
│   ├── faq/             # Categorized FAQs (Markdown files)
│   └── gallery/         # Lab event galleries
├── data/
│   ├── publications.bib # BibTeX publication database
│   ├── software.json    # Scraped software projects
│   └── sponsors.json    # Scraped sponsor data
├── layouts/
│   └── Layout.astro     # Base HTML layout
├── pages/
│   ├── index.astro              # Home page (includes Sponsors)
│   ├── people.astro             # People directory (tabbed by role)
│   ├── publications.astro       # Searchable publications & Software tabs
│   ├── gallery/index.astro      # Lab Gallery archive
│   ├── gallery/[...slug].astro  # Event-specific photo grids (React Lightbox)
│   ├── faq.astro                # Categorized accordion FAQ
│   ├── contact.astro            # Contact page
│   ├── members/[...slug].astro  # Individual member profiles
│   ├── research/index.astro     # Research overview
│   └── research/[...slug].astro # Individual research pages
└── plugins/
    └── rehype-figure-caption.mjs  # Image caption plugin
public/
├── images/              # Member photos, research, gallery assets, sponsor logos
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

The site deploys as a static site to **GitHub Pages**.

---

## Content Management

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
researchInterests: ["Topic A", "Topic B"] # optional
isAlumni: false                # optional
currentPosition: "..."        # optional (for alumni)
---

Bio text goes here (markdown supported).
```

### News and Awards (`src/content/news/`)

#### Manual Addition
Create a new `.md` file in `src/content/news/`.

```yaml
---
date: "2024"             # Can be a full date (YYYY-MM-DD) or just the year
type: "Publication"      # Award | Publication | Event | Announcement | General
description: "A concise description of the news. Supports **Markdown**."
---
```

#### Automated Scraping
Run the scraper to fetch updates from the legacy site:
```bash
python scrape_news.py
```

### Research Areas (`src/content/research/`)

```yaml
---
title: "Research Area Name"
status: "Active"       # Active | Extended
description: "One-line summary."
image: "/images/research/hero.jpg"  # optional banner
icon: "Cpu"            # Lucide icon name
order: 1               # display order
---

Markdown content. Supports images with captions:

![Alt Text](/images/research/figure.png)
This text becomes a styled caption under the image (no blank line above).
```

### Resources / Reading Lists (`src/content/resources/`)

```yaml
---
researchArea: "Intelligent Transportation Systems"  # must match research title exactly
resources:
  - title: "Paper Title"
    type: "Paper"       # Paper | Book | Video | Tutorial | Tool | Publication
    url: "https://..."
    authors: "Authors"
    description: "..."
---
```

### FAQ (`src/content/faq/`)

FAQs are managed via markdown files in the `faq` collection.

```yaml
---
category: "General"      # Group name
icon: "💡"               # Category emoji
order: 1                 # Display order
items:
  - question: "How do I X?"
    answer: "Full answer supporting **markdown**."
    externalLink: ""     # Optional direct link
  - question: "Link to service"
    answer: ""
    externalLink: "https://..."
---
```

### Lab Gallery (`src/content/gallery/`)

Showcases photos from lab events.

```yaml
---
title: "Lab Social 2024"
description: "Brief summary of the event."
date: 2024-03-20
coverImage: "/images/gallery/lab-social-2024/social_1.png"
images:
  - "/images/gallery/lab-social-2024/social_1.png"
  - "/images/gallery/lab-social-2024/social_2.png"
location: "Tempe, AZ"
---

Optional detailed description of the event.
```

### Publications (`src/data/publications.bib`)

Managed in a BibTeX file. Key fields:
- `research` — Comma-separated tags matching research titles.
- `category` — Conference, Article, Patent, etc.
- `website` / `code` — Optional deep links.
- `url` — Paper/Slides links. Format: `http://link.com/p.pdf, pdf http://link.com/s.ppt, slides`.

#### Software Tab
Powered by `src/data/software.json`:
```json
{
  "name": "Project Name",
  "url": "https://github.com/...",
  "description": "...",
  "researchGroup": "AI Compilers",
  "image": "/images/software/logo.png"
}
```

### Sponsors (`src/data/sponsors.json`)

Displayed on the homepage. Scraped using `scrape_sponsors.py`.
```json
{
  "name": "Agency Name",
  "logo": "/images/sponsors/logo.png",
  "url": "https://..."
}
```

---

## Theming & UI

- **Light/Dark Mode**: Persisted theme switch via `ThemeToggle`.
- **Interactive Gallery**: Immersive lightbox experience powered by `ImageLightbox.tsx` (React).
- **Markdown Rendering**: Answers in FAQ use `marked`. Research pages use Astro dynamic rendering.
