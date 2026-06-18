# Contributing Guide

Thanks for helping maintain the MPS Lab website. This guide covers how to set up
your environment and the workflow for making changes. For the actual content
edits (people, publications, news, etc.), each content type has its own
step-by-step guide — see [Content Updates](#content-updates).

For background and deeper references, see the [documentation hub](docs/README.md).

---

## Table of Contents

- [Contributing Guide](#contributing-guide)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [Prerequisites](#prerequisites)
  - [Local Setup](#local-setup)
  - [Contribution Workflow](#contribution-workflow)
  - [Branch and Commit Conventions](#branch-and-commit-conventions)
  - [Validation Before a PR](#validation-before-a-pr)
  - [Content Updates](#content-updates)
  - [Style and Conventions](#style-and-conventions)
  - [Where to Get Help](#where-to-get-help)

---

## Code of Conduct

Be respectful and constructive. This is a shared lab resource maintained by
students, staff, and faculty. Keep changes focused, document non-obvious
decisions, and prefer small, reviewable pull requests.

---

## Prerequisites

- Node.js v20 or newer
- npm
- Git
- (Optional) Docker / Docker Compose

---

## Local Setup

```bash
git clone https://github.com/MPSLab-ASU/MPSLab-ASU.github.io.git
cd MPSLab-ASU.github.io
npm install
npm run dev
```

Open `http://localhost:4321`.

Full setup details: [docs/getting-started.md](docs/getting-started.md).

---

## Contribution Workflow

1. Create a branch from the default branch (`master`).
2. Make your change (content or code).
3. Run the build locally to validate (`npm run build`).
4. Open a pull request describing **what** changed and **why**.
5. Address review feedback and merge once approved.

Most contributions are **content updates** (adding people, papers, news). These
do not require touching application code — see [Content Updates](#content-updates).

---

## Branch and Commit Conventions

- Branch names: short and descriptive, e.g. `add-student-jane-doe`,
  `fix-publication-filter`, `update-news-2026`.
- Commits: present-tense, imperative summary, e.g.
  `Add Jane Doe to current PhD students`.
- Keep unrelated changes in separate PRs.

---

## Validation Before a PR

Always run a full build before opening a PR:

```bash
npm run build
```

This runs `astro check` (type + schema validation), the static build, and the
Pagefind search index. If content frontmatter is invalid, the build fails with a
schema error pointing at the offending file.

For search-related changes, also preview the built site:

```bash
npm run preview
```

---

## Content Updates

Each content type has a **dedicated, self-contained guide** under
[docs/content/](docs/content/README.md). Open the one guide for what you're
changing — it covers how to add, update, and remove that content, plus its field
reference.

| To change…                              | Open                                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| People (students, PI, alumni, visitors) | [docs/content/members.md](docs/content/members.md)           |
| Publications / papers                   | [docs/content/publications.md](docs/content/publications.md) |
| News, awards, grants                    | [docs/content/news.md](docs/content/news.md)                 |
| Research areas & reading lists          | [docs/content/research.md](docs/content/research.md)         |
| Photo gallery                           | [docs/content/gallery.md](docs/content/gallery.md)           |
| Software / tools                        | [docs/content/software.md](docs/content/software.md)         |
| Sponsors                                | [docs/content/sponsors.md](docs/content/sponsors.md)         |
| FAQ                                     | [docs/content/faq.md](docs/content/faq.md)                   |
| Teaching / courses                      | [docs/content/teaching.md](docs/content/teaching.md)         |

> All content lives in `src/content/` (Markdown) and `src/data/` (BibTeX/JSON),
> validated by `src/content/config.ts`. Prepare image/PDF assets first, then run
> `npm run build` to validate.

---

## Style and Conventions

- **Content**: follow the exact field names and enum values documented in each
  content guide (and `src/content/config.ts`). The build rejects invalid
  frontmatter.
- **Code**: React islands (`src/components/react/`) are for interactive UI only;
  keep static content in Astro components/pages.
- **Theming**: changes to colors/contrast must be tested in both light and dark
  modes (`src/styles/_theme-light.scss`, `src/styles/_theme-dark.scss`).
- **Accessibility**: keep keyboard focus and `aria-label`s on icon-only controls.

See [docs/architecture.md](docs/architecture.md) for the full UI and theming
overview.

---

## Where to Get Help

- Documentation hub: [docs/README.md](docs/README.md)
- Content guides: [docs/content/](docs/content/README.md)
- Troubleshooting: [docs/deployment.md#troubleshooting](docs/deployment.md#troubleshooting)
