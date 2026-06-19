# Gallery

Photo albums shown in the **Gallery**.

- Content location: `src/content/gallery/`
- Images: `public/images/gallery/<event>/`
- Rendered by: pages under `src/pages/gallery/` via
  `src/components/react/GalleryGrid.tsx` and `ImageLightbox.tsx`
- Schema source of truth: `src/content/config.ts`

---

## Add a gallery album

1. Put the event photos in a new folder, e.g.
   `public/images/gallery/dac-2025/`.
2. Create a Markdown file in `src/content/gallery/`, e.g.
   `dac-conference-2025.md`.
3. Add the frontmatter:

   ```yaml
   ---
   title: "DAC Conference 2025"
   description: "Highlights from the lab's trip to DAC 2025."
   date: 2025-06-22
   location: "San Francisco, CA" # optional
   coverImage: "/images/gallery/dac-2025/cover.jpg"
   images:
     - "/images/gallery/dac-2025/photo-1.jpg"
     - "/images/gallery/dac-2025/photo-2.jpg"
     - "/images/gallery/dac-2025/photo-3.jpg"
   ---
   ```

4. Validate: `npm run build`.

> `date` is a real date (no quotes), e.g. `2025-06-22`.

---

## Add or update photos in an existing album

1. Add the image files to the album's folder under
   `public/images/gallery/<event>/`.
2. Add their paths to the `images` list in the album's Markdown file.
3. To change the thumbnail, update `coverImage`.
4. Validate: `npm run build`.

---

## Remove an album

1. Delete the album's Markdown file from `src/content/gallery/`.
2. Optionally delete its image folder under `public/images/gallery/<event>/`.
3. Validate: `npm run build`.

---

## Field reference

| Field         | Required | Notes                                    |
| ------------- | -------- | ---------------------------------------- |
| `title`       | Yes      | Album name                               |
| `description` | Yes      | Short summary                            |
| `date`        | Yes      | Date value (unquoted), e.g. `2025-06-22` |
| `coverImage`  | Yes      | Thumbnail path                           |
| `images`      | Yes      | List of image paths                      |
| `location`    | No       | Where the event took place               |
