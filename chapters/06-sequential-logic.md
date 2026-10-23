# Chapter 6 — Sequential logic: memory, counters and clocks

Status: skeleton
Source material:
[notes/74xx_logic.md](../notes/74xx_logic.md) (latches, flip-flops,
counters, shift registers sections)

## Purpose

Give a circuit a memory of its past. After this chapter the reader can
use latches, flip-flops, registers and counters on purpose, generate a
clean clock, and finish the book's ladder with a working counter/clock
project.

## Prerequisites

- Chapter 5: combinational blocks

## You will need

- 74HC74, 74HC595, 74HC390 or 74HC161/163, 74HC4017, 74HC14, a 555,
  7-segment display or LEDs for the project

## Theory

### One bit of memory

- The SR latch from two NOR (or NAND) gates — Chapter 2's gates, remembering
- Latch vs flip-flop: level-sensitive vs edge-triggered, and why it matters
- D and JK flip-flops (74HC74, 74HC73/107/109/112): preset, clear, toggle

### Timing without tears

- Setup and hold time, explained at bench level: be stable before the
  edge, stay stable just after it
- Metastability in one honest paragraph: it exists, here is how designs
  live with it

### Registers and shift registers

- Registers as banks of D flip-flops (74HC273/374/574)
- Shift registers (74HC164/165/194/595): serial in, parallel out, and
  the 74HC595 as the LED driver's friend

### Counters

- Ripple counters (74HC93, 74HC390, 74HC4020/4040): simple, with ripple
  delay as the price
- Synchronous counters (74HC160/161/163, up/down 74HC191/193): everyone
  changes together
- Decade and Johnson counters (74HC4017) and decoded outputs

### Clocks

- The 74HC14 Schmitt-trigger oscillator: one resistor, one capacitor
- The 555 as an honorary digital part
- Switch debouncing done properly — SR latch and Schmitt methods

## Worked example

- TODO: divide a 1 Hz clock down to minutes and hours on paper, choosing
  counter parts from Appendix A

## Bench build

- Build-along project: a counter that becomes a clock — seconds counter
  on LEDs or 7-segment displays, from this chapter's parts
- Schematic: TODO — KiCad source to `schematics/`, export to `images/`

## Gotchas

- Decoding ripple-counter outputs: the glitches are real, scope them
- Asynchronous clear vs synchronous clear when cascading counters

## Summary

- TODO

## Extensions

- Where the ladder leads next: state machines by hand, then the same
  ideas in an FPGA (Verilog/VHDL) and in a microcontroller — the sequel
  volumes

## References

- TODO: Nexperia datasheets for each part used; 555 datasheet and
  application notes for the clock sections
