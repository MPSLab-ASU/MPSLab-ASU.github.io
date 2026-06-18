# Documentation

Everything you need to maintain the MPS Lab website. Start with the guide that
matches what you want to do.

## Guides

| Guide                                    | Use it when you want to…                               |
| ---------------------------------------- | ------------------------------------------------------ |
| [Getting Started](getting-started.md)    | Install dependencies and run the site locally          |
| [Content Guides](content/README.md)      | Add/update/remove content — one guide per content type |
| [Contributing Guide](../CONTRIBUTING.md) | Set up, follow the workflow, and conventions           |
| [Architecture](architecture.md)          | Understand the tech stack, structure, UI, and search   |
| [Build & Deployment](deployment.md)      | Build, deploy, or troubleshoot the site                |
| [Migration Plan](../MIGRATION.md)        | Review the migration/deployment history                |

## Most Common Tasks

Each content type has its own self-contained guide under
[content/](content/README.md):

- [People — add / update / move to alumni / remove](content/members.md)
- [Publications](content/publications.md)
- [News, awards & grants](content/news.md)
- [Research areas & reading lists](content/research.md)
- [Gallery](content/gallery.md)
- [Software](content/software.md) · [Sponsors](content/sponsors.md) · [FAQ](content/faq.md) · [Teaching](content/teaching.md)

## Golden Rule

After any change, validate it with a full build:

```bash
npm run build
```

If the build passes, your content is valid and the site will render. If it fails,
the error message points to the file and field to fix.
