# Research Areas & Reading Lists

The research areas shown on the homepage and the **Research** page, plus the
optional reading-list / resources pages attached to them.

- Research areas: `src/content/research/`
- Reading lists / resources: `src/content/resources/`
- Banner images: `public/images/research/`
- Rendered by: `src/pages/research/index.astro`,
  `src/pages/research/[...slug].astro`, and
  `src/pages/research/resources/[...slug].astro`
- Schema source of truth: `src/content/config.ts`

---

## Research areas

### Add a research area

1. Create a Markdown file in `src/content/research/`, e.g.
   `quantum-machine-learning.md`.
2. Add the frontmatter:

   ```yaml
   ---
   title: "Quantum Machine Learning"
   status: "Active" # "Active" | "Extended"
   description: "One or two sentences describing the area."
   image: "/images/research/qml/banner.jpg" # used for Active areas
   icon: "Atom" # Lucide icon name; used for Extended areas
   order: 1
   ---
   Longer description in Markdown.
   ```

3. Add any banner image under `public/images/research/...`.
4. Validate: `npm run build`.

> **`status` controls presentation:**
>
> - `Active` areas show as image-led cards on the homepage and research page
>   (provide a good `image`).
> - `Extended` areas show as compact icon cards (provide an `icon`).

### Update or remove a research area

- **Update:** edit the file's frontmatter or body; replace the `image` if needed.
- **Remove:** delete the file from `src/content/research/`. If it had a reading
  list, also remove the matching file in `src/content/resources/`.
- Validate: `npm run build`.

---

## Reading lists / resources

Each file in `src/content/resources/` attaches a reading list to a research area.

### Add a reading list

1. Create a Markdown file in `src/content/resources/`.
2. Provide **exactly one** of `readingListUrl` or `resources[]` (not both,
   not neither — this is enforced by the schema):

   External link form:

   ```yaml
   ---
   researchArea: "Quantum Machine Learning"
   readingListUrl: "https://example.com/reading-list"
   ---
   ```

   Inline list form:

   ```yaml
   ---
   researchArea: "Quantum Machine Learning"
   resources:
     - title: "A Foundational QML Paper"
       type: "Paper" # Paper | Book | Video | Tutorial | Tool | Publication
       url: "https://example.com/paper.pdf"
       authors: "Jane Doe"
       description: "Why this matters."
   ---
   ```

3. Validate: `npm run build`.

> `researchArea` should match the `title` of a research area.

### Update or remove a reading list

- **Update:** edit the file in `src/content/resources/`.
- **Remove:** delete the file.
- Validate: `npm run build`.

---

## Field reference

### Research area (`src/content/research/`)

| Field         | Required | Notes                                       |
| ------------- | -------- | ------------------------------------------- |
| `title`       | Yes      | Display name                                |
| `status`      | Yes      | `Active` \| `Extended`                      |
| `description` | Yes      | Short summary                               |
| `image`       | No       | Banner; used prominently for `Active` areas |
| `icon`        | No       | Lucide icon name; used for `Extended` areas |
| `order`       | No       | Sort order (lower first)                    |

### Reading list (`src/content/resources/`)

| Field            | Required | Notes                                         |
| ---------------- | -------- | --------------------------------------------- |
| `researchArea`   | Yes      | Should match a research area `title`          |
| `readingListUrl` | One of   | External link **or** `resources[]`, not both  |
| `resources[]`    | One of   | Inline list **or** `readingListUrl`, not both |

Each `resources[]` item: `title` (required), `type`
(`Paper` \| `Book` \| `Video` \| `Tutorial` \| `Tool` \| `Publication`), and
optional `url`, `authors`, `description`.
