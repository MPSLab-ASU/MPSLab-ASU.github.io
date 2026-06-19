# Software

The tools/software listing on the **Software** page (`/software`).

- Data location: `src/data/software.json` (a JSON array)
- Logos: `public/images/software/`
- Rendered by: `src/pages/software.astro` via
  `src/components/react/SoftwareCard.tsx`

> Software is its **own page**, not a tab on the Publications page.

---

## Add a software entry

1. Add the logo image under `public/images/software/`.
2. Add a new object to the array in `src/data/software.json`:

   ```json
   {
     "name": "DSP-MLIR",
     "url": "https://github.com/MPSLab-ASU/DSP_MLIR",
     "description": "Digital Signal Processing Compiler in MLIR",
     "researchGroup": "MLIR",
     "image": "/images/software/dsp-mlir.png"
   }
   ```

3. Validate: `npm run build`.

> A GitHub `url` is auto-detected and shown with a GitHub icon.

---

## Update a software entry

1. Find the object by `name` in `src/data/software.json`.
2. Edit its fields. If you change the logo, update `image` and replace the file
   in `public/images/software/`.
3. Validate: `npm run build`.

---

## Remove a software entry

1. Delete the object from the array in `src/data/software.json`.
2. Optionally delete the unused logo from `public/images/software/`.
3. Make sure the surrounding JSON stays valid (no trailing comma).
4. Validate: `npm run build`.

---

## Field reference

| Key             | Notes                                         |
| --------------- | --------------------------------------------- |
| `name`          | Tool name                                     |
| `url`           | Project link (GitHub links get a GitHub icon) |
| `description`   | Short description                             |
| `researchGroup` | Shown as a badge (see values below)           |
| `image`         | Logo path under `public/images/software/`     |

### `researchGroup` values in use

```
MLIR, Machine Learning Accelerators, Accelerated Computing,
Software Managed Manycores, Cyber-Physical & IoT Systems
```
