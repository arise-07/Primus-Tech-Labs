# Primus Tech Labs

Official website for **Primus Tech Labs** — a solo, hand-coded web development studio building business websites, AI chatbot integrations, and more.

**Live site:** [primustechlabs.in](https://www.primustechlabs.in)

---

## Overview

This is a single-page marketing site built with plain HTML, CSS, and JavaScript — no framework, no build step. It's hand-coded end to end, in keeping with the studio's own positioning.

## Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript** — no frameworks, no bundler
- **Font Awesome** — icons (via CDN)
- **Google Fonts** — Orbitron (headings) + Inter (body)
- **Vercel** — hosting & deployment

## Project Structure

```
.
├── index.html          # Main site (all sections)
├── privacy.html         # Privacy Policy
├── terms.html            # Terms & Conditions
├── refund.html          # Refund & Cancellation Policy
├── 404.html              # Not-found page
├── sitemap.xml           # Search engine sitemap
├── robots.txt             # Crawler rules
├── style.css              # All site styles
├── script.js               # All site interactivity
└── images/                  # Logos, project screenshots, etc.
```

## Sections (`index.html`)

| Section | What it is |
|---|---|
| Hero | Landing intro |
| About | Founder / studio intro |
| Services | Accordion of 6 services (left) paired with a live visual preview (right) that swaps per service |
| Why Choose Us | Trust/value props |
| Our Process | Step-by-step workflow |
| Technologies We Use | Skill-bar breakdown across Design, Frontend, Backend, Automation, and Ship categories |
| Featured Projects | "Spotlight" viewer — one project shown large at a time inside a browser-frame mockup, with a thumbnail strip to switch between them, plus a "Your project could be here" CTA slot |
| Pricing | Starter / Business / Premium tiers |
| FAQ | Accordion of common questions |
| Testimonials | Client feedback |
| CTA | Closing call-to-action |
| Contact | Direct contact buttons (Call/WhatsApp/Email/Instagram) + a form that opens a pre-filled WhatsApp chat on submit (no backend) |

## Contact Form

The contact form doesn't hit a server — on submit, it builds a formatted message from the form fields and opens WhatsApp with everything pre-filled, ready for the visitor to send.

## Running Locally

No build step needed — just open `index.html` in a browser, or serve the folder locally:

```bash
npx serve .
```

## Deployment

Connected to Vercel via GitHub. Pushing to the main branch triggers an automatic redeploy.

## Legal Pages

- [`privacy.html`](./privacy.html) — Privacy Policy
- [`terms.html`](./terms.html) — Terms & Conditions
- [`refund.html`](./refund.html) — Refund & Cancellation Policy

## Contact

- **Email:** info@primustechlabs.in
- **WhatsApp:** [+91 76394 16446](https://wa.me/917639416446)
- **Instagram:** [@primustechlabs](https://instagram.com/primustechlabs)

---

&copy; 2026 Primus Tech Labs. All rights reserved.