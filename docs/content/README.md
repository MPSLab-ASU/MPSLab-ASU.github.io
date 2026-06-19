# Content Guides

Every type of content on the site has **its own guide** in this folder. Find the
thing you want to change, open that one file, and follow it end to end — each
guide is self-contained and covers how to **add**, **update**, and **remove**
that content, plus its field reference.

## Pick your content type

| If you want to change…                  | Open this guide                    |
| --------------------------------------- | ---------------------------------- |
| People (students, PI, alumni, visitors) | [members.md](members.md)           |
| Publications / papers                   | [publications.md](publications.md) |
| News, awards, and grant announcements   | [news.md](news.md)                 |
| Research areas and reading lists        | [research.md](research.md)         |
| Photo gallery / event albums            | [gallery.md](gallery.md)           |
| Software / tools listing                | [software.md](software.md)         |
| Sponsors / funding logos                | [sponsors.md](sponsors.md)         |
| FAQ entries                             | [faq.md](faq.md)                   |
| Teaching / courses                      | [teaching.md](teaching.md)         |

## Before you start (applies to every guide)

1. Prepare any image/PDF assets **first**, so the links you add in content are
   valid.
2. Make the content change by following the relevant guide.
3. Validate with a full build:

   ```bash
   npm run build
   ```

   If the build passes, your content is valid. If it fails, the error names the
   exact file and field to fix. The validation rules come from
   `src/content/config.ts`.

## Good to know

- **No code required.** All content lives in `src/content/` (Markdown) and
  `src/data/` (BibTeX/JSON). You do not need to touch application code to add a
  person, paper, or news item.
- **Folder location matters.** Several pages (especially People) decide where
  content appears based on the **folder** a file is in, not just its fields.
- For how the site is built and how pages render this content, see
  [../architecture.md](../architecture.md).
