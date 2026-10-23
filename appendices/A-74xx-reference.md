# Appendix A — 74xx reference table

Status: skeleton
Source material:
[notes/74xx_logic.md](../notes/74xx_logic.md) (list by function, and the
Nexperia-catalogue additions in its "Other" section)

## Purpose

A trustworthy, function-by-function list of 74-series parts that are in
production and sourceable today, with a manufacturer datasheet link for
each — the table a reader reaches for at the bench, mid-build.

## Contents to build

- Gates: AND, NAND, OR, NOR, NOT, XOR; open-collector variants;
  Schmitt-trigger gates; buffered gates
- Encoders, decoders and display drivers
- Multiplexers and demultiplexers
- Buffers, line drivers and transceivers
- Latches, D-type and JK flip-flops
- Counters: BCD/decade, binary, up/down
- Shift registers
- Multivibrators, comparators, adders and special-purpose parts
- Analog switches and level shifters/translators (the notes' "Other"
  table, folded into their categories)

## Editorial work required

- The notes table's datasheet links point at local PDF files that are not
  in this repo. Relink every part to its manufacturer's datasheet page.
- Fix scrambled rows found in the notes (the 74138 row currently links a
  7474 datasheet under a mangled label).
- Re-verify availability framing against the current Nexperia catalogue,
  and record the date checked in this appendix's header when published.
- Keep the KiCad availability column — it is genuinely useful — and note
  which KiCad library each part comes from.

## References

- Nexperia logic portfolio (the source catalogue for the active list)
- Texas Instruments logic guides, where a part is TI-only
- [List of 7400-series integrated circuits](https://en.wikipedia.org/wiki/List_of_7400-series_integrated_circuits)
  — for history and cross-checking, noting the notes' warning that the
  Wikipedia table includes part numbers that never existed as products
