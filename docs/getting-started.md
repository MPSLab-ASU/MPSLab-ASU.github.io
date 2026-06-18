# Getting Started

Set up the project and run it locally. This page is about **environment setup**.
For how the code is organized, see [architecture.md](architecture.md); for making
content changes, see the [Contributing Guide](../CONTRIBUTING.md).

## Table of Contents

- [Getting Started](#getting-started)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Prerequisites](#prerequisites)
  - [Run Locally (Node.js)](#run-locally-nodejs)
  - [Run Locally (Docker)](#run-locally-docker)
  - [Build and Preview](#build-and-preview)
  - [Next Steps](#next-steps)

## Overview

- **Live site:** https://mpslab-asu.github.io
- **Framework:** Astro 5 (static output) with React islands and Tailwind CSS
- **Search:** Fuse.js for publications, Pagefind for site-wide search
- **Content:** Markdown collections in `src/content/` plus data files in
  `src/data/`

## Prerequisites

- Node.js v20 or newer
- npm
- Git
- (Optional) Docker / Docker Compose

## Run Locally (Node.js)

```bash
npm install
npm run dev
```

Open `http://localhost:4321`. The dev server hot-reloads on save.

## Run Locally (Docker)

```bash
docker compose up
```

Open `http://localhost:4321`. Stop with:

```bash
docker compose down
```

## Build and Preview

```bash
npm run build    # type-check, static build to dist/, generate search index
npm run preview  # serve the built output locally
```

Run `npm run build` before opening a pull request — it validates all content
against the schemas. Site-wide (Pagefind) search only works against a build, so
use `npm run build && npm run preview` to test search locally.

## Next Steps

- Make a content change → [Contributing Guide](../CONTRIBUTING.md)
- Understand the codebase → [Architecture](architecture.md)
- Look up a content field → [Content Guides](content/README.md)
- Deploy or troubleshoot → [Build & Deployment](deployment.md)
