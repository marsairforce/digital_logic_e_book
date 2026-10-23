# Chapter 2 — From a switch to a gate

Status: skeleton
Source material: new writing, seeded by the gate theory in
[notes/logic_recipe_book.md](../notes/logic_recipe_book.md)

## Purpose

Turn a transistor switch into a decision. After this chapter the reader
understands logic levels, truth tables and the basic gate operations, and
knows why NAND and NOR — not AND and OR — are the gates transistors
naturally build.

## Prerequisites

- Chapter 1: the transistor as a switch

## You will need

- The Chapter 1 switch circuit, one more transistor, and a 74HC00

## Theory

### What makes a switch a gate

- Voltage bands instead of exact voltages: Vil, Vih, Vol, Voh
- Noise margin: why digital is robust
- Fan-out and fan-in

### The operations

- NOT, AND, OR, NAND, NOR, XOR, XNOR — symbols and truth tables
- Building AND from NAND + NOT, and why nobody builds a "native" AND
- Functional completeness: any logic from NAND alone (repeat with NOR)

### Reading logic like an engineer

- Positive and negative logic; active-low signals and the overbar
- The bubble: inversion at inputs and outputs
- De Morgan's laws as a practical rewiring tool, not algebra homework

## Worked example

- TODO: design a two-input NAND from Chapter 1 parts, predict its truth
  table, then measure every row

## Bench build

- Discrete NAND gate, then the same gate inside a 74HC00, side by side
- Schematic: TODO — KiCad source to `schematics/`, export to `images/`

## Gotchas

- Floating inputs — the gate that "works" until you touch the bench
- Assuming 0 V and Vcc are the only voltages a slow input can sit at

## Summary

- TODO

## Extensions

- Three and more inputs; what stacking transistors costs you (preview of
  Chapter 3's family trade-offs)

## References

- TODO: Nexperia 74HC00 datasheet; a standard digital design text for
  level definitions
