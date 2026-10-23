// VitePress site config for the book.
//
// The Markdown files are the source of truth (readable on GitHub and in
// VS Code preview); this folder only describes how they are dressed up as
// an e-book. Keep it that way: no book content lives here.
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'A Book to Learn Digital Logic and Electronics',
  description:
    'A practical handbook of digital logic, written from the bench up: from the transistor as a switch to working systems built from 74-series parts.',

  // Served from GitHub Pages at
  // https://marsairforce.github.io/digital_logic_e_book/
  base: '/digital_logic_e_book/',

  // Working material that must never become pages of the published book.
  srcExclude: ['**/notes/**', '**/templates/**'],

  // The README is the book's front page (table of contents) on GitHub;
  // serve it as the site root too, so the site's home page is the same
  // document Travis reads in VS Code.
  rewrites: {
    'README.md': 'index.md',
  },

  // Chapters cite their source notes (e.g. ../notes/74xx_logic) as
  // provenance. notes/ is deliberately not part of the published site,
  // so those links are dead here by design; on GitHub they resolve to
  // the repo files. Everything else must link cleanly, so the dead-link
  // check stays on for the rest.
  ignoreDeadLinks: [/\/notes\//],

  markdown: {
    // Chapters use $...$ LaTeX notation for maths.
    math: true,
  },

  themeConfig: {
    nav: [
      { text: 'Chapters', link: '/chapters/01-transistors-as-switches' },
      { text: 'Appendices', link: '/appendices/A-74xx-reference' },
      {
        text: 'GitHub',
        link: 'https://github.com/marsairforce/digital_logic_e_book',
      },
    ],

    // Mirrors the README's Contents list — the README stays the one
    // source of truth for what the book contains; update both together.
    sidebar: [
      {
        text: 'The book',
        items: [
          { text: 'Preface', link: '/chapters/00-preface' },
          {
            text: '1. Transistors as switches',
            link: '/chapters/01-transistors-as-switches',
          },
          {
            text: '2. From a switch to a gate',
            link: '/chapters/02-from-a-switch-to-a-gate',
          },
          {
            text: '3. Logic families through history',
            link: '/chapters/03-logic-families-through-history',
          },
          {
            text: '4. The 74 series in practice',
            link: '/chapters/04-the-74-series-in-practice',
          },
          {
            text: '5. Combinational building blocks',
            link: '/chapters/05-combinational-building-blocks',
          },
          {
            text: '6. Sequential logic',
            link: '/chapters/06-sequential-logic',
          },
        ],
      },
      {
        text: 'Appendices',
        items: [
          {
            text: 'A — 74xx reference table',
            link: '/appendices/A-74xx-reference',
          },
          {
            text: 'B — Obsolete and hard-to-find parts',
            link: '/appendices/B-obsolete-parts',
          },
          { text: 'C — Glossary', link: '/appendices/C-glossary' },
          {
            text: 'D — Bibliography and further reading',
            link: '/appendices/D-bibliography',
          },
        ],
      },
      {
        text: 'About this book',
        items: [
          { text: 'Datasheet manifest', link: '/datasheets/manifest' },
          {
            text: 'Book outline (author’s planning doc)',
            link: '/BOOK_OUTLINE',
          },
        ],
      },
    ],

    search: { provider: 'local' },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/marsairforce/digital_logic_e_book',
      },
    ],
  },
})
