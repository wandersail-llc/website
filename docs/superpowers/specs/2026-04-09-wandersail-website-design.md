# Wandersail Website Design Spec

## Context

Wandersail LLC (wandersail.llc) is a software company building across developer tools, B2B SaaS, consumer apps, and AI/ML. They need a public-facing website with blog, project showcase, team page, and contact form. No existing codebase — greenfield project.

## Tech Stack

- **Static site generator:** Hugo
- **Hosting:** GitHub Pages (or equivalent static host) with custom domain wandersail.llc
- **CI/CD:** GitHub Actions — build Hugo site on push, deploy to GitHub Pages
- **Contact form backend:** Formspree (free tier)
- **Newsletter:** Buttondown or Mailchimp embed
- **Font:** Inter (via Google Fonts or self-hosted)

## Design System

### Theme

- **Default:** Light (white background)
- **Dark mode:** Automatic via `@media (prefers-color-scheme: dark)` — no toggle, no JS
- All colors defined as CSS custom properties on `:root`, overridden in `@media (prefers-color-scheme: dark)`

### Color Palette

**Light (default):**
- Background: `#ffffff`
- Surface (cards): `#fafafa`
- Border: `#e5e5e5`
- Text primary: `#111111`
- Text secondary: `#666666`
- Text muted: `#999999`
- Accent: `#4f46e5` (indigo)
- Active badge bg/text: `#dcfce7` / `#16a34a`
- Coming Soon badge bg/text: `#fef3c7` / `#d97706`

**Dark:**
- Background: `#0f0f13`
- Surface: `#18181f`
- Border: `#2a2a2f`
- Text primary: `#f0f0f0`
- Text secondary: `#888888`
- Text muted: `#555555`
- Accent: `#6366f1` (slightly brighter indigo)
- Active badge bg/text: `#22c55e18` / `#4ade80`
- Coming Soon badge bg/text: `#f59e0b18` / `#fbbf24`

### Typography

- Font family: Inter, system-ui, sans-serif
- **Fluid typography** using `clamp()` — scales smoothly across breakpoints rather than fixed pixel sizes
  - Hero tagline: `clamp(2rem, 5vw, 3.5rem)` — large and bold, statement-driven (inspired by Block.xyz)
  - Section headings: `clamp(1.25rem, 3vw, 1.75rem)`
  - Body: `clamp(0.9rem, 1.5vw, 1.05rem)`
  - Section labels: uppercase, tracked, small (11-12px)
- Max content width: ~1100px
- Breakpoints: 480px, 768px, 1024px, 1440px

### Spacing & Layout Philosophy (inspired by Block.xyz and Meta)

- **Whitespace as dividers** — sections separated by generous vertical padding, not border lines
- Spacing scales proportionally on larger screens (use `clamp()` or viewport units for padding)
- Sections flow vertically with clear hierarchy — each section is a distinct "block" with its own statement-style header
- Section headers use the pattern: short bold label + optional subtitle (e.g., "Our Projects" / "What we're building and what's on the horizon.")

### Tone

- Understated, confident
- Tagline: "Software, thoughtfully built."
- Design references: Block.xyz (bold hero, fluid type, generous spacing), Meta (clean vertical flow, whitespace-driven sections, statement headers)

## Site Structure

```
wandersail.llc/
├── /                  → Home
├── /about/            → About Wandersail
├── /projects/         → Project cards grid
├── /blog/             → Blog listing
│   └── /blog/:slug/   → Individual blog post
├── /team/             → Team members
└── /contact/          → Contact form
```

## Navigation

- Fixed top navbar: logo (wordmark "WANDERSAIL") left, page links right
- Links: Home, Projects, Blog, About, Team, Contact
- Active page indicated by underline with accent color
- Mobile: collapses to hamburger menu
- Footer on every page: logo, newsletter signup, social links (GitHub, Twitter, LinkedIn), copyright

## Pages

### Home

- **Hero:** Large, bold tagline "Software, thoughtfully built." using fluid type (`clamp(2rem, 5vw, 3.5rem)`) — centered, statement-driven like Block.xyz. Subtitle below in muted text. CTA button "View Our Projects →"
- **Featured Projects:** Section header "Our Projects" in statement style. 3-column card grid showing a subset (pulled from data/projects.yaml where `featured: true`). Separated from hero by generous whitespace, no border.
- **Latest Blog Posts:** Section header "From the Blog". 2-3 recent posts as a clean list (title, date, category tag). Whitespace divider above, not a line.
- **Newsletter CTA:** "Stay in the loop" with email input and subscribe button. Clean, centered, breathing room above and below.

### Projects (`/projects/`)

