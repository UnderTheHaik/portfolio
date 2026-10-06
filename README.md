# Under the Haik — Freelance portfolio

A Dubai-based web design and development portfolio built with Astro, TypeScript and CSS. The homepage features six selected projects, website and visual identity launch packages, a technical-background section, an eight-step delivery process and Instagram contact. The main offer is the 1,000 AED business launch bundle. Each project has its own case study at `/work/<slug>/`.

Concepts, family projects and personal work are labelled explicitly. The copy makes no seniority, paid-client, testimonial, revenue or years-of-experience claims. Public WooCommerce showcases are clearly described as static previews.

## Run and verify

Requires Node.js 22.12+ and pnpm. Run `pnpm install`, then `pnpm dev`. Use `pnpm check`, `pnpm build` and `pnpm test` before publishing. `pnpm preview` serves the production build. If package-manager commands are unavailable, the installed dependencies can be used with `node node_modules/astro/bin/astro.mjs dev`, `check`, `build` or `preview`, and `node scripts/check-build.mjs`.

The deployable output is `dist/`. Set `SITE_URL` to the final origin and `BASE_PATH` to a hosting subdirectory (or `/`) before building. These control canonical URLs, navigation and the sitemap.

## GitHub publication

- Source: https://github.com/UnderTheHaik/portfolio (main branch).
- Website: https://underthehaik.github.io/portfolio/.
- GitHub Pages publishes the generated `gh-pages` branch, with a `.nojekyll` file.
- Production build settings: `SITE_URL=https://underthehaik.github.io`, `BASE_PATH=/portfolio`.

The portfolio repository uses direct static publication because the current GitHub login cannot upload Actions workflows. Pushing source to main does not redeploy the site automatically. For future updates, build with the production settings, run the build checks with `BASE_PATH=/portfolio`, then commit the generated output to the repository's `gh-pages` branch. Keep the source on main and private runtime files out of both branches.

On this machine, `work/portfolio-publish/` is the source checkout and `work/portfolio-pages/` is the generated-page checkout. They are excluded from the original workspace's Git tracking. The original workspace remote still refers to the old journal repository; use the portfolio checkout when pushing portfolio changes. Before building again, output to a separate folder or `dist/`, then sync the generated files into the Pages checkout while preserving its `.git` directory.

## Add a future portfolio project

1. Capture an actual website screenshot and save it to `src/assets/portfolio/<slug>.jpg`. Avoid sensitive information, keep images consistent, and use a meaningful filename. Astro generates responsive WebP variants, intrinsic dimensions and `srcset` automatically.
2. Import the screenshot in `src/lib/portfolio.ts` and add a record to `projects`. Supply `slug`, `name`, `type`, `category`, `image`, `color`, `summary`, `stack` and `sections`. Colours available: `sage`, `rose`, `sand`, `blue`, `cream`.
3. Add the actual palette, font pairing and branding direction to src/lib/identities.ts. Project pages focus on the visual identity and logo treatments. Label concepts clearly and describe verified work without invented results.
4. The homepage card and `/work/<slug>/` page are generated automatically, as is the next-project link. The first record is featured. The current visit-site URL uses `https://underthehaik.github.io/<slug>/`; if a new project is hosted elsewhere, add a `liveUrl` field to all records and update the link in `src/pages/work/[slug].astro` to use it.
5. Capture three pages at laptop and phone viewport sizes. Save screenshots in `src/assets/portfolio/captures/` as `<slug>--<page>--laptop.jpg` and `<slug>--<page>--phone.jpg`. Use `home` for the first page key. Add the page keys and readable labels to `src/lib/project-captures.ts`; the homepage gets a paired device preview and the case study gets a three-page gallery automatically. Dimension labels come from the actual imported image metadata, since delivered screenshots can differ from the requested viewport size. Single-page sites can use sections instead of separate pages. Let visible images finish loading before capture and retain the website's actual responsive layout.
6. Add the slug to the case-study list in `scripts/check-build.mjs`, then run the checks above. Review the homepage and case study on a narrow phone viewport and desktop, including keyboard navigation, image loading, long titles and links. Verify full-size screenshot links.

## Connect contact details later

