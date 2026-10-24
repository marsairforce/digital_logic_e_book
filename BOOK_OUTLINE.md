# Book Outline and Writing Plan

Status: Draft skeleton, October 2026. This is the planning document for the
book. It is not part of the published book text.

## The idea in one paragraph

A practical handbook of digital logic, written from the bench up. It starts
with the transistor as a switch, builds logic gates out of real, purchasable
components, walks through the logic families of each era, and arrives at
working digital systems — adders, an ALU, counters and clocks — built from
74-series parts. The tone models itself on Forrest Mims' *Getting Started in
Electronics*: plain language, down to earth, every idea tied to something you
can build and measure. Depth models itself on *The Art of Electronics*:
accurate, honest about corner cases, and referenced.

## Who it is for

- A hobbyist with some soldering and breadboarding experience who wants to
  understand what is happening inside the chips they already use.
- A parent-and-kid pair learning together, e.g. building an ALU from 74HC
  parts to see how a computer adds.
- A programmer or systems engineer going the other way: from software down
  to the bare metal.

The book has a specific test reader: the author's 14-year-old son, who
builds along with him. A chapter passes when a curious 14-year-old wants
to keep reading, can follow every step, and can build the thing. If it
would bore or baffle him, it gets rewritten — that standard outranks
completeness for its own sake.

Assumed knowledge: very little beyond curiosity — the Preface refreshes
voltage, current, resistance, capacitors, inductors and semiconductors for
anyone who needs it, and a multimeter is introduced by use. Not assumed:
calculus, semiconductor physics, or prior digital design experience. Maths
is introduced only when a worked example needs it.

## Principles

1. **Accurate or silent.** Every number, rating and claim is checked against
   a manufacturer datasheet or a standard textbook before it is published.
   Where sources disagree, the book says so.
2. **Cited.** Each chapter ends with references, linked to the manufacturer
   datasheet or source, so a reader can verify and go deeper.
3. **Built, not just described.** Every concept gets a circuit the reader can
   build from commodity parts that are in production and sourceable today.
   Obsolete parts are covered for history and recognition, and labelled as
   obsolete.
4. **One ladder.** Each chapter depends only on chapters before it. A reader
   who finishes Chapter 6 has built, in order: a switch, a gate, families of
   gates, combinational systems, and sequential systems.
5. **The author's bench is the example set.** Circuits come from real
   projects where possible — LED drivers, level shifters between 5 V and
   3.3 V logic, SPI peripherals — not from invented textbook examples.

## Scope

In scope for this book:

- Transistors (BJT and MOSFET) used as switches
- Discrete and integrated logic gates
- Logic families from RTL to modern CMOS, and the 74-series subfamilies
- Combinational and sequential building blocks in 74-series parts
- Interfacing between logic voltages, and between logic and the real world
  (LEDs, switches, relays, motors at an introductory level)

Deliberately out of scope, at least for a first edition:

- Designing silicon / semiconductor fabrication
- FPGA and HDL design (Verilog/VHDL) — a natural sequel, mentioned where a
  74-series design maps onto an FPGA equivalent
- RF design — a natural companion volume
- Power electronics beyond an appendix pointer (GaN, SiC, IGBTs)

## Structure

### Preface

