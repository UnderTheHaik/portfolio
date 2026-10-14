# Under the Haik — web and visual design

Production source checkout for https://underthehaik.com. Astro static site with service pages, a pricing guide and project case studies. Current launch offers are 50% off eligible website, identity and social setup packages; care and provider charges use standard rates.

## Verification

Run `pnpm check`, `pnpm build`, then `pnpm test`. Alternatively use `node node_modules/astro/bin/astro.mjs check`, `build`, and `node scripts/check-build.mjs`. Node 22.12+ is required.

## Publishing

Source repository: UnderTheHaik/portfolio, main branch. GitHub Pages publishes the gh-pages branch from the sibling `../portfolio-pages` checkout. Build with `SITE_URL=https://underthehaik.com` and `BASE_PATH=/`. Preserve CNAME and .nojekyll in the production build. Source pushes alone do not deploy. The SEO release was published directly from `dist` using a temporary Git index, `write-tree`, `commit-tree` with the remote gh-pages parent, and a fast-forward push. The sibling portfolio-pages working checkout was not synced and is stale: do not publish its files without refreshing it.

## Site content

- `src/pages/index.astro`: current pricing and homepage.
- `src/lib/services.ts`: service scope and pricing; keep consistent with the homepage and cost guide.
- `src/pages/services/[slug].astro`: focused service pages.
- `src/pages/guides/website-cost-dubai.astro`: package comparison and scope guide.
- `src/lib/portfolio.ts`: project records and verified contact details.
- `src/pages/work/[slug].astro`: case studies with actual design context and screenshot galleries.
- `src/layouts/Portfolio.astro`: navigation, metadata, structured data and service links.

Personal essays, translations, journal routes, article assets and RSS were removed at the owner's request. Removed URLs should return 404; do not redirect unrelated essays to the homepage. Fictional local demos use noindex, follow; genuine client Serena pages retain their indexing policy. External showcase repositories have separate publication settings.

No search rankings, testimonials, customer results or contact details should be invented. Instagram is connected; email/WhatsApp stay empty until verified. Search Console and field performance metrics require account access or a successful external measurement.

## Thiziri section

The app landing page and independent browser adhkar reader live in public/thiziri/ and are copied by Astro to /thiziri/. Preserve this folder in future builds. Android app files, signing credentials and test APKs are not part of this website. The download button points to the release information until an approved public Android URL is available. Offline caching is scoped to /thiziri/.


## Thiziri search pages

Run `node scripts/build-thiziri-seo.mjs` before the Astro build (included in the package build command). The generator uses existing `public/thiziri/read/data/*.json` without altering texts, translations or source notes. It generates 23 collections in each of en/fr/ar, localized landing pages, source guides and a 78-URL sitemap. `node scripts/check-thiziri-seo.mjs` validates all pages and reading instances against the data. Maintain the templates in `scripts/thiziri-*-template.html` for structural changes to the original landing/reader/privacy shells; generated pages are reproducible. The service worker version and reader CSP hashes are regenerated with normalized line endings.

The root sitemap index and robots file reference the Thiziri sitemap. The Android release remains coming soon until a real public download is available. Search Console submission and field performance checks require external access.

Dreamy Home translations: edit public/demos/dreamy-home/translations.json and run node scripts/build-dreamy-languages.mjs. The generated English and Arabic scripts preserve product IDs, gallery files and Instagram links. language.js provides FR / EN / العربية navigation and remembers the selection.
