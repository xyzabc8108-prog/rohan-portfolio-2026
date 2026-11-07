# Quality review — Digital Lab (November 2026)

This is a source-level quality review and a record of open validation tasks.

## What was checked

- Seven HTML pages: homepage, project progress log, CV and four case studies.
- Proper document language, mobile viewport, semantic main and heading landmarks, skip-to-content links and unique IDs.
- Accessible labels on illustrative role=img elements, image alt attributes and noopener security for new-tab links.
- Valid in-page anchor targets, presence of an evidence record, no unwanted internship pitch, and an accessible command-search input.
- Responsive CSS and reduced-motion support, visible keyboard focus, source-size limits and JavaScript syntax.
- Fixed the former Digital Lab selector bug that caused navigation updates to throw at runtime.
- Background-tab animations can be paused; narrow-screen controls have explicit touch targets.
- CI runs both `node tests/check-site.mjs` and `node tests/audit-ui.mjs`.

## Evidence and performance limits

- The reported 97.48% Deepfake Detection result is specific to an early 119-clip test; it is not external verification.
- Public Indian Market Lab is a restricted fictional-data demonstration.
- AutoMoto and ROVAN have private/local or unfinished status.
- No genuine product screenshots have been published without verifying permission, visible functionality and privacy.
- No measured Lighthouse score, field Core Web Vitals, WCAG conformance statement or real-device usability result is claimed by these source tests.

## Follow-up tests when real device access is available

1. Visit each page at roughly 320, 375, 768, 1024 and 1440 CSS-pixel widths; confirm no horizontal overflow.
2. Use only Tab, Shift+Tab, Enter and Escape to exercise intro, menus, search dialog, filters and links.
3. Enable operating-system reduced motion and confirm that the intro and ambient animations do not obscure content.
4. Run Chrome Lighthouse mobile and desktop, recording actual metrics rather than assuming improvement.
5. Add authentic, redacted project images only with rights and a documented feature test.

Digital Lab source is maintained independently from the Classic repository.
