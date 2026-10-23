# Chapter 5 — Combinational building blocks

Status: skeleton
Source material:
[notes/74xx_logic.md](../notes/74xx_logic.md) (list by function);
full device details in [Appendix A](../appendices/A-74xx-reference.md)

## Purpose

Assemble gates into systems whose outputs are pure functions of their
inputs — selecting, routing, comparing and adding — and finish with a
working multi-bit adder growing into an ALU.

## Prerequisites

- Chapter 4: choosing parts and families

## You will need

- From Appendix A: 74HC86, 74HC283, 74HC85, 74HC151/157, 74HC138/238,
  74HC245-class parts for the builds; final list when builds are written

## Theory

### Routing signals

- Encoders and decoders: 74HC147/148, 74HC138, 74HC42, 7-segment drivers
- Multiplexers and demultiplexers: a mux is a data selector, and also a
  universal logic element — any truth table in one chip
- Buffers, transceivers and three-state outputs: sharing a bus

### Comparing and checking

- Magnitude comparators (74HC85), parity generators/checkers (74HC280)

### Arithmetic

- Half adder from XOR + AND; full adder; ripple carry and why it is slow
- The 74HC283: a 4-bit adder with fast carry, ready-made
- Subtraction by complement: the adder does that too

### The ALU idea

- What an ALU is: one circuit, a menu of operations, select lines choose
- The 74181 as history: the chip that taught a generation what an ALU is
  (and why we build ours from 74HC parts instead)

## Worked example

- TODO: add two 4-bit numbers by hand through the 74HC283 logic,
  including the carry chain, then wire it and check

## Bench build

- Build-along project: a 74HC adder, extended to a simple ALU with
  operation select (add, subtract, AND, OR, XOR)
- Schematic: TODO — KiCad source to `schematics/`, export to `images/`
- Open question (see BOOK_OUTLINE.md): does the ALU stay this chapter's
  centrepiece, or graduate to a project chapter of its own?

## Gotchas

- Three-state outputs fighting on a bus
- Ripple-carry glitches on changing inputs; when they matter and when
  they do not

## Summary

- TODO

## Extensions

- Cascading adders to 8 bits and beyond; a multiplier as repeated addition

## References

- TODO: Nexperia datasheets for each part used; 74181 datasheet for the
  historical section
