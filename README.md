# QuiroFlow Help Center

The public help center for QuiroFlow (`learn.quiroflow.com`) -- a static Nuxt Content site. No database, no login, no server functions: every article is a Markdown file, built into plain HTML at deploy time.

## Adding or editing an article

Articles live under `content/articles/<collection>/<article-slug>.md`. Each one needs frontmatter:

```md
---
title: Article title
description: One sentence shown in search results and article lists.
collection: getting-started
order: 1
---

Article body in Markdown.
```

`collection` must match one of the slugs in `app/utils/collections.ts` -- that file is also where you'd add a brand new collection (give it a slug, title, description, and an emoji icon).

`order` controls where the article sits within its collection's sidebar and listing page (lower numbers first).

A collection with no articles yet still shows up in nav, with an "Articles for this collection are coming soon" message on its page -- so it's fine to add a collection before writing anything for it.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

## Deploying

This is a static site -- `npm run generate` produces plain HTML/CSS/JS in `.output/public`, which is what `netlify.toml` is already configured to build and publish. To deploy:

1. Push this repo to GitHub.
2. In Netlify, "Add a new site" -> "Import an existing project" -> pick this repo. Build settings are already in `netlify.toml`, so you shouldn't need to change anything.
3. Once it's deployed on its `*.netlify.app` URL, go to Site configuration -> Domain management -> Add a domain -> enter `learn.quiroflow.com`.
4. Netlify will show you a CNAME target (something like `<your-site-name>.netlify.app`). Add that as a CNAME record for `learn` in wherever `quiroflow.com`'s DNS is managed. It can take a few minutes to an hour to propagate.
5. Netlify auto-provisions HTTPS for the domain once the CNAME resolves -- no separate certificate step needed.

## Design

Branding (colors, fonts, logo) is copied from the main QuiroFlow app (`app/assets/css/main.css`, `public/logo/`) so this looks like part of the same product. It's intentionally light-mode only and framework-free (plain CSS, no Tailwind) since this is a small, mostly-static site -- update `main.css` directly rather than pulling in a design system.
