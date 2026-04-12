# Wandersail Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Wandersail LLC website (wandersail.llc) — an Astro static site with homepage, projects, blog, about, team, contact pages, newsletter signup, and light/dark theme support, deployed to Vercel.

**Architecture:** Astro component-based static site. Tailwind CSS with custom design tokens for automatic light/dark theming via `prefers-color-scheme`. Blog posts as Astro Content Collections (type-safe Markdown). Projects and team data as TypeScript data files. Contact form via Formspree. Deployed to Vercel with auto-deploys on push.

**Tech Stack:** Astro 5, Tailwind CSS 4, TypeScript, Inter font (Fontsource), Formspree (contact form), Vercel (hosting)

**Spec:** `docs/superpowers/specs/2026-04-09-wandersail-website-design.md`

---

## File Structure

```
website/
├── astro.config.mjs              # Astro config
├── tailwind.config.mjs           # Tailwind config with custom theme
├── tsconfig.json                 # TypeScript config
├── package.json
├── public/
│   ├── favicon.ico               # Placeholder favicon
│   └── images/
│       └── team/                 # Team photos
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro      # Base HTML layout (head, nav, footer)
│   ├── components/
│   │   ├── Navbar.astro          # Site navbar
│   │   ├── Footer.astro          # Footer with newsletter
│   │   ├── ProjectCard.astro     # Single project card
│   │   ├── TeamCard.astro        # Single team member card
│   │   ├── BlogEntry.astro       # Blog listing entry
│   │   ├── Hero.astro            # Homepage hero section
│   │   └── ContactForm.astro     # Contact form
│   ├── content/
│   │   ├── config.ts             # Content collection schema
│   │   └── blog/
│   │       └── hello-world.md    # Seed blog post
│   ├── data/
│   │   ├── projects.ts           # Project definitions
│   │   └── team.ts               # Team member definitions
│   ├── pages/
│   │   ├── index.astro           # Home page
│   │   ├── about.astro           # About page
│   │   ├── projects.astro        # Projects page
│   │   ├── team.astro            # Team page
│   │   ├── contact.astro         # Contact page
│   │   └── blog/
│   │       ├── index.astro       # Blog listing
│   │       └── [...slug].astro   # Blog post (dynamic route)
│   └── styles/
│       └── global.css            # Global styles, Tailwind directives, custom additions
└── .gitignore
```

---

### Task 1: Initialize Astro Project with Tailwind

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `.gitignore`
- Create: `public/favicon.ico`

- [ ] **Step 1: Initialize git repo**

```bash
cd /Users/mmckenna/Dev/wandersail/website
git init
```

- [ ] **Step 2: Create Astro project**

```bash
cd /Users/mmckenna/Dev/wandersail/website
npm create astro@latest -- . --template minimal --no-install --typescript strict
```

If prompted to overwrite, select yes. This scaffolds the minimal project.

- [ ] **Step 3: Install dependencies**

```bash
cd /Users/mmckenna/Dev/wandersail/website
npm install astro @astrojs/tailwind @astrojs/sitemap tailwindcss @fontsource/inter
```

- [ ] **Step 4: Configure Astro**

Create/overwrite `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wandersail.llc',
  integrations: [
    tailwind(),
    sitemap(),
  ],
});
```

- [ ] **Step 5: Configure Tailwind with design tokens**

