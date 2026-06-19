# FAQ

The questions and answers on the **FAQ** page (`/faq`).

- Content location: `src/content/faq/`
- Rendered by: `src/pages/faq.astro`
- Schema source of truth: `src/content/config.ts`

Each Markdown file is one **category** containing a list of question/answer
`items`. Existing categories include `general`, `research`, `administrative`, and
`on-campus-resources`.

---

## Add a question to an existing category

1. Open the category file in `src/content/faq/` (e.g. `general.md`).
2. Add an item to the `items` list:

   ```yaml
   items:
     - question: "How do I join the lab?"
       answer: "Email the PI with your CV and research interests."
       externalLink: "https://example.com/apply" # optional
   ```

3. Validate: `npm run build`.

---

## Add a new category

1. Create a new Markdown file in `src/content/faq/`, e.g. `funding.md`.
2. Add the frontmatter:

   ```yaml
   ---
   category: "Funding"
   icon: "💰" # optional emoji
   order: 5 # optional
   items:
     - question: "Are RA positions funded?"
       answer: "Yes, depending on current grants."
   ---
   ```

3. Validate: `npm run build`.

---

## Update or remove FAQ content

- **Update an answer:** edit the relevant `items` entry in the category file.
- **Remove a question:** delete that item from the `items` list.
- **Remove a category:** delete the category's Markdown file.
- Validate: `npm run build`.

---

## Field reference

| Field      | Required | Notes                            |
| ---------- | -------- | -------------------------------- |
| `category` | Yes      | Section heading                  |
| `icon`     | No       | Emoji shown next to the category |
| `order`    | No       | Sort order (lower first)         |
| `items[]`  | Yes      | List of questions                |

Each `items[]` entry: `question` (required), `answer` (optional),
`externalLink` (optional).