Edit the shared `contact` object in `src/lib/portfolio.ts`. Leave empty values until verified. `whatsapp` accepts the international number including country code, such as `+971...`; the component strips formatting and creates an encoded click-to-chat URL. Set `email` to the owner's verified address to enable the email link. No contact form, messages, analytics or tracking are connected. The empty state explicitly says enquiries are not connected, with no dead links or fake submit action.

## Main files and design

- `src/pages/index.astro`: homepage sections and service/process copy.
- `src/lib/portfolio.ts`: project content, screenshot imports and contact settings.
- `src/pages/work/[slug].astro`: reusable case-study template.
- `src/layouts/Portfolio.astro`: portfolio navigation, page metadata, social previews and structured data.
- `src/styles/portfolio.css`: isolated styling, colours, responsive layouts, focus and reduced-motion support.
- `src/components/ProjectCard.astro` and `PortfolioContact.astro`: shared cards and contact presentation.
- `src/components/ProjectGallery.astro` and `src/lib/project-captures.ts`: labelled laptop/phone screenshot pairs for three pages or sections per project. Screenshots are real published-site captures; displayed device frames are CSS, not simulated responsive designs.

The portfolio uses local system fonts and static HTML with no client JavaScript. Images load lazily on the homepage; the case-study screenshot loads eagerly. Navigation stays visible on small screens without a JavaScript menu. Skip links, clear headings, visible keyboard focus and reduced-motion support are included. Canonical and Open Graph metadata, RSS, robots and a generated sitemap are available. Lighthouse scores have not been asserted; audit the final host before launch.

The existing bilingual journal is preserved at `/journal/` (English), `/fr/` (French) and its original essay/category routes. Its layout and content remain separate from the portfolio.

---

# Journal documentation

**When culture meets faith.**

Under the Haik is a personal writing space dedicated to reflections on faith, heritage, society, technology, motherhood, identity, and everyday life.

The name is inspired by the **haïk**, the traditional North African garment, and by the idea of looking at the world from within one's own culture, history, experiences, and faith.

The website brings together essays and personal writings in both English and French.

## About the website

Under the Haik is an independent personal blog.

The website is available in English and French and is organized around several themes:

- Faith
- Heritage
- Society
- Technology
- Motherhood
- Personal essays

Articles may include photographs, historical material, archival images, illustrations, and other visual elements related to the subject being discussed.

**Some illustrative images used on the website are AI-generated.** They are used for visual and editorial purposes and should not be interpreted as historical or documentary material unless explicitly identified as such.

Historical photographs, maps, documents, quotations, and other source material are credited whenever applicable.

## Languages

Articles may be published in **English or French**. Some writings may have versions in both languages, while others remain in the language in which they were originally written.

## Website

Under the Haik is hosted through GitHub Pages.

## Published portfolio websites

Each project has its own public website and repository under the UnderTheHaik GitHub account:

- [Under the Haik](https://underthehaik.github.io/underthehaik/) — [source](https://github.com/UnderTheHaik/underthehaik)
- [Les mots d’un montagnard](https://underthehaik.github.io/les-mots-dun-montagnard/) — [source](https://github.com/UnderTheHaik/les-mots-dun-montagnard)
- [Sift & Saffron](https://underthehaik.github.io/sift-and-saffron/) — [source](https://github.com/UnderTheHaik/sift-and-saffron)
- [Haya2](https://underthehaik.github.io/haya2/) — [source](https://github.com/UnderTheHaik/haya2)
- [Nisma](https://underthehaik.github.io/nisma/) — [source](https://github.com/UnderTheHaik/nisma)

Haya2 and Nisma are static storefront previews for portfolio sharing. Checkout, accounts and server filtering require their local WordPress/WooCommerce runtimes. Source checkouts and generated gh-pages checkouts are saved under `work/github-showcase/`; private runtime data and credentials were excluded. The original poetry site's private teaching folder remains local.

## Haya2 local shop

The separate abaya boutique uses WordPress and WooCommerce locally. See [shop/README.md](shop/README.md) for setup, admin access, test checkout and shipping details.

© Under the Haik

## Nisma portfolio store

A separate fictional UAE lifestyle e-commerce concept uses WordPress and WooCommerce, with free Pexels photography and a local test checkout. See [nisma-store/README.md](nisma-store/README.md) for setup, the customer journey, configuration, verification and deployment guidance. Local preview: http://127.0.0.1:8090/.
