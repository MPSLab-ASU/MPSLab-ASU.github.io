# MPS Lab @ ASU — Website

Official website for the Make Programming Simple (MPS) Lab at Arizona State
University.

**Live site:** https://mpslab-asu.github.io

Built with [Astro](https://astro.build), React islands, and Tailwind CSS. Content
(people, publications, news, research) is data-driven, so most updates are simple
Markdown/JSON/BibTeX edits — no application code required.

## Quick Start

```bash
git clone https://github.com/MPSLab-ASU/MPSLab-ASU.github.io.git
cd MPSLab-ASU.github.io
npm install
npm run dev
```

Open `http://localhost:4321`. See [docs/getting-started.md](docs/getting-started.md)
for full setup (including Docker).

## I want to…

| Task                          | Start here                                                   |
| ----------------------------- | ------------------------------------------------------------ |
| Add / update / remove people  | [docs/content/members.md](docs/content/members.md)           |
| Add a publication             | [docs/content/publications.md](docs/content/publications.md) |
| Add a news / award / grant    | [docs/content/news.md](docs/content/news.md)                 |
| Change any other content      | [docs/content/](docs/content/README.md) (one guide per type) |
| Understand the codebase       | [docs/architecture.md](docs/architecture.md)                 |
| Build / deploy / fix an issue | [docs/deployment.md](docs/deployment.md)                     |

## Documentation

- [Documentation Hub](docs/README.md) — index of all guides
- [Getting Started](docs/getting-started.md) — environment setup and first run
- [Contributing Guide](CONTRIBUTING.md) — workflow and conventions
- [Content Guides](docs/content/README.md) — one self-contained guide per content type
- [Architecture](docs/architecture.md) — tech stack, structure, UI, and search
- [Build & Deployment](docs/deployment.md) — commands, deployment, troubleshooting

## Common Commands

```bash
npm install      # install dependencies
npm run dev      # local dev server (http://localhost:4321)
npm run build    # type-check, build to dist/, generate search index
npm run preview  # serve the built site locally
```

## Contributing

Contributions are welcome — most are content updates. Please read
[CONTRIBUTING.md](CONTRIBUTING.md) and run `npm run build` before opening a pull
request.
