# Publications

The publications list and search on the **Publications** page (`/publications`).
Publications also appear on related member and research pages.

- Data location: `src/data/publications.bib` (a single BibTeX file)
- Paper files: `public/publications/papers/`
- Slides: `public/publications/slides/`
- Posters: `public/publications/posters/`
- Rendered by: `src/pages/publications.astro` via
  `src/components/react/PublicationSearch.tsx`
- Titles with LaTeX are normalized at build time by `src/utils/bibtex.ts`

---

## Add a publication

1. Open `src/data/publications.bib`.
2. Add a new entry with a **unique** citation key.
3. Include the fields used by search and the filter dropdowns: `title`,
   `author`, `year`, `category`, and `research`.
4. If you host the files locally, drop them in the matching `public/publications/`
   folder and link them via the `url` field.
5. Validate: `npm run build`.

Template:

```bibtex
@inproceedings{Doe2026Conf,
  title     = {Paper Title},
  author    = {Jane Doe and John Smith},
  year      = {2026},
  category  = {Conference},
  research  = {Intelligent Transportation Systems},
  booktitle = {Conference Name},
  url       = {https://mpslab-asu.github.io/publications/papers/Doe2026Conf.pdf, pdf}
}
```

---

## Update a publication

1. Find the entry by its citation key in `src/data/publications.bib`.
2. Edit the fields (e.g. fix authors, add a `url` for slides).
3. If you replace a paper/slide/poster file, update the path under
   `public/publications/...` and the `url` field.
4. Validate: `npm run build`.

---

## Remove a publication

1. Delete the entire `@...{ ... }` entry from `src/data/publications.bib`.
2. Optionally delete the now-unused files under `public/publications/...`.
3. Validate: `npm run build`.

---

## Field reference

Fields used by the UI and search/filter dropdowns:

| Field      | Used for                                                       |
| ---------- | -------------------------------------------------------------- |
| `title`    | Display + full-text search                                     |
| `author`   | Display + author filter                                        |
| `year`     | Year filter                                                    |
| `category` | Type filter                                                    |
| `research` | Tag filter (comma-separated; should match research area names) |
| `url`      | Links to paper/slides/poster (format below)                    |

### `url` format

Comma-separate each link with a short label:

```
url = {https://.../paper.pdf, pdf https://.../slides.pptx, slides}
```

### `category` values in use

```
Proceedings, Conference, Workshop, Article, Book, Collection,
Patent, Tech Report, Working Paper,
Masters Thesis, PhD Thesis, Bachelors Thesis
```

> **Keep capitalization consistent.** The data currently mixes case (e.g.
> `Conference` vs `conference`), which splits one type into two filter options.
> Always use a single canonical spelling for each category.
