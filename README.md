# MPS Lab Website

Jekyll site for the Making Programming Simple Lab (ASU) using `jekyll-scholar` to render publications and collections for research topics.

## Quick start

```bash
# install deps (adjust RUBY_VER if needed)
RUBY_VER=$(ruby -e 'print RbConfig::CONFIG["ruby_version"]')
export PATH="$HOME/.local/share/gem/ruby/$RUBY_VER/bin:$PATH"
bundle install

# build once
bundle exec jekyll build

# serve with live reload
bundle exec jekyll serve --livereload --host 0.0.0.0
```

## Run with Docker Compose

```bash
docker-compose up
# site available at http://localhost:4000
```

## Editing site data

- **Members**: `_data/members.yml`  
  - Add/update entries with `name`, `role`, `degree`, `bio`, and `focus` (comma-separated tags).
- **Research topics**: `_research/*.md`  
  - Each file uses front matter (`title`, `summary`) and Markdown content.
- **Publications**: `_bibliography/references.bib`  
  - Add BibTeX entries; `url` can point to files under `publications/papers/`.
- **Navigation / pages**: primary pages are `index.html`, `members.md`, `research.md`, `publications.md`, and layouts under `_layouts/`.

After edits, rebuild or refresh the running `jekyll serve`/`docker-compose up` process to see changes.
