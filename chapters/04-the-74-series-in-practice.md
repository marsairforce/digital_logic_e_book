# Chapter 4 — The 74 series in practice

Status: skeleton
Source material:
[notes/74xx_logic.md](../notes/74xx_logic.md) (families and bridging
sections)

## Purpose

Be able to walk up to the 74-series catalogue and choose the right part,
in the right subfamily, at the right voltage — and interface it safely to
3.3 V and 5 V neighbours.

## Prerequisites

- Chapter 3: how the families differ, and why CMOS displaced TTL

## You will need

- A small bench stock: 74HC00, 74HCT00 or 74VHCT equivalent, a 74HC595,
  a BSS138 level-shifter board, 5 V and 3.3 V supplies

## Theory

### Reading a part number

- 74, the family letters, the function number, package and grade suffixes
- The same number across families: a 7400, a 74LS00 and a 74HC00 are the
  same logic in different technologies

### The subfamilies

- Bipolar era: 74 (original), 74S, 74LS, 74ALS, 74F — what each traded,
  and why they are legacy-only now
- CMOS era: 74HC, 74HCT, 74AC, 74AHC/74VHC, 74VHCT, 74LVC
- The comparison table from the notes: era, technology, speed, power,
  voltage range, best use today — every row to be verified

### Choosing a family today

- 74HC as the default 5 V bench stock
- 74VHC as the modern upgrade, and its 5 V-tolerant inputs
- 74VHCT/HCT as the 3.3 V-to-5 V bridge
- What "obsolete" really means per family (pointer to Appendix B)

### Bridging 5 V and 3.3 V

- The threshold maths behind the notes' compatibility table: why 3.3 V
  into a 5 V 74HC input is unreliable (Vih = 3.5 V), and why 5 V into a
  3.3 V 74HC input is destructive while a 74VHC input tolerates it
- I2C: the BSS138 bidirectional shifter — the author's own build
- SPI: one-way lines get one-way shifters — 74VHCT single-gate buffer up
  (SCLK, MOSI), 74VHC single-gate buffer down (MISO); exact orderable
  part numbers to be confirmed when this section is written

### Living with real inputs

- Never leave a CMOS input floating; tie off unused inputs properly
- Decoupling: one capacitor per chip, close, always
- Schmitt-trigger inputs (74HC14) for slow and noisy signals

## Worked example

- TODO: a 3.3 V microcontroller talking SPI to a 5 V peripheral, both
  directions shifted, levels calculated before wiring

## Bench build

- The BSS138 I2C shifter, then the single-gate SPI shifters
- Schematic: TODO — KiCad source to `schematics/`, export to `images/`

## Gotchas

- "It worked on the bench" at 3.3 V into 74HC — until temperature moved
- Powering a VHCT part at 3.3 V: outside its 4.5 V minimum supply

## Summary

- TODO

## Extensions

- Single-gate ("Little Logic") parts: one gate per package for exactly
  these bridging jobs

## References

- TODO: Nexperia and TI family guides and datasheets for every family
  claim; BSS138 datasheet for the shifter design
