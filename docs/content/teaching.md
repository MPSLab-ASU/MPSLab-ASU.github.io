# Teaching / Courses

The course pages under the **Teaching** section.

- Pages: `src/pages/teaching/`
- Teaching landing page: `src/pages/teaching.astro`
- Downloadable course files: `public/assets/teaching/`

> Teaching is **page-driven**, not a content collection. Each course is its own
> `.astro` page. Existing pages include `mla.astro`, `cse325.astro`,
> `cse420.astro`, `quantum-computation.astro`, and `older-courses.astro`.

---

## Add a course

1. Create a new `.astro` file in `src/pages/teaching/`, e.g. `cse450.astro`.
   The simplest approach is to copy an existing course page and edit its content.
2. Link the new page from `src/pages/teaching.astro` so it appears in the
   teaching index.
3. Put any downloadable materials (syllabi, slides) under
   `public/assets/teaching/` and link them via `/assets/teaching/<file>`.
4. Validate: `npm run build`.

---

## Update a course

1. Edit the course's `.astro` file in `src/pages/teaching/`.
2. Update or replace files under `public/assets/teaching/` as needed.
3. Validate: `npm run build`.

---

## Remove a course

1. Delete the course's `.astro` file from `src/pages/teaching/`.
2. Remove its link from `src/pages/teaching.astro`.
3. Optionally delete unused files under `public/assets/teaching/`.
4. Validate: `npm run build`.

> Because course pages are hand-built `.astro` files (not data-driven), changes
> here involve light HTML/markup editing. See
> [../architecture.md](../architecture.md) if you are new to Astro pages.