Who the book is for: a reader with a minimal foothold in electronics —
or simply the curiosity and eagerness to learn — but no assumed formal
training. Sets the book's conventions (ground-referenced voltages, 5 V
and 74HC as defaults, ratings quoted with their conditions), then walks
briskly over the fundamentals as a refresher rather than a course:
voltage, current, resistance and Ohm's law, series and parallel,
capacitors (charge storage, the RC time constant, decoupling, polarity),
inductors (current's flywheel, flyback spikes), and semiconductors
(doping, the p-n junction, the diode) — arriving at the transistor
exactly where Chapter 1 picks it up.

Written, in `chapters/00-preface.md`.

### Chapter 1 — Transistors as switches

The foundation. Transistors are analogue devices; digital logic is what
happens when we only use the fully-off and fully-on states.

- Bipolar transistors: NPN and PNP, current control, base current, gain
  (hFE) and why gain in saturation is not the headline number
- MOSFETs: N-channel and P-channel, voltage control, gate charge, Rds(on),
  and why Vgs(th) is not a drive voltage
- The regions trap: "saturation" means opposite things for a BJT and a
  MOSFET, and a MOSFET used as a switch is in cutoff or the ohmic (triode)
  region — passing through saturation on the way
- Reading the two device tables that matter at the bench: small BJTs
  (MMBT3904/MMBT3906 and duals) and small MOSFETs (BSS123, 2N7002, BSS84
  and complementary duals)
- Worked example / bench build: the LED driver modules — one BJT version,
  one MOSFET version, measured and compared

Source material: `notes/transistor_theory.md`

Status: drafted in full in `chapters/01-transistors-as-switches.md`,
including the BJT-vs-MOSFET saturation correction as a featured
callout, the worked LED-driver example for both device kinds, and an
editorial note flagging the device tables for a final datasheet
verification pass before publication.

### Chapter 2 — From a switch to a gate

- What makes a switch a *logic* gate: voltage levels, thresholds, noise
  margin, fan-out
- Boolean operations and truth tables: NOT, AND, OR, NAND, NOR, XOR, XNOR
- Why NAND and NOR are the native gates: they are what transistors naturally
  build, and either one alone is functionally complete
- Positive and negative logic, active-low signals, and the little bubble
  notation
- Worked example / bench build: a NAND gate from two transistors and a
  resistor, then the same gate inside a 74HC00

Source material: new writing, seeded by the gate theory in
`notes/logic_recipe_book.md`

### Chapter 3 — Logic families through history

One gate, six ways of building it. Each family gets the same treatment:
the circuit, why it was invented, what it was good and bad at, and what
survives of it today.

- RTL (1960s) — the Apollo Guidance Computer's NOR gate
- DTL (mid-1960s) — diodes do the logic, a transistor does the driving
- TTL (1970s) — the multi-emitter transistor and the totem-pole output;
  the 7400 itself
- ECL — never saturating, differential current steering, the fastest and
  hungriest family
- NMOS, including depletion-load designs — the recipe used in the author's
  own discrete gate experiments (e.g. a BSS126 active load)
- CMOS — complementary pairs, near-zero static power, the family that won

The recipe matrix (NOT, NAND and NOR complete; AND, OR and XOR to be
finished) lives in this chapter's hands-on sections.

Planned box — "Why 14 and 16 pins?": the pin count is the function
plus power — a quad 2-input gate is 4 × (2 inputs + 1 output) = 12
signal pins + VCC + GND = 14, as is a hex inverter; 16 pins arrive
when the function needs more signals (e.g. 74161 counter, 74138
3-to-8 decoder). The DIP itself is a 1964 Fairchild invention (Don
Forbes, Rex Rice, Bryant Rogers), the original DIP having 14 leads,
created because transistor cans (TO-5/TO-18) topped out at about ten
leads. Contrast with IBM's contemporary SLT hybrid modules (System/360,
1964): discrete transistors and diodes on a ceramic substrate under a
metal lid, chosen because IBM considered monolithic ICs too immature.
Facts verified 2026-10-24; Appendix E's IC table carries the DIP
dimensions, and Chapter 4 can use the pin counts without re-explaining
them.

Source material: `notes/logic_recipe_book.md`, `notes/logic_families.md`
(first table)

### Chapter 4 — The 74 series in practice

- A short history of the 7400 series and how to read a part number
- The subfamilies: original TTL, 74S, 74LS, 74ALS, 74F, then CMOS —
  74HC, 74HCT, 74AHC/74VHC, 74VHCT, 74LVC — compared on speed, power,
  voltage range and drive
- Choosing a family today: 74HC as general bench stock, when to reach for
  HCT or VHCT, what to avoid and why
- Bridging 5 V and 3.3 V: threshold maths, when a direct connection is
  unreliable or dangerous, resistor and diode tricks, dedicated buffers,
  the BSS138 MOSFET shifter for I2C, and single-gate buffers for SPI
- Inputs that bite: floating CMOS inputs, unused inputs, decoupling,
  Schmitt triggers

Source material: `notes/74xx_logic.md` (families and bridging sections)

### Chapter 5 — Combinational building blocks

Systems that are pure functions of their inputs, assembled from the
reference table: encoders and decoders, multiplexers and demultiplexers,
buffers and transceivers, magnitude comparators, parity, and adders —
half, full, and the 74HC283 4-bit adder with fast carry.

- Worked example / bench build: a multi-bit adder, then an ALU in the
  spirit of the 74181 built from 74HC parts (the build-along project)

Source material: `notes/74xx_logic.md` (list by function), new writing

### Chapter 6 — Sequential logic: memory, counters and clocks

- Latches vs flip-flops: SR, D, JK; edge triggering; setup and hold at a
  level a bench builder can respect
- Registers and shift registers, including the 74HC595 driving LEDs
- Counters: ripple vs synchronous, decade and binary, the 74HC390,
  74HC161/163, 74HC4017 and friends
- Clocks and timing: 74HC14 Schmitt oscillator, the 555 as an honorary
  digital part, debouncing switches properly
- Worked example / bench build: a counter project that becomes a clock

Source material: `notes/74xx_logic.md` (latches, flip-flops, counters,
shift registers), new writing

### Appendices

- **Appendix A — 74xx reference table.** The active, in-production device
  list by function, cleaned and re-verified against the Nexperia
  catalogue, with datasheet links pointing at the manufacturer.
- **Appendix B — Obsolete and hard-to-find parts.** What they were, why
  they disappeared, and what to substitute.
- **Appendix C — Glossary.**
- **Appendix D — Bibliography and further reading.** Mims, Horowitz &
  Hill, manufacturer datasheets and application notes, and good modern
  microcontroller-era companions.

## Where the existing fragments land

