# Rohan Chhaya — Classic Portfolio (Standalone Ready)

This is a self-contained light, professional portfolio. It is prepared to move into its own public GitHub repository, separate from Digital Lab.

## Separate hosting

**Proposed new repository:** https://github.com/xyzabc8108-prog/rohan-portfolio-classic

**Expected independent URL after setup:** https://xyzabc8108-prog.github.io/rohan-portfolio-classic/

The new repository does not exist yet. It must be created under the connected GitHub account before the final split can be completed.

1. Create a new public repository named `rohan-portfolio-classic`.
2. Upload the **contents** of this folder to the **root** of the new repository (not as a nested `classic/` folder).
3. In the new repo, choose Settings → Pages → Deploy from branch → main → /(root).
4. Verify the opening transition, all five case studies, CV, favicon and responsive mobile navigation.
5. **After** the independent website works, remove the old `classic/` folder from `rohan-portfolio-2026`. Do not modify the existing Digital Lab home page or its assets.

While migration is incomplete, the existing Classic temporary URL is:
https://xyzabc8108-prog.github.io/rohan-portfolio-2026/classic/

## Contents

- `index.html` — Classic homepage
- `classic.css` — normal sans-serif typography, responsive styles and the cinematic opening
- `classic.js` — intro skip/replay, mobile menu and copy email
- `cv.html` — local printable CV linking to the five Classic case studies
- `favicon.svg` — local favicon
- `projects/*.html` — five independent case studies
- `.nojekyll` — GitHub Pages static-file support
- `check.mjs` — standalone source checks

No Classic file needs an asset or navigation route outside this folder. External links to a public demo or owner's GitHub account are informational, not hosting dependencies.

## Accuracy and privacy

- Rohan: M.Tech Cyber Security, Semester I, Marwadi University, Rajkot; B.Tech CSE at Darshan University; infrastructure-support background.
- Ideas are human-led; implementation primarily AI-assisted, with limited manual testing.
- Multimodal Deepfake Detection is unfinished research; the preliminary result was from a particular 119-clip dataset evaluation.
- Indian Market Lab: fictional-data, safety-restricted public research demo.
- AutoMoto Studio: owner-only work in progress, not open access.
- ROVAN: local Windows prototype.
- Ashok Enterprise: private source, no verified public website or domain.
- No internship promotion or digital-forensics specialization.
- Project graphics are illustrative, not product screenshots.

From the Classic root run `node check.mjs` to validate internal file links and key claims.
