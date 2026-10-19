# Blogs

Blog posts shown on the **Blogs** page (`/blog`). Each post is a card that links
out to where the blog is hosted (a Colab notebook, Medium, a personal site, …).

- Content location: `src/content/blog/`
- Images (optional): `public/images/blog/`
- Rendered by: `src/pages/blog.astro` via `src/components/react/BlogCard.tsx`
- Schema source of truth: `src/content/config.ts`

---

## Add a blog post

1. Create a Markdown file in `src/content/blog/`, e.g.
   `pytorch-to-machine-code.md`.
2. Add the frontmatter:

   ```yaml
   ---
   title: "From PyTorch to Machine Code"
   url: "https://colab.research.google.com/drive/..."
   description: "One or two sentences on what the post covers."
   date: 2026-10-01
   authors: "Aviral Shrivastava, Atharva Khedkar" # optional
   tags: ["torch.compile", "Triton"] # optional
   researchAreas: ["ai-compilers"] # optional
   image: "/images/blog/pytorch.png" # optional
   ---
   ```

3. Validate: `npm run build`.

> `date` is a real date (no quotes), e.g. `2026-10-01`. The card shows the
> month and year, and posts are listed newest first.
>
> Only the frontmatter is used. Anything written below the closing `---` is not
> shown on the site; the post itself lives at `url`.

---

## Link a post from a research page

List the research area's slug in `researchAreas`. The slug is the research
page's file name in `src/content/research/` without `.md`, which is also the
last part of its URL (`/research/ai-compilers` → `ai-compilers`).

> This uses slugs, not titles. People's `researchInterests` use the full title
> (e.g. `"AI-driven Multi-Level Compilers"`); blogs do not.

Every research page with at least one matching post gets a **Blogs** button
next to its Reading List. The button opens `/blog?topic=<slug>`, which shows
only that area's posts. A slug that doesn't match a research page fails the
build.

---

## Update or remove a post

- To update, edit the post's Markdown file.
- To remove, delete the post's Markdown file from `src/content/blog/`. If it was
  the last post for a research area, that page's Blogs button disappears.
- Validate: `npm run build`.

---

## Field reference

| Field           | Required | Notes                                              |
| --------------- | -------- | -------------------------------------------------- |
| `title`         | Yes      | Post title                                         |
| `url`           | Yes      | Full link to the hosted blog                       |
| `description`   | Yes      | Short summary shown on the card                    |
| `date`          | Yes      | Date value (unquoted), e.g. `2026-10-01`           |
| `authors`       | No       | Shown under the title                              |
| `tags`          | No       | List of keywords shown as chips                    |
| `researchAreas` | No       | Research page slugs, e.g. `["ai-compilers"]`       |
| `image`         | No       | Small square thumbnail (shown at 56px), e.g. `/images/blog/pytorch.png`; a book icon is shown when omitted |