| Source fragment | Destination | State |
| --- | --- | --- |
| `notes/transistor_theory.md` — BJT and MOSFET theory | Chapter 1 | Good draft; needs the regions correction and editing |
| `notes/transistor_theory.md` — device tables | Chapter 1, worked tables | Good; verify each value against datasheets |
| `notes/logic_recipe_book.md` — index matrix and NOT/NAND/NOR recipes | Chapter 3 | Good draft; AND/OR/XOR stubs to finish |
| `notes/logic_recipe_book.md` — KiCad placeholders | Chapter 3 figures | Schematics to be drawn; files do not exist yet |
| `notes/logic_families.md` — digital families table | Chapter 3 intro / Chapter 4 | Good summary table |
| `notes/logic_families.md` — power switching table | Out of scope; hold for appendix or a later work | Parked |
| `notes/74xx_logic.md` — list by function | Appendix A | Strong raw material; links point to local PDFs not in the repo — relink to manufacturers, fix scrambled rows (e.g. 74138) |
| `notes/74xx_logic.md` — families notes and comparison table | Chapter 4 | Good draft; lively tone to keep, claims to verify |
| `notes/74xx_logic.md` — bridging 5 V / 3.3 V | Chapter 4 | Good draft; includes author's own BSS138 and SPI circuits |
| `notes/74xx_logic.md` — obsolete parts table | Appendix B | Good raw material; the "what counts as obsolete, per family" framing needs a short intro |
| README | Book front page | Was a single line; now carries the table of contents |

The `notes/` folder stays as the quarry. Nothing is deleted from it; edited
text moves into chapters and the notes file keeps a pointer if it is
retired later.

## Editorial conventions

- **Chapter template.** Every chapter follows `templates/chapter-template.md`:
  purpose, prerequisites, theory in plain language, worked example, bench
  build, gotchas, summary, exercises or extensions, references.
- **Citations.** Numbered per chapter, listed at the chapter end. Prefer,
  in order: the manufacturer's datasheet, the manufacturer's application
  note, a standard textbook, then a reputable secondary source. Wikipedia
  is acceptable for history, never as the sole source for a rating.
- **Datasheet links.** Link to the manufacturer's own PDF, with the full
  part number and the revision or date checked, rather than hosting copies.
- **Numbers.** SI units, a space between number and unit, datasheet
  conditions quoted with the value (e.g. Rds(on) is meaningless without
  its Vgs).
- **Figures.** Schematics are drawn in KiCad. The `.kicad_sch` source lives
  in the repo under `schematics/`, exports (SVG preferred, PNG where a
  renderer needs it) live under `images/`, and chapters reference the
  exports with relative paths. Breadboard photos sit alongside, not
  instead.
- **Voice.** Second person, plain words, short paragraphs. Explain like
  Mims, check like Horowitz & Hill. Emoji and bench slang from the notes
  get one editorial pass — keep the life, cut what will date or confuse.
- **Linting.** Markdown follows the repo's `.rumdl.toml` (ATX headings,
  fenced code blocks, consistent list markers).

## Publishing

The book is written as plain Markdown in this repo, readable on GitHub,
with the README as the front page and table of contents — that stays the
source of truth and the author's local reading experience (VS Code
Markdown preview) throughout.

**Target platform: VitePress** (decided October 2026). When there is
finished text worth dressing up, a GitHub Actions workflow will build
the repo's Markdown into a VitePress site on merge to `main` and
publish it to GitHub Pages: a proper e-book with sidebar navigation,
full-text search, and clean rendering of the tables, images and
schematics. Implications to respect from now on, so the migration is a
configuration job rather than a rewrite:

- Keep chapters as ordinary Markdown with relative links and relative
  image paths (VitePress consumes both as-is)
- Keep the folder layout stable (`chapters/`, `appendices/`, `images/`);
  the VitePress sidebar can be generated from the README contents list
- Mathematics stays in `$...$` LaTeX notation, which VitePress renders
- Any VitePress-specific configuration lives in its own `.vitepress/`
  folder and must never become load-bearing for reading the raw
  Markdown

## Order of work

1. This skeleton: outline, README table of contents, chapter stubs, template.
   Done — including the Preface (with its fundamentals refresher).
2. Chapter 1: edit `transistor_theory.md` into publishable form, with the
   regions correction and citations. Drafted — the datasheet verification
   of its device tables remains as its review pass.
3. Chapter 3 recipes: finish AND/OR/XOR, draw the first KiCad schematics
   (RTL, TTL and CMOS NOT/NAND/NOR) to prove the figures pipeline.
4. Appendix A: clean and re-verify the 74xx table, fix links.
5. Chapters in order from there.

## Open questions for the author

- Title: keep "A book to learn digital logic and electronics", or pick a
  sharper working title?
- Is the build-along ALU the Chapter 5 centrepiece, or a standalone project
  chapter of its own after Chapter 6?
- Target reader's bench: assume a 5 V supply and 74HC as the default family
  throughout, introducing 3.3 V where it matters — yes?
- Any interest in worked examples from the radio/RC projects in later
  chapters (motor drivers, SPI peripherals), or keep this book purely about
  logic and let those seed a second book?
