# argonarnav.github.io

Personal site of Arnav Anand, AI Engineer (computer vision). Live at https://argonarnav.github.io/.

Hand-built static site: HTML, CSS, and a small vanilla JS file. No build step and no dependencies. GitHub Pages serves the repository root.

## Structure

```
index.html              all page content (one page, numbered sections)
404.html                not-found page
assets/css/site.css     design tokens + layout (see DESIGN.md)
assets/js/site.js       theme toggle, mobile menu, stage filter, detection-box motion
assets/fonts/           self-hosted WOFF2 fonts + their OFL licenses
assets/img/             favicon, Apple touch icon, Open Graph image
Arnav_Anand_Resume.pdf  resume download
service-worker.js       retires the service worker of the old React site
DESIGN.md               design system and decisions
```

## Edit content

All text lives in `index.html`. Each section starts with a comment, for example `<!-- ============ 02 EXPERIENCE ============ -->`.

- **New role:** copy one `<li class="job">` block in Experience. Put it first (newest first).
- **Pipeline filter:** each bullet has `data-stages="..."` with any of `data labels train calibrate benchmark deploy monitor`. The chips in `<div class="tags">` use the same keys in `data-stage`.
- **New project:** copy one `<article class="proj sm">` block in Projects.
- **Resume:** replace `Arnav_Anand_Resume.pdf` (keep the file name so links keep working).
- **Headshot:** put `headshot.jpg` (4:5 portrait) in `assets/img/`, then replace the `<div class="monogram">…</div>` in the hero with `<img src="/assets/img/headshot.jpg" alt="Arnav Anand" width="960" height="1200">` and change the label text to `person · arnav`.
- Update the "Updated" month in the footer and `lastmod` in `sitemap.xml`.

## Preview locally

```
python3 -m http.server 8000
```

Open http://localhost:8000.

## Deploy

```
git add -A
git commit -m "Update site"
git push origin master master:main
```

GitHub Pages publishes in about a minute.
