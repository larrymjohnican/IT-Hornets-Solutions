# Hornets IT Solutions LLC — Website

Professional business website for Hornets IT Solutions LLC, a North Carolina-based LLC offering internet cable installation and TV mounting services.

## Stack

- **React + Vite** — fast dev server and optimized builds
- **Tailwind CSS v3** — utility-first styling with custom design tokens
- **React Router** — client-side routing
- **lucide-react** — icon library

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/services` | Services |
| `/about` | About |
| `/contact` | Contact / Quote Request |

## Adding the Logo

Drop `hornets-logo.png` into the `public/` folder. The navbar will automatically display it — no code changes needed. Until then, a text fallback is shown.

## Deployment (Netlify)

A `public/_redirects` file is included for client-side routing support. Deploy the `dist/` folder after running `npm run build`.
