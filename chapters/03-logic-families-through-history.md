# Chapter 3 — Logic families through history

Status: skeleton
Source material:
[notes/logic_recipe_book.md](../notes/logic_recipe_book.md),
[notes/logic_families.md](../notes/logic_families.md)

## Purpose

See the same gates built six different ways, and understand each era's
trade — speed against power against complexity — well enough to explain
why CMOS won and what the earlier families still teach us.

## Prerequisites

- Chapter 2: gates, truth tables, logic levels

## You will need

- Discrete BJTs and resistors for the RTL builds; a 74HC00 and a 74LS00
  for comparison measurements

## Theory

Each family gets the same treatment: the defining circuit, why it was
invented, its numbers, its failure mode, what survives today.

### RTL — resistor-transistor logic (1960s)

- The NOR gate of the Apollo Guidance Computer
- Recipes: NOT, NAND, NOR complete in the notes; AND, OR, XOR to finish

### DTL — diode-transistor logic (mid-1960s)

- Diodes do the logic, one transistor does the driving
- Recipes: NOT and NAND complete in the notes; NOR, AND, OR, XOR to finish

### TTL — transistor-transistor logic (1970s)

- The multi-emitter input transistor, phase splitter, totem-pole output
- Recipes: NOT and NAND complete in the notes; NOR, AND, OR, XOR to
  finish; correct the notes' TTL XOR section, which currently describes
  a CMOS part

### ECL — emitter-coupled logic

- Current steering, transistors that never saturate, differential pairs
- Why the fastest family is also the hungriest — and where it survives

### NMOS, including depletion load

- Enhancement switches under a depletion-mode active load
- The author's own recipe: BSS126 load, discrete switches; why this is a
  lovely way to build CPU-style gates on a PCB
- Recipes: NOT, NAND, NOR complete in the notes; AND, OR, XOR to finish

### CMOS — complementary MOS

- The PMOS/NMOS pair; near-zero static power; NAND and NOR by duality
- Recipes: NOT, NAND, NOR complete in the notes; AND, OR, XOR to finish
- Transmission gates, and the elegant CMOS XOR

### The families at a glance

- The comparison table from `notes/logic_families.md`: transistor type,
  power, delay, defining feature

## Worked example

- TODO: one NAND gate, three technologies (RTL, TTL chip, CMOS chip),
  measured for delay, power and output swing on the same bench

## Bench build

- RTL NOR gate from discrete parts, Apollo-style
- Schematics: TODO — this chapter is the figures pipeline pilot: KiCad
  sources for the RTL, TTL and CMOS NOT/NAND/NOR recipes first, replacing
  the `placeholders/*.png` references in the notes

## Gotchas

- Comparing families on speed alone, ignoring power and levels
- Feeding TTL-era assumptions (current-sinking inputs) into CMOS circuits

## Summary

- TODO

## Extensions

- The recipe matrix as a poster: 6 families × 6 gates, all schematics

## References

- TODO: Apollo Guidance Computer references for RTL; TI and Fairchild
  TTL/ECL literature; the KiCad library symbols used in the figures
