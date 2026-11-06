# Rohan Chhaya — Digital Lab V5

Free, static, interactive portfolio at:

**https://xyzabc8108-prog.github.io/rohan-portfolio-2026/**

This is a **personal, idea-led / AI-assisted portfolio**, not a collection of claimed hand-coded, production-ready products. It has no paid API keys, no backend, and no usage-tracking SDKs.

## V5 pages

- \`index.html\` — cinematic home, original decorative project artwork, five project filters, interactive search, introduction, transparent AI credit, contact.
- \`v5.css\` — responsive deep-blue / cyan / violet / amber design, case-study styles, accessibility, and reduced-motion behavior.
- \`v5.js\` — Ctrl/Cmd+K search, arrow-key navigation, 3 palette variants, session-limited 6.6-second intro, Skip/Escape, reveal effects, scroll progress, mobile nav, clipboard.
- \`projects/*.html\` — five evidence-first case studies.
- \`cv.html\` — preserved printable CV.
- \`tests/check-site.mjs\` — static source checks (links, claims, script syntax).
- \`.github/workflows/portfolio-checks.yml\` — validation on commit and pull requests.
- \`favicon.svg\` — lightweight original icon.
- \`.nojekyll\` — keep static asset paths intact on GitHub Pages.

Earlier \`style.css\`, \`theme.css\`, \`script.js\`, \`intro.css\` and \`intro.js\` are retained in the repository for history but V5 uses **only** \`v5.css\` and \`v5.js\`.

## Real project statuses

| Project | Status | Public access |
| --- | --- | --- |
| Multimodal Deepfake Detection | Ongoing research, **not completed** | No deployed demo |
| AutoMoto Studio | Private work-in-progress | Owner-only Render website |
| Indian Market Lab | Safety-restricted public research demo | [Public Render site](https://indian-market-lab-fullstack.onrender.com/) |
| ROVAN | Local Windows voice assistant prototype | No public local app |
| Ashok Enterprise | Private AI-assisted web development | No verified live deployment |

**Caveats:**

- The project ideas/direction are Rohan's; AI tools generated most of the implementation; hands-on testing has been limited. These facts are communicated throughout the site.
- The deepfake project's **97.48%** fusion result applies to a preliminary experimental evaluation of **119 test clips** on one dataset/split. It is not a completed result or a real-world deployment claim.
- Indian Market Lab public mode uses fictional data and restrictive Market Data Safety Mode. It does not provide authorized real-time live stock recommendations or brokerage orders.
- AutoMoto's Render website requires authentication. A link to the owner-only service is **not** an open public demo.
- Ashok Enterprise's private source is not evidence of control over any similarly named public company. The unrelated \`ashokenterprise.com\` link must not be restored without ownership verification.
- No screenshots have been invented. The cards and case posters use original CSS/SVG art marked as **illustrations, not product screenshots**.
- Digital forensics is **not** claimed as Rohan's specialty.
- "Next steps" in case studies are proposals, not completed deliverables.

## GitHub Pages publishing

Under **Settings → Pages**, publish \`main\` from \`/(root)\`. All internal links are relative and work under the repository subpath.

To verify locally, install Node 18+ and run:

\`\`\`bash
node tests/check-site.mjs
\`\`\`

To preview locally, serve the root folder (e.g., \`python -m http.server 8000\`) and open \`http://localhost:8000/\`. No build step.

The intro plays once per browser tab session (with optional footer Replay). Users can Skip with the button or Escape. Reduced-motion preferences skip the intro and disable continuous animations.
