# People (Members)

Everything about the people shown on the **People** page (`/people`): the PI,
current students, alumni, and visiting members.

- Content location: `src/content/members/`
- Photos: `public/images/members/`
- Resumes (optional): `public/docs/resumes/`
- Schema source of truth: `src/content/config.ts`
- Rendered by: `src/pages/people.astro` and `src/pages/members/[...slug].astro`

> **The People page is folder-driven.** A member appears in a section based on
> the **folder** their file lives in — not just the `role` field. Putting the
> file in the right folder is the most important step.

## Folders → sections

| Folder                           | Shows up as                 |
| -------------------------------- | --------------------------- |
| `members/pi/`                    | Principal Investigator      |
| `members/current/phd/`           | Current Ph.D. students      |
| `members/current/masters/`       | Current Master's students   |
| `members/current/undergraduate/` | Current undergraduates      |
| `members/alumni/`                | Alumni (grouped, see below) |
| `members/visiting/students/`     | Visiting students           |
| `members/visiting/faculty/`      | Visiting faculty            |

> A `current/postdoc/` folder may exist but is **not** rendered. Current
> post-docs are not shown as a separate section; post-doctoral alumni appear
> under Alumni via `alumniType: "Post-Doctoral Researcher"`.

---

## Add a new student

1. Pick the folder for the student's role:
   - `src/content/members/current/phd/`
   - `src/content/members/current/masters/`
   - `src/content/members/current/undergraduate/`
2. Create a file named after the person, e.g. `jane-doe.md`.
3. Add the frontmatter:

   ```yaml
   ---
   name: "Jane Doe"
   role: "Ph.D." # "Ph.D." | "Masters" | "Undergraduate"
   joinDate: "2026"
   email: "jdoe@asu.edu"
   github: "https://github.com/janedoe"
   linkedin: "https://www.linkedin.com/in/jane-doe/"
   google_scholar: "https://scholar.google.com/..."
   resume: "/docs/resumes/jane-doe.pdf"
   researchInterests: ["AI-driven Multi-Level Compilers"]
   order: 99
   image: "/images/members/jane-doe.jpg"
   isAlumni: false
   ---
   Short bio in Markdown.
   ```

4. Add the photo at `public/images/members/jane-doe.jpg` (and resume PDF if used).
5. Validate: `npm run build`.

---

## Update a member's details

1. Open the member's file under `src/content/members/...`.
2. Edit the frontmatter fields or the bio body.
3. If you change the photo, replace the file in `public/images/members/` (keep
   the same path, or update the `image` field).
4. Validate: `npm run build`.

> To change the order a member appears in their section, set `order` (lower
> numbers appear first).

---

## Move a student to alumni

1. **Move** the file into the alumni folder, keeping the filename stable:
   - from `src/content/members/current/masters/jane-doe.md`
   - to `src/content/members/alumni/jane-doe.md`
2. Update the frontmatter:

   ```yaml
   ---
   name: "Jane Doe"
   role: "Alumni"
   joinDate: "2023"
   image: "/images/members/jane-doe.jpg"
   isAlumni: true
   alumniType: "Masters Graduate"
   graduated: "Masters, Spring 2026"
   currentPosition: "ML Engineer at Example Corp"
   ---
   ```

3. Set `alumniType` to one of (a single value or an array of these):
   - `"Ph.D. Graduate"`
   - `"Masters Graduate"`
   - `"Undergraduate Researcher"`
   - `"Post-Doctoral Researcher"`
4. Validate: `npm run build`.

> **Important:** an alumni file with an empty or missing `alumniType` will not
> appear in any alumni subsection. Always set a recognized value.

---

## Remove a member

1. Delete the member's file from `src/content/members/...`.
2. Optionally delete their now-unused assets:
   - `public/images/members/<slug>.jpg`
   - `public/docs/resumes/<slug>.pdf`
3. Validate: `npm run build`.

> Removing a current student usually means moving them to alumni instead — see
> [Move a student to alumni](#move-a-student-to-alumni).

---

## Field reference

### Required

- `name` (string)
- `role` (enum, see below)
- `joinDate` (string)

### `role` enum (exact values)

```
"Principle Investigator" | "Ph.D." | "Masters" | "Undergraduate" |
"Alumni" | "Postdoc" | "Visiting Student" | "Visiting Faculty"
```

> The schema literally uses `"Principle Investigator"` (kept as-is). There is no
> `"Faculty"` value.

### Optional

- Media: `image`, `photoUrl`
- Links: `email`, `website`, `github`, `linkedin`, `portfolio`,
  `google_scholar`, `resume`
- Research: `researchInterests` (string array)
- Ordering: `order` (number; lower sorts first)
- Alumni metadata: `isAlumni` (boolean), `alumniType`, `currentPosition`,
  `graduated`, `university`, `duration`

### Alumni grouping (`alumniType`)

```
"Ph.D. Graduate" | "Masters Graduate" |
"Undergraduate Researcher" | "Post-Doctoral Researcher"
```

- May be a single string or an array of strings.
- Plural variants (e.g. `"Ph.D. Graduates"`) are also recognized.