Create `tailwind.config.mjs`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          bg: 'var(--color-accent-bg)',
        },
        badge: {
          'active-bg': 'var(--color-badge-active-bg)',
          'active-text': 'var(--color-badge-active-text)',
          'soon-bg': 'var(--color-badge-soon-bg)',
          'soon-text': 'var(--color-badge-soon-text)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        content: '1100px',
        prose: '700px',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 6: Create global CSS with custom properties**

Create `src/styles/global.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-bg: #ffffff;
    --color-surface: #fafafa;
    --color-border: #e5e5e5;
    --color-text-primary: #111111;
    --color-text-secondary: #666666;
    --color-text-muted: #999999;
    --color-accent: #4f46e5;
    --color-accent-hover: #4338ca;
    --color-accent-bg: #eef2ff;
    --color-badge-active-bg: #dcfce7;
    --color-badge-active-text: #16a34a;
    --color-badge-soon-bg: #fef3c7;
    --color-badge-soon-text: #d97706;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-bg: #0f0f13;
      --color-surface: #18181f;
      --color-border: #2a2a2f;
      --color-text-primary: #f0f0f0;
      --color-text-secondary: #888888;
      --color-text-muted: #555555;
      --color-accent: #6366f1;
      --color-accent-hover: #818cf8;
      --color-accent-bg: rgba(99, 102, 241, 0.1);
      --color-badge-active-bg: rgba(34, 197, 94, 0.1);
      --color-badge-active-text: #4ade80;
      --color-badge-soon-bg: rgba(245, 158, 11, 0.1);
      --color-badge-soon-text: #fbbf24;
    }
  }

  html {
    background-color: var(--color-bg);
    color: var(--color-text-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
}
```

- [ ] **Step 7: Update tsconfig.json**

Create/overwrite `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 8: Create .gitignore**

Create `.gitignore`:

```
node_modules/
dist/
.astro/
.DS_Store
.superpowers/
```

- [ ] **Step 9: Create placeholder assets**

```bash
touch /Users/mmckenna/Dev/wandersail/website/public/favicon.ico
mkdir -p /Users/mmckenna/Dev/wandersail/website/public/images/team
```

- [ ] **Step 10: Verify Astro builds**

```bash
cd /Users/mmckenna/Dev/wandersail/website && npx astro check 2>&1 | tail -5
```

Expected: No errors (warnings about missing pages are fine at this stage).

- [ ] **Step 11: Commit**

```bash
cd /Users/mmckenna/Dev/wandersail/website
git add package.json package-lock.json astro.config.mjs tailwind.config.mjs tsconfig.json src/styles/global.css .gitignore public/favicon.ico
git commit -m "feat: initialize Astro project with Tailwind CSS and design tokens"
```

---

### Task 2: Base Layout, Navbar, and Footer Components

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Navbar.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create the Navbar component**

Create `src/components/Navbar.astro`:

```astro
---
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Contact', href: '/contact' },
];

const pathname = Astro.url.pathname;
---

<nav class="sticky top-0 z-50 bg-[var(--color-bg)] border-b border-border">
  <div class="max-w-content mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
    <a href="/" class="font-bold text-base tracking-wide text-[var(--color-text-primary)] no-underline">
      WANDERSAIL
    </a>
    <button
      id="nav-toggle"
      class="md:hidden p-2 text-[var(--color-text-primary)]"
      aria-label="Toggle menu"
    >
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
    <ul id="nav-links" class="hidden md:flex gap-6 list-none m-0 p-0">
      {navLinks.map((link) => {
        const isActive = pathname === link.href || pathname === link.href + '/';
        return (
          <li>
            <a
              href={link.href}
              class:list={[
                'text-sm no-underline transition-colors',
                isActive
                  ? 'text-[var(--color-text-primary)] underline underline-offset-[6px] decoration-accent decoration-2'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
              ]}
            >
              {link.name}
            </a>
          </li>
        );
      })}
    </ul>
  </div>
  <!-- Mobile menu -->
  <ul id="nav-mobile" class="hidden flex-col md:hidden bg-[var(--color-bg)] border-b border-border px-4 pb-4 list-none m-0">
    {navLinks.map((link) => {
      const isActive = pathname === link.href || pathname === link.href + '/';
      return (
        <li>
          <a
            href={link.href}
            class:list={[
              'block py-2 text-sm no-underline',
              isActive
                ? 'text-[var(--color-text-primary)] font-medium'
                : 'text-[var(--color-text-secondary)]',
            ]}
          >
            {link.name}
          </a>
        </li>
      );
    })}
  </ul>
</nav>

<script>
  document.getElementById('nav-toggle')?.addEventListener('click', () => {
    document.getElementById('nav-mobile')?.classList.toggle('hidden');
    document.getElementById('nav-mobile')?.classList.toggle('flex');
  });
</script>
```

- [ ] **Step 2: Create the Footer component**

Create `src/components/Footer.astro`:

```astro
---
const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/wandersail' },
  { name: 'Twitter', href: 'https://twitter.com/wandersail' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/wandersail' },
];
---

