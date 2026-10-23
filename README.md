# A Book to Learn Digital Logic and Electronics

A practical handbook of digital logic, written from the bench up: starting
with the transistor as a switch, building logic gates from real components,
walking through the logic families of each era, and arriving at working
systems — adders, an ALU, counters and clocks — built from 74-series parts.

The approach is plain language and hands-on, in the spirit of Forrest Mims'
*Getting Started in Electronics*, with the accuracy and references to back
it up: every rating is checked against a manufacturer datasheet, and every
chapter ends with its sources.

> Status: early draft. The chapter skeletons and the writing plan exist;
> the chapter text is being built up from the notes. See
> [BOOK_OUTLINE.md](BOOK_OUTLINE.md) for the full plan, and `notes/` for
> the raw material the chapters are drawn from.

## Contents

- [Preface — who this book is for, and the fundamentals refresher](chapters/00-preface.md)
  (voltage, current, resistance, capacitors, inductors, semiconductors)

1. [Transistors as switches](chapters/01-transistors-as-switches.md)
2. [From a switch to a gate](chapters/02-from-a-switch-to-a-gate.md)
3. [Logic families through history](chapters/03-logic-families-through-history.md)
4. [The 74 series in practice](chapters/04-the-74-series-in-practice.md)
5. [Combinational building blocks](chapters/05-combinational-building-blocks.md)
6. [Sequential logic: memory, counters and clocks](chapters/06-sequential-logic.md)

### Appendices

- [Appendix A — 74xx reference table](appendices/A-74xx-reference.md)
- [Appendix B — Obsolete and hard-to-find parts](appendices/B-obsolete-parts.md)
- [Appendix C — Glossary](appendices/C-glossary.md)
- [Appendix D — Bibliography and further reading](appendices/D-bibliography.md)

## How this repo is organised

- `chapters/` — the book, one Markdown file per chapter
- `appendices/` — reference material
- `notes/` — the author's collected fragments; the quarry the chapters are
  built from, kept unedited
- `templates/` — the chapter template every chapter follows
- `schematics/` and `images/` — KiCad sources and exported figures
  (added as chapters gain their circuits)
- [BOOK_OUTLINE.md](BOOK_OUTLINE.md) — vision, structure, where each note
  fragment belongs, and the editorial conventions (citations, figures,
  numbers, voice)
