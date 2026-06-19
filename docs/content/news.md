# News, Awards & Grants

Updates shown on the **News** page and its filtered views.

- Content location: `src/content/news/`
- Rendered by: `src/pages/news/index.astro`, plus filtered views
  `src/pages/news/awards.astro` and `src/pages/news/grants.astro`
- Filtering is driven by the `type` field (e.g. `Award` items appear on the
  Awards page, `Grant` items on the Grants page)
- Schema source of truth: `src/content/config.ts`

---

## Add a news update

1. Create a Markdown file in `src/content/news/`. Use a descriptive,
   date-prefixed name, e.g. `2026-publication-new-compiler-paper.md`.
2. Add the frontmatter:

   ```yaml
   ---
   date: "2026-06-17" # full date "YYYY-MM-DD" or just "YYYY"
   type: "Publication" # Award | Grant | Publication | Event | Announcement | General
   description: "One concise update sentence. Markdown is supported."
   ---
   Optional expanded body content (Markdown).
   ```

3. Validate: `npm run build`.

> Choose `type` carefully — `Award` and `Grant` items also surface on their
> dedicated pages.

---

## Update a news update

1. Open the relevant file in `src/content/news/`.
2. Edit the `description`, `date`, `type`, or body.
3. Validate: `npm run build`.

---

## Remove a news update

1. Delete the file from `src/content/news/`.
2. Validate: `npm run build`.

---

## Bulk / historical import

To import many historical items at once, the legacy helper script is available:

```bash
python parse_news.py
```

Review the generated files afterward and run `npm run build` to validate.

---

## Field reference

| Field         | Required | Notes                                                                         |
| ------------- | -------- | ----------------------------------------------------------------------------- |
| `date`        | Yes      | String, date, or number — `"YYYY-MM-DD"` or `"YYYY"`                          |
| `type`        | Yes      | `Award` \| `Grant` \| `Publication` \| `Event` \| `Announcement` \| `General` |
| `description` | Yes      | Short summary; Markdown supported                                             |
| _body_        | No       | Optional expanded content below the frontmatter                               |
