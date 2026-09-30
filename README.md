# MultiSarv Website

Source for [multisarv.com](https://multisarv.com) — a React + Vite single-page site hosted on Firebase Hosting, with Firebase Auth and Firestore for the contact form and admin dashboard.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # type-check
npm run build    # vite build + prerender (per-route HTML, sitemap.xml, 404.html)
npm run preview  # serve the built site
```

## Deploy

Pushing to `main` runs `.github/workflows/firebase-deploy.yml`, which builds the site and deploys it to Firebase Hosting.

Firestore rules (`firestore.rules`) are **not** deployed by the workflow. The database lives in the `gen-lang-client-0137412133` Firebase project, so deploy rule changes with:

```bash
firebase deploy --only firestore:rules --project gen-lang-client-0137412133
```

## Where things live

- `src/data/master-data.ts` — products, services, privacy policies, case studies
- `src/seo.ts` — page titles and descriptions (used by pages and by `scripts/prerender.mjs`)
- `public/` — favicon, social share image, `robots.txt`
- `/admin` — contact inquiries and leads (Google sign-in; admin access is enforced by Firestore rules)