- **Page header:** "Projects" title + subtitle "What we're building and what's on the horizon."
- **No filter tabs** — all projects shown together
- **2-column card grid** (1 column on mobile)
- Each card contains:
  - Project name (bold)
  - Status badge: Active (green) or Coming Soon (amber)
  - Category tag (e.g., "AI/ML", "Developer Tools", "B2B SaaS", "Consumer")
  - Short description (1-2 sentences)
  - Link: "View project →" (external URL for now, detail page later)
- Coming Soon cards rendered at 70% opacity
- Placeholder card with dashed border and "+" for "more on the way"
- **Data source:** `data/projects.yaml`

```yaml
# Example data/projects.yaml entry
- name: Surchin
  description: "The context engineering platform for AI native teams"
  category: "AI/ML"
  status: active    # active | coming_soon
  featured: true
  url: "https://getsurch.in"
```

### Blog

**Listing (`/blog/`):**
- Vertical list: title, date, category tag, 1-2 line excerpt
- Paginated at 10 posts per page
- No category filters

**Post (`/blog/:slug/`):**
- Centered single-column layout, max-width ~700px
- Header: title, date, author, category tag
- Body: Markdown-rendered content
- Footer: previous/next post links
- Posts are Markdown files in `content/blog/` with frontmatter:

```yaml
---
title: "Building Our First AI Agent"
date: 2026-04-02
author: "Matt McKenna"
category: "Engineering"
tags: ["ai", "agents"]
draft: false
---
```

### About (`/about/`)

- Text-focused layout
- Company story: who Wandersail is, what they believe in
- Optional pull-quote or mission statement
- Minimal — no timeline or milestones at launch

### Team (`/team/`)

- Grid of team member cards (3 columns desktop, 1 mobile)
- Each card: photo (or placeholder avatar), name, role, optional 1-line bio
- Optional social links per person (GitHub, LinkedIn, Twitter)
- **Data source:** `data/team.yaml`

```yaml
# Example data/team.yaml entry
- name: "Matt McKenna"
  role: "Founder"
  bio: "Building tools for builders."
  photo: "/images/team/matt.jpg"  # optional, falls back to initials avatar
  links:
    github: "https://github.com/mmckenna"
    linkedin: "https://linkedin.com/in/mmckenna"
```

### Contact (`/contact/`)

- Simple form: Name, Email, Message, Submit button
- Backend: Formspree (free tier, no server needed)
- Client-side success/error states after submission
- Company email optionally displayed alongside the form

## Newsletter (site-wide)

- Email input + "Subscribe" button in the footer on every page
- Also appears as a standalone CTA section on the homepage
- Integration: Buttondown or Mailchimp (form action post)

## Hugo Project Structure

```
website/
├── config.toml              # Hugo config (site title, base URL, menus, params)
├── content/
│   ├── _index.md            # Home page
│   ├── about.md             # About page
│   ├── contact.md           # Contact page
│   ├── projects.md          # Projects listing page
│   ├── team.md              # Team page
│   └── blog/
│       ├── _index.md        # Blog listing config
│       └── *.md             # Individual posts
├── data/
│   ├── projects.yaml        # Project definitions
│   └── team.yaml            # Team member definitions
├── layouts/
│   ├── _default/
│   │   ├── baseof.html      # Base template (nav, footer, theme CSS)
│   │   ├── single.html      # Default single page
│   │   └── list.html        # Default list page
│   ├── blog/
│   │   ├── single.html      # Blog post template
│   │   └── list.html        # Blog listing template
│   ├── partials/
│   │   ├── header.html      # Nav bar
│   │   ├── footer.html      # Footer with newsletter
│   │   ├── project-card.html
│   │   ├── team-card.html
│   │   ├── blog-entry.html
│   │   └── contact-form.html
│   └── index.html           # Home page template
├── static/
│   ├── images/
│   │   └── team/            # Team photos
│   └── favicon.ico
├── assets/
│   └── css/
│       └── main.css         # All styles (with CSS custom properties for theming)
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions: build + deploy to GitHub Pages
└── .gitignore
```

## Deployment

- GitHub repo hosts the Hugo source
- GitHub Actions workflow triggers on push to `main`:
  1. Checkout repo
  2. Install Hugo
  3. Build site (`hugo --minify`)
  4. Deploy to GitHub Pages (gh-pages branch or GitHub Actions deploy)
- Custom domain wandersail.llc configured via CNAME file in `static/` and GitHub Pages settings

## Verification

1. Run `hugo server` locally — confirm all pages render, navigation works, light/dark themes respond to system preference
2. Add a test blog post in `content/blog/` — confirm it appears in listing and renders correctly
3. Add a project entry to `data/projects.yaml` — confirm it appears on projects page with correct status badge
4. Submit the contact form — confirm Formspree receives the submission
5. Test responsive layout on mobile viewport sizes
6. Push to GitHub and confirm GitHub Actions builds and deploys successfully
7. Verify wandersail.llc loads the deployed site
