# Santheep Madhavan – Portfolio

Personal portfolio of a design-led Senior Frontend Engineer & UX Designer.
Built with React 19, Vite 6, Tailwind CSS 4 and React Router 7 (hash routing, so it works on GitHub Pages).

**Live:** https://santheepmadhavan.github.io/portfolio/

## Highlights

- **Dev Mode** – the toggle in the toolbar (or press `D`) turns the page into an inspector: selection boxes, measured sizes and the real computed CSS of each element.
- Light and dark themes (follows the system, remembers the choice).
- All content lives in `src/data/`, not in components.
- Self-hosted variable fonts (Bricolage Grotesque, Geist, Geist Mono); no third-party requests.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/portfolio/
npm run lint
npm run build
npm run preview
```

## Update the content

| What | File |
| --- | --- |
| Name, intro, links | `src/data/profile.js` |
| Work history | `src/data/experience.js` |
| Skills | `src/data/skills.js` |
| Projects and the Hotstar case study | `src/data/projects.js` |
| Certification and education | `src/data/credentials.js` |
| Resume PDF | `public/Santheep_Madhavan_Resume.pdf` |

## Deploy

```bash
npm run deploy   # builds, then publishes dist/ to the gh-pages branch
```
