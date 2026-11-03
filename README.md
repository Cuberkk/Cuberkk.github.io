# Kaiwen Zuo — Academic Website

Personal academic website built with [PRISM](https://github.com/xyjoey/PRISM), Next.js, TypeScript, and Tailwind CSS. Includes a profile homepage, searchable publications, research projects, education and experience, and a PDF CV.

## Local development

Requires **Node.js 22+** and npm. The repository pins Node.js 22 in `.nvmrc`.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). To build and preview the static website:

```sh
npm run build
npm start
```

`npm run build` exports the website to `out/`; `npm start` serves it at [127.0.0.1:3000](http://127.0.0.1:3000). Run `npm run typecheck` to check TypeScript independently.

## Where to edit

| File or directory | Purpose |
| --- | --- |
| `content/config.toml` | Site identity, contact links, navigation, and feature settings |
| `content/about.toml` | Homepage sections and research interests |
| `content/bio.md`, `content/skills.md` | Biography and technical skills |
| `content/publications.toml` | Publications page heading and description |
| `content/publications.bib` | Publication metadata, abstracts, PDF links, and cover images |
| `content/projects.toml` | Project descriptions, thumbnails, dates, and detail links |
| `content/experience.toml` | Education, service, leadership, teaching, awards, and institution logos |
| `content/cv.toml`, `content/cv.md` | CV page text and download link |
| `content/legacy-details.json` | Active publication, project, and service detail pages at their existing URLs |
| `public/files/` | Papers, downloadable BibTeX, research images, videos, and CV |
| `public/images/` | Profile portrait |
| `public/logos/` | Institution logos; provenance is recorded in `docs/logo-sources.md` |
| `src/app/`, `src/components/` | Page routes, layouts, and UI components |
| `src/app/globals.css` | Theme colors, typography, and shared styles |

### Common updates

- **Education:** edit the Education entries in `content/experience.toml`. The homepage reads the same records for Currently and Previous Education; a date ending in `Present` identifies the current entry.
- **Publication covers:** set `preview` in `content/publications.bib`, for example `preview = {/files/KZ2026/Exp_04_chip.png}`.
- **Project thumbnails:** set `image` in `content/projects.toml`. The Encounter Haptics video poster is also set in its detail-page record in `content/legacy-details.json`.
- **CV:** replace `public/files/Kaiwen_Zuo_cv.pdf`; the CV page embeds this file and provides a download link.
- **Static resources:** keep the maintained copy under `public/`. A file at `public/files/example.pdf` is linked as `/files/example.pdf`. There is no separate root-level `files/` or `images/` directory.
- **Citation downloads:** `content/publications.bib` controls the website's publication list. The `.bib` files under `public/files/` are separate downloadable citations; update those when citation details change.

## GitHub Pages

Select **GitHub Actions** in repository **Settings → Pages → Build and deployment → Source**.

The workflow `.github/workflows/pages-deploy.yml` installs dependencies with `npm ci`, builds the static site, and uploads `out/`. Pushes to `main`, `master`, and `redesign/prism` are built; only `main` and `master` deploy. Pull requests targeting those two branches are also built.

The configuration targets the `Cuberkk.github.io` root domain, with trailing-slash URLs and unoptimized static images. `scripts/export-compat.mjs` generates `.nojekyll` and redirects for previous About, Projects, Teaching, and CV addresses. The detail-page routes preserve existing paper and project links.

## Optional container preview

```sh
docker compose up --build
```

Open [localhost:3000](http://localhost:3000). The VS Code Dev Container also uses Node.js 22.

## Generated and local files

`node_modules/`, `.next/`, `out/`, `next-env.d.ts`, and `*.tsbuildinfo` are generated and ignored by Git. The ignored `local/` directory is for personal files that should stay outside deployment.

PRISM attribution and its MIT license are in `PRISM-LICENSE`. The original Academic Pages license notice is retained in `LICENSE`.
