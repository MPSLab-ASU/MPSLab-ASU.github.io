# Sponsors

The funding/sponsor logos displayed on the homepage.

- Data location: `src/data/sponsors.json` (a JSON array)
- Logos: `public/images/sponsors/`
- Rendered by: `src/pages/index.astro`

---

## Add a sponsor

1. Add the logo image under `public/images/sponsors/`.
2. Add a new object to the array in `src/data/sponsors.json`:

   ```json
   {
     "name": "NSF",
     "logo": "/images/sponsors/logo-nsf.jpg",
     "url": "https://www.nsf.gov"
   }
   ```

3. Validate: `npm run build`.

> `url` is optional — leave it as an empty string `""` if the sponsor has no
> link (most existing entries do this).

---

## Update a sponsor

1. Find the object by `name` in `src/data/sponsors.json`.
2. Edit its fields. If you change the logo, update `logo` and replace the file in
   `public/images/sponsors/`.
3. Validate: `npm run build`.

---

## Remove a sponsor

1. Delete the object from the array in `src/data/sponsors.json`.
2. Optionally delete the unused logo from `public/images/sponsors/`.
3. Make sure the surrounding JSON stays valid (no trailing comma).
4. Validate: `npm run build`.

---

## Field reference

| Key    | Required | Notes                                     |
| ------ | -------- | ----------------------------------------- |
| `name` | Yes      | Sponsor name                              |
| `logo` | Yes      | Logo path under `public/images/sponsors/` |
| `url`  | No       | Link; use `""` when there is none         |