<footer class="border-t border-border mt-auto">
  <div class="max-w-content mx-auto px-4 sm:px-6">
    <!-- Newsletter -->
    <div class="py-12 sm:py-16 text-center">
      <h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-1">Stay in the loop</h3>
      <p class="text-sm text-[var(--color-text-secondary)] mb-4">Get updates on new projects and posts.</p>
      <form class="flex gap-2 max-w-sm mx-auto flex-col sm:flex-row" action="https://buttondown.com/api/emails/wandersail" method="post">
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          class="flex-1 px-3 py-2.5 text-sm font-sans bg-[var(--color-bg)] border border-border rounded-md text-[var(--color-text-primary)] focus:outline-none focus:border-accent"
        />
        <button type="submit" class="px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-md hover:bg-[var(--color-accent-hover)] transition-colors">
          Subscribe
        </button>
      </form>
    </div>
    <!-- Bottom bar -->
    <div class="flex justify-between items-center py-6 border-t border-border text-xs text-[var(--color-text-muted)]">
      <span>&copy; {new Date().getFullYear()} Wandersail LLC</span>
      <ul class="flex gap-4 list-none m-0 p-0">
        {socialLinks.map((link) => (
          <li>
            <a href={link.href} target="_blank" rel="noopener" class="text-[var(--color-text-muted)] no-underline hover:text-accent">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Create the BaseLayout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@/styles/global.css';
import Navbar from '@/components/Navbar.astro';
import Footer from '@/components/Footer.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Software, thoughtfully built.' } = Astro.props;
const siteTitle = 'Wandersail';
const pageTitle = title === siteTitle ? siteTitle : `${title} — ${siteTitle}`;
---

<!doctype html>
<html lang="en" class="font-sans">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{pageTitle}</title>
  <meta name="description" content={description} />
  <link rel="icon" href="/favicon.ico" />
</head>
<body>
  <Navbar />
  <main class="flex-1">
    <slot />
  </main>
  <Footer />
</body>
</html>
```

- [ ] **Step 4: Verify build**

```bash
cd /Users/mmckenna/Dev/wandersail/website && npx astro build 2>&1 | tail -5
```

Expected: Build completes (may warn about no pages yet).

- [ ] **Step 5: Commit**

```bash
cd /Users/mmckenna/Dev/wandersail/website
git add src/layouts/BaseLayout.astro src/components/Navbar.astro src/components/Footer.astro
git commit -m "feat: add base layout with navbar, footer, and newsletter"
```

---

### Task 3: Home Page with Hero, Featured Projects, Blog Preview

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/BlogEntry.astro`
- Create: `src/data/projects.ts`
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create project data**

Create `src/data/projects.ts`:

```ts
export interface Project {
  name: string;
  description: string;
  category: string;
  status: 'active' | 'coming_soon';
  featured: boolean;
  url: string;
}

export const projects: Project[] = [
  {
    name: 'Surchin',
    description: 'The context engineering platform for AI native teams',
    category: 'AI/ML',
    status: 'active',
    featured: true,
    url: 'https://getsurch.in',
  },
  {
    name: 'Prism',
    description: 'A developer tool that helps teams ship better code. Clean interfaces, powerful internals.',
    category: 'Developer Tools',
    status: 'active',
    featured: true,
    url: '',
  },
  {
    name: 'Harbor',
    description: 'Secure deployment platform for small teams. Simple setup, reliable hosting.',
    category: 'B2B SaaS',
    status: 'active',
    featured: true,
    url: '',
  },
  {
    name: 'Compass',
    description: 'A personal productivity tool that adapts to how you actually work.',
    category: 'Consumer',
    status: 'coming_soon',
    featured: false,
    url: '',
  },
  {
    name: 'Drift',
    description: 'Intelligent data pipeline management. Watch this space.',
    category: 'AI/ML',
    status: 'coming_soon',
    featured: false,
    url: '',
  },
];
```

- [ ] **Step 2: Create ProjectCard component**

Create `src/components/ProjectCard.astro`:

```astro
---
import type { Project } from '@/data/projects';

interface Props {
  project: Project;
}

const { project } = Astro.props;
const isSoon = project.status === 'coming_soon';
---

<div class:list={['bg-surface border border-border rounded-xl p-6', isSoon && 'opacity-70']}>
  <div class="flex justify-between items-start mb-2">
    <span class="text-base font-semibold text-[var(--color-text-primary)]">{project.name}</span>
    {isSoon ? (
      <span class="text-[0.65rem] px-2 py-0.5 rounded bg-badge-soon-bg text-badge-soon-text font-medium whitespace-nowrap">Coming Soon</span>
    ) : (
      <span class="text-[0.65rem] px-2 py-0.5 rounded bg-badge-active-bg text-badge-active-text font-medium whitespace-nowrap">Active</span>
    )}
  </div>
  <span class="inline-block text-[0.7rem] px-2 py-0.5 rounded bg-accent-bg text-accent mb-2">{project.category}</span>
  <p class="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">{project.description}</p>
  {project.url && !isSoon ? (
    <a href={project.url} target="_blank" rel="noopener" class="text-sm font-medium text-accent no-underline hover:text-[var(--color-accent-hover)]">
      View project →
    </a>
  ) : (
    <span class="text-sm text-[var(--color-text-muted)]">Coming soon</span>
  )}
</div>
```

- [ ] **Step 3: Create BlogEntry component**

Create `src/components/BlogEntry.astro`:

```astro
---
interface Props {
  title: string;
  date: Date;
  category?: string;
  href: string;
}

const { title, date, category, href } = Astro.props;
---

<div class="flex justify-between items-center py-4 border-b border-border last:border-b-0">
  <div>
    <div class="text-base font-medium text-[var(--color-text-primary)]">
      <a href={href} class="text-inherit no-underline hover:text-accent">{title}</a>
    </div>
    <div class="text-sm text-[var(--color-text-muted)] mt-0.5">
      {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
    </div>
  </div>
  {category && (
    <span class="text-[0.65rem] px-2 py-0.5 rounded bg-accent-bg text-accent ml-4 shrink-0">{category}</span>
  )}
</div>
```

- [ ] **Step 4: Create Hero component**

Create `src/components/Hero.astro`:

```astro
<section class="text-center py-16 sm:py-24 md:py-32">
  <div class="max-w-content mx-auto px-4 sm:px-6">
    <h1 class="text-[clamp(2rem,5vw,3.5rem)] font-bold text-[var(--color-text-primary)] leading-tight">
      Software, thoughtfully built.
    </h1>
    <p class="text-[clamp(0.9rem,1.5vw,1.05rem)] text-[var(--color-text-secondary)] max-w-lg mx-auto mt-4">
      Developer tools, SaaS, consumer apps, and AI — crafted with care.
    </p>
    <a href="/projects" class="inline-block mt-8 px-6 py-2.5 bg-accent text-white text-sm font-medium rounded-md hover:bg-[var(--color-accent-hover)] transition-colors no-underline">
      View Our Projects →
    </a>
  </div>
</section>
```

- [ ] **Step 5: Create the home page**

Create `src/pages/index.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Hero from '@/components/Hero.astro';
import ProjectCard from '@/components/ProjectCard.astro';
import BlogEntry from '@/components/BlogEntry.astro';
import { projects } from '@/data/projects';
import { getCollection } from 'astro:content';

const featuredProjects = projects.filter((p) => p.featured);
const posts = (await getCollection('blog'))
  .filter((p) => !p.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 3);
---

<BaseLayout title="Wandersail">
  <Hero />

  <!-- Featured Projects -->
  <section class="py-12 sm:py-20">
    <div class="max-w-content mx-auto px-4 sm:px-6">
      <div class="mb-8">
        <h2 class="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-[var(--color-text-primary)]">Our Projects</h2>
        <p class="text-[clamp(0.9rem,1.5vw,1.05rem)] text-[var(--color-text-secondary)] mt-1">What we're building and what's on the horizon.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featuredProjects.map((project) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </div>
  </section>

  <!-- Latest Blog Posts -->
  {posts.length > 0 && (
    <section class="py-12 sm:py-20">
      <div class="max-w-content mx-auto px-4 sm:px-6">
        <div class="mb-8">
          <h2 class="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-[var(--color-text-primary)]">From the Blog</h2>
        </div>
        <div>
          {posts.map((post) => (
            <BlogEntry
              title={post.data.title}
              date={post.data.date}
              category={post.data.category}
              href={`/blog/${post.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  )}
</BaseLayout>
```

- [ ] **Step 6: Commit**

```bash
cd /Users/mmckenna/Dev/wandersail/website
git add src/data/projects.ts src/components/Hero.astro src/components/ProjectCard.astro src/components/BlogEntry.astro src/pages/index.astro
git commit -m "feat: add home page with hero, featured projects, and blog preview"
```

---

### Task 4: Blog Content Collection and Pages

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/blog/hello-world.md`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[...slug].astro`

- [ ] **Step 1: Define the blog content collection schema**

Create `src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    description: z.string().optional(),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Create the seed blog post**

Create `src/content/blog/hello-world.md`:

```markdown
---
title: "Hello, World"
date: 2026-04-12
author: "Wandersail Team"
category: "Company"
tags: ["announcement"]
draft: false
description: "Introducing Wandersail — who we are and what we're building."
---

We're Wandersail, a software company building tools across developer infrastructure, SaaS, consumer apps, and AI.

This is the first post on our blog. We'll be sharing technical deep-dives, project updates, and the occasional behind-the-scenes look at how we build software.

## What to expect

- **Engineering posts** — how we solve hard problems, tools we use, patterns we've found useful
- **Product updates** — what we're shipping and why
- **Company news** — milestones, announcements, and reflections

Stay tuned. We're just getting started.
```

- [ ] **Step 3: Create blog listing page**

Create `src/pages/blog/index.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import BlogEntry from '@/components/BlogEntry.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog'))
  .filter((p) => !p.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<BaseLayout title="Blog" description="Technical deep-dives and company updates from Wandersail.">
  <div class="max-w-content mx-auto px-4 sm:px-6">
    <div class="pt-10 sm:pt-16 pb-6 sm:pb-8">
      <h1 class="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-[var(--color-text-primary)]">Blog</h1>
      <p class="text-[clamp(0.9rem,1.5vw,1.05rem)] text-[var(--color-text-secondary)] mt-1">Technical deep-dives and company updates.</p>
    </div>
    <section class="pb-12 sm:pb-20">
      <div>
        {posts.map((post) => (
          <BlogEntry
            title={post.data.title}
            date={post.data.date}
            category={post.data.category}
            href={`/blog/${post.slug}`}
          />
        ))}
      </div>
    </section>
  </div>
</BaseLayout>
```

- [ ] **Step 4: Create blog post dynamic route**

Create `src/pages/blog/[...slug].astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();

const allPosts = (await getCollection('blog'))
  .filter((p) => !p.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
---

<BaseLayout title={post.data.title} description={post.data.description}>
  <div class="max-w-content mx-auto px-4 sm:px-6">
    <article class="max-w-prose mx-auto py-12 sm:py-20">
      <header class="mb-8">
        <h1 class="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-[var(--color-text-primary)] leading-tight mb-3">
          {post.data.title}
        </h1>
        <div class="flex gap-4 items-center flex-wrap text-sm text-[var(--color-text-muted)]">
          <time>{post.data.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
          {post.data.author && <span>by {post.data.author}</span>}
          {post.data.category && (
            <span class="text-[0.65rem] px-2 py-0.5 rounded bg-accent-bg text-accent">{post.data.category}</span>
          )}
        </div>
      </header>
      <div class="prose prose-lg max-w-none text-[clamp(0.95rem,1.5vw,1.05rem)] leading-relaxed text-[var(--color-text-secondary)] [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[var(--color-text-primary)] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[var(--color-text-primary)] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-5 [&_ul]:mb-5 [&_ul]:pl-6 [&_ol]:mb-5 [&_ol]:pl-6 [&_code]:text-[0.9em] [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-surface [&_pre]:border [&_pre]:border-border [&_pre]:rounded-md [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-5 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_blockquote]:border-l-[3px] [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:my-6 [&_blockquote]:text-[var(--color-text-muted)] [&_blockquote]:italic [&_strong]:text-[var(--color-text-primary)] [&_a]:text-accent [&_a]:no-underline [&_a:hover]:text-[var(--color-accent-hover)]">
        <Content />
      </div>
      <nav class="flex justify-between mt-12 pt-6 border-t border-border text-sm">
        <div>
          {prevPost && (
            <a href={`/blog/${prevPost.slug}`} class="text-accent no-underline hover:text-[var(--color-accent-hover)]">
              ← {prevPost.data.title}
            </a>
          )}
        </div>
        <div>
          {nextPost && (
            <a href={`/blog/${nextPost.slug}`} class="text-accent no-underline hover:text-[var(--color-accent-hover)]">
              {nextPost.data.title} →
            </a>
          )}
        </div>
      </nav>
    </article>
  </div>
</BaseLayout>
```

- [ ] **Step 5: Commit**

```bash
cd /Users/mmckenna/Dev/wandersail/website
git add src/content/config.ts src/content/blog/hello-world.md src/pages/blog/index.astro src/pages/blog/\\[...slug\\].astro
git commit -m "feat: add blog with content collection, listing, and post pages"
```

---

### Task 5: Projects Page

**Files:**
- Create: `src/pages/projects.astro`

- [ ] **Step 1: Create the projects page**

Create `src/pages/projects.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import ProjectCard from '@/components/ProjectCard.astro';
import { projects } from '@/data/projects';
---

<BaseLayout title="Projects" description="What Wandersail is building and what's on the horizon.">
  <div class="max-w-content mx-auto px-4 sm:px-6">
    <div class="pt-10 sm:pt-16 pb-6 sm:pb-8">
      <h1 class="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-[var(--color-text-primary)]">Projects</h1>
      <p class="text-[clamp(0.9rem,1.5vw,1.05rem)] text-[var(--color-text-secondary)] mt-1">What we're building and what's on the horizon.</p>
    </div>
    <section class="pb-12 sm:pb-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project) => (
          <ProjectCard project={project} />
        ))}
        <!-- Placeholder card -->
        <div class="border border-dashed border-border rounded-xl p-6 flex items-center justify-center min-h-[160px] text-[var(--color-text-muted)] text-center">
          <div>
            <div class="text-2xl mb-1">+</div>
            <div class="text-xs">More projects on the way</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/mmckenna/Dev/wandersail/website
git add src/pages/projects.astro
git commit -m "feat: add projects page with card grid"
```

---

### Task 6: About Page

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: Create the about page**

Create `src/pages/about.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout title="About" description="About Wandersail — who we are and what we believe.">
  <div class="max-w-content mx-auto px-4 sm:px-6">
    <div class="pt-10 sm:pt-16 pb-6 sm:pb-8">
      <h1 class="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-[var(--color-text-primary)]">About</h1>
    </div>
    <section class="max-w-prose pb-12 sm:pb-20 text-[clamp(0.95rem,1.5vw,1.05rem)] leading-relaxed text-[var(--color-text-secondary)]">
      <p class="mb-5">
        Wandersail is a software company. We build developer tools, SaaS products, consumer applications, and AI-powered systems.
      </p>
      <blockquote class="border-l-[3px] border-accent pl-4 my-8 text-xl font-medium text-[var(--color-text-primary)] not-italic leading-snug">
        Software, thoughtfully built.
      </blockquote>
      <p class="mb-5">
        We believe good software starts with clear thinking. Every project we take on is driven by a real problem and built with care — no bloat, no shortcuts, no features for the sake of features.
      </p>
      <p class="mb-5">
        We work across the stack because interesting problems don't stay in one lane. Sometimes the right tool is a CLI. Sometimes it's a platform. Sometimes it's something that didn't exist before.
      </p>
      <p>
        We're a small team that ships. If that sounds interesting, <a href="/contact" class="text-accent no-underline hover:text-[var(--color-accent-hover)]">get in touch</a>.
      </p>
    </section>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/mmckenna/Dev/wandersail/website
git add src/pages/about.astro
git commit -m "feat: add about page"
```

---

### Task 7: Team Page

**Files:**
- Create: `src/data/team.ts`
- Create: `src/components/TeamCard.astro`
- Create: `src/pages/team.astro`

- [ ] **Step 1: Create team data**

Create `src/data/team.ts`:

```ts
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  initials: string;
  links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const team: TeamMember[] = [
  {
    name: 'Matt McKenna',
    role: 'Founder',
    bio: 'Building tools for builders.',
    photo: '',
    initials: 'MM',
    links: {
      github: 'https://github.com/mmckenna',
    },
  },
];
```

- [ ] **Step 2: Create TeamCard component**

Create `src/components/TeamCard.astro`:

```astro
---
import type { TeamMember } from '@/data/team';

interface Props {
  member: TeamMember;
}

const { member } = Astro.props;
---

<div class="bg-surface border border-border rounded-xl p-8 text-center">
  <div class="w-20 h-20 rounded-full mx-auto mb-4 bg-border flex items-center justify-center text-2xl font-semibold text-[var(--color-text-secondary)] overflow-hidden">
    {member.photo ? (
      <img src={member.photo} alt={member.name} class="w-full h-full object-cover" />
    ) : (
      member.initials || member.name.charAt(0)
    )}
  </div>
  <div class="text-base font-semibold text-[var(--color-text-primary)]">{member.name}</div>
  <div class="text-sm text-[var(--color-text-muted)] mb-2">{member.role}</div>
  {member.bio && <p class="text-sm text-[var(--color-text-secondary)] mb-3">{member.bio}</p>}
  <div class="flex justify-center gap-3">
    {member.links.github && (
      <a href={member.links.github} target="_blank" rel="noopener" class="text-sm text-[var(--color-text-muted)] no-underline hover:text-accent">GitHub</a>
    )}
    {member.links.linkedin && (
      <a href={member.links.linkedin} target="_blank" rel="noopener" class="text-sm text-[var(--color-text-muted)] no-underline hover:text-accent">LinkedIn</a>
    )}
    {member.links.twitter && (
      <a href={member.links.twitter} target="_blank" rel="noopener" class="text-sm text-[var(--color-text-muted)] no-underline hover:text-accent">Twitter</a>
    )}
  </div>
</div>
```

- [ ] **Step 3: Create team page**

Create `src/pages/team.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import TeamCard from '@/components/TeamCard.astro';
import { team } from '@/data/team';
---

<BaseLayout title="Team" description="The people behind Wandersail.">
  <div class="max-w-content mx-auto px-4 sm:px-6">
    <div class="pt-10 sm:pt-16 pb-6 sm:pb-8">
      <h1 class="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-[var(--color-text-primary)]">Team</h1>
      <p class="text-[clamp(0.9rem,1.5vw,1.05rem)] text-[var(--color-text-secondary)] mt-1">The people behind Wandersail.</p>
    </div>
    <section class="pb-12 sm:pb-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {team.map((member) => (
          <TeamCard member={member} />
        ))}
      </div>
    </section>
  </div>
</BaseLayout>
```

- [ ] **Step 4: Commit**

```bash
cd /Users/mmckenna/Dev/wandersail/website
git add src/data/team.ts src/components/TeamCard.astro src/pages/team.astro
git commit -m "feat: add team page with data-driven member cards"
```

---

### Task 8: Contact Page

**Files:**
- Create: `src/components/ContactForm.astro`
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Create ContactForm component**

Create `src/components/ContactForm.astro`:

```astro
---
interface Props {
  formspreeId: string;
}

const { formspreeId } = Astro.props;
---

<form class="max-w-lg" action={`https://formspree.io/f/${formspreeId}`} method="POST">
  <div class="mb-5">
    <label for="name" class="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      required
      class="w-full px-3.5 py-2.5 text-sm font-sans bg-[var(--color-bg)] border border-border rounded-md text-[var(--color-text-primary)] focus:outline-none focus:border-accent"
    />
  </div>
  <div class="mb-5">
    <label for="email" class="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      class="w-full px-3.5 py-2.5 text-sm font-sans bg-[var(--color-bg)] border border-border rounded-md text-[var(--color-text-primary)] focus:outline-none focus:border-accent"
    />
  </div>
  <div class="mb-5">
    <label for="message" class="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Message</label>
    <textarea
      id="message"
      name="message"
      required
      rows="6"
      class="w-full px-3.5 py-2.5 text-sm font-sans bg-[var(--color-bg)] border border-border rounded-md text-[var(--color-text-primary)] focus:outline-none focus:border-accent resize-y"
    ></textarea>
  </div>
  <button type="submit" class="px-6 py-2.5 bg-accent text-white text-sm font-medium rounded-md hover:bg-[var(--color-accent-hover)] transition-colors">
    Send Message
  </button>
</form>
```

- [ ] **Step 2: Create contact page**

Create `src/pages/contact.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import ContactForm from '@/components/ContactForm.astro';
---

<BaseLayout title="Contact" description="Get in touch with Wandersail.">
  <div class="max-w-content mx-auto px-4 sm:px-6">
    <div class="pt-10 sm:pt-16 pb-6 sm:pb-8">
      <h1 class="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-[var(--color-text-primary)]">Contact</h1>
      <p class="text-[clamp(0.9rem,1.5vw,1.05rem)] text-[var(--color-text-secondary)] mt-1">Have a question or want to work together? Reach out.</p>
    </div>
    <section class="pb-12 sm:pb-20">
      <ContactForm formspreeId="YOUR_FORMSPREE_ID" />
    </section>
  </div>
</BaseLayout>
```

- [ ] **Step 3: Commit**

```bash
cd /Users/mmckenna/Dev/wandersail/website
git add src/components/ContactForm.astro src/pages/contact.astro
git commit -m "feat: add contact page with Formspree form"
```

---

### Task 9: Vercel Deployment Setup

**Files:**
- No new files needed — Vercel auto-detects Astro

- [ ] **Step 1: Verify the build works**

```bash
cd /Users/mmckenna/Dev/wandersail/website && npx astro build
```

Expected: Build completes, output in `dist/` directory.

- [ ] **Step 2: Verify the output**

```bash
ls /Users/mmckenna/Dev/wandersail/website/dist/
```

Expected: Directory listing with `index.html`, `about/`, `blog/`, `contact/`, `projects/`, `team/`.

- [ ] **Step 3: Deploy to Vercel**

Use the Vercel MCP tool `deploy_to_vercel` or run:

```bash
cd /Users/mmckenna/Dev/wandersail/website && npx vercel --prod
```

Follow prompts to link to a Vercel project. Vercel auto-detects Astro and configures the build.

- [ ] **Step 4: Configure custom domain**

In Vercel dashboard (or CLI), add `wandersail.llc` as a custom domain and update DNS records.

- [ ] **Step 5: Commit any Vercel config if generated**

```bash
cd /Users/mmckenna/Dev/wandersail/website
git add -A
git commit -m "feat: configure Vercel deployment"
```

(Skip if no files were generated.)

---

### Task 10: End-to-End Verification

- [ ] **Step 1: Run Astro dev server**

```bash
cd /Users/mmckenna/Dev/wandersail/website && npx astro dev
```

- [ ] **Step 2: Verify all pages load**

Open each URL in browser and verify:

- `http://localhost:4321/` — Home: hero with tagline, featured projects, blog preview, newsletter in footer
- `http://localhost:4321/projects` — Projects: all cards with status badges, placeholder card
- `http://localhost:4321/blog` — Blog listing: seed post with date and category
- `http://localhost:4321/blog/hello-world` — Blog post: title, meta, content renders, no prev/next (only one post)
- `http://localhost:4321/about` — About: text content with pull-quote
- `http://localhost:4321/team` — Team: member card with initials avatar
- `http://localhost:4321/contact` — Contact: form with name, email, message fields

- [ ] **Step 3: Verify dark mode**

Toggle system appearance to dark mode. All pages should switch automatically.

- [ ] **Step 4: Verify mobile responsiveness**

Open dev tools, 375px viewport. Verify:
- Hamburger nav works
- Cards stack single-column
- Newsletter form stacks vertically
- Text stays readable

- [ ] **Step 5: Verify active nav indicator**

Navigate to each page — active link should have indigo underline.

- [ ] **Step 6: Fix any issues found and commit**

```bash
cd /Users/mmckenna/Dev/wandersail/website
git add -A
git commit -m "fix: address issues found during e2e verification"
```

(Skip if no changes needed.)
