# Portfolio — M. Haseeb Farrukh

Cloud DevOps Engineer portfolio website. Single page, static, fast.

---

## Stack & Reasoning

**Vite + vanilla HTML/CSS/JS**. Astro 5 requires Node 22+ (system has 18.19.1). Rather than
fight version constraints or add complexity, this project uses Vite as a thin build tool over
plain HTML, CSS, and JavaScript. The result:

- **Zero runtime dependencies** — only Vite as a dev dependency (~11 packages)
- **179ms production build** — outputs ~10KB gzipped (HTML + CSS + JS)
- **No framework overhead** — the browser receives exactly what was written
- **Full SEO** — all content is in the HTML source, not rendered client-side
- **Dark/light mode** — via CSS custom properties, no JS framework needed

---

## Folder Structure

```
├── index.html                  # Single-page site (all sections)
├── src/
│   ├── data/                   # Content data (reference / edit guide)
│   │   ├── personal.js         # Name, bio, headline, links
│   │   ├── skills.js           # Skill categories
│   │   ├── experience.js       # Work history
│   │   ├── projects.js         # Project details
│   │   └── education.js        # Education & certifications
│   ├── styles/
│   │   └── main.css            # All styles (dark/light theme, responsive)
│   └── scripts/
│       └── main.js             # Theme toggle, mobile nav, scroll animations
├── public/                     # Copied as-is to dist/
│   ├── images/
│   │   ├── profile.jpg         # Profile photo (optimized, 45KB)
│   │   └── og-image.jpg        # Open Graph image (64KB)
│   ├── resume/
│   │   └── M-Haseeb-Farrukh-Cloud-DevOps-Resume.pdf
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── .github/workflows/
│   └── deploy.yml              # Cloudflare Pages CI/CD
├── vite.config.js
├── package.json
└── instructions.md             # This file
```

---

## Run Locally

```bash
# Install dependencies (one time)
npm install

# Start dev server with hot reload
npm run dev
# → opens http://localhost:3000

# Build for production
npm run build
# → outputs to dist/

# Preview production build
npm run preview
```

---

## How to Edit Content

All content is directly in `index.html` for SEO. Each section is marked with clear HTML
comments (`<!-- ========== SECTION NAME ========== -->`). Reference data files live in
`src/data/` for documentation.

| What to change               | Where to edit                                         |
|------------------------------|-------------------------------------------------------|
| Name, headline, intro        | `index.html` → Hero section                           |
| About bio                    | `index.html` → About section                          |
| Skills                       | `index.html` → Skills section (add/remove `<li>` tags)|
| Work experience              | `index.html` → Experience section                     |
| Projects                     | `index.html` → Projects section                       |
| Certifications               | `index.html` → Certifications section                 |
| Contact info                 | `index.html` → Contact section + Hero CTA buttons     |
| Resume PDF                   | Replace `public/resume/M-Haseeb-Farrukh-Cloud-DevOps-Resume.pdf` |
| Profile photo                | Replace `public/images/profile.jpg` (keep ≤100KB)     |
| OG / social share image      | Replace `public/images/og-image.jpg` (1200×630)       |
| Site title & meta description| `index.html` → `<head>` section                      |
| Colors / theme               | `src/styles/main.css` → `:root` and `[data-theme="light"]` |

After editing, rebuild (`npm run build`) and redeploy.

---

## Hosting: Cloudflare Pages (Recommended)

**Why Cloudflare Pages:**
- Unlimited bandwidth (free tier)
- 500 builds/month
- Global edge CDN
- Free `*.pages.dev` subdomain
- Automatic HTTPS

### Comparison

| Feature        | Cloudflare Pages     | GitHub Pages | Netlify (Free)       | Vercel (Hobby)          |
|----------------|---------------------|-------------|----------------------|------------------------|
| Bandwidth      | **Unlimited**       | ~100GB soft | Credit-based (can pause) | 100GB               |
| Builds/month   | 500                 | 10/hour     | ~20 (via credits)    | Fair-use              |
| Commercial OK  | Yes                 | Limited     | Yes                  | **No (personal only)**  |
| Best for       | Static high-traffic | Simple sites| Full-stack JAMstack  | Next.js projects      |

### Deploy via Cloudflare Dashboard (Easiest)

1. Push this repo to GitHub
2. Go to [Cloudflare Dashboard → Pages](https://dash.cloudflare.com/?to=/:account/pages)
3. Click **Create a project** → **Connect to Git**
4. Select your repo
5. Set build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** `18` (or higher)
6. Click **Save and Deploy**
7. Your site will be live at `https://<project-name>.pages.dev`

### Deploy via GitHub Actions (CI/CD)

The repo includes `.github/workflows/deploy.yml`. To use it:

1. Create a Cloudflare API token:
   - Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Create a token with **Cloudflare Pages: Edit** permission
2. Find your Account ID:
   - Go to your Cloudflare dashboard → right sidebar shows Account ID
3. Add GitHub secrets:
   - Go to repo **Settings → Secrets → Actions**
   - Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
4. Push to `main` — the workflow will build and deploy automatically

### Alternative: GitHub Pages (Simpler)

If you prefer GitHub Pages:

1. Push repo to GitHub
2. Go to repo **Settings → Pages**
3. Source: **GitHub Actions**
4. Create `.github/workflows/pages.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```
5. Your site will be live at `https://<username>.github.io/<repo-name>/`

### Adding a Custom Domain (Optional, Later)

**Cloudflare Pages:**
1. Go to your Pages project → **Custom domains**
2. Add your domain
3. If domain is on Cloudflare: automatic DNS
4. If domain is elsewhere: add the CNAME record shown

**GitHub Pages:**
1. Go to repo **Settings → Pages → Custom domain**
2. Add your domain
3. Create a CNAME record pointing to `<username>.github.io`

---

## Post-Deploy Checklist

After deploying, update these placeholder values:

- [ ] Replace `YOUR-DOMAIN` in `index.html` (canonical URL, OG URL)
- [ ] Replace `YOUR-DOMAIN` in `public/robots.txt`
- [ ] Replace `YOUR-DOMAIN` in `public/sitemap.xml`
- [ ] Add your GitHub profile URL (search for `TODO` in `index.html`)
- [ ] Update OG image URL to use absolute deployed URL

---

## TODOs & Gaps Found in Source Documents

| Item | Status | Notes |
|------|--------|-------|
| GitHub profile URL | **Missing** | Not in resume, LinkedIn, or cover letter. Search `TODO` in `index.html` to add it. |
| Rayan Technologies dates | **Discrepancy** | Resume says Nov 2023, LinkedIn says Jan 2024. Used resume dates. |
| Dr. Ziauddin Hospital role | **Added from LinkedIn** | Not in resume but present in LinkedIn profile. Included. |
| RPA and Jenkins Bootcamp certs | **No links** | From LinkedIn only, no certificate URLs available. |
| Profile images | **AI-generated** | Both source images are AI-generated headshots. Used image 1 (better lighting). |
| Phone number | **Not displayed** | Available (03342708712) but not shown on the site for privacy. Add if desired. |
