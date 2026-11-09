# H SAT Edu Solutions

A four-page educational consultancy website, built with React and Vite. All pages share a Swiss design: Manrope typography, an ivory canvas, charcoal text, bold orange and yellow panels, precise grids, and geometric illustrations. Decorative numbered labels and repeated all-caps captions are intentionally omitted. Spacing and the compact navigation draw inspiration from `../portfolio2`.

| Page         | Route       | Design                                                                                                     |
| ------------ | ----------- | ---------------------------------------------------------------------------------------------------------- |
| Home         | `/`         | Swiss typography, colourful service panels, and the supplied education hero image                          |
| About Us     | `/about`    | Swiss typography, geometric people illustration, founder, associates, and careers                          |
| Our Services | `/services` | Clear service rows, geometric diagrams, and flat colour panels                                             |
| Contact Us   | `/contact`  | Geometric conversation illustration, aligned contact information, enquiry form, and a general-location map |

## Run locally

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite (normally `http://127.0.0.1:5173`).

```sh
npm run check
npm run build
npm run preview
```

The production output is `dist/`. Hosting must send routes such as `/about`, `/services`, and `/contact` to `index.html` (SPA fallback). A Netlify-compatible `_redirects` file is included.

## Content and enquiries

- Official company details, service descriptions, and associates are in `src/content.js`.
- The original supplied PNG logo is used unchanged. Its emblem is used in the favicon.
- Shared and Home styles are in `src/styles.css`; the other pages continue the same system in `src/swiss-pages.css`.
- The Home hero uses the supplied transparent PNG at `public/images/education-hero.png`, fitted inside a larger Swiss yellow circular frame. Image sizing is independent of the circle.
- The introduction uses a realistic transparent [open-book photograph from PurePNG](https://purepng.com/photo/9662/objects-open-book), whose source page lists free commercial use without required attribution. It loads directly from the public image URL and requires internet access; local downloading was unavailable because the workspace could not resolve the source host. The orange sun behind it remains a CSS shape.
- Vector artwork is in `src/Artwork.jsx`. Pointer response, gentle illustration motion, and one-time scroll transitions use `src/motion.css` and `src/usePageMotion.js`. Reduced-motion preferences disable these effects; content remains visible when the observer API is unavailable.
- The Contact Us farewell is an original animated SVG in `src/WavingKidsScene.jsx` and `src/waving-kids.css`. It includes three kids and one dog, separate facial features, blinking, waving, a wagging tail, pointer-following pupils, a subtle pause/play control. Mobile uses a more compact composition. Animations pause outside the viewport and respect reduced-motion preferences.
- On Contact Us, `src/App.jsx` presents the farewell as a full-width closing landscape: an ivory-to-blue sky transition leads into the characters, and the scene fades back to ivory behind `src/SiteFooter.jsx`. Other pages use the standard footer. The shared footer remains outside the main content landmark and appears only once per page.
- To reuse the complete scene, import `WavingKidsScene` as the default export. Named exports `KidsAndDogIllustration`, `WavingChild`, and `WavingDog` let you reuse the SVG and characters independently. `WavingChild` accepts `variant` (`buns`, `glasses`, or `bob`), `x`, `y`, `scale`, and `delay`; `WavingDog` accepts `x`, `y`, and `scale`. The complete scene accepts `showControls` and `className`.
- The founder profile is in `src/pages.jsx`. The photograph uses an explicitly labelled placeholder until an approved image is supplied.
- The original site's duplicated **Establishment and Setup** entry is preserved as service 03 and explicitly marked for content confirmation. It cannot be selected as a separate service in the enquiry form.
- The supplied location is **Hyderabad, Telangana – 500092, India**. The map shows a general location; no street address is implied.
- The contact email is **hsatedu@gmail.com**. The phone number and exact social profile URLs remain unconfirmed. Social account labels are not represented as verified clickable profiles.
- The enquiry form validates the required fields, displays an editable review, and opens a pre-addressed email draft. The visitor must press Send in their email app. Copy and download options are included. The website does not send or store submissions, and does not report a successful delivery.
- Service and career links preselect the appropriate enquiry type.
- Fonts are served locally; their original licence files are included in `public/fonts/`. The map requires internet access.

## Verification

`npm run check` renders all routes and verifies the supplied people and associates, internal destinations, four-service structure, explicit duplicate warning, required enquiry fields, and service/career preselection. `npm run build` checks production bundling.

Additional DOM interaction checks passed for the Home hero image, mobile-menu state and Escape focus, route themes, enquiry validation, email-draft generation, copying, editing, and review focus. These were run using locally available test tooling.

The task environment blocks local server ports and Chromium processes, so browser-based visual and interactive checks could not be completed here. The layouts include responsive rules for desktop, tablet, and mobile, a mobile menu, visible focus styles, a skip link, route announcements, and reduced-motion support; verify their rendered appearance in the local preview before publication.
