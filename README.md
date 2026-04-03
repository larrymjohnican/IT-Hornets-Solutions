# IT Hornets Solutions — Website

Professional business website for **IT Hornets Solutions**, a Charlotte, NC-based IT services company offering tech support, network setup, device troubleshooting, and more for homes and small businesses.

🌐 **Live site:** https://hornets-it-solutions.vercel.app

---

## Stack

- **React + Vite** — fast dev server and optimized builds
- **Tailwind CSS v3** — utility-first styling with custom design tokens
- **React Router** — client-side routing
- **lucide-react** — icon library
- **Formspree** — contact form submissions (no backend required)

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/services` | Services |
| `/about` | About |
| `/contact` | Contact / Quote Request |

---

## Contact Form

The contact form submits via [Formspree](https://formspree.io). The form ID is configured in `src/pages/Contact.jsx`:

The form ID is set directly in `src/pages/Contact.jsx`. Keep it out of public READMEs — lock it down via Formspree's domain allowlist instead.

---

## Logo

Drop `hornets-logo.png` into the `public/` folder. The navbar picks it up automatically — no code changes needed. A text fallback displays until it's added.

---

## Deployment

Hosted on **Vercel**. A `vercel.json` file handles client-side routing so direct links (e.g. `/contact`) don't 404.

To deploy manually:

```bash
npm run build
npx vercel --prod
```

---

## Project Structure

```
src/
├── components/       # Navbar, Footer, Hero, ServiceCard, etc.
├── context/          # ThemeContext (dark/light mode)
├── pages/            # Home, Services, About, Contact
├── index.css         # Global styles
└── main.jsx          # App entry point
public/
└── hornets-logo.png  # Logo (add your own)
vercel.json           # Vercel SPA routing config
```
