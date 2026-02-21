# MPS Lab @ ASU - Website

This repository contains the source code for the Make Programming Simple (MPS) Lab website at Arizona State University. The site is built using [Astro](https://astro.build/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/).

**Live Website:** [https://labs.engineering.asu.edu/mps-lab/](https://labs.engineering.asu.edu/mps-lab/)
**Publications list:** [https://labs.engineering.asu.edu/mps-lab/publications/](https://labs.engineering.asu.edu/mps-lab/publications/)

---

## Prerequisites
To run this project locally, you will need either:
- **Node.js**: v20 or higher
- **Docker & Docker Compose** (Optional, recommended for isolated environments)

---

## Local Development (Node.js)

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. Open `http://localhost:4321` in your browser.

---

## Local Development (Docker)
If you prefer not to install Node locally, you can use the provided Docker Compose configuration.

1. **Start the environment:**
   ```bash
   docker compose up
   ```
   *(This maps port 4321 to your local machine and automatically runs `npm install` and `npm run dev -- --host 0.0.0.0`)*

2. Open `http://localhost:4321` in your browser.

To stop the container:
```bash
docker compose down
```

---

## Deployment (GitHub Pages)

This project is configured to be deployed as a static site to GitHub pages.

1. **Build the project:**
   ```bash
   npm run build
   ```
   This generates the static HTML files into the `dist/` directory.

2. **GitHub Actions Overview:**
   The site uses a continuous integration pipeline (via `.github/workflows/deploy.yml` if configured) to build and publish the Astro site automatically on pushes to the `main` branch. 
   *(Note: Ensure Astro's `site` and `base` config in `astro.config.mjs` match your GitHub Pages repository settings).*

---

## Content Management

The website content is powered by **Astro Content Collections** located in `src/content/`.

- **Members:** Add new markdown files to `src/content/members/`. The schema requires `name`, `role`, and `joinDate`. 
- **News:** Add new markdown files to `src/content/news/`. The schema requires `title`, `date`, and `type`.
- **Research:** Add new markdown files to `src/content/research/`. The schema requires `title`, `status` ("Active" or "Extended"), and `description`.
- **Publications:** Managed via a single BibTeX file located at `src/data/publications.bib`. The site uses a React island to parse and search publications flawlessly.
