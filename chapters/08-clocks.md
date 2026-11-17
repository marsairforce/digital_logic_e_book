# Chapter 8 — Clocks: from blinking to timekeeping

## Purpose

Chapter 7 gave a circuit memory and a clock just good enough
to run it. This chapter asks what a clock is really worth:
how steady it is, how far it drifts, and what it takes to
keep time instead of merely blinking. After this chapter the
reader can build a 555 timer circuit on purpose rather than
by recipe, read its accuracy honestly in minutes per day, and
understand why a crystal timebase is a different kind of
thing from a resistor and a capacitor. The chapter moves in
order: the 555 in depth, then crystal oscillators, then
dividers, then temperature-compensated timebases. Every check
is provable with a multimeter, a stopwatch, or LEDs. No
oscilloscope is assumed, and where a meter cannot show the
truth, the text says so.

## Prerequisites

- Chapter 7: latches, flip-flops, counters, and the clock the
  bench build already uses
- Chapter 2: resistor-capacitor charging, thresholds, and the
  Schmitt-trigger idea the 555 echoes
- Chapters 1 and 5: the 5 V bench, decoupling, and reading a
  datasheet table with its conditions

## You will need

Orderables below are manufacturer PDIP listings, not a fresh
distributor stock snapshot (UNVERIFIED as a current-availability
claim; no live stock check is claimed). If an orderable has changed,
the function and pinout in the datasheet revision cited are what to
match, not the letters after the number. Status is not stock: a part
listed Active may still be out of stock or on long lead on any given
day. TI status dates re-checked at drafting time, 17 November 2026:
NE555P and SN74HC14N, addendum 18 September 2026; SN74HC4040N,
addendum 8 January 2026; CD74HC390E, addendum 15 July 2026;
SN74HCU04N, addendum 30 July 2024; CD74HCU04E, addendum 16 April
2024; CD74HC4060E, addendum 29 September 2026; SN74HC74N, addendum
18 September 2026. For the TLC555CP the newest TI addendum found
is dated 26 February 2019 (in SLFS043I); that age is stated
rather than smoothed over, and the distributor listing
(DigiKey 296-1857-5-ND, Active) is corroboration, not a fresh
TI confirmation.

- 1 x NE555P (TI, PDIP-8): the 1 Hz clock of Build 1, already owned
  from Chapter 7
- 1 x TLC555CP (TI, PDIP-8), optional: verified substitute for the
  NE555P, for driving HC logic directly; see the level note in Build
  3
- 1 x SN74HC14N (TI, PDIP-14): buffers the 555 output in Build 3, as
  in Chapter 7; a second chip is needed only if the Chapter 7
  counter stays built alongside
- 1 x SN74HC4040N (TI, PDIP-16): divide-by-4096 divider in Build 3,
  already owned from Chapter 7
- 2 x CD74HC390E (TI, PDIP-16): seconds counters, one per clock in
  Build 4; one is already owned from Chapter 7
- 1 x SN74HCU04N (TI, PDIP-14): unbuffered hex inverter, the Pierce
  oscillator amplifier of Build 2; CD74HCU04E (TI, PDIP-14) is the
  alternate orderable
- 1 x CD74HC4060E (TI, PDIP-16): 14-stage counter with oscillator
  section, in Builds 2 and 3; the Nexperia DIP is gone, so order the
  TI part
- 1 x SN74HC74N (TI, PDIP-14): the extra divide-by-2 after the 4060
  in Build 3, half the chip used
- 1 x crystal ECS-.327-12.5-13X (ECS, 32.768 kHz, plus or minus 20
  ppm, 12.5 pF load, cylindrical can, through-hole): the timekeeping
  crystal of Builds 2 and 3; Abracon AB38T-32.768KHZ is the
  datasheet-verified alternate in the same can
- 1 x crystal, 4 MHz, one of: ABL-4.000MHZ-B2 (Abracon, HC-49/US, 18
  pF load) or ECS-40-20-4X (ECS, HC-49/USX, 20 pF load): the first
  MHz crystal of Build 2; the load-capacitor values differ with the
  load capacitance, so note which one you bought
- 1 x crystal ECS-80-18-4X (ECS, 8 MHz, 18 pF load), optional: the
  workhorse MHz crystal; ECS-80-20-4X (20 pF load) is the alternate,
  with different load-capacitor values
- 1 x crystal ECS-160-20-4X (ECS, 16 MHz, 20 pF load), optional:
  keep the build tight at this frequency; 4 or 8 MHz is the default
  first build
- 2 x capacitor 15 pF, C0G/NP0 ceramic: load capacitors for the
  32.768 kHz crystal
- 2 x capacitor 27 pF, C0G/NP0 ceramic: load capacitors for an 18
  pF-load MHz crystal
- 2 x capacitor 33 pF, C0G/NP0 ceramic: the alternate fit for a 20
  pF-load MHz crystal
- 1 x capacitor 4.7 µF: 555 timing capacitor for Build 1; film, plus
  or minus 5%, is the honest choice, and an electrolytic, plus or
  minus 20%, is acceptable only with the error budget in Build 1
  understood; polarity observed if electrolytic
- 1 x resistor 6.8 kΩ, 1/4 W: 555 R1
- 1 x resistor 150 kΩ, 1/4 W: 555 R2, fixed part
- 1 x trimmer potentiometer 50 kΩ: 555 R2 trim part, in series with
  the 150 kΩ resistor
- 1 x resistor 1 kΩ, 1/4 W, plus 1 x resistor 15 kΩ, 1 x trimmer
  potentiometer 10 kΩ, and 1 x capacitor 10 nF, film or ceramic: the
  Chapter 7 4096 Hz clock values, reused in Build 3
- 1 x capacitor 0.01 µF, ceramic: 555 CONT (pin 5) decoupling, in
  every 555 build
- 1 x capacitor 0.1 µF, ceramic, plus 1 x capacitor 1 µF,
  electrolytic: 555 supply decoupling, close to pins 8 and 1; see
  Build 1
- 1 x capacitor 100 nF, ceramic, per IC: decoupling, one at every
  chip, as in Chapters 5-7
- 1 x capacitor 10 µF, electrolytic: bulk decoupling across the 5 V
  rails near the supply entry, polarity observed
- 10 x red LED, 5 mm or 3 mm: eight BCD monitor LEDs for Build 4,
  plus check LEDs for Builds 1-3
- 10 x resistor 1 kΩ, 1/4 W: LED series resistors
- 2 x resistor 10 kΩ, 1/4 W: RESET pull-up and RESET series resistor
  in the Chapter 7 debouncer, reused for the common start in Build 4
- 1 x capacitor 0.1 µF (100 nF), ceramic: RESET debounce capacitor,
  from Chapter 7
- 1 x pushbutton, normally-open momentary, through-hole: manual
  RESET, from Chapter 7
- Pierce resistors: NOT LISTED. No Pierce resistor values are
  specified as build instructions in this chapter; the theory
  section states the feedback-resistor DESIGN VALUES and the
  unresolved series-resistor discrepancy plainly, and Build 2
  explains why the wiring diagram waits. Do not fill this line
  from a forum post.
- 5 V regulated supply, breadboard or breadboards, solid-core jumper
  wire, multimeter, stopwatch (a phone stopwatch is fine), as in
  Chapters 1-2

What you already own from earlier chapters, not a new purchase:
breadboard, jumper wire, 5 V supply, multimeter, the NE555P, the
74HC14, the 4040, one 390, the Chapter 7 4096 Hz clock parts, the
debouncer parts, 100 nF capacitors and 1 kΩ resistors if bought in
bulk, and red LEDs. The genuinely new purchases are the HCU04, the
4060, the 74, the second 390, and the crystals; the TLC555CP is
optional.

Ordering traps, read before ordering. ABLS is Abracon's
surface-mount twin of the through-hole ABL series: ABL-4.000MHZ-B2
is the bench part, and anything starting ABLS is not. An ECS number
with -S- in it (for example ECS-40-S-4X) is a series-resonant
crystal with no load capacitance, and it is the wrong crystal for
these builds; order parallel-resonant crystals with a stated load
capacitance. ECS numbers encode the frequency as megahertz times
ten, so ECS-40 is 4.0 MHz and ECS-160 is 16.0 MHz, but at least one
distributor listing has printed 40 MHz for the 4 MHz part, so read
the frequency field on the listing and do not decode the number
alone. The non-X ECS parts ECS-40-20-1 and ECS-160-20-1 are Not For
New Designs; the X suffix is the current series, so print the full
orderable number including the X. Some HC-49/US cans have a third
centre lead, which is the case ground, not a crystal terminal; and
the name HC-49/US is also used for surface-mount parts, so check
that the listing says Mounting Type: Through Hole. There is no 1 MHz
crystal on this list, on purpose: the 1 MHz HC-49/U part costs
roughly ten times a 4-16 MHz crystal, its tolerance and stability
are both plus or minus 100 ppm, and its ESR is 3 kΩ, twenty to
seventy-five times a normal MHz crystal's. A 4 MHz crystal divided
by 4 is the honest route to 1 MHz. The 4060 has its own ordering
trap: a DigiKey Marketplace listing for CD74HC4060E under Harris
Corporation is marked Obsolete; order the TI listing.

## Theory

### The 555 in depth

The 555 is an analogue chip with a digital soul: two
comparators, an SR flip-flop of the kind Chapter 7 teaches
from gates, and a discharge transistor, with switching levels
fixed by an internal three-resistor divider. Philips
application note AN170 (Dec 1988) dates its introduction to
mid-1972. It belongs in this book because it is the cheapest
honest way to get a slow, visible clock, and because its
insides are a worked example of the latch and threshold ideas
the reader already owns. It is not a logic family, and its
output levels are not logic levels. Chapter 7 used it
shallowly, as a clock source; this section goes deep, because
every shortcut the 555 invites — an untrimmed capacitor, a
floating pin, a direct drive into logic — is a fault the
reader will otherwise meet on the bench.

One warning governs the whole section: a 555 is not a 555.
The bipolar NE555 and the CMOS TLC555, LMC555 and ICM7555
share a pinout and the same timing formulas, but their output
levels, drive strengths, supply ranges and drift
specifications differ, and one internal priority differs
between lines. This chapter uses the NE555P as its primary
part, with the TLC555CP named as the verified substitute, and
names the part every time a number depends on which one is
fitted. The choice is deliberate: the NE555 is the part
Chapter 7's bench already uses through a buffer gate, and its
drift is specified where the TLC555's is not — proved in the
accuracy section below rather than asserted here.

#### Inside the 555: five blocks

Philips AN170 describes the timer as five circuits, and the
block diagrams in TI SLFS022K (Sep 1973, rev. Mar 2026) and
ST Doc ID 2182 Rev. 6 (Jan 2012) show the same structure. The
book needs the block behaviour, not transistor numbers.

- **The divider.** Three equal resistors between VCC and GND
  — 5 kΩ each in the bipolar part (AN170). Their junctions
  sit at 1/3 VCC and 2/3 VCC; the 2/3 junction is brought out
  as CONT (pin 5). Thresholds and charging rate both scale
  with VCC, so VCC cancels to first order; the residual
  sensitivity is quantified in the accuracy section.
- **The two comparators.** The threshold comparator (upper)
  watches THRES (pin 6) against CONT: "THRES > CONT sets
  output low and discharge low". The trigger comparator
  (lower) watches TRIG (pin 2) against half of CONT: "TRIG <
  1/2 CONT sets output high and discharge open". With CONT
  undriven, half of CONT is 1/3 VCC.
- **The flip-flop.** An SR latch. SET drives OUT HIGH and
  turns the discharge transistor off; RESET drives OUT LOW
  and turns it on. Priority (TI SLFS022I, Sep 1973, rev. Sep
  2014, §8.2 note B and §8.4 function table): RESET can
  override TRIG, which can override THRES. Renesas FN2867
  Rev. 10.01 (5 Mar 2020) states the same priority for the
  ICM7555. The book relies on it for the NE555 and TLC555;
  one other line differs, named in the monostable section.
- **The discharge transistor.** An open-collector switch from
  DISCH (pin 7) to GND in the bipolar part, open-drain in
  CMOS parts. When OUT is LOW it is on, holding the timing
  capacitor discharged; when OUT is HIGH it is off, letting
  the capacitor charge.
- **The output stage.** Bipolar: a totem-pole stage that can
  sink or source up to 200 mA (TI SLFS022K recommended
  operating conditions; absolute maximum ±225 mA). CMOS: a
  CMOS inverter, with asymmetric source and sink capability,
  detailed in the output-level section.

The pinout is the same for every part in this section, 8-pin
DIP or SOIC, verified in every datasheet cited: 1 GND, 2
TRIG, 3 OUT, 4 RESET, 5 CONT, 6 THRES, 7 DISCH, 8 VCC.
Pin-compatibility is not behaviour-compatibility. And the 555
is not a Schmitt trigger, though the capacitor bouncing
between two levels looks like hysteresis: its switching
levels are two separate comparator references, not one input
with hysteresis.

#### The astable circuit

![NE555 astable, 1 Hz design: R1 6.8 kΩ, R2 150 kΩ, C 4.7 µF,
with CONT decoupling and an LED on the output](../images/ch08-555-astable.svg)

One plain crossing in the drawing, where the OUT wire crosses
the R1/R2 chain, is not a connection: no dot, no join.

The astable circuit is identical in TI SLFS022I Fig. 12 and
ST Doc 2182 Rev. 6 Fig. 15:

- R1 from VCC to DISCH (pin 7); R2 from DISCH to THRES (pin
  6); THRES shorted to TRIG (pin 2); timing capacitor C from
  the THRES/TRIG node to GND.
- RESET (pin 4) tied to VCC when unused: active LOW,
  overrides everything, and leaving it floating is a classic
  fault.
- CONT (pin 5) to GND through 0.01 µF (10 nF) for noise
  immunity (ST schematic; TI Fig. 12 Note A: decoupling CONT
  "can improve operation").
- VCC decoupled to GND with 0.1 µF ceramic close to the chip;
  the decoupling section adds ST's stronger recommendation
  for shared supplies.

How it oscillates (TI SLFS022I §8.3.2; AN170): at power-up
the capacitor is discharged, so TRIG sits below 1/3 VCC, the
flip-flop sets, OUT goes HIGH and DISCH turns off. The
capacitor charges through R1 + R2 toward VCC until it reaches
2/3 VCC, when the threshold comparator resets the flip-flop:
OUT goes LOW and DISCH turns on. The capacitor discharges
through R2 only until it falls to 1/3 VCC, when the trigger
comparator sets the flip-flop again. The capacitor voltage
bounces between about 1/3 VCC and about 2/3 VCC forever, and
the output is a square wave. A reader with only a multimeter
cannot see either waveform's shape; the checks below are
blink-counting and average-voltage checks, and the text says
plainly what cannot be checked without a scope.

The formulas, identical in TI SLFS022I §8.3.2, TI SLFS022K
§6.3.2 and ST Doc 2182 Rev. 6 §4.2, are:

```text
tHIGH = 0.693 x (R1 + R2) x C   (OUT HIGH, charging)
tLOW  = 0.693 x R2 x C          (OUT LOW, discharging)
T     = 0.693 x (R1 + 2 x R2) x C
f     = 1.44 / ((R1 + 2 x R2) x C)
D     = (R1 + R2) / (R1 + 2 x R2)   (HIGH fraction)
```

Where 0.693 and 1.44 come from: charging from 1/3 VCC toward
VCC, the time to reach 2/3 VCC is R x C x ln(2) = 0.693 x R x
C, where R is R1 + R2; discharging from 2/3 VCC toward 0 V,
the time to fall to 1/3 VCC is again R x C x ln(2), where R
is R2. And 1 / 0.693 = 1.4428..., rounded to 1.44 in every
datasheet — a rounding error of about 0.1%, negligible next
to every error in the accuracy section.

Duty is always above 50%, because the capacitor charges
through R1 + R2 but discharges through R2 only. This book
defines duty as the HIGH fraction, D = (R1 + R2) / (R1 + 2 x
R2), and says so every time the word is used without that
definition in sight. The trap is TI's two equations: in TI
SLFS022I §8.3.2, eq. (5), the "output driver duty cycle", is
the LOW fraction, R2 / (R1 + 2 x R2) — the fraction of time
the discharge transistor is on — while eq. (6), the "output
waveform duty cycle", is the HIGH fraction above. (SLFS022K
carries the same equations, renumbered.) Many tutorials quote
R2 / (R1 + 2 x R2) bare as "the duty cycle". That is the LOW
fraction, not the fraction of time an LED on the output is
lit. For a counter clock the distinction does not matter,
since counters trigger on one edge; for an LED, and for the
50%-duty circuits later in this section, it matters most of
all.

The first cycle is longer. At power-up, and after a RESET
release, which fully discharges the capacitor, the first HIGH
starts from 0 V rather than from 1/3 VCC. The 0 V to 2/3 VCC
charge time is R x C x ln(3) = 1.099 x R x C, against 0.693 x
R x C for every later HIGH, so the first HIGH is 1.099 /
0.693 = 1.585 times the steady HIGH — a DERIVED ESTIMATE from
the formulas, shown here so it can be checked. AN170 calls
the first cycle "twice as long"; the arithmetic gives 1.585,
and this book uses the arithmetic. A reader counting blinks
from power-up will see one long first blink. Counting checks
must start from the second blink.

#### What the formulas assume, and where they break

The formulas assume thresholds exactly at 1/3 and 2/3 VCC, a
supply constant during each cycle, a discharge switch with no
voltage drop, negligible THRES and TRIG input currents, an
ideal capacitor, and no loading of the timing node or CONT.
Each assumption has a breakdown regime; the book's designs sit
far from most of them, but the map matters. Thresholds vary
per chip: NE555 THRES at 5 V spans 2.4–4.2 V around 3.3 V
typical, TRIG spans 1.1–2.2 V around 1.67 V typical (TI
SLFS022I/K electrical tables). These are per-parameter
extremes across specimens, not paired values for one chip: do
not combine them into a "guaranteed frequency range". Their
net effect is captured by the initial-error specification in
the accuracy section. The discharge switch drops voltage:
NE555 DISCH on-state voltage is 0.15 V typical, 0.4 V maximum
at 8 mA and 5 V (TI SLFS022I/K); at the book's discharge
currents the drop is far below the test point, but it breaks
when R1 is small. THRES current is 30 nA typical, 250 nA
maximum (TI SLFS022I/K); the charging current near threshold
in the 1 Hz design is about 10.6 µA, 42 times the worst-case
THRES current (DERIVED ESTIMATE). The capacitor is never
ideal — the accuracy section is devoted to it. Stray
capacitance and breadboard leakage shift timing, but no
stray-capacitance figures for the 555's pins were found in
the sources read (UNVERIFIED), so the book gives only the
qualitative rule: keep C at about 1 nF or above, keep timing
wiring short, and invent no picofarad number. Speed limits
are far away: NE555 rise and fall times are 100 ns typical,
300 ns maximum at 15 pF load (TI SLFS022I/K). TI describes
the xx555 range as "from 10 µs to hours or from < 1 mHz to
100 kHz"; ST claims a maximum operating frequency above 500
kHz. Different manufacturers' different characterisations,
not a contradiction; the book's clocks sit far below either.

**Resistor limits.** TI's worked maximum total resistance is
about 3.4 MΩ at 5 V (10 MΩ at 15 V), from the THRES-current
note in TI SLFS022I §7.4 and SLFS022K §5.5. Other
manufacturers quote different boundaries from the same
physics: ST gives 3.5 MΩ at 5 V and 20 MΩ at 15 V (Doc 2182
Rev. 6 Table 3 note 2), and AN170 derives 6.6 MΩ at 5 V and
20 MΩ at 15 V as the zero-margin boundary where threshold
current equals the entire charging current. The honest
statement is that about 3.4 MΩ is a "timing still functions"
boundary with large error, not a "timing is accurate"
boundary; stay at least ten times below it, at about 300 kΩ
total or less. At the other end, AN170 recommends 5 kΩ as the
minimum for R1 and 3 kΩ for R2 — guidance, not a hard
specification, consistent with TI's own example values —
because when DISCH is on it carries both the R1 current and
the capacitor's discharge current, and at the transistor's
internal current limit its saturation voltage rises and
stretches the LOW time. R1 = 0 is a fault: DISCH would short
VCC to ground through the transistor when on. The 1 Hz design
satisfies both ends with wide margins: its DISCH current is
about 0.76 mA (DERIVED ESTIMATE). These minima are
bipolar-part guidance, not CMOS limits; CMOS parts have
picoamp threshold currents, and with them the resistor limit
is set by capacitor and board leakage. No CMOS datasheet read
states a maximum resistance (UNVERIFIED as a specified
limit), so none is printed.

#### The 1 Hz anchor design

Solved from f = 1.44 / ((R1 + 2 x R2) x C), these are DESIGN
VALUES — the arithmetic is shown, and the built circuit will
differ by component tolerance:

```text
R1 = 6.8 kΩ,  R2 = 150 kΩ,  C = 4.7 µF
R1 + 2 x R2 = 306.8 kΩ;  (R1 + 2 x R2) x C = 1.4420 s
f = 1.44 / 1.4420 = 0.9986 Hz  (0.14% below 1 Hz)
T = 1.0014 s;  tHIGH = 0.511 s;  tLOW = 0.489 s
duty = 51.1%;  first HIGH = 0.810 s (DERIVED ESTIMATE)
```

Do not present 0.9986 Hz as what will be measured. The 0.14%
arithmetic accuracy is meaningless next to the timing
capacitor's tolerance: a ±20% electrolytic 4.7 µF moves the
real frequency by ±20%, to 0.80–1.25 Hz. Build with these
values, then trim — make R2 a 150 kΩ fixed resistor plus a
50 kΩ trimpot in series — and check by counting blinks
against a stopwatch for 60 seconds, starting from the second
blink: 60 blinks in 60 seconds is 1 Hz within counting error
(±1 blink, about ±1.7%). A multimeter DC average on OUT of
about 2.5 V at near-50% duty is a sanity check only. A
meter's frequency mode, if present, is a bonus, not the
primary check; meter capability at 1 Hz is UNVERIFIED for
any specific meter.

#### The monostable: one pulse, on purpose

In the monostable circuit the 555 has one stable state: at
rest OUT is LOW, the discharge transistor is on, and the
capacitor is held discharged. A trigger produces exactly one
output pulse, then the circuit returns to rest and waits.
Wiring (TI SLFS022I Fig. 9; ST Doc 2182 Rev. 6 Fig. 12): R
from VCC to the THRES/DISCH node; C from that node to GND;
THRES (pin 6) connected to DISCH (pin 7) and to the R/C node;
TRIG (pin 2) driven by the external trigger — not tied to
THRES, which is what makes it a one-shot rather than an
oscillator. Between triggers TRIG must be held HIGH, above
1/3 VCC; a pull-up to VCC is the usual way when the source is
a switch or an open-collector driver. No datasheet read
specifies a TRIG pull-up value, so 10 kΩ is offered only as
a practical starting choice (DESIGN VALUE, not a TI
specification). CONT (pin 5) goes to GND through 0.01 µF;
RESET (pin 4) is tied to VCC when unused.

TI SLFS022I §8.3.1 describes the sequence: a negative-going
pulse on TRIG sets the flip-flop, drives OUT HIGH and turns
the discharge transistor off; the capacitor charges through R
until it reaches the threshold voltage, and — if TRIG has
returned HIGH — the threshold comparator resets the flip-flop,
drives OUT LOW and discharges the capacitor. The pulse-width
formula, agreed by TI, ST and Renesas, is tW = 1.1 x R x C.
The 1.1 is ln(3) = 1.0986: the capacitor charges from 0 V
toward VCC, and the time to reach 2/3 VCC is −RC x ln(1 −
2/3) = RC x ln(3). TI states the formula as "approximately"
1.1 x R x C and notes it already absorbs the threshold level
and the discharge transistor's saturation voltage; do not
"correct" it further. Worked DESIGN VALUES:

```text
R = 100 kΩ,  C = 10 µF   ->  tW = 1.10 s
R = 91 kΩ,   C = 10 µF   ->  tW = 1.001 s
R = 10 kΩ,   C = 100 nF  ->  tW = 1.10 ms
R = 1 MΩ,    C = 1 µF    ->  tW = 1.10 s  (warning, see text)
```

The last row is a warning, not a recommendation: with a
bipolar 555, R = 1 MΩ puts the charging current within an
order of magnitude of leakage and THRES-current effects.
Prefer 100 kΩ with 10 µF for a 1 s pulse with a bipolar
part, or a CMOS part with the 1 MΩ version. The four rows
are not equally good, and the book must not present them as
if they were.

**Triggering rules.** The trigger is level-sensitive, not
edge-sensitive: triggering occurs when TRIG falls below the
trigger level (about 1/3 VCC; NE555 range 1.1–2.2 V at 5 V,
typical 1.67 V, TI SLFS022I/K). There is no minimum
fall-rate requirement in the datasheets read, and no
datasheet minimum trigger pulse width was found for the
NE555 or TLC555 (UNVERIFIED as a specification; TI support
guidance suggests 1 µs and 100 ns respectively, but guidance
is not a specification, and every realistic bench trigger is
orders of magnitude longer). The rule that bites is the
return rule: TRIG must be HIGH for at least 10 µs before the
end of the timing interval for the bipolar xx555 (TI
SLFS022I §8.3.1), and at least 1 µs for the TLC555 (TI
SLFS043K §6.3.1). The 10x difference is real and
part-specific; do not quote one part's number for the other.
The same storage times set the minimum pulse width: 10 µs
bipolar, 1 µs TLC555. Bench pulses of milliseconds and up
satisfy both rules easily, provided the trigger is short
compared with the output pulse.

**Trigger held low: the output follows the trigger.** If TRIG
is still below 1/3 VCC when the capacitor reaches 2/3 VCC,
the trigger comparator's SET dominates the threshold
comparator's RESET (the priority stated above), so the
flip-flop cannot reset. AN170 states it plainly: the output
remains HIGH for the duration of the low trigger signal, and
falls immediately when the trigger returns HIGH. Renesas
FN2867 says the same for the ICM7555. The pushbutton trap
follows directly: a button wired to TRIG and held down longer
than 1.1 x R x C does not produce a 1.1 x R x C pulse — it
produces a pulse as long as the press. Teach one of three
fixes: keep the output pulse longer than any plausible press;
AC-couple the trigger (AN170 Fig. 3: a capacitor and resistor
differentiator making a short negative pulse — the figure's
component values were unread in extraction, so any values
printed are DESIGN VALUES, not AN170 values); or trigger
from a short logic pulse. Never present "press the button,
get exactly 1.1 x R x C" without the held-low caveat.

**Retriggering during the pulse is ignored.** ST Doc 2182
Rev. 6: once triggered, the circuit remains in its state
until the set time has elapsed, "even if it is triggered
again during this interval". The 555 monostable is
non-retriggerable: extra triggers during the pulse neither
extend nor restart it, provided each trigger returns HIGH in
time. If a trigger is still LOW at the end, the held-low
behaviour above applies instead. RESET during the pulse
aborts it: OUT goes LOW immediately, the capacitor
discharges, and on RESET release (with TRIG HIGH) the circuit
waits for the next trigger.

**The LM555 exception.** TI's E2E support FAQ states that the
LM555 gives priority to threshold over trigger, the opposite
of the NE555, so it can retrigger itself into a double-width
pulse. That priority was cited to the FAQ only, not read from
the LM555 datasheet's function table (UNVERIFIED as a
datasheet citation), but the practical point stands: the 555
family is not one die, and a substituted LM555 may behave
differently when the trigger is held low. The LMC555's
trigger/threshold priority was not checked at all
(UNVERIFIED). Name the recommended parts — NE555, TLC555 —
and warn against assuming "a 555 is a 555". One further
honesty note: the monostable's output state at the instant of
power-up, before supplies settle, is not specified in the
datasheets read (UNVERIFIED); do not promise "output starts
LOW" as a power-on guarantee. The settled rest state, OUT LOW
with the capacitor discharged, is the specified behaviour.

#### How accurate is a 555? The tolerance stack, worked honestly

No datasheet gives a total accuracy specification combining
chip and resistor-capacitor errors. The budgets below are
this book's arithmetic from verified figures, labelled
DERIVED ESTIMATES throughout — never datasheet values. Five
contributions must be kept separate: chip initial error
(fixed per chip, removed by trimming); resistor tolerance
(fixed) and tempco (drifts); capacitor tolerance, tempco,
voltage coefficient and leakage (usually the largest term);
chip temperature drift; and chip supply sensitivity. Two
questions must never be blurred: how far from nominal will an
untrimmed build be, and how far will a trimmed build wander?
A trimmed clock can be set to 1.000 Hz on one afternoon and
still lose minutes per day as the room warms and cools.
Conversion: 1% error is 864 seconds per day, 14.4 minutes
per day.

**Chip initial error.** TI SLFS022I §7.5, note (2), defines
timing-interval error as the difference between the measured
value and the average of a random sample from each process
run: a spread around the process average, not an error versus
the formula. TI SLFS022I §7.5 and ST Doc 2182 Rev. 6 Table 3
agree: NE555 monostable initial accuracy 1% typical, 3%
maximum; NE555 astable 1.5% typical, 2.25% maximum, at the
0.1 µF test circuits. TI deleted the initial-error
specification in Rev. J (SLFS022K §9 revision history), so
it is cited to SLFS022I and ST only — never to SLFS022K.
Swapping the chip in an otherwise identical 1 Hz build can
move the frequency by about 1–2% typically, up to 2.25%:
fixed per chip, removed by trimming, not drift. CMOS: TLC555
initial error 1% typical, 3% maximum (TI SLFS043I, Aug 1983,
rev. Jul 2019, §6.7 — UNVERIFIED against SLFS043K §5.8); ICM7555 timing accuracy 2% in each
mode (FN2867, single values); LMC555 timing accuracy is
specified as an absolute time, 1.0 / 1.1 / 1.20 ms at 5 V
(TI SNAS558J, Feb 2000, rev. Mar 2013), which TI's E2E FAQ
calls far too pessimistic as an accuracy statement — do not
quote ±9% as the LMC555's practical accuracy.

**Resistors.** Prefer 1% metal-film resistors for timing
(AN170: metal film "if timing accuracy and repeatability are
important"). Vishay MRS25 metal film: ±1% tolerance, 50
ppm/°C temperature coefficient (Doc. 28724, Rev. 17-Aug-2011).
R2 carries about 98% of the weight in the 1 Hz design, so
±5% in R2 moves frequency by ∓4.9% (DERIVED ESTIMATE), while
±5% in R1 moves it by only ∓0.11%. Tempco over 10 °C is
0.05% (DERIVED ESTIMATE), small against every capacitor term.
No carbon-film tempco was checked (UNVERIFIED); quote no
number for it.

**Film capacitors.** Polyester and polypropylene come in
±5%, ±10% and ±20% grades, and the grade is in the part
number (J = ±5%, K = ±10%, M = ±20%) — buy the grade, do not
assume it. Temperature coefficient: polyester +400 (±200)
ppm/°C (KEMET R82, F3101_R82, 6 Jul 2023); polypropylene
−(150 ±70) ppm/°C (KEMET A72, F3039_A72, 27 Jul 2015). Over
a 10 °C room swing that is +0.40% and −0.15% (DERIVED
ESTIMATES). Polyester's tempco exceeds the NE555 chip's own
150 ppm/°C: film type matters. KEMET's R82 polyester range
reaches 4.7 µF, so a 4.7 µF film timing capacitor is real
and buyable, but physically large beside an
electrolytic. Availability of a specific 4.7 µF
polypropylene through-hole part was not checked (UNVERIFIED
as a buyable item).

**Ceramic: split by dielectric class, or say nothing.**
C0G/NP0 (Class I) is stable, with essentially zero voltage
coefficient — the right ceramic for timing, but only
practical up to about 100 nF, so it cannot serve as the
4.7 µF timing capacitor. X7R, X5R and Y5V (Class II, high-K)
must not be used for timing. Their capacitance falls with
applied DC voltage by an amount that is part-specific and
cannot be quoted as a universal percentage: Murata's MLCC
specifications state that a high-dielectric-constant
capacitor's value changes with applied DC voltage, and an
Analog Devices tutorial (2012, using Murata SimSurfing data)
shows a 4.7 µF 16 V X7R at 12 V bias delivering 1.53 µF in
an 0805 package (33% of nominal) or 3.43 µF in a 1206
package (73%) — same capacitance, same dielectric, same
bias, different package, wildly different result. The X7R
temperature specification (±15% over −55 °C to +125 °C)
says nothing about voltage behaviour; reading it as a
voltage figure is the misreading this book must warn against
explicitly. At the 555's 1.67–3.33 V capacitor swing the bias
effect is smaller than in the 12 V example, but it varies
within each cycle, distorting the exponential rather than
merely scaling it. Book rule: no X7R/X5R/Y5V timing
capacitors, period. For decoupling and the CONT bypass, X7R
is fine, because value accuracy does not matter there.
AN170's 1988 advice against ceramic disc capacitors predates
modern C0G MLCCs and must not be quoted as covering C0G.

**Aluminium electrolytic: the only practical choice for
large values, with the largest errors.** Tolerance is ±20%
at 120 Hz and 20 °C across essentially all general-purpose
series (representative: Nichicon UVZ/PJ series, CAT.8100J),
which alone moves an untrimmed 1 Hz build to 0.80–1.25 Hz.
Leakage is specified as a maximum of the form I ≤ 0.01 x C x
V or 3 µA, whichever is greater, after 2 minutes at rated
voltage. Worked worst case for the 1 Hz design (DERIVED
ESTIMATE, 4.7 µF 25 V part): 0.01 x 4.7 x 25 = 1.18 µA, so
the 3 µA floor governs — 14–28% of the 21.2–10.6 µA
charging current, enough to stretch the HIGH time very
noticeably if a part actually leaked at its maximum. Three
caveats are essential: the spec is a maximum at rated
voltage, while the timing capacitor sees 1.67–3.33 V, so
real leakage is typically far lower; leakage subtracts from
charging current, lengthening the HIGH time rather than
merely scaling frequency; and leakage grows with temperature
and storage time unpowered. Present leakage as a worst-case
bound and a reason to prefer film, not as a typical error.
No electrolytic temperature-coefficient figure was found
(UNVERIFIED): invent none, and no trimmed budget with an
electrolytic can be computed. Polarity: the astable
capacitor voltage stays between 1/3 and 2/3 VCC, always
positive, so a polarised electrolytic goes with its positive
terminal toward the THRES/TRIG node.

**Chip drift and supply sensitivity — read the grade split.**
TI SLFS022K §5.6 and ST Doc 2182 Rev. 6 Table 3 agree, and
the 90/150 figures are a grade split, not typ/max:

```text
NE555 astable:    150 ppm/°C typ (no max); 0.3 %/V typ
NE555 monostable:  50 ppm/°C typ; 0.1 typ, 0.5 max %/V
SE555 astable:     90 ppm/°C typ; 0.15 %/V typ
SE555 monostable:  30 typ, 100 max ppm/°C; 0.05/0.2 %/V
```

Conditions are the 0.1 µF test circuits; no drift figures at
the book's 4.7 µF values exist in the datasheets read. The
"0.005%/°C temperature stability" on ST's cover is 50
ppm/°C — the monostable figure. Quoting it for an astable
clock understates drift threefold: use the astable figure
for clocks, the monostable figure for one-shots, never the
cover figure bare. The sign of the astable coefficient was
not verified from a datasheet (UNVERIFIED): quote magnitudes
and assert no direction. In human terms (DERIVED ESTIMATES,
assuming a bench supply wandering ±0.1 V): 0.3 %/V moves
frequency ±0.03%, or ±26 seconds per day; a ±0.5 V wander
moves it ±0.15%, or ±130 seconds per day. CMOS drift must
not be borrowed from the bipolar figures. **TLC555
temperature drift is not specified at all** — TI's E2E
support states explicitly that "how the frequency moves
across temperature is not specified in the electrical
specifications". Its supply sensitivity is 0.1% typical,
0.5% maximum per volt (TI SLFS043I §6.7, same
UNVERIFIED-against-K flag as its initial error). Do not claim
CMOS temperature superiority: the drift exists, its size is
simply not specified. LMC555: 75 ppm/°C, 0.3 %/V (SNAS558J).
ICM7555: 0.5 %/V supply drift (FN2867) and a feature claim
of 0.005%/°C at +25 °C; its drift-table ppm/°C values did
not survive text extraction (UNVERIFIED as table values).

**Worked budgets for the 1 Hz astable (DERIVED ESTIMATES).**
Worst-case sums add magnitudes (pessimistic, but honest as a
bound); root-sum-square (RSS) assumes independent random
errors. Both are estimates, not specifications.

```text
A: untrimmed, NE555 + 5% R + ±20% electrolytic (parts-bin)
   ±20% cap, ±4.9% R2, ±0.11% R1, ±2.25% chip max
   worst ±27.3% = 6.5 h/day;  RSS ±20.7% = 5.0 h/day
B: untrimmed, NE555 + 1% metal-film + ±5% film (good parts)
   worst ±8.25% = 2.0 h/day;  RSS ±5.6% = 1.3 h/day
C: trimmed at 25 °C, wandering over 10 °C and ±0.1 V
   (NE555 + polyester + 1% metal-film; drift terms only)
   0.15% chip + 0.40% cap + 0.05% R + 0.03% supply
   worst 0.63% = 9.1 min/day; RSS 0.43% = 6.2 min/day
   polypropylene cap: worst 0.38% = 5.5 min/day
```

Budget A is a demonstration, not a timekeeper: it can easily
run at 0.8 Hz or 1.2 Hz, and worst-case leakage (not
included) can stretch the HIGH time further. Even Budget B
is roughly 5–8% off: trimming is not optional for a clock
that must read 1 Hz; it is the whole game. The honest
headline, trimmed with a film capacitor: worst-case wander
of 0.38–0.63%, or 5.5–9.1 minutes per day, from ordinary
room-temperature changes. No trimmed budget can be computed
for the TLC555, because its temperature drift is not
specified — do not present one by borrowing NE555 figures.
Its untrimmed accuracy is similar to Budget B, and its
trimmed wander is dominated by the same capacitor tempco
plus an unspecified chip term. That sentence is the honest
limit. The 555 teaches oscillation and division; it does not
keep time. That is the bridge to the rest of this chapter.

#### CONT and RESET: two pins, two different traps

**CONT (pin 5)** is the 2/3-VCC node of the internal divider,
brought out. Open-circuit CONT voltage for the NE555 is
2.6–4.0 V at 5 V, typical 3.3 V (TI SLFS022I/K). THRES is
compared against CONT and TRIG against half of CONT, so
driving CONT moves both thresholds together. The standard
treatment is a 0.01 µF capacitor from CONT to GND, present in
ST's schematics and "strongly recommended" by AN170 for noise
immunity: noise on an unconnected CONT modulates both
thresholds directly, and the timing error is unquantifiable
and intermittent — the worst kind. Fit the capacitor in every
bipolar build, and treat a floating CONT as the first suspect
when a 555 frequency wanders. (Renesas states the ICM7555's
CONT "need not be decoupled"; fitting the capacitor does no
harm, and the standard circuit keeps it for consistency.)
Driving CONT is legitimate — it is the basis of pulse-width
modulation — but ranges and drive stiffness are
part-specific. AN170 guidance (not a datasheet specification):
monostable CONT from 45% to 90% of VCC, "not firm, but only an
indication to a safe usage"; astable CONT from 1.7 V to VCC.
TI's pulse-width modulator allows modulation from ground to
VCC but warns the application must tolerate a nonlinear
transfer function. For the TLC555, TI SLFS043K §6.3.1 gives
datasheet text: 10% to 80% of supply, "from a resistor divider
with at least 500 µA bias, provides good results". Note the
stiffness: the divider driving CONT must be stiff against the
internal divider. No bipolar bias-current number was read
(UNVERIFIED as a bipolar specification), though the bipolar
divider itself draws VCC / 15 kΩ = 333 µA at 5 V (DERIVED
ESTIMATE from AN170's 3 x 5 kΩ). A high-impedance source,
such as a 100 kΩ potentiometer wiper, will be pulled by the
internal divider and will not set the intended thresholds.
Timing effect (DERIVED ESTIMATES): monostable with CONT held
at VC, tW = −RC x ln(1 − VC/VCC), so at 5 V, VC = 2.5 V gives
0.693 x RC and VC = 4.0 V gives 1.609 x RC, against 1.099 x
RC nominal. Never wire CONT directly to a rail for timing
use: CONT = GND forces both thresholds to 0 V and the astable
sticks LOW with DISCH on; CONT = VCC forces the threshold to
VCC, which the capacitor approaches but never reaches, so the
astable sticks HIGH. Both are DERIVED consequences of the
threshold equations, not datasheet prohibitions.

**RESET (pin 4)** is active LOW and overrides everything:
RESET LOW forces OUT LOW and DISCH on, regardless of TRIG and
THRES (TI function table, first row). Uses: gating an astable
on and off, aborting a monostable pulse, and a standby state
at power-up. Releasing RESET starts a long first cycle, since
the capacitor was fully discharged. RESET switching threshold
(NE555): 0.3 V minimum, 0.7 V typical, 1.0 V maximum (TI
SLFS022I/K) — below 0.3 V is guaranteed reset, above 1.0 V
guaranteed out of reset, between is unspecified. TLC555 RESET
voltage exact values were not extracted from SLFS043K
(UNVERIFIED); do not print them without a fresh read, and do
not borrow values from another variant's datasheet. When
unused, tie RESET to VCC (TI SLFS022I §8.3.1; ST §4.1 agree).
A floating RESET pin is a high-impedance node with a roughly
0.7 V threshold next to switching circuitry; noise can pull
it below threshold and reset the timer spuriously. No
datasheet read specifies an internal pull-up on RESET
(UNVERIFIED whether any internal biasing exists); do not
claim one exists. Floating RESET is a wiring fault, not a
style choice.

**The bipolar RESET pull-up trap.** The NE555's RESET pin
draws current: 0.1 mA typical, 0.4 mA maximum at VCC (TI
SLFS022I/K). If RESET is pulled up through a resistor R, the
pin voltage is VCC − IRESET x R. With R = 10 kΩ — the
TLC555's example value, below — at maximum current: drop =
0.4 mA x 10 kΩ = 4.0 V, leaving the pin at 1.0 V, exactly at
the maximum reset threshold, and therefore not guaranteed out
of reset. At typical current the pin sits at 4.0 V and works,
which is why the fault is intermittent and confusing. With
R = 1 kΩ: drop ≤ 0.4 V, pin ≥ 4.6 V, safe. Book rule: for the
bipolar 555, tie unused RESET directly to VCC with a wire; if
RESET must be pulled up through a resistor because it is also
driven, use ≤ 1 kΩ and verify the pin voltage, or buffer the
drive. **Never transfer the TLC555's 10 kΩ pull-up example to
the NE555.** TI SLFS043K §6.3.1 gives that example for the
TLC555 — "use a pullup resistor to VDD (such as 10 kΩ)" when
RESET is driven — and for the TLC555 it is sound, because its
RESET current is picoamp-class (maximum 75 pA, C grade), so a
10 kΩ pull-up drops microvolts. The asymmetry follows
directly from bipolar versus CMOS input currents, and it is
the most likely-to-bite fact in this section that no tutorial
teaches.

#### The output-level problem, and the CMOS comparison

Chapter 7 states the problem; this section gives the numbers
behind it without re-deciding the solution. The bipolar
NE555's HIGH output is not rail-to-rail. The exact table
values, read directly from TI SLFS022I §7.4 and SLFS022K §5.5
(identical) and corroborated by ST Doc 2182 Rev. 6 Table 3:
at VCC = 5 V and source current −100 mA, NE555 VOH is 2.75 V
minimum, 3.3 V typical. (The 3.0 V minimum sometimes quoted
is the SE555 grade's minimum; the NE555 minimum is 2.75 V.)
The crucial qualifier: the table gives VOH only at −100 mA
and −200 mA source current. There is no light-load VOH row
in the TI or ST electrical tables. The often-quoted "1.5–1.7 V
below the rail" is the drop at 100 mA typical (5 − 3.3 =
1.7 V). At light load the output rises toward the rail, but
by how much is specified only by a typical-characteristic
curve, and this book quotes no graph-read numbers. The
conclusion: a bipolar NE555 driving 74HC inputs directly is
not guaranteed by specification, because no datasheet row
covers the light-load case and the only guaranteed row, 2.75 V
minimum at 100 mA, is below the 74HC VIH requirement of about
3.5 V at 5 V (the 0.7 x VCC family pattern; DERIVED ESTIMATE
by interpolation). That it often works on the bench — light
loads, Schmitt inputs, typical rather than worst-case chips —
is consistent with the curve's shape, and is not a guarantee.
The LOW level is not the problem: NE555 VOL is 0.1 V typical,
0.35 V maximum at 5 mA, and 0.15/0.4 V at 8 mA (TI
SLFS022I/K), comfortably below the 74HC VIL of about 1.5 V.
The level problem is HIGH-only. And "TTL-compatible" must not
be misread: TI specifies the output as compatible with TTL
inputs, whose VIH is about 2.0 V. TTL-compatible does not
imply HC-compatible — the single most common misreading in
555 tutorials.

Chapter 7's solution stands: buffer the bipolar 555 output
through a spare 74HC14 gate, and cross-refer to Chapter 7
rather than re-deciding it here. The CMOS alternative is a
part whose output clears the HC requirement by specification
— but "rail-to-rail" means different things in each
datasheet. TLC555: feature line "CMOS output capable of
swinging rail to rail" (TI SLFS043K), behind which stands VOH
minimum 4.1 V, typical 4.8 V at −1 mA and 5 V (TI SLFS043I
§6.5; SLFS043K §5.6 same values) — 4.1 V minimum clears
3.5 V with margin, the guarantee the NE555 lacks. ICM7555: no
rail-to-rail feature line, but the application text states
the output swing equals the supply voltage "if driving CMOS"
— explicitly conditioned on CMOS (unloaded) loads — with VOH
minimum 4.0 V, typical 4.3 V at only 0.8 mA source (FN2867;
min/typ column assignment inferred from the table layout —
UNVERIFIED as a min/max assignment). LMC555: no rail-to-rail phrase was found
in the material read; what it claims is "Output Fully
Compatible with TTL and CMOS Logic at 5V Supply", with VOH
minimum 4.4 V, typical 4.7 V at −2 mA (SNAS558J) — the
strongest VOH numbers of the three CMOS parts at a stated
current. Cite the LMC555's numbers, not a slogan it does not
use.

CMOS drive is asymmetric, and the asymmetry is the trap.
TLC555: sink 100 mA typical, source 10 mA typical (TI
SLFS043K features), absolute maxima 150 mA sink and 15 mA
source (TI SLFS043F, Aug 1983, rev. Feb 2005). Sourcing a
20 mA LED from a TLC555 exceeds its typical source capability
and nears its absolute-maximum source current. Sink the LED
— LED and resistor from VCC to OUT — keep sourced current to
about 5 mA or less (DESIGN VALUE), or buffer with a
transistor. LMC555 is tested to −10 mA source and +50 mA
sink; ICM7555 absolute-maximum output current is 100 mA and
it will drive at least two standard TTL loads at 4.5 V or
above. Do not present the CMOS parts as interchangeable for
heavy loads. Never drive an inductive load directly from any
555 without a flyback diode and a transistor; no datasheet
read states inductive protection, and this is general
practice, flagged as such. Supply current at 5 V, no load:
NE555 about 3 mA typical (OUT LOW) against TLC555 180 µA,
LMC555 100 µA and ICM7555 40 µA typical — though an LED at
10–20 mA dominates everything in most bench builds, and any
battery discussion must include the load. Supply ranges
(recommended): NE555 4.5–16 V, so it cannot run from a 3.3 V
rail; TLC555C 2–15 V (I grade 3–15 V — the grade matters at
low voltage); LMC555 1.5–15 V; ICM7555 2–18 V guaranteed.

**The pull-up workaround, bounded.** A pull-up resistor from
OUT to VCC can lift a bipolar 555's HIGH level for logic-only
loads, and the 1 kΩ–10 kΩ range is justified by calculation
from TI table values — as a bounded design choice with a
mandatory multimeter test, not as a datasheet guarantee.
Lower bound: with R = 1 kΩ, pull-up current while OUT is LOW
is 5 mA, and VOL is ≤ 0.35 V maximum at 5 mA, comfortable
against the 1.5 V VIL; R = 470 Ω would draw 10.6 mA, beyond
the 8 mA table row, with VOL unquantified (UNVERIFIED by
extrapolation). TI's own application figures use RL = 1 kΩ
with the note "RL improves VOH", though in a TTL-load
context, not an HC one. Upper bound: at R = 10 kΩ the
pull-up supplies 50 µA at 4.5 V, 50 times the worst-case HC
input leakage of about 1 µA (DERIVED ESTIMATE). Limits, all
mandatory: the calculation assumes logic-only loads — with an
LED on OUT, redo the LOW-state current sum; the HIGH level
achieved is not guaranteed by any datasheet row and depends
on the individual chip; the multimeter test remains mandatory
— OUT HIGH must read above 3.5 V and OUT LOW below 1.5 V
before connecting to counters; the HC14-buffer solution and
the CMOS-555 solution are both cleaner than the pull-up,
which is a workaround for "only a bipolar 555 and no spare
gate", not the recommended route; and never raise the 555's
supply above the logic supply to fix VOH, since the output
would exceed the HC absolute-maximum input voltage.

#### Decoupling and the bipolar switching spike

The bipolar totem-pole output draws large transient
("crowbar") currents during transitions. Renesas FN2867
quantifies them: bipolar SE/NE555 supply spikes of 300–400
mA, versus ICM7555 spikes of only 2–3 mA. TI does not
quantify the spike; it recommends the cure: "A bypass
capacitor is highly recommended from VCC to ground pin;
ceramic 0.1 µF capacitor is sufficient" (SLFS022I/K). ST
recommends more: "minimum recommended is 0.1 µF in parallel
with 1 µF electrolytic" (Doc 2182 Rev. 6 §4.6). AN170 adds
that the bypass capacitor goes directly across the device, as
close as physically possible, because supply ripple can cost
timing accuracy. Book rule: 0.1 µF ceramic close to pins 8
and 1 in every bipolar build, plus 1 µF electrolytic
alongside it when the 555 shares a supply with logic — the
book's case. For CMOS parts the spikes are about 100 times
smaller, but bypassing is still good practice: fit the same
0.1 µF and do not teach "CMOS needs no decoupling" as a rule.
Symptoms of inadequate decoupling are logic glitches
coincident with 555 transitions, frequency pulling when a
load switches, and intermittent counter miscounts. A
multimeter cannot see the spikes — they are
nanosecond-scale — so the fix is preventive, not diagnosed
by measurement.

#### Getting close to 50% duty

For a clock that must be 50%, the most honest recommendation
needs no analogue caveats: feed any astable output into a
toggling flip-flop (one half of a 74HC74, or a 74HC390 ÷2
section) and take the flip-flop output. Toggling gives
exactly 50% duty at half the frequency, regardless of input
duty, by the definition of toggling and Chapter 7's
flip-flop behaviour. One extra chip section, exact result, no
diode-drop arithmetic. The three manufacturer analogue
circuits below are distinct circuits with distinct formulas;
do not conflate them, and do not print their formulas
interchangeably.

Variant A — ST divider circuit (ST Doc 2182 Rev. 6 §4.5, Fig.
21). RA and RB are connected as a divider, in a topology that
is not the classic astable; copy Fig. 21 exactly. ST gives t1
(HIGH) = 0.693 x RA x C, and a t2 (LOW) formula involving a
logarithm of a resistor ratio which did not survive text
extraction reliably and is NOT reproduced here (UNVERIFIED as
extracted — read §4.5 from the ST PDF before using t2 or
frequency quantitatively). ST's example values are RA 51 kΩ,
RB 22 kΩ, with the condition that the circuit will not
oscillate if RB exceeds half of RA, because the RA/RB
junction cannot then bring pin 2 down to 1/3 VCC. The
near-50% duty is achieved by component choice within this
topology, not guaranteed by it.

Variant B — ICM7555 output-feedback circuit (Renesas FN2867
Fig. 4, Eq. 1). The timing resistor is driven from the output
(pin 3) instead of from VCC: "The output swings from
rail-to-rail, and is a true 50% duty cycle square wave."
Frequency f = 1 / (1.4 x R x C), with less than 1% frequency
variation over +5 V to +15 V (FN2867). This circuit requires
a rail-to-rail CMOS output: with a bipolar 555, the
asymmetric HIGH/LOW output drops break the symmetry and the
duty departs from 50% in a load-dependent way (DERIVED
consequence of the output-drop analysis above; FN2867
describes the circuit for the CMOS part only). Whether DISCH
(pin 7) is used or left unconnected in Fig. 4 could not be
determined from text extraction (UNVERIFIED — check the
figure before showing this circuit).

Variant C — diode across RB (Philips AN170 Fig. 6). A diode
in parallel with RB, cathode toward the timing capacitor,
bypasses RB during charging; a second diode in series with
RB, cathode away from the capacitor, is "desirable, but not
mandatory". AN170: "This scheme will afford a duty cycle range
from less than 5% to greater than 95%." Timing formulas for
this variant are UNVERIFIED from a manufacturer source: AN170
gives the topology and duty range, not corrected timing
formulas, and the commonly quoted tHIGH ≈ 0.693 x RA x C
ignores the diode's forward drop, which slows charging. The
diode part number is likewise UNVERIFIED from AN170's text as
read. Show this variant only as a topology with AN170's
duty-range claim and the explicit warning that timing must be
set by measurement and trimming, not by the uncorrected
formulas — or omit it in favour of the divide-by-two method
above. Do not print diode-variant timing formulas as
datasheet values.

#### Which 555 to buy

Order the part number and package, not a status word.
Statuses below are snapshots from the documents and dates
stated, not fresh availability claims; the parts list at the
head of this chapter carries the drafting-time recheck dates,
and no stock quantity or price is printed in this
book. NE555P (TI, PDIP-8): ACTIVE per a TI package addendum
dated 18 September 2026; TI PCN 20260326003.1 (27 Mar 2026,
first ship 25 Jun 2026) records a design change with no
part-number change and unchanged electrical-table values.
TLC555CP (TI, PDIP-8): ACTIVE in the TI SLFS043I addendum
dated 26-Feb-2019 — the newest TI addendum found for this
part is from 2019, and that age is stated here rather than
smoothed over. ICM7555IPAZ (Renesas, PDIP-8) is the Renesas
CMOS alternative, listed in FN2867 Rev. 10.01's ordering
table; LMC555CN/NOPB (TI, PDIP-8) has thin, spotty
distribution and is not the recommended primary. ST's NE555N
appears in the 2012 ordering table of Doc 2182 Rev. 6, but
its current lifecycle status was not checked (UNVERIFIED);
TI NE555P is the verified sourcing route for a bipolar DIP
555. Buy branded parts (TI, ST) from authorised distributors:
the NE555 is one of the most cloned parts in existence, and
very cheap unbranded chips may not meet TI/ST specifications.
Treat unbranded kit parts as "verify by measurement" — the
multimeter output-level test and the blink-count check above
— and quote no counterfeit statistics, since none were
verified.

### What a crystal is: a tuning fork you cannot see

Chapter 7 gave you two clocks. The 74HC14 RC oscillator, with
f ~ 1.10 / (R x C) as a DERIVED ESTIMATE carrying roughly a
factor-of-two uncertainty, is right for tones and blink rates and
wrong for a wall clock. The 555, in the section just before this
one, is a better clock but still a percent-class one: minutes to
hours a day. This section is the next rung. A quartz crystal turns
the same dividers into a clock that gains or loses seconds a day,
and the reason is mechanical, not electronic.

A quartz crystal is a sliver of quartz cut so that it vibrates at
one sharply defined frequency. Quartz is piezoelectric: apply a
voltage and it flexes; flex it and a voltage appears. The
oscillator circuit's job is only to replace the tiny energy lost
each cycle, and to present the crystal with the electrical load it
was trimmed for. Electrically the crystal looks like a small
resonant circuit (ST AN2867, Rev. 16, section 1). At the series
resonant frequency Fs it looks like its loss resistance alone.
Between Fs and the higher antiresonant frequency Fa it behaves as
an inductance, and a Pierce oscillator runs it in exactly that
region, at the load frequency Fp. Fp sits above Fs, and it falls
as the load capacitance rises: more load pulls the frequency
down, less load lets it rise. Remember that sign. It is the whole
of the load-capacitance section below.

The book uses two kinds of crystal, and they differ electrically
far more than their similar cans suggest. A 32.768 kHz tuning-fork
crystal has an ESR of tens of kΩ, a drive limit of about 1 µW, and
a start-up time of 1 to 5 s, in a 2 x 6 mm cylinder. An MHz
AT-cut crystal has an ESR of tens to about 180 Ω, a drive limit
of 100 µW typical to 1 mW maximum, and a start-up time of a few
milliseconds, in an HC-49 can. Never let a sentence about
"crystals" blur them: a resistor value right for one is wrong for
the other by two orders of magnitude.

Crystal errors are quoted in parts per million, ppm, and ppm means
nothing until it is seconds per day. One ppm is 0.0864 seconds per
day (DERIVED, exact arithmetic). So 20 ppm is 1.7 seconds a day, a
good quartz watch; 100 ppm is 8.6 seconds a day, a minute a week;
10,000 ppm, 1%, is 14.4 minutes a day, the 555's class. A
breadboard crystal clock does not achieve the crystal's datasheet
tolerance alone. A worst-case error budget for the 32.768 kHz
bench clock (DERIVED ESTIMATE, arithmetic visible) is: tolerance
±20 ppm, plus indoor temperature error about ±8 ppm, plus load
and stray-capacitance error about ±35 ppm, plus ageing ±3 ppm,
about ±66 ppm worst case, roughly 6 seconds a day. A typical
build does better, tens of ppm, a few seconds a day: a hundred to
a thousand times more accurate than a 555, and the first clock in
this book that can credibly be called a clock.

### The Pierce oscillator, in block terms

The circuit this section teaches is the Pierce oscillator: one
inverting amplifier, one crystal, two load capacitors, one
feedback resistor, one series resistor, and one buffer gate. In
block terms, the parts sit in this order, each with one job:

1. The **inverter** is the amplifier. Biased into its linear
   region, it supplies the energy the crystal loses each cycle.
   It must be an unbuffered inverter, the 74HCU04; see below.
2. The **feedback resistor RF** sits across the inverter, output
   to input. It biases the gate at its own threshold, about
   VCC/2, where its small-signal gain is greatest, so oscillation
   can start from noise (AN2867, section 3.2).
3. The **crystal** sits between the inverter's input node and its
   output node, through the series resistor. It sets the
   frequency; the inverter only supplies energy.
4. The **two load capacitors** run from the crystal's two nodes
   to ground. Together with stray capacitance they present the
   crystal with its specified load capacitance CL, worked out in
   the load-capacitance section, never guessed.
5. The **series resistor RS** sits between the inverter output
   and the crystal. It limits the power dissipated in the
   crystal, and with the output-side load capacitor it forms a
   low-pass filter that forces the oscillator to start at the
   crystal's fundamental frequency (AN2867, section 3.5.3).
6. The **buffer gate**, a second gate of the same package, takes
   its input from the oscillator inverter's output, and the rest
   of the circuit takes its clock from the buffer. The oscillator
   nodes must never be loaded directly: anything hung on them
   changes the effective load capacitance and pulls the
   frequency, and a heavy load can stop the oscillator outright.
   The buffer also squares up the rounded waveform to full logic
   levels.

How it works, in one paragraph: RF holds the inverter in its
linear region, where it acts as a high-gain inverting amplifier.
Noise anywhere in the crystal's inductive band is amplified; the
crystal and load-capacitor network supplies the extra phase shift
that brings the total loop phase to 360 degrees, and only at the
crystal's load frequency do loop gain and loop phase both satisfy
oscillation. The amplitude grows until the inverter's output
limiting caps it. The crystal sets the frequency. The inverter
only keeps it going.

**No schematic is printed in this section, and that is deliberate,
not an omission.** This section describes the Pierce oscillator in
words and in block terms, with the component values worked out in
the text. It prints no drawn Pierce schematic and no 74HC4060
crystal schematic, because the research behind this chapter cannot
support one yet: the crystal figure in the 74HC4060 datasheet was
read only as garbled text extraction, never visually; the Pierce
series-resistor values from different sources disagree and need a
bench test; the oscillator-terminal labels in TI's 74HC4060
datasheet need a visual diagram read; and whether the 4060's
oscillator section starts a 32.768 kHz tuning-fork crystal reliably
at 5 V is still an open question. A schematic will be added only
after a visual read of the datasheet figures and a bench test.
Until then, do not build from a schematic copied from elsewhere
and assume it matches the values in this section. The values here
are the design; the drawing waits for its evidence.

The feedback resistor values are DESIGN VALUES from the sources
cited. AN2867 Table 3 gives typical RF ranges of 10 to 25 MΩ at
32.768 kHz, 5 to 10 MΩ at 1 MHz, 1 to 5 MΩ at 10 MHz, and 470 kΩ
to 5 MΩ at 20 MHz. Nexperia's 74HCU04 component table agrees at
the low end, with 22 MΩ below 200 kHz. Fit RF = 22 MΩ for the
32.768 kHz crystal and RF = 10 MΩ for the MHz crystals. A single
10 MΩ resistor will usually start a 32 kHz oscillator too, but it
sits at the bottom of AN2867's range, and this book does not
present one value for both jobs. RF tolerance is uncritical: it
sets a bias point, not a frequency.

The series resistor has a starting estimate from AN2867
section 3.5.3: treat RExt as equal to the reactance of the
output-side load capacitor CL2 at the crystal frequency:

```text
RExt = 1 / (2 x pi x F x CL2)
```

AN2867's own example, 8 MHz with CL2 = 15 pF, gives 1,326 Ω by
this formula. The sizing table, and the disagreement over the
32 kHz value, are in the drive-level section below, because the
series resistor's size is a drive question before it is anything
else.

### The inverter must be unbuffered: the 74HCU04

Three parts that all say "hex inverter" are not interchangeable
here. This is the chapter's equivalent of Chapter 7's 74HC109
trap, and the reader's first instinct, to reuse the 74HC14 already
on the bench, is the wrong one. Head it off now.

**74HCU04: the right part.** The "U" means unbuffered: each
inverter is a single CMOS stage, one PMOS and one NMOS pair, with
a gradual transfer characteristic and a usable linear region.
Nexperia's 74HCU04 data sheet, Rev. 7 (8 December 2015), lists
"Linear amplifier" and "Crystal oscillator design" as applications,
publishes transfer characteristics and forward transconductance,
and gives a crystal-oscillator figure with component tables. TI's
SCLS079E likewise headlines "Unbuffered Outputs". Biased by RF,
the unbuffered gate sits near VCC/2 with both transistors partly
on, acting as a small-signal inverting amplifier with moderate
gain, exactly what the Pierce loop needs. Its very sloppiness as a
logic gate, a wide, gradual threshold region, is what makes it a
good amplifier. Do not use a 74HCU04 as a general logic inverter
in other circuits without noting its soft thresholds, and do not
substitute a buffered part here.

**74HC04: the wrong part that often appears to work.** A standard
buffered HC inverter is internally a chain of inverter stages in
series (three stages, well-established background, not a line
quoted from a datasheet read for this chapter), giving high gain
and sharp thresholds for digital use. Biased into its linear
region, the stages' combined gain and phase shift can make the
gate itself oscillate at a high frequency set by its own
propagation delays, a parasitic ring oscillator inside one gate,
independent of the crystal, or refuse to sit stably in the linear
region at all. On the bench the result is an oscillator at the
wrong frequency, running intermittently, or running only with some
crystals, typically the MHz ones, and never reliably with a 32 kHz
crystal. No single sentence in a TI or Nexperia datasheet read for
this chapter says "do not use the 74HC04 for crystal oscillators".
The recommendation rests on the HCU04 datasheet's explicit crystal
application and transconductance data, the buffered multi-stage
structure, and consistent application-note practice. State the rule
firmly, use the HCU04, and the reason, the buffered gate's extra
stages add gain and phase shift that fight the crystal, but do not
invent a datasheet quotation that was not read.

**74HC14: the wrong part, for a different reason.** A Schmitt
trigger has hysteresis: two different thresholds, about 1 V apart
at 5 V. Between them its output depends on history, not on the
present input voltage; it has no single-valued linear region for RF
to bias it into. A Pierce oscillator needs an amplifier whose
output moves smoothly and immediately with small input changes
around VCC/2. The signal at the inverter input is a small wiggle
around VCC/2, hundreds of millivolts, far smaller than the
hysteresis band, so a Schmitt gate biased by RF either sits stuck
at a rail or chatters unpredictably. The HC14 is right for Chapter
7's RC oscillator, where the capacitor ramps rail to rail and the
hysteresis is the timing mechanism. For a crystal it is the wrong
gate. Its legitimate crystal role is after the oscillator: as a
buffer and squarer fed from the oscillator output, where its
hysteresis cleans up the rounded waveform. You will find 74HC14
crystal circuits online; they rely on the gate's behaviour outside
its specified linear operation, and on luck. This book does not
recommend them.

The 74HCU04 pinout is the same as the 74HC04 and 74HC14 (Nexperia
Rev. 7, Table 2): 1A pin 1, 1Y pin 2, 2A pin 3, 2Y pin 4, 3A pin 5,
3Y pin 6, GND pin 7, 4Y pin 8, 4A pin 9, 5Y pin 10, 5A pin 11, 6Y
pin 12, 6A pin 13, VCC pin 14. Tie every unused input to a rail,
GND or VCC. Floating HC inputs oscillate and draw excess current,
and the HCU04's inputs sit near threshold so readily that this
bites with extra force here. The oscillator gate's input must not
be tied to a rail, it is biased by RF; the buffer gate's input is
driven by the oscillator output.

**The DIP trap.** Nexperia offers no DIP 74HCU04: Rev. 7's ordering
table lists only SO14, SSOP14, TSSOP14 and DHVQFN14, and its
revision history records type 74HCU04N removed in version 7, in
2015. The DIP route is TI: SN74HCU04N (14-pin PDIP, -40 to +85 °C)
and CD74HCU04E (14-pin PDIP, -55 to +125 °C), both in the SCLS079E
ordering table. Name the TI DIP part explicitly in any parts list;
"74HCU04" alone will land the reader on a surface-mount Nexperia
part. Both TI DIP parts are ACTIVE per dated TI packaging
addenda re-checked at drafting time: SN74HCU04N, addendum
30 July 2024 (in SCLS079E); CD74HCU04E, addendum 16 April 2024
(in SCHS127D).

### Load capacitance: the two capacitors are not CL

CL is the capacitance the crystal must "see" across its two
terminals for it to oscillate at its marked frequency. It is a
property of the circuit, specified by the crystal manufacturer:
the crystal was trimmed while loaded with exactly CL. AN2867
section 3.3 puts it plainly: for the frequency to be accurate, the
oscillator circuit has to show the crystal the same load
capacitance as the one the crystal was adjusted for. CL is not the
value of either load capacitor, not their sum, and not something a
multimeter can measure. The commonest beginner error in all of
crystal electronics is fitting two capacitors each equal to CL.
Kill it now, with the formula and a worked example side by side.

The two load capacitors sit in series across the crystal, as far
as the crystal is concerned, and stray capacitance sits in
parallel with their combination (AN2867, section 3.3):

```text
CL = (C1 x C2) / (C1 + C2) + Cstray
```

Cstray, Cs in AN2867's notation, is the sum of the device pin
capacitance and the wiring capacitance. For the symmetric case
C1 = C2 = Cext, the formula simplifies to CL = Cext / 2 + Cs, so
Cext = 2 x (CL - Cs). AN2867's own worked example: CL = 15 pF with
Cs = 5 pF needs C1 = C2 = 20 pF. What contributes to Cs on this
book's bench: the HCU04's input capacitance, CI = 3.5 pF typical
(Nexperia Rev. 7, Table 6), the driving gate's output capacitance,
the crystal holder's own capacitance, breadboard row-to-row
capacitance, and wiring. Cs cannot be calculated exactly for a
breadboard build. The honest procedure is to allow for it
approximately and absorb the rest into the error budget: **take
Cs = 5 pF as the planning allowance**, AN2867's example value, at
the top of the usual PCB range, acknowledging that a breadboard is
worse than a PCB.

The procedure, in order: read CL from the crystal's datasheet, or
the distributor listing that reproduces it, and stop if the
listing says "Series" instead of a pF value, that is the wrong
crystal, see below; take Cs = 5 pF; compute Cext = 2 x (CL - Cs);
fit the nearest standard value for both capacitors, C1 = C2, from
the E12 values 15, 18, 22, 27 and 33 pF; use C0G/NP0 ceramic
capacitors, never X7R, see below; keep both capacitors' ground
leads short and to the same ground point near the chip, and keep
the whole oscillator tight; and check the result by counting a
divided output, not by assuming the calculation was exact.
Capacitor-value errors cause ppm-class errors, not percent-class
ones: if the counted frequency is grossly wrong, something else is
wrong. If CL - Cs is zero or negative, a 6 pF CL crystal meeting a
5 pF allowance, the formula gives Cext of 2 pF or less, smaller
than the stray capacitance itself, and that crystal is unsuitable
for a breadboard Pierce circuit: the strays alone overload it.
The book's bench crystals all have CL of 12.5 pF or more.

Worked DESIGN VALUES, arithmetic shown, with Cs = 5 pF throughout:

```text
Example A: 32.768 kHz watch crystal, CL = 12.5 pF
  Cext = 2 x (12.5 - 5) = 15 pF
  Fit: C1 = C2 = 15 pF (E12 value, exact)
  Check: CL seen = 15/2 + 5 = 12.5 pF

Example B: 8 MHz crystal, CL = 18 pF
  Cext = 2 x (18 - 5) = 26 pF
  Fit: C1 = C2 = 27 pF (nearest E12)
  Check: CL seen = 27/2 + 5 = 18.5 pF (0.5 pF high)
```

The load-capacitor values depend on CL and Cs, not on frequency: a
16 MHz crystal with CL = 18 pF takes the same 27 pF pair as
Example B. For an 8 MHz crystal with CL = 20 pF instead,
Cext = 2 x (20 - 5) = 30 pF, and 30 pF is not an E12 value: fit 27
pF (CL seen 18.5 pF, 1.5 pF low) or 33 pF (CL seen 21.5 pF, 1.5 pF
high). Either leaves a 1.5 pF error worth about 30 ppm, still
fine. Pick one, show the check, and do not pretend 30 pF is
standard bench stock.

Now the error, shown, not just warned about. Fitting C1 = C2 = CL
in Example B, 18 pF each, gives CL seen = 9 + 5 = 14 pF, 4 pF low,
about 80 to 100 ppm fast (DERIVED ESTIMATE, from the pulling
figures below). The circuit still oscillates and still beats a 555
by a hundred times, which is why the error survives in hobby
circuits for years. Nexperia's own component table uses asymmetric
capacitors at 32 kHz, C1 = 56 pF and C2 = 10 pF (Rev. 7, Table 8).
That is not a contradiction: their series combination is 8.48 pF,
plus about 4 pF of stray gives 12.5 pF (DERIVED ESTIMATE for the
stray value that makes them agree; Nexperia does not state its
assumed Cs). The symmetric procedure above is the teachable route;
Nexperia's table is the manufacturer's tuned alternative.

**What happens when CL is wrong: pulling.** The direction is
certain, from AN2867's load equation: CL too high pulls the
frequency low, toward Fs; CL too low pulls it high, toward Fa.
More capacitance loads the crystal down. AN2867 section 3.7 defines
pullability, the frequency shift in ppm per pF of CL change, and
gives one verbatim example: a crystal with pullability 45 ppm/pF,
loaded by two 7 pF C0G capacitors at ±5% tolerance, shifts by
0.175 pF times 45, about 7.8 ppm, about 0.7 seconds a day.
Capacitor tolerance is a second-order error. Getting Cs wrong by
several pF is the first-order error. Pullability for the book's
crystals, DERIVED ESTIMATES resting on example motional-capacitance
values, since Cm is rarely published in HC-49 datasheets: about 8
ppm/pF for the 32.768 kHz crystal, so a 4 pF error costs about 33
ppm; about 24 ppm/pF for an 8 MHz crystal at CL 18 pF, so a 4 pF
error costs about 97 ppm. The moral, stated plainly: on a
breadboard, the load-capacitor and stray error, not the crystal
tolerance, sets the achieved accuracy. Do not promise "±20 ppm"
for a breadboard build. Promise tens of ppm, dominated by stray
capacitance, and let the counting check be the arbiter. No
breadboard manufacturer datasheet was found in the research for
this chapter, so every breadboard stray figure is UNVERIFIED as a
specification and none is printed here as fact. Say it outright:
the breadboard crystal clock is accurate to tens of ppm for a
given build, and rebuilding it in a different spot on the board
moves the frequency slightly. That is still a superb result,
seconds per day, and it is the honest one.

**Capacitor type: C0G/NP0 only.** Load capacitors must be C0G,
also called NP0, ceramic: capacitance stable with temperature and
applied voltage, low loss. AN2867's pullability example specifies
C0G capacitors. X7R ceramics, the common decoupling capacitors,
change capacitance by percent-class amounts with temperature and
DC bias, which would convert the crystal's ppm stability back into
percent-class drift through CL pulling. The load capacitor is part
of the frequency-determining network, unlike a decoupling
capacitor, and the parts list must specify "C0G/NP0 ceramic"
explicitly. Tolerance of ±5% is fine, ±10% is acceptable; do not
pay for ±1% here, the stray-capacitance uncertainty swamps it.

**Series-resonant crystals: the ordering trap.** A series-resonant
crystal is trimmed to its marked frequency at Fs, for a
low-impedance load. A parallel-resonant crystal is trimmed to its
marked frequency at Fp with a specified CL, for a capacitive load.
The Pierce oscillator needs the parallel kind (TI SPRA054, October
1995). A series crystal in a Pierce circuit oscillates above its
marked frequency, near Fp, and no load capacitor can fully correct
it: the frequency can be pulled down toward Fs but never all the
way to it. ECS sells both, and the part number tells them apart:
the "-S-" in ECS-40-S-4X means series, no CL, while ECS-40-20-4X
means 20 pF parallel. Buy parallel-resonant crystals with a CL in
pF on the datasheet, and warn against the series variant in the
parts-list notes, not buried in theory. A series crystal in the
bench circuit will still oscillate, at the wrong frequency, with
no capacitor change able to fix it. That "works but wrong" failure
is worse than a dead circuit, because the reader has no scope to
see the error. One last exclusion: the book's Pierce circuits run
crystals at their fundamental only. Crystals cut for third-overtone
operation, typically above 24 to 34 MHz, will oscillate at their
fundamental or unpredictably between modes in a plain Pierce
circuit (AN2867, section 3.9); the Abracon ABL datasheet draws the
line at 33.999 MHz fundamental, third overtone from 34 MHz (Rev.
03.27.2018). All the book's MHz crystals, 4, 8 and 16 MHz, are
fundamental-mode parts; verify "Fundamental" in the operating-mode
line of any part named.

### Drive level: the watch crystal's microwatt limit

The drive level is the power dissipated in the crystal itself, the
I-squared-R loss in its motional resistance as it vibrates
(AN2867, section 3.5.1). It must be limited, AN2867 says,
"otherwise the quartz crystal can fail, because of excessive
mechanical vibrations", and the maximum is specified by the crystal
manufacturer. The formula is DL = ESR x IQ^2, where IQ is the RMS
current through the crystal, so the maximum permitted crystal
current is the square root of DLmax / ESR. The drive level is not
the power the oscillator draws from the supply, milliamps at 5 V.
It is microwatts inside the quartz. Keep the two powers separate.

Maximum drive levels show a thousand-fold gap between the two
kinds of crystal. A 32.768 kHz tuning-fork crystal is limited to
1 µW maximum (Abracon AB38T datasheet, Rev. 1.4.2021; ESR 30 kΩ
max, against 35 kΩ for the ECS part in its listing). An Abracon
ABL HC-49/US MHz crystal allows 100 µW typical and 1 mW maximum,
with ESR from 180 Ω to 40 Ω by band. ECS HC-49 MHz crystals list
500 µW, with ESR 150 Ω at 4 MHz, 80 Ω at 8 MHz and 40 Ω at 16 MHz
(listing values); IQD's HC49/4H specifies 500 µW maximum.
**UNVERIFIED:** the 1 µW figure for the ECS watch crystal
ECS-.327-12.5-13X specifically. The ECS product page and
distributor listing read for this chapter give no drive level; 1 µW
is the class value for 2 x 6 mm tuning-fork crystals,
datasheet-backed for the Abracon AB38T, not an ECS-published
number for this part. Do not attribute it to ECS. Do not quote
Abracon's typical, 100 µW, as the limit or its maximum, 1 mW, as
the target. Aim low. At the drive limit, only about 0.1 to 0.3 V
RMS appears across the crystal's resistive loss (DERIVED
ESTIMATES: a watch crystal at 1 µW and 35 kΩ allows 5.3 µA RMS,
0.19 V across the ESR). The volts of swing at the inverter pins
are mostly across the reactive parts, not dissipated. Do not
invite the calculation of power from volts measured across the
crystal; it gives a wildly wrong drive estimate.

Overdriving is usually silent: the oscillator keeps running,
perhaps at a slightly wrong frequency, while the crystal degrades.
From AN2867 section 3.5.1, Q-Tech QTAN-108, and the CTS "Crystal
Basics" note, the consequences are frequency jumps and distortion,
accelerated ageing, increased ESR so the crystal becomes harder to
start, and in the extreme mechanical damage to the quartz blank or
its mount. For a tuning-fork crystal, a quartz fork tens of microns
thick, "extreme" is not very extreme: tens of microwatts sustained
is already far outside specification.

**The 32 kHz overdrive trap, quantified.** Consider a 5 V HCU04
Pierce oscillator driving a watch crystal with no series resistor,
or a MHz-sized 1 kΩ resistor. The inverter output swings nearly
rail to rail. Even if only 1 V RMS appeared across the 35 kΩ ESR
alone, the dissipation would be V^2 / R = 1 / 35000, about 29 µW,
29 times the 1 µW limit. At 2.5 V RMS it would be about 179 µW,
179 times the limit (DERIVED ESTIMATE, order-of-magnitude
illustration assuming a sinusoidal voltage across the ESR alone;
the real division of voltage depends on the exact network, but no
plausible division rescues a resistor-less 5 V drive, the margin to
be explained away is a factor of 30 to 180, not 30%). The obvious
circuit, 5 V inverter plus watch crystal plus two capacitors,
copied from an MHz schematic with the resistor values left alone,
overdrives the watch crystal by one to two orders of magnitude. It
will oscillate, perhaps beautifully at first, and it will age or
damage the crystal while doing so. Present the 32 kHz circuit and
the MHz circuit as different circuits with different resistor
values, never as one circuit with the crystal swapped. For MHz
crystals the same analysis is far less alarming: the ESR is about a
thousand times smaller and the limit about five hundred times
higher, so a 5 V HCU04 with a roughly 1 kΩ series resistor sits
comfortably inside a 100 µW to 1 mW limit. At MHz the series
resistor is still required, for overtone suppression and margin,
but omitting it usually causes wrong-mode oscillation, not crystal
damage. State the asymmetry plainly.

Sizing the series resistor: compute RExt from the reactance formula
in the Pierce section, fit the nearest standard value, and verify
oscillation by the counting checks. These are DESIGN VALUES,
starting estimates, not measured optima:

| Circuit | F | CL2 | RExt = 1/(2 x pi x F x CL2) | Fit |
|---|---|---|---|---|
| 32.768 kHz, symmetric caps | 32.768 kHz | 15 pF | 324 kΩ | See discrepancy note |
| 4 MHz, CL 18 pF | 4 MHz | 27 pF | 1.47 kΩ | 1.5 kΩ |
| 8 MHz, CL 18 or 20 pF | 8 MHz | 27 pF | 737 Ω | 750 Ω (E24) or 680 Ω (E12) |
| 16 MHz, CL 18 pF | 16 MHz | 27 pF | 368 Ω | 360 Ω (E24) or 330 Ω (E12) |

**UNVERIFIED: the 32 kHz series-resistor value is not settled, and
this section does not print a single value as settled.** Nexperia's
74HCU04 Table 8 gives 100 kΩ for the 25 to 54.9 kHz band. The
AN2867 reactance method gives about 324 kΩ for 15 pF load
capacitors. The two differ by about 3 times. Both limit drive; the
larger value limits more but eats more gain margin. Neither has
been verified safe by a drive-level measurement, and no scope-based
measurement is available to this book's reader. This section prints
both values, with their sources. Whichever starting value is
fitted, the oscillation checks verify only that the circuit
oscillates. They do not verify the drive level, and no sentence
here claims they do. Do not split the difference or present a range
as if any value in it were verified.

Placement matters: RExt goes between the inverter output pin and
the crystal, and CL2 connects from the crystal side of RExt to
ground, not from the inverter-output side (AN2867, Fig. 5). If
RExt is far too large, there is no oscillation at all: it adds to
the ESR in the gain calculation. The resistor must be sized, not
maximised.

**What a no-scope reader cannot check here is the drive level
itself.** Both AN2867 measurement methods, a current probe, or a
voltage measurement with a probe of 1 pF or less, 0.1 pF recommended
at 32 kHz, require an oscilloscope with specialised probes. A
multimeter cannot measure microamp-level RF crystal current or the
small sine swing at the crystal nodes, and probing those nodes with
ordinary leads stops the oscillator. State it plainly: the reader
protects the crystal by building the specified circuit with the
specified resistor values, not by measuring the drive level. Any
sentence implying the reader can "check the drive level with a
multimeter" would be false. One reassurance, honestly labelled:
startup failure with an HCU04 is almost never a gain problem.
If an HCU04 circuit
does not start, suspect wiring, the wrong part, or the wrong
capacitors first, and gain last.

### Choosing crystals for the bench

**Packages: what fits a breadboard, and what only looks like it
does.** HC-49/U is the tall can, HC-49/US the short low-profile
can, same footprint, same two leads. The lead spacing is a
fraction of a millimetre narrower than two breadboard holes, so
the leads need a slight outward splay to drop in; they are thin
and splay easily. The trap is the surface-mount twin: HC-49/S is
surface-mount, and Abracon's ABLS is the SMD twin of the
through-hole ABL, "SMD Low Profile Crystal" (ABLS datasheet, Rev.
04.07.11). Distributor listings routinely show "HC-49/US" in the
package field for both through-hole and SMD parts. The
mounting-type field, Through Hole versus Surface Mount, is the
discriminator, not the package name. Check it on every listing. A
reader who orders ABLS instead of ABL gets a part with no leads to
plug into a breadboard. SMD crystals generally are not bench parts
for this book without adapter boards.

The through-hole watch crystal is the 2 x 6 mm cylindrical can,
2.10 mm diameter by 6.20 mm long for the ECS part, with two thin
axial leads from one end. The leads are fragile: splay them gently
to breadboard pitch, support the can, do not repeatedly re-bend,
and do not bend close to the body, where the seal cracks easily.
The can's metal body is not a terminal. **UNVERIFIED:** whether
the ECS can is connected to either electrode, so treat it as
floating and keep it clear of other conductors. There is no
standard HC-49 32.768 kHz through-hole crystal from a current
manufacturer verified for this chapter; the through-hole watch
crystal is the cylinder.

**32.768 kHz: buy.** The primary part is the ECS-.327-12.5-13X:
32.768 kHz, ±20 ppm, CL 12.5 pF, ESR 35 kΩ, -10 to +60 °C,
cylindrical can, through-hole (ECS product page and DigiKey
listing X1124-ND, seen November 2026; the full ECS 2X6X datasheet
PDF was not read directly). A second verified through-hole source
is the Abracon AB38T-32.768KHZ, 32.768 kHz, ±20 ppm, CL 12.5 pF,
ESR 30 kΩ max (AB38T/AB26T datasheet, Rev. 1.4.2021), alongside
the Citizen CFS-20632768DZFB, whose 12.5 pF and 35 kΩ figures are
distributor-reported only, its datasheet was not read, so cite
them as distributor-reported, not manufacturer values. Always
order the 12.5 pF variant explicitly. CL variants of 6, 7 and 9 pF
exist for microcontroller real-time clocks and must not be
substituted: on a breadboard the stray capacitance alone overloads
them.

**4 MHz: buy, the recommended first MHz crystal.** Abracon
ABL-4.000MHZ-B2, HC-49/US, through-hole, ±20 ppm tolerance and
±50 ppm stability, CL 18 pF, ESR 180 Ω; or ECS-40-20-4X,
HC-49/USX, through-hole, ±30 ppm, CL 20 pF, ESR 150 Ω (listing
value). Two traps ride on the ECS number. First, ECS-40 means 4.0
MHz: the digits are the frequency in MHz times 10, so ECS-160 is
16.0 MHz. A listing describing ECS-40 as 40 MHz is wrong. Second,
the "-S-" series variant, ECS-40-S-4X, is the wrong crystal, see
above. Why 4 MHz first: drive and gain margins are comfortable,
breadboard strays matter least, and the HCU04 Pierce circuit is
most forgiving there.

**8 MHz: buy, the workhorse.** ECS-80-18-4X (CL 18 pF) and
ECS-80-20-4X (CL 20 pF), HC-49/USX, through-hole, ±30 ppm, ESR 80
Ω (listing value), both seen in ECS catalog listings. Name one CL
in a parts list and keep the chapter's load-capacitor arithmetic
consistent with the pick: the worked example above uses CL 18 pF
and 27 pF capacitors. **UNVERIFIED:** the specific Abracon
ABL-8.000MHZ-B2 listing was not individually opened in the
research for this chapter, so it is not named as an orderable
number here.

**16 MHz: buy, with a breadboard caution.** ECS-160-20-4X,
HC-49/USX, through-hole, ±30 ppm, CL 20 pF, ESR 40 Ω (listing
value). At 16 MHz breadboard stray capacitance and lead inductance
matter most, and the build must be kept tight; the achieved
accuracy will sit at the worse end of the tens-of-ppm range. If
the chapter has one MHz bench build, make it 4 or 8 MHz, and
present 16 MHz as the "also works, keep it tight" option, not the
default. Check the mounting type on the listing before ordering,
through-hole, not the SMD twin.

**1 MHz: do not recommend.** The 1 MHz HC-49/U exists,
ECS-10-13-1H, but it is a specialty low-frequency part, not a
jellybean: ±100 ppm tolerance and ±100 ppm stability, CL 13 pF,
ESR 3 kΩ, SL cut rather than AT-cut, 500 µW maximum drive (ECS
drawing DWG NO. ECS-10-13-1H). Its tolerance is 3 to 5 times
looser than the MHz parts, ±100 ppm is 8.6 seconds a day before
stability and load error, its ESR is 20 to 75 times a normal MHz
crystal's, and in distributor listings seen it costs roughly an
order of magnitude more than a 4 to 16 MHz crystal, about $11 to
$12 against under $1. Abracon's ABL range starts at 3.579545 MHz
and IQD's HC49/4H at 3.2 MHz; neither line has a 1 MHz part. If a
roughly 1 MHz timebase is wanted for teaching, the honest routes
are a 4 MHz crystal divided by 4, or a power-of-two crystal, not a
1 MHz crystal. Include this paragraph because the reader will
wonder why 1 MHz is absent from the parts list.

Datasheets quote up to three frequency-error terms, and they must
not be quoted sloppily as one "accuracy". **Tolerance**, at +25 °C,
is how far an individual crystal's room-temperature frequency may
sit from nominal: typically ±20 ppm for watch and ABL parts, ±30
ppm for ECS HC-49 parts. **Stability** is how far the frequency
moves from its +25 °C value across the operating range: typically
±30 to 50 ppm. **Ageing** is slow permanent drift, typically ±3 ppm
for tuning-fork crystals and ±5 ppm for ABL parts in the first
year, negligible over a school term. The worst-case total for a
bench build, tolerance plus stability plus load error, is honestly
in the 100 ppm class; a typical build is much better.

Temperature behaviour differs by crystal type. The tuning-fork
crystal follows a parabola, always slow away from its turnover
temperature: CTS TFSM datasheet, Rev. D (2017), gives the
parabolic coefficient beta = -0.034 ± 0.006 ppm per degree C
squared, turnover +20 to +30 °C, typically +25 °C, and the Geyer
KX-327ST datasheet agrees. Worked values (DERIVED ESTIMATE, beta =
-0.034, turnover 25 °C): at 35 °C, -3.4 ppm; at 45 °C, -13.6 ppm;
at 0 °C, -21.25 ppm. The parabola is forgiving near room
temperature: a bench clock kept indoors sees single-ppm
temperature error most of the time. AT-cut MHz crystals follow an
S-shaped curve specified as a stability band, ±30 to 50 ppm over
-20 to +70 °C for the parts here; quote the band and do not
attempt a formula, the curve coefficients are not published for
these commodity crystals.

One frequency deserves naming for what it is: 32.768 kHz is 2^15
Hz. Fifteen divide-by-2 stages turn it into exactly 1 Hz. That is
why it is the watch crystal, and why the divider chip in the next
subsection, which provides fourteen stages, lands on 2 Hz instead.
Keep that "fifteen, not fourteen" in mind. It is the next trap.

### The 74HC4060: oscillator and divider in one chip

The 74HC4060 is a 14-stage ripple-carry binary counter with a
built-in oscillator section: three oscillator terminals, ten
buffered counter outputs, and an overriding asynchronous master
reset (Nexperia Rev. 7, 27 March 2024, section 1; TI SCHS207G:
"an oscillator section and 14 ripple-carry binary counter
stages"). It collapses the HCU04 Pierce oscillator plus a divider
chain into one chip and a few external parts, and its divided
outputs bring the 32 kHz crystal into visible blink range with no
extra counters. The counter advances on the HIGH-to-LOW transition
of the oscillator and clock input, and MR HIGH resets all outputs
LOW and disables the oscillator (TI SCHS207G). The clock input has
Schmitt-trigger action, which permits unlimited rise and fall
times on the clock input. Unlike the discrete circuit, there is no
buffered crystal-frequency output pin: the fastest available
output is divide-by-16. A reader who wants the raw crystal
frequency out, to feed another chip, needs the discrete Pierce
circuit or an oscillator module, not the 4060. The oscillator
section can also be wired as an RC oscillator, but that is an RC
oscillator with RC accuracy and has no place as a timebase in this
chapter.

#### The outputs: pins, divisions, and the naming trap

**Read this box before wiring anything to a 4060. TI and Nexperia
number the same outputs one apart, on the same pins.** TI
(SCHS207G) calls them Q4 to Q10 and Q12 to Q14, with Qn dividing
by 2^n. Nexperia (Rev. 7) calls them Q3 to Q9 and Q11 to Q13, with
Qn dividing by 2^(n+1). The silicon is the same counter; only the
labels differ, because Nexperia counts stages from Q0 while TI
counts from Q1. This book uses **Nexperia numbering throughout**,
to match the counter numbering already used in Chapters 6 and 7,
and gives **pin numbers plus division ratios every time**, so a
reader holding a TI chip, whose datasheet labels are one higher,
still wires to the right pin. A bare Q-number in prose, without
its pin and its division, is a wiring error waiting to happen.
**UNVERIFIED:** the §12.2 crystal figure was read only as
extracted text, never visually; the pin and division map below
rests on the Rev. 7 body text, cross-checked against TI SCHS207G
and the onSemi MC74HC4060A/D, Rev. 3 (March 2003), which agree
on pins and divisions once the naming offset is accounted for.

| Pin | Nexperia name (this book) | TI name | Division | From 32.768 kHz |
|---|---|---|---|---|
| 7 | Q3 | Q4 | /16 | 2048 Hz |
| 5 | Q4 | Q5 | /32 | 1024 Hz |
| 4 | Q5 | Q6 | /64 | 512 Hz |
| 6 | Q6 | Q7 | /128 | 256 Hz |
| 14 | Q7 | Q8 | /256 | 128 Hz |
| 13 | Q8 | Q9 | /512 | 64 Hz |
| 15 | Q9 | Q10 | /1024 | 32 Hz |
| -- | (Q10 missing) | (Q11 missing) | /2048 | 16 Hz, NOT AVAILABLE |
| 1 | Q11 | Q12 | /4096 | 8 Hz |
| 2 | Q12 | Q13 | /8192 | 4 Hz |
| 3 | Q13 | Q14 | /16384 | 2 Hz |
| 8 | GND | GND | -- | -- |
| 16 | VCC | VCC | -- | -- |
| 12 | MR | MR | -- | Master reset, active HIGH |

How the division column was established: the 4060 is a
14-stage counter whose first brought-out output is the fourth
stage, divide-by-16, and each later output doubles the division.
The column above is a DERIVED mapping from that construction,
cross-checked against the stage sequence in the Rev. 7 timing
figure; no datasheet table row lists the divisions directly.

Four division ratios do not exist on any pin: divide-by-2,
divide-by-4, divide-by-8, and divide-by-2048. The divide-by-2048
gap is the annoying one: the available ladder steps from 32 Hz at
divide-by-1024 straight to 8 Hz at divide-by-4096, skipping 16 Hz,
a jump of four times mid-chain where the reader expects a
doubling. The missing TI Q11 is that gap. The divide-by-2, 4 and 8
gap matters when cascading: the fastest available tap is
divide-by-16, so a second divider stage fed from the 4060 starts
from divide-by-16, not from the raw crystal frequency.

**The 4060 plus a 32.768 kHz crystal gives 2 Hz, not 1 Hz.** The
slowest output, pin 3, Nexperia Q13, TI Q14, divide-by-16384,
gives 32768 / 16384 = 2 Hz. Getting 1 Hz needs fifteen divide-by-2
stages, 2^15 = 32768, and the 4060 has fourteen. One more
divide-by-2, half a 74HC74 wired as a toggle, or one stage of a
further counter, is required. The popular claim that a 4060 with a
32.768 kHz crystal gives 1 Hz is wrong, and a reader who trusts it
builds a clock that runs at double speed. Present 2 Hz as the
4060's natural output and 1 Hz as "2 Hz plus one flip-flop", never
imply the 4060 alone gives 1 Hz. The 2 Hz output is still extremely
useful: it blinks an LED visibly, 0.25 s on and 0.25 s off, and is
countable against a stopwatch at 120 blinks a minute, so it serves
as the chapter's crystal proof with no extra chip. No 4060 output
from a 4, 8 or 16 MHz crystal is directly visible on an LED: the
slowest, divide-by-16384, is 244 Hz from 4 MHz, 488 Hz from 8 MHz,
and 977 Hz from 16 MHz. The 32 kHz crystal is the only one whose
4060 outputs are directly visible.

#### The oscillator section: what is known, and what is deferred

The oscillator terminals, in Nexperia names, are RS, pin 11, the
clock and oscillator input; RTC, pin 10, the external resistor
connection; and CTC, pin 9, the external capacitor connection.
TI's SCHS207G labels both pins 9 and 10 with the same symbol,
which is ambiguous in text, so this book uses the Nexperia names
or pin numbers in prose. **UNVERIFIED:** TI's oscillator-terminal
labels need a visual read of the SCHS207G diagram before any
TI-labelled wiring is printed; the pin numbers above are the
authority until then.

What is known reliably about the 4060 crystal circuit, from
Nexperia Rev. 7 section 12.2 body text: it needs an external bias
resistor, it needs a power-limiting series resistor R2, for which
the datasheet states "a practical value for R2 is 2.2 kΩ", and it
needs load capacitance. That is where reliable knowledge ends. The
crystal-oscillator figure in section 12.2 was read only as
extracted text, never visually, and the extraction interleaves the
RC-oscillator figure, the crystal figure and a test setup. The
exact topology, which node the crystal connects between, where the
bias resistor sits, which capacitor is which, is UNVERIFIED from
that extraction, and the figure's annotation values, a
bias-resistor range of 100 kΩ to 1 MΩ and a capacitor range of 22
pF to 37 pF, are garbled-extraction fragments, not design values.
**No 4060 crystal schematic is printed in this section, for the
reasons stated in the Pierce subsection above, and no 4060 crystal
wiring may be reconstructed from the fragments in this paragraph.**
The figure (Fig. 11 in Rev. 7) must be read visually from
the Rev. 7 PDF before any schematic is drawn. Note that the bias-resistor range in the
fragments is far smaller than the discrete Pierce feedback
resistor, because the 4060's internal amplifier is a different
design; do not substitute 10 MΩ without checking the figure.
**UNVERIFIED:** whether the 4060's oscillator section starts a
32.768 kHz tuning-fork crystal reliably at 5 V. That is an open
question for a bench test, not a claim this section makes.

One verified mode needs no figure. The oscillator may be replaced
by an external clock signal at RS, pin 11, keeping the other
oscillator pins, RTC and CTC, floating (Nexperia Rev. 7,
section 1; onSemi states the same rule as leaving the oscillator
outputs open). The counter advances on the HIGH-to-LOW transition
of RS. This is how the 4060 serves as a pure divider behind a
discrete HCU04 Pierce oscillator or an oscillator module.

Two cousins deserve one paragraph, because the dividers section of
this chapter uses them. The 74HC4020 is a 14-stage counter with no
oscillator section, so it exposes two outputs the 4060 lacks:
divide-by-2 and divide-by-2048 (Nexperia Rev. 9, 27 March 2024).
It is the right part when the oscillator already exists elsewhere
and the reader wants those taps; fed with 32.768 kHz it still
gives 2 Hz at its slowest output and still needs one more
divide-by-2 for 1 Hz. The 74HC4040 is a 12-stage counter with
every tap available to divide-by-4096, and likewise needs an
external oscillator. The same naming rule applies to both: give
pins plus divisions, state the numbering. The CD4060B is the
4000-series ancestor of the 4060, wider supply range, slower,
weaker drive, the classic coin-cell clock part; it is not
interchangeable with the 74HC4060, and this book standardises
on HC.

**Sourcing.** The bench part is TI's CD74HC4060E, 16-lead PDIP,
in the SCHS207G ordering table. No DIP route through Nexperia was
verified for this chapter. CD74HC4060E is ACTIVE per a TI
packaging addendum dated 29 September 2026, re-checked at
drafting time. OnSemi's MC74HC4060AN
DIP status was not verified; do not cite onSemi as a DIP source.

### The oscillator module: a legitimate shortcut

A bare crystal is a passive two-terminal resonator. It produces no
signal on its own. It needs an amplifier, load capacitors, and bias
and drive resistors, everything in the sections above, and its
accuracy depends on all of them. A crystal oscillator module, an
XO, sometimes called an oscillator can, is a crystal plus
oscillator circuit plus output buffer sealed in one package. It
needs only a power supply and a decoupling capacitor, and produces
a finished logic-level clock on its output pin. No load capacitors,
no bias resistor, no drive calculation, no startup tuning. Its
frequency accuracy is specified as a whole, because the
manufacturer trimmed the complete circuit.

The module is a legitimate choice, without snobbery. It removes
every failure mode in the fault-finding section below except
wiring and supply, it cannot be overdriven by the reader, the
manufacturer set the drive level internally, and its output drives
logic directly. For a reader whose goal is a working clock to
divide down, rather than learning oscillator design, the module is
the right engineering choice. Learning the Pierce circuit first
and then choosing the module is informed laziness; skipping
straight to the module without understanding what it replaces is
fine too, for readers who say so. This book does not guilt-trip
either reader.

Sourcing, verified to listing level only: the Abracon ACH series,
5 V, HCMOS/TTL output, 8-DIP 4-lead half-size metal can,
through-hole, listed as Active in distributor listings seen in
November 2026, for example ACH-8.000MHZ-EK, 8 MHz, ±30 ppm
stability, -20 to +70 °C. Several ACH listings showed zero
distributor stock with manufacturer lead time applying, snapshots,
not promises; the series is current but not deep-stocked.

**UNVERIFIED: no oscillator-module wiring is printed in this
section.** The ACH datasheet PDF, pin function table, enable-pin
behaviour, supply current, output levels, decoupling requirement
and start-up time, was not read for this chapter. The conventional
half-can pinout is therefore deliberately not printed here:
enable-pin variants exist, some modules have no enable pin, some
require it tied HIGH, and floating it is unsafe to assume. The
"HCMOS/TTL" listing wording suggests 5 V HC-compatible levels, but
VOH and VOL must be confirmed from the datasheet before any claim
that the output drives HC logic, the same lesson Chapter 7 teaches
about the NE555 output. Read the datasheet of whichever module is
named, and draw the wiring from its pin table, before including
any module schematic or wiring list.

One identification rule prevents the commonest module mistake. A
"crystal" listing with four pins is not a crystal; it is a module,
or an SMD crystal with lid and ground pads. Count the terminals,
read the description, "CRYSTAL" versus "OSCILLATOR" or "XO", and
remember: if it needs power, it is a module. Wiring a four-pin
module across an inverter, as if it were a two-terminal crystal,
cannot work: the module gets no power and its output fights the
inverter.

### Proving it works without an oscilloscope

**Wait before declaring it dead.** A 32.768 kHz crystal oscillator
can take 1 to 5 seconds after power-on before its output is stable
(AN2867, section 3.6): high Q means slow amplitude build-up. A
reader who powers up, counts to two, sees nothing, and starts
rewiring will chase a phantom fault. The procedure is: power on,
wait 10 seconds, then observe. MHz oscillators start in
milliseconds; if nothing appears after a second, something is
wrong.

Three checks, in order, use only a multimeter, a stopwatch, LEDs
and divider outputs. First, the DC bias check: with power on and
the oscillator running, a multimeter on DC volts at the oscillator
inverter's input pin should read roughly VCC/2, about 2.5 V at a
5 V supply, the RF bias point. A reading stuck near 0 V or 5 V
means the gate is railed, RF missing or open, or the wrong chip.
This is a coarse go/no-go check only: the meter's 10 MΩ input in
parallel with a 10 to 22 MΩ RF resistor shifts the bias point, so
the reading is indicative, not precise, and the probes must not
stay on the node while counting. Second, the buffer-output check:
a meter on DC volts at the buffer gate's output reads roughly
VCC/2 for a running square wave, 0 V or 5 V for a dead clock. It
distinguishes running from dead, nothing more. Third, and
decisive, the divided-output counting check: feed the clock into
dividers until the output blinks visibly, then count against a
stopwatch. With the 4060 and a 32.768 kHz crystal, an LED with a
series resistor on pin 3, divide-by-16384, should blink at 2 Hz:
count for 30 seconds and expect 60 blinks, plus or minus 1. A 2 Hz
blink proves the crystal oscillates at approximately 32.768 kHz; a
wrong-mode or wrong-crystal oscillation gives a grossly different
blink rate. Counting precision is plus or minus 1 blink over 60
seconds, about ±1.7%: enough to catch wrong crystals and dead
circuits, not enough to verify ±20 ppm. Time 10 minutes of 2 Hz
blinks, 1,200 blinks, for about ±0.08%, enough to confirm
"crystal class", not to certify a datasheet tolerance. Do not
oversell counting precision.

**Do not probe the crystal nodes while judging oscillation.** A
meter's input loads the high-impedance oscillator nodes: at 32 kHz
it can stop the oscillator outright, at MHz it pulls the frequency.
The DC bias check above is a momentary touch-and-read, not a
continuous monitor. Do not touch the crystal nodes with fingers
while the circuit runs, either: body capacitance stops or pulls a
32 kHz oscillator and pulls an MHz one, and "touch it and it
stops" is normal behaviour for this circuit, not a fault. Keep the
crystal can clear of grounded metal for the same reason. For
readers who later acquire an oscilloscope: AN2867 section 3.5.2
requires a probe of 1 pF or less for drive measurement, 0.1 pF
recommended at 32 kHz. A standard 10x probe adds more capacitance
than the load itself for a watch crystal.

When a crystal oscillator does not start, work in this order,
because gain is ample and gain-margin failure is last, not first:
wiring error, the commonest cause by far; wrong crystal, series
instead of parallel, wrong CL variant, or wrong frequency; wrong
inverter, 74HC04 or 74HC14 instead of 74HCU04; load capacitors
wrong, far too large, far too small, wrong dielectric, or one
missing; series resistor far too large, or a misread resistor
value; excessive load on the oscillator nodes, probes, long wires,
or an LED hung on the oscillator output; gain margin genuinely
insufficient, suspect only with an abnormally high-ESR crystal or
a low supply voltage; and dead crystal, rare for a new part, the
decisive test being a swap with a known-good crystal of the same
frequency and CL. If the swap test fails, rebuild the oscillator
section compactly in a fresh area of the board with short wires:
breadboard contact faults mimic component faults exactly, and the
rebuild is the highest-yield step in the list. Swap one thing at a
time; do not "fix" a fault by changing three things at once.

And the limit, restated so it cannot be missed: no check in this
section measures the drive level. The counting checks prove
oscillation and approximate frequency. They say nothing about
microwatts inside the quartz. The crystal is protected by building
the specified circuit with the specified resistor values, by
design, not by measurement.

### Dividing down: from a crystal's thousands of hertz to one tick a second

A crystal gives you far too many cycles a second. A clock
needs one. Between the two stands division: a chain of
counters, each dividing the frequency it receives, until
the output blinks once a second. Chapter 7 taught
counters; this section uses them as dividers, and the
whole subject is one idea — factoring. A total division
is factored into stage divisions that real parts provide,
the stages are chained output-to-clock, and the total is
the product of the stages. Get the factoring right and
the chain is exact. Get it wrong by one stage and the
clock runs at double speed, or 5% slow, and no trimming
of the crystal will fix it, because the error is
arithmetic, not analogue.

Names follow Chapter 7: outputs are named the Nexperia
way, so output Qn divides by 2 to the power (n + 1) —
Q0 divides by 2, Q13 divides by 16384. TI's 4060
datasheet numbers each output one higher than this book
does, so the output this book calls Q13 is Q14 on the TI
sheet; the crystal section's box gives the full
translation. The pin tables give both names, and every
output in this section carries its pin and its division,
so the name can never mislead you. Check the pin table
of the exact part you bought before wiring: the names
shift even though the pins do not.

#### The divider parts

Four parts do the dividing. The 4040 and 4020 are long
binary ripple dividers from Chapter 7. The 390 is the
decimal divider: it divides by 10, which no binary part
can do. The 4060 is a 14-stage binary divider with an
oscillator stage built in; its oscillator circuit
belongs to the crystal section, and only its divider
side is treated here. All four clock on the falling,
HIGH-to-LOW, edge, and all four have an active-HIGH
asynchronous master reset. Tie an unused reset input to
GND. Unused outputs may be left unconnected; unused
inputs must never float.

The 74HC4040 is a 12-stage binary ripple counter
(Nexperia 74HC4040, Rev. 8, 16 February 2024). All
twelve outputs reach pins, Q0 to Q11, so every power of
two up to 4096 is available, up to Q11 (pin 1) at 4096:

| Pin | Book name | TI CD name | Pin | Book name | TI CD name |
|---|---|---|---|---|---|
| 1 | Q11 | Q12 | 9 | Q0 | Q1' |
| 2 | Q5 | Q6 | 10 | CP | CP |
| 3 | Q4 | Q5 | 11 | MR | MR |
| 4 | Q6 | Q7 | 12 | Q8 | Q9 |
| 5 | Q3 | Q4 | 13 | Q7 | Q8 |
| 6 | Q2 | Q3 | 14 | Q9 | Q10 |
| 7 | Q1 | Q2 | 15 | Q10 | Q11 |
| 8 | GND | GND | 16 | VCC | VCC |

The TI SN part names its outputs QA to QL for book Q0 to
Q11, with CLK for CP and CLR for MR (TI SN74HC4040,
SCLS160D, September 2003); the pins are identical. The
bench buy is the SN part: SN74HC4040N in PDIP-16 is
ACTIVE per TI's packaging addendum of 8 January 2026, as
Chapter 7 states. Nexperia DIP is gone: the Rev. 8
revision history records the removal of the N variants
on 3 February 2016, and the ordering table lists
surface-mount only. **UNVERIFIED:** the CD74HC4040E's
current ACTIVE status, only a 2009 addendum having been
seen, so this book recommends the SN part and makes no
claim for the CD part. One description sentence in the
CD datasheet (TI CD74HC4040, SCHS203D) states the wrong
number of stages, a copy/paste slip from the 4020 sheet
in the same family; the title, the functional diagram,
and the twelve outputs all say twelve, and twelve is
correct.

The 74HC4020 is a 14-stage binary ripple counter
(Nexperia 74HC4020, Rev. 9, 27 March 2024), but only
twelve of its fourteen outputs reach pins: Q0 and Q3 to
Q13. The Q1 and Q2 stages exist inside the chip but
have no pins, so there is no divide-by-4 or divide-by-8
output on a 4020 at all. Its last output, Q13 (pin 3),
divides by 16384:

| Pin | Book name | TI CD name | Pin | Book name | TI CD name |
|---|---|---|---|---|---|
| 1 | Q11 | Q12 | 9 | Q0 | Q1' |
| 2 | Q12 | Q13 | 10 | CP | CP |
| 3 | Q13 | Q14 | 11 | MR | MR |
| 4 | Q5 | Q6 | 12 | Q8 | Q9 |
| 5 | Q4 | Q5 | 13 | Q7 | Q8 |
| 6 | Q6 | Q7 | 14 | Q9 | Q10 |
| 7 | Q3 | Q4 | 15 | Q10 | Q11 |
| 8 | GND | GND | 16 | VCC | VCC |

This is the most likely wiring confusion in the
chapter: the divide-by-16384 output is Q14 on the part
you hold and Q13 in this book's text. Use the pin and
the division, not the bare letter. The TI CD part is
pin-for-pin identical to the Nexperia part (TI
CD74HC4020, SCHS201C, February 1998, revised October
2003). The bench route is CD74HC4020E in PDIP-16,
ACTIVE per TI's packaging addendum of 15 July 2026, as
Chapter 7 states; Nexperia DIP was removed on
3 February 2016, as for the 4040. **UNVERIFIED** (not
load-bearing): whether the TI first output Q1' differs
in phase or polarity from the Nexperia Q0. No wiring
here depends on it, and no phase relationship is
asserted.

The 74HC390 packs two independent decade counters into
one 16-pin package (Nexperia 74HC390, Rev. 6, 19 March
2024). Each decade is a divide-by-2 section (clock
nCP0, output nQ0) and a divide-by-5 section (clock
nCP1, outputs nQ1 to nQ3), each clocked on the falling
edge, each decade with its own active-HIGH asynchronous
reset. One package divides by 2, 4, 5, 10, 20, 25, 50,
or 100, depending on the wiring:

| Pin | Book name | TI name | Pin | Book name | TI name |
|---|---|---|---|---|---|
| 1 | 1CP0 | 1CLK A | 9 | 2Q3 | 2QD |
| 2 | 1MR | 1CLR | 10 | 2Q2 | 2QC |
| 3 | 1Q0 | 1QA | 11 | 2Q1 | 2QB |
| 4 | 1CP1 | 1CLK B | 12 | 2CP1 | 2CLK B |
| 5 | 1Q1 | 1QB | 13 | 2Q0 | 2QA |
| 6 | 1Q2 | 1QC | 14 | 2MR | 2CLR |
| 7 | 1Q3 | 1QD | 15 | 2CP0 | 2CLK A |
| 8 | GND | GND | 16 | VCC | VCC |

The 390 has two ways to make divide-by-10, and they are
a real choice. In BCD wiring, connect nQ0 to nCP1 and
apply the input to nCP0: the outputs count 0 to 9 in
binary-coded decimal, and the decade output is nQ3,
HIGH only at counts 8 and 9 — a 20% duty pulse, one
falling edge per ten input clocks. In bi-quinary
wiring, connect nQ3 to nCP0 and apply the input to
nCP1: the decade output is nQ0, HIGH at counts 5 to 9
— a true 50% square wave at divide-by-10 — but the
outputs no longer read as a decimal digit. Want to see
the digit on LEDs? Wire BCD. Want a clean divide-by-10
clock? Wire bi-quinary. The sequences are TI SCHS185E
Tables 7-2 and 7-3; cite Rev. E only, because Rev. E
corrected Table 7-3 at count 6, and any bi-quinary
table from an earlier TI revision is wrong there (TI
CD74HC390, SCHS185E, Rev. E, April 2022). The bench
route is CD74HC390E in PDIP-16, ACTIVE per TI's
packaging addendum of 15 July 2026. Inside the
divide-by-5 section the delays are not uniform — Q2 is
the slowest path — and the full-decade delay in BCD
wiring is 73 ns maximum (CLKA to QD). The BCD cascade
pulse is a legitimate signal, not a runt: two input
periods wide, 67 ns even at the 30 MHz minimum fmax,
comfortably wider than the 16 ns minimum pulse width
the next stage needs.

The 74HC4060 is a 14-stage ripple counter with an
onboard oscillator stage (Nexperia 74HC4060, Rev. 7,
27 March 2024, for the book's output names; TI
CD74HC4060, SCHS207G, February 1998, revised October
2003, for the TI names). The oscillator
pins are 9, 10, and 11; the counter advances on the
falling transition of the oscillator/clock input, and
MR (pin 12, active HIGH) resets all outputs LOW and
disables the oscillator. Only ten outputs reach pins:
in this book's names, Q3 to Q9 and Q11 to Q13. The
divide-by-2048 output (book Q10) is not pinned, and
neither are the first three stages. The full pin, name and
division table is the box in the crystal section above; the
oscillator terminals are RS (pin 11), RTC (pin 10) and CTC
(pin 9), and MR is pin 12.

State the trap the first time the part appears, because
the wrong claim is widespread in hobbyist sources: a
4060 with a 32.768 kHz crystal does not give 1 Hz. Its
last output, Q13 (Q14 on the TI sheet), pin 3, divides
by 16384, and 32,768 divided by 16,384 is 2 Hz. A clock
built on the bare 4060 runs at double speed; a further
divide-by-2 is required, and the same is true of the
4020's Q13 (pin 3, divide by 16384). The bench route is
CD74HC4060E in PDIP-16, ACTIVE per TI's packaging
addendum of 29 September 2026. When the oscillator input is
driven from an external clock, the oscillator outputs
(pins 9 and 10) must be left open (onSemi
MC74HC4060A, MC74HC4060A/D, Rev. 3, March 2003).
Unlike the other dividers here, the 4060's clock input
has Schmitt-trigger action and tolerates slow edges.

The supporting divide-by-2 is half a 74HC74: one D
flip-flop with its Q-bar output wired back to its D
input toggles on every clock edge and divides by 2. It
finishes the 32.768 kHz chain below. Note its edge: the
74HC74 clocks on the rising, LOW-to-HIGH, edge, the
opposite of the four dividers above. Tie its unused CLR
and PRE inputs HIGH, and never leave its D or CLK
inputs floating. The PDIP route is the SN74HC74N, and
Chapter 7 introduced the part.

#### Cascading: multiply the divisions, factor the total

Chain stages by wiring one stage's Q output into the
next stage's clock input, and the total division is the
product of the stage divisions. Two conditions keep the
product rule honest. First, the driving output must have
exactly one active edge per cycle of the polarity the
next stage needs — true of every single Q output here,
and not true of outputs combined with gates, which is
the subject of the glitch rule below. Second, the
driving output's HIGH and LOW times must each exceed the
next stage's minimum pulse width, 16 ns at 4.5 V for the
parts here — trivially true at every frequency this
chapter uses, and the reason a runt pulse must never
clock anything.

The design rule is: factor the total ratio into stage
ratios that exist, and never divide by a non-integer
leftover. Dividing 4 MHz by a 4040's Q11 (pin 1, divide
by 4096) gives 976.5625 Hz, and the remaining division
to 1 Hz, divide by 976.5625, is a ratio no divider stage
produces. A fractional frequency in the middle of a
chain means the factoring is wrong. Back up and
re-factor, as the worked chains below do.

The 32.768 kHz chain needs divide by 32,768, which is 2
to the power 15 exactly — fifteen divide-by-2 stages.
No single part here has fifteen stages, so the chain
always has two stages. The clearest is a 4020 plus half
a 74HC74: 32.768 kHz into the 4020 clock input, Q13
(pin 3, divide by 16384) gives 2 Hz, and the 74HC74
divides that by 2 to 1 Hz, a 50% square wave. The 4060
version is the same arithmetic with the oscillator on
the chip: Q13 (pin 3, divide by 16384) gives 2 Hz, plus
half a 74HC74. Two 4040s also work — the first Q11
(pin 1, divide by 4096) gives 8 Hz, and the second Q2
(pin 6, divide by 8) gives 1 Hz — at the cost of a
whole second chip for three stages. What never works is
a 4020 or 4060 alone: 2 Hz is not 1 Hz, and the clock
runs at double speed.

The 4 MHz chain needs divide by 4,000,000, which
factors as 2 to the power 8 times 5 to the power 6.
Route 1: divide by 4 (4040 Q1, pin 7) to 1 MHz, then
six decades — three 74HC390s, each wired divide-by-100
— to 1 Hz, with round checkable boundaries at 100 kHz,
10 kHz, 1 kHz, 100 Hz, and 10 Hz. Route 2: divide by
256 (4040 Q7, pin 13) to exactly 15,625 Hz, then six
divide-by-5 sections — three 390s again — to 1 Hz. Both
are correct; Route 1 is the clearer teaching chain. The
binary-only trap is the reason decimal division exists
in this story: 4,000,000 is not a power of two, and the
nearest power, 2 to the power 22, gives 0.953674 Hz —
each tick 1.048576 seconds long, 4.86% slow, losing
about 70 minutes a day. Anyone with a watch can measure
that error in an hour. For blinking, 0.95 Hz is fine.
For timekeeping, it is not.

The 1 MHz chain needs divide by 1,000,000, which is 10
to the power 6: six decades, three 74HC390s, 1 MHz to
100 kHz to 10 kHz to 1 kHz to 100 Hz to 10 Hz to 1 Hz,
exact, with no leftover. The binary-only trap is
identical: 2 to the power 20 gives the same 0.953674
Hz, the same 4.86%, the same 70 minutes a day. This
paragraph is division arithmetic only. The crystal
section's buying verdict on 1 MHz crystals stands
unchanged; working the arithmetic for 1 MHz does not
make a 1 MHz crystal a recommended buy.

Edges and duty decide how stages chain. Count edges,
not levels: each stage advances once per cycle of its
input, on its own active edge, so the divided frequency
is always right and only the phase depends on which
edge was used. A falling-edge output driving a
rising-edge 74HC74 shifts the output by half a period —
half a second at 1 Hz — which nobody cares about for a
lone clock, and which matters only when two signals
must coincide.

| Output | Clocks on | Duty | Notes |
|---|---|---|---|
| 4040 / 4020 / 4060, any Q | Falling edge | 50% | Toggle flip-flop |
| 390, BCD decade output nQ3 | Falling edge | 20% | HIGH at counts 8, 9 |
| 390, bi-quinary output nQ0 | Falling edge | 50% | HIGH at counts 5–9 |
| 390, divide-by-2 section nQ0 | Falling edge | 50% | Toggle |
| 390, divide-by-5 section nQ3 | Falling edge | Not 50% | Sequence-dependent |
| 74HC74 toggle Q | Rising edge | 50% | Q-bar wired to D |
| 4017, any Qn (Chapter 7) | Rising edge (CP0) | 10% | HIGH for 1 of 10 states |
| 4017, Q5-9 (Nexperia) | Rising edge (CP0) | 50% | HIGH for states 0–4 |

Duty matters in two bench situations: an LED driven
from a 10%-duty output looks dimmer than one driven
from a 50% output at the same frequency, and a narrow
pulse at high frequency approaches the next stage's
minimum pulse width. At human-visible rates neither
bites, but do not describe a 390 BCD output or a 4017 Q
output as a square wave. Nexperia's datasheet says Q5-9
can drive the next counter's clock input.
**UNVERIFIED:** whether TI's pin-12 output on its 4017
matches Nexperia's Q5-9 waveform; this book does not
assert the equivalence.

#### The ladders you can check with your eyes

Every output of a divider is a frequency you can
verify, and the ladder from 32.768 kHz down to 1 Hz is
this chapter's spine: fifteen halvings, each one
checkable, ending in a blink you can count. Through a
4020:

| Output | Pin | Divides by | Frequency |
|---|---|---|---|
| Q0 | 9 | 2 | 16,384 Hz |
| Q3 | 7 | 16 | 2,048 Hz |
| Q4 | 5 | 32 | 1,024 Hz |
| Q5 | 4 | 64 | 512 Hz |
| Q6 | 6 | 128 | 256 Hz |
| Q7 | 13 | 256 | 128 Hz |
| Q8 | 12 | 512 | 64 Hz |
| Q9 | 14 | 1024 | 32 Hz |
| Q10 | 15 | 2048 | 16 Hz |
| Q11 | 1 | 4096 | 8 Hz |
| Q12 | 2 | 8192 | 4 Hz |
| Q13 | 3 | 16384 | 2 Hz |
| 74HC74 Q | — | 32768 | 1 Hz |

Through a 4060, the same ladder with a gap — the
divide-by-2048 step (book Q10, TI Q11) has no pin, so
the ladder jumps from 32 Hz to 8 Hz:

| Output | Pin | TI name | Divides by | Frequency |
|---|---|---|---|---|
| Q3 | 7 | Q4 | 16 | 2,048 Hz |
| Q4 | 5 | Q5 | 32 | 1,024 Hz |
| Q5 | 4 | Q6 | 64 | 512 Hz |
| Q6 | 6 | Q7 | 128 | 256 Hz |
| Q7 | 14 | Q8 | 256 | 128 Hz |
| Q8 | 13 | Q9 | 512 | 64 Hz |
| Q9 | 15 | Q10 | 1024 | 32 Hz |
| Q11 | 1 | Q12 | 4096 | 8 Hz |
| Q12 | 2 | Q13 | 8192 | 4 Hz |
| Q13 | 3 | Q14 | 16384 | 2 Hz |
| 74HC74 Q | — | — | 32768 | 1 Hz |

Check the ladder with eyes and a stopwatch. Count the
2 Hz blink on Q13 (pin 3) for 30 seconds: 60 blinks
means the crystal and fourteen divider stages are all
correct. Count the 1 Hz blink for 60 seconds: 60 blinks
means the whole chain is right, and a steady
disagreement by a fixed ratio — 2 Hz, or 0.5 Hz — means
a wiring error, not a crystal error. Walk the ladder
downward: each step doubles the blink rate, and "twice
as fast as the last one" is checkable by eye at 4 Hz
against 8 Hz even when neither rate is countable. Use
the visibility boundary: 8 Hz is a fast flicker, 16 Hz
is a blur, 32 Hz and above looks steadily on. If Q9 on the 4020
(pin 14, 32 Hz) visibly blinks, the input frequency is
far lower than expected or the chain divides by more
than it should. A multimeter with a frequency range is
a bonus check on the 50%-duty outputs only; do not
promise a meter reading on the 20%-duty 390 output or
the 10%-duty 4017 outputs, where some meters miscount.
The 4 MHz chain shows only its last two stages — the
10 Hz flicker and the 1 Hz blink — but the same logic
holds: if the 1 Hz output is right, all six decades are
right, because one wrong decade would shift the output
by ten times. What cannot be checked without a scope is
the ripple delay, the glitch windows, and the shape of
any edge. Those are datasheet numbers, and the next two
sections say what they mean.

#### Ripple delay, in numbers

In a ripple chain the outputs do not change together:
each stage changes after the previous one, and the
delays add. The totals below are **DERIVED ESTIMATES**
— sums of datasheet figures, with the arithmetic shown,
not specified parameters. Typical figures are at 5 V
with a 15 pF load; worst-case shapes are at 4.5 V with
a 50 pF load.

| Chain | Typical | Worst-case shape | Derivation |
|---|---|---|---|
| 4040, CP to Q11 (Nexperia Rev. 8) | 102 ns | 250 ns | 14 + 11 × 8; 30 + 11 × 20 |
| 4040, CP to Q12 (TI CD, SCHS203D) | 55 ns | 193 ns | 11 + 11 × 4; 28 + 11 × 15 |
| 4020, CP to Q13 (Nexperia Rev. 9) | 89 ns | 223 ns | 11 + 13 × 6; 28 + 13 × 15 |
| 4060, φI to Q13 (TI, SCHS207G) | 85 ns | 220 ns | 25 + 10 × 6; 60 + 10 × 16 |
| 390, one decade, BCD (TI, SCHS185E) | — | 73 ns max | CLKA to QD, specified figure |

Never mix manufacturers in one sum. The TI CD 4040's
per-stage typical delay is 4 ns where the Nexperia
part's is 8 ns — different silicon, different numbers —
so the two 4040 totals differ by nearly a factor of two,
and both are honest for the part they describe. Use the
figures of the manufacturer whose part is on your bench,
or quote the worst-case shape, which bounds either.
Across chips the delays add too: a 4040 followed by a
390 decade settles, worst-case shape, roughly 250 + 73
= 323 ns after the input edge.

At human-visible rates this is nothing: 250 ns is
0.000025% of a one-second period, invisible to every
tool in this book. At 1 MHz, with a 1000 ns period, the
4020's 223 ns worst-case ripple is 22% of the period —
the outputs are not all valid at the same instant for
nearly a quarter of every cycle. At 4 MHz the
worst-case ripple is about a full period. At the 30 MHz
minimum fmax, the ripple total exceeds the period many
times over, which does not mean the counter miscounts:
fmax is a first-stage specification, and each stage
only needs its own input edge. It means the outputs are
never all valid at once at top speed. The summary:
ripple counters count correctly at any speed up to
fmax, but their outputs arrive late and staggered. For
dividing a clock down, only one output is used, and
lateness is irrelevant. For reading a count word or
decoding a state, lateness is everything.

#### Ripple, synchronous, and the one glitch rule

For dividing a clock down — one frequency in, one
slower frequency out, taken from a single Q output — a
ripple divider is ideal. The single output is a clean
50% square wave with fast edges, its lateness is
unobservable and irrelevant, and one 4020 divides by
16384 where the synchronous equivalent would need four
counters and carry logic. If you need one slower clock
and nothing else must happen at the same instant as its
edges, use a ripple divider. That covers the entire
crystal-to-1-Hz story.

Ripple dividers fail at distributing a clock: several
chips acting on the same edge at the same instant.
Their outputs skew by up to the ripple total, so two Q
outputs clocking two chips deliver edges up to 250 ns
apart — different clocks, for practical purposes, at
1 MHz. And the count word passes through wrong
intermediate states: going from 0111 to 1000, the
outputs show 0110, 0100, and 0000 for roughly one stage
delay each before settling. Never distribute a clock by
tapping different Q outputs of one ripple counter, and
never make a clock by combining ripple outputs with
gates. If two things must be clocked together, they
need the same clock signal, fanned out, not two outputs
of one counter.

A synchronous counter — the 74HC161 and 74HC163 of
Chapter 7 — clocks all its flip-flops from one shared
edge, so its outputs change together. That simultaneity
matters when the count word is read or decoded while
counting, when several counters must stay in step, when
a divided clock must align with its source, and when an
arbitrary integer division is wanted by presetting a
starting value and reloading at terminal count. The
cascade principle, in prose: the common clock goes to
every stage, each stage has two count-enable inputs
that must both be HIGH for it to count, and each
stage's carry output — HIGH when the count is at
maximum and the feed-forward enable is HIGH — enables
the next stage. The carry chain decides which stages
advance; the shared clock decides when. **UNVERIFIED:**
the exact pin-to-pin cascade wiring recipe was not
extracted from the datasheet application figure, so no
161/163 cascade diagram is printed in this book. The
principle above is verified; the wiring recipe is not,
and the 390 route covers this chapter's decimal work.
Do not treat the 161 and 163 as interchangeable: the
161's clear is asynchronous, the 163's is synchronous,
taking effect on the next clock edge. And the decade
160 has no DIP anywhere and must never appear in a
bench parts list; the 390 is the bench decade part.

Now the rule, stated once, with five witnesses.
**Never clock anything from a decoded or combinational
output.** A decoded combination of divider outputs can
show false pulses — glitches — while the outputs ripple
through intermediate states, and a glitch reaching a
clock input advances the next stage an extra time,
intermittently, in a way that depends on temperature,
voltage, and the individual chips on the bench. The
manufacturers say so, independently. Philips' 74HC93
sheet warns that decoded outputs "are subject to
decoding spikes and should not be used for clocks or
strobes" (Philips 74HC/HCT93, December 1990). OnSemi's
4060 sheet carries the same warning for decoded outputs
(MC74HC4060A/D, Rev. 3). Nexperia's 191 sheet says not
to use its terminal-count output as a clock, "because
it is subject to decoding spikes." Chapter 7's Q6 runt
is the same lesson from the ripple side: a 4017
truncated by wiring Q6 to its reset produces a
self-terminating pulse whose width is a propagation
delay, **DERIVED ESTIMATE** about 20 ns typical,
bounded by the 46 ns maximum reset delay (Nexperia
74HC4017, Rev. 8, 27 March 2024) — in the same size
class as the 16 ns minimum pulse width a clock input
needs, with the corners overlapping, so whether it
registers is a matter of individual chip speed, not
design. The loop itself is not a specified datasheet
parameter. Chapter 7 takes its divide-by-6 tick from
Q0's rising edge after reset, not from Q6, and this
chapter follows the same rule.

The fifth witness is the most instructive, because it
comes from a synchronous part. TI's 161 sheet documents
a glitch on the carry output of cascaded stages, names
the mechanism — the carry is the AND of the enable and
the four count outputs, which do not all change at the
same instant — and states that the application circuit
is not valid above 18 MHz at 25 °C and 4.5 V because of
it (TI SN74HC161, SCLS297D, Rev. D, September 2003).
Even synchronous parts glitch on combinational outputs.
The rule therefore covers both families: use a carry, a
terminal count, or a decoded combination as an enable,
sampled by a real clock edge where a brief glitch
between edges is harmless, or re-time it through a
flip-flop clocked by the real clock. Never use it as
the clock.

One exception proves the rule, and it must be explicit
or the reader will think Chapter 7's bench violates it.
Decoding ripple outputs to display a count — LEDs, a
display decoder — is acceptable at human-visible rates,
because a roughly 100 ns glitch is invisible to the eye
and too short to affect a display latched by a clean
edge. The LEDs observe; they do not clock anything. The
rule forbids decoding into a clock input, not decoding
for observation. Two bench rules close the section.
First, slow edges: the 4020, 4040, and 390 clock inputs
are ordinary logic inputs, not Schmitt triggers, and a
slow edge can double-clock them. Never drive a clock
input directly from a slow analogue edge — buffer it
through a Schmitt-trigger gate, the Chapter 7 bench
pattern of the 555 through a spare 74HC14 gate. Divider
Q outputs driving the next stage are always fast
enough, so output-to-clock chains never have this
problem, and the 4060's clock input is the exception,
tolerating slow edges. Second, unused inputs: tie every
unused input to VCC or GND at its inactive level —
reset inputs LOW, unused clock inputs HIGH so the
section never sees a falling edge, 74HC74 CLR and PRE
HIGH — and never leave an input floating.

Chapter 7's divide-by-60 chains are the application of
everything in this section, and they are not re-derived
here. Four 4017s take 1 Hz to minutes and hours —
divide by 10, divide by 6, divide by 10, divide by 6 —
using cascading, truncation by the Q6 runt, and the tick
taken from a single output's edge. The derivation stands
in Chapter 7; this section supplied the principles
behind it.

### Temperature compensation and the accuracy ladder

A crystal is the first real timekeeper in this book,
but it is not exact. Its frequency moves with
temperature, in a specific, explainable way — and that
movement is the whole reason the next rung of the ladder
exists. A temperature-compensated crystal oscillator, a
TCXO, measures the temperature and steers the frequency
back toward nominal as the temperature changes. This
section opens with the crystal's temperature problem,
because the reader must feel that problem before the
compensation idea can land; then it explains
compensation at block level, states honestly what it
buys and what it does not, and ends with the accuracy
ladder from a resistor and a capacitor up to the best
small clock in this book. No TCXO is built in this
chapter. The reasons are practical — package, supply
voltage, and output type, all below — and the section
says so plainly rather than pretending the top rung is
as breadboard-friendly as the ones below it.

#### Parts per million, in human terms

Every accuracy figure from here on is in parts per
million, ppm: one cycle fast or slow out of every
million. The derivation is short, and it is worth
showing, because every human-terms figure in this
section comes from it:

```text
1 ppm = 1 / 1,000,000 = 10^-6
Per second:  10^-6 × 1 s = 1 microsecond per second
Per day:     10^-6 × 86,400 s = 0.0864 s per day
Per 30 days: 0.0864 × 30 = 2.592 s per 30 days
Per year:    0.0864 × 365.25 = 31.6 s per year
```

The general rule: seconds per day equal the ppm figure
times 0.0864. Keep one anchor in mind — 1 ppm is about
a tenth of a second a day, about 32 seconds a year —
and translate every ppm figure beside it. The rule
assumes the error holds steady in one direction for the
whole period, the worst-case assumption: real
temperature error wanders as the temperature wanders,
so a real clock often does better than the worst-case
product over a day.

| Error | In ppm | Per day | Per 30 days |
|---|---|---|---|
| 1% | 10,000 | 864 s = 14.4 min | 7.2 hours |
| 0.1% | 1,000 | 86.4 s | 43.2 min |
| 0.01% | 100 | 8.64 s | 4.32 min |
| 0.001% | 10 | 0.864 s | 25.9 s |
| — | 1 | 0.0864 s | 2.59 s |
| — | 0.1 (= 100 ppb) | 0.00864 s | 0.26 s |

Datasheets quote ppm figures that are not all the same
kind of error. Frequency tolerance is how far a part
sits from nominal at 25 °C on the day it is made — a
fixed offset for a given specimen. Frequency stability
over temperature is how far the frequency moves as
temperature changes, measured relative to the 25 °C
value — a movement, not an absolute error. Ageing is
slow permanent drift over months and years. Supply and
load sensitivity are small extra movements with voltage
and load changes, quoted for oscillators. The
pessimistic total, the worst case the datasheet allows,
is the sum of the magnitudes. This section presents
such sums only as worst-case bounds, labelled as such
— the correct way to guarantee, the wrong way to
predict. A typical part at room temperature sits well
inside its bounds.

#### The crystal's temperature problem

The book uses two physically different resonators, and
their temperature behaviour differs in shape, not just
size. Megahertz crystals are AT-cut quartz plates, and
their frequency-versus-temperature curve is cubic,
S-shaped, with its inflection point near room
temperature: flattest near room temperature, bending
away more steeply at the hot and cold ends (CTS,
"Crystal Basics" application note). The 32.768 kHz
watch crystal is a tiny quartz tuning fork, and its
curve is a parabola opening downward: frequency is
highest at the turnover temperature, about 25 °C, and
falls on both sides — colder and hotter both make it
run slow. The datasheets state it as a parabolic
coefficient B and a turnover temperature Ti, with the
shift equal to B times the square of the distance from
turnover. Epson's FC-135 gives B = −0.04 ppm/°C²
maximum and Ti = 25 ± 5 °C (Epson FC-135,
FC-135_E_Ver1.0, 2020); Abracon's ABS07 agrees, with B
= −0.040 minimum / −0.036 typical ppm/°C² (Abracon
ABS07, revised 10 August 2022). The crystal section
worked its examples with CTS's −0.034 ppm/°C² for the
TFSM part; the coefficient is part-specific, and the
shape — a downward parabola, always slow away from
turnover — is what is universal. The worked values,
**DERIVED ESTIMATES** from B = −0.04 and Ti = 25 °C:

| Temperature | From turnover | Shift | Clock error |
|---|---|---|---|
| 25 °C | 0 °C | 0 ppm | 0 |
| 15 °C or 35 °C | 10 °C | −4 ppm | 0.35 s/day slow |
| 10 °C or 40 °C | 15 °C | −9 ppm | 0.78 s/day slow |
| 0 °C or 50 °C | 25 °C | −25 ppm | 2.16 s/day slow |
| −35 °C or +85 °C | 60 °C | −144 ppm | 12.4 s/day slow |

Read the table two ways, because both readings are
honest. On a desk, the tuning fork is excellent: a
living room staying within roughly 15 to 30 °C keeps
the temperature term within about 4 ppm, and the
dominant indoor error is not temperature at all but the
±20 ppm room-temperature tolerance, a fixed offset.
Outside, the parabola bites quadratically: the shift
goes as the square of the distance from turnover, so a
clock losing 2 seconds a day at 0 °C loses 12 seconds
a day at −35 °C. That is exactly the regime a TCXO
fixes — and exactly the regime a bench clock never
sees. Any single-ppm "stability" quoted for a watch
crystal without a temperature is invented: the
manufacturers print a parabola, not a stability number,
and the Abracon ABS07W states the same physics as a
range, −200 to −100 ppm over −40 to +85 °C, always
negative, always slow (Abracon ABS07W, revised
8 March 2021).

Sourced stability figures for plain crystals, with
their temperature ranges travelling beside them — a
figure without its range is meaningless:

| Part / grade | Tolerance | Stability | Range | Ageing, 1st year |
|---|---|---|---|---|
| Abracon AB (HC49), standard | ±50 ppm | ±100 ppm | 0 to +70 °C | ±5 ppm |
| Abracon ABM7, standard | ±50 ppm | ±50 ppm | −10 to +60 °C | ±5 ppm |
| Abracon ABM13W, standard | ±10 ppm | ±15 ppm | −40 to +85 °C | ±2 ppm |
| 32.768 kHz fork (FC-135, ABS07) | ±20 ppm | Parabola above | — | ±3 ppm |
| 32.768 kHz fork (ABS07W) | ±10 ppm | −200 to −100 ppm | −40 to +85 °C | ±3 ppm |

(Abracon AB series, revised 2 September 2010; Abracon
ABM7, Rev. T, 17 April 2024; Abracon ABM13W, revised
17 September 2020.) The honest summary: ordinary
megahertz crystals sit in the ±20 to ±50 ppm stability
class over an industrial range, with ±10 ppm grades
available and ±100 ppm at the loose end. A single
"crystals are ±20 ppm" claim would be wrong in both
directions. Three further error sources sit outside the
crystal datasheet, in the oscillator circuit around the
crystal, and belong to the crystal section: load
capacitance error, drive level, and the amplifier's own
ageing and supply sensitivity. The
ladder below labels the crystal rung by its datasheet
terms and notes that circuit effects are additional.

#### What a TCXO is

A TCXO is a complete crystal oscillator — crystal,
oscillator amplifier, and output stage — in one package,
plus a temperature-compensation network that measures
the temperature and steers the frequency back toward
nominal as temperature changes. ECS's white paper
defines it as a crystal oscillator with a
temperature-sensitive reactance in its oscillation
loop, there to compensate for the frequency error over
temperature inherent to the crystal (ECS, David Meaney,
"Unlocking Precision", 22 April 2024). Three
distinctions from the first mention: a crystal is a
component with two pins that needs an oscillator
circuit, while a TCXO is a circuit that needs only
power and gives a clock output — they are not
interchangeable parts. A TCXO is not an oven: an
oven-controlled oscillator holds its crystal at a fixed
hot temperature, while a TCXO lets the crystal's
temperature wander with the room and corrects the
frequency electrically, with no heater and instant
start. And "TCXO" says nothing about the output
waveform or the supply voltage — clipped-sine and
CMOS-output versions exist, at 1.8 V, 2.5 V, 3.3 V, and
rarely 5 V — so buying "a TCXO" without checking those
two fields is how a beginner ends up with a part that
cannot drive their logic.

Compensation works because every crystal's
frequency-versus-temperature curve is repeatable for a
given specimen: heat the same crystal to the same
temperature and it errs by the same amount, in the same
direction. Three boxes do the work. A temperature
sensor sits next to the crystal, or inside the package
with it. Correction logic looks up or computes how far
this crystal errs at that temperature, from a curve
that is the inverse of the crystal's own: where the
crystal runs fast, pull it slow by the same amount, and
vice versa. And a variable reactance in the oscillation
loop — a voltage-variable capacitance, or a switched
bank of fixed capacitors across the crystal — pulls the
frequency by that amount. The pull range only needs to
cover the crystal's temperature excursion, tens of ppm.
The residual error, the ±2.5 ppm or ±0.5 ppm the
datasheet specifies, is how imperfectly the inverse
curve matches the real curve, plus sensor error, plus
the sensor and the crystal never being at exactly the
same temperature during fast changes. Compensation is
curve-fitting, not magic, and a better fit — a curve
measured for that crystal at the factory, with more
correction points — gives a tighter residual. That
factory calibration is the product as much as the
silicon is.

Analogue compensation steers the frequency smoothly and
continuously, like turning a dial by hand as the
temperature changes: the sensor's signal passes through
an analogue network that produces a continuously
varying correction voltage for the varactor, so the
frequency glides rather than steps. Its cost is factory
tuning — the network must be trimmed to match each
crystal's curve — and the fit a small network can
achieve against a cubic or parabolic curve. Digital
compensation, the DTCXO, measures the temperature,
digitises it, looks up the required correction in a
table stored in the chip and measured for that crystal
at the factory, and turns the table value into a
correction voltage through a digital-to-analogue
converter. Because the correction updates in steps,
each update moves the frequency by a small sudden
amount, a "micro-jump"; for a clock that counts
seconds, micro-jumps are utterly irrelevant — each is a
fraction of a ppm, and counted time averages them out —
though they can trouble sensitive phase-locked loops in
telecom equipment. The DS3231 below is a concrete,
documented DTCXO: sensor, lookup table, and switched
capacitor bank, updating on power-up and every
64 seconds.

What compensation does not fix is as important as what
it does. It does not fix ageing: the curve itself
creeps slowly with age, which is why ageing is
specified separately from temperature stability. It
does not fix initial tolerance: compensation centres
the movement around the room-temperature frequency, not
the room-temperature frequency on nominal, which is why
TCXO datasheets still quote a ±1.5 to ±2 ppm
tolerance. It does not fix supply and load sensitivity,
small but specified separately. And it does not fix
fast temperature transients: the sensor and the crystal
have different thermal masses, the correction lags
during a rapid swing, and datasheet stability must not
be promised during thermal shock. Only a
voltage-controlled TCXO or a part with an ageing-trim
register lets anyone correct ageing after the fact, and
both need a reference to trim against that the no-scope
reader does not have.

#### What compensation buys, honestly stated

Ordinary TCXOs hold about ±2.5 ppm over temperature.
Tighter grades hold ±0.5 ppm. The comparison must be
like with like — stability over temperature, over a
wide range, worst-case datasheet figures:

| Part | Vs temperature | Tolerance | Range | Ageing |
|---|---|---|---|---|
| Abracon ASTX-H12 | ±2.5 ppm | ±2.0 ppm | −30 to +75 °C | ±1.0 ppm, 1st yr |
| ECS ECS-TXO-3225 | ±2.5 ppm | ±1.5 ppm | −30 to +85 °C | ±1.0 ppm/yr |
| Epson TG2016SMN, grade C | ±0.5 ppm | ±0.5 / ±1.5 ppm | −40 to +85 °C | ±0.5 ppm, 1st yr |
| Epson TG-3541CE, grade XA | ±1.9 / ±3.4 ppm | Included | 0–50 / −40–85 °C | Not stated |

(Abracon ASTX-H12, revised 13 May 2015; ECS ECS-TXO-3225
datasheet — **UNVERIFIED** as to revision, no revision
date visible in the copy read; Epson TG2016/2520SMN,
Spec No. TG2016/2520SMN_EN_ver.2.0, Ver. 2.0; Epson
TG-3541CE, 2020, no specification number visible in the
copy read.) Read the table with care. The Epson
±0.5 ppm tolerance is before reflow; after reflow it is
±1.5 ppm, three times the temperature stability, so the
headline "0.5 ppm TCXO" is true and misleading in equal
measure quoted alone. The TG-3541CE figures are total
accuracy over each window, tolerance included — do not
add a tolerance figure to them, or the tolerance is
counted twice — while the ASTX-H12 and ECS figures
split tolerance and stability into separate rows, so do
not quote their ±2.5 ppm as total accuracy either.
Distributor listings show the TG-3541CE as "±8 ppm";
that is the worst window, +85 to +105 °C, not the
room-temperature figure of ±1.9 ppm. Always read the
datasheet's window table. No ageing figure is quoted
for the TG-3541CE: none was stated in the copy read.

Against an ordinary ±30 to ±50 ppm crystal, a ±2.5 ppm
TCXO is a 12× to 20× improvement on the temperature
term alone. The worst-case totals narrow the gap,
because tolerance and ageing do not shrink as fast as
the temperature term. Worked, with every term at its
maximum in the same direction, and labelled as bounds:

| Part | Worst-case sum | Total | Per day |
|---|---|---|---|
| ABM7 crystal, ±20 tol / ±30 stab | 20 + 30 + 5 ageing | ±55 ppm | 4.75 s |
| ASTX-H12 TCXO | 2.0 + 2.5 + 1.0 + 0.2 + 0.2 | ±5.9 ppm | 0.51 s |
| TG2016SMN, after reflow | 1.5 + 0.5 + 0.5 + 0.1 | ±2.6 ppm | 0.22 s |

Worst-case crystal, about 55 ppm, against worst-case
ordinary TCXO, about 6 ppm: roughly a 9× improvement in
guaranteed total accuracy. That narrowing is itself a
lesson — compensation fixes temperature; it does not
fix everything. For the 32.768 kHz case the improvement
is starker at the extremes and smaller indoors: at
−35 °C the uncompensated fork is −144 ppm on
temperature alone while the TG-3541CE guarantees
±3.4 ppm, about 40×; indoors, the fork's temperature
term is at most 4 ppm and the TCXO's advantage on
temperature alone is only about 2×, its real indoor
advantage being that its figure includes tolerance
while the fork's ±20 ppm tolerance still applies on
top. Still tighter grades are specified in parts per
billion rather than parts per million (1 ppb =
0.001 ppm); they are telecom parts at telecom prices,
not bench parts, and they are not what "a TCXO" means
on the bench.

Ageing is the sense in which the top rung is not
perfect either. First-year ageing, from the datasheets:
±5 ppm for the ABM7 and AB crystals, ±2 ppm for the
ABM13W, ±3 ppm for the tuning-fork crystals, ±1.0 ppm
for the ordinary TCXOs and the DS3231, ±0.5 ppm for
the Epson TCXO's middle frequency bands. Ageing is
logarithmic, not linear: fastest early — fastest in
the first 45 days — and decaying thereafter, so a ±5 ppm
first-year figure does not mean ±25 ppm after five
years. The datasheets show the shape directly: the
ABS07W gives ±3 ppm for the first year and ±10 ppm
over ten years, and the Epson TCXO gives ±0.5 ppm for
the first year and ±3.5 ppm over ten years. Never
multiply a per-year ageing figure by a number of years.
And after a few years, accumulated ageing exceeds
temperature stability: the Epson part's ±3.5 ppm
ten-year bound is seven times its ±0.5 ppm temperature
stability. A TCXO keeps time across seasons. Nothing in
this book keeps perfect time across years without ever
being re-checked.

#### When a TCXO matters — and when it does not

A TCXO earns its keep in three cases. A clock that must
keep time across seasons and rooms: an uncompensated
32.768 kHz clock in a room swinging from 0 to 30 °C
carries a temperature term from −25 ppm to about zero,
up to 2.2 seconds a day slow in winter on top of its
±20 ppm tolerance, while a DS3231-class part holds ±2
to ±3.5 ppm total, at most 0.3 seconds a day — over a
90-day winter, roughly 3 minutes lost to temperature
alone against at most 27 seconds, worst-case bounds in
both directions. Long unattended runs: a data logger, a
controller, a clock in a holiday home, where the
accumulated error is what matters and the worst-case
totals above give about 15 seconds against about
2.4 minutes a month. And frequency references, where
the frequency itself is the product — calibrating
another oscillator, or a frequency counter's timebase —
and temperature stability directly sets measurement
accuracy.

A plain crystal is already far better than anything
else in this book in four cases. A bench clock, in a
room held within a few degrees and re-checked against a
phone whenever the reader cares: indoors, the crystal's
temperature term is a few ppm, and the reader's
re-checking absorbs even that. A demonstration, whose
purpose is to show division or counting working: the
555 already suffices for visibility, a crystal is
luxury, and a TCXO is jewellery. Anything re-checked
against a phone, whose clock is disciplined by the
network to far better than any free-running crystal.
And anything where the crystal's tolerance dominates:
if the design never trims the ±20 ppm room-temperature
offset, compensation leaves a ±20 ppm offset in place
and fixes only the few-ppm movement around it. The
honest sentence for the bench: on your bench, a crystal
clock and a TCXO clock will agree to within a second
for weeks; the TCXO earns its keep in the seasons, not
in the afternoon.

| Case | Plain crystal | TCXO | Advantage |
|---|---|---|---|
| Bench, indoors, temperature only | ≤4 ppm, 0.35 s/day | ≤2.5 ppm, 0.22 s/day | ~1.6×, invisible |
| Bench, indoors, worst-case total | ~55 ppm, 4.8 s/day | ~6 ppm, 0.5 s/day | ~9×, both seconds/day |
| Seasonal, 0 °C, temperature only | −25 ppm, 2.2 s/day | ±3.5 ppm, 0.3 s/day | ~7×, accumulating |
| Cold extreme, temperature only | −144 ppm, 12.4 s/day | ±3.4 ppm, 0.29 s/day | ~40× |

#### Buying a TCXO: package, output, and supply

The buying reality must be unmissable, because it is
the reason this chapter does not build a TCXO clock.
Current TCXOs live in small ceramic surface-mount
packages named by footprint in millimetres: 2016, 2520,
3225, 5032, and 7050, most commonly four pads, with
six-pad and ten-pad variants in use. No pinout is
printed in this book, and none should be inferred from
a pattern: pad numbering depends on viewing direction,
manufacturers rotate assignments, and voltage-controlled
variants put a control voltage where a fixed TCXO has
an enable or a no-connect. Read the exact part's
datasheet figure. Generic SMD-to-DIP adapter boards
exist, but soldering a 2.0 × 1.6 mm part to one needs
SMT soldering skill and magnification, adapters are
footprint-specific, and no specific adapter is named
here — none was verified. The contrast with crystals is
the practical point: bare crystals are plentiful in
through-hole cans, while the TCXO rung is not
breadboard-native.

The output trap is the most important buying fact in
this section. Many TCXOs, including the tightest Epson
parts, provide only a clipped-sine output: roughly 0.8
to 1 V peak-to-peak, meant to drive a 10 pF / 10 kΩ
load, not a logic input. A clipped-sine output cannot
drive a 74HC input directly — its swing never crosses
the HC thresholds convincingly — and squaring it up is
a small analogue design problem this book has not
taught. The manufacturers' reason is documented, not
perverse: a CMOS output stage's dissipation disturbs
the thermal gradients inside the tiny package and
shifts the calibration, so precision TCXOs leave the
squaring-up to the host chip. A beginner TCXO build
must specify an HCMOS, CMOS, or LVCMOS-output part,
such as the ASTX-H12 or the ECS-TXO-3225 family, and a
clipped-sine part ordered by mistake will appear dead
on a logic bench. Epson's clipped-sine parts
additionally need an external DC-cut capacitor on the
output, which is not included in the part. The enable
pin is a second, smaller trap: its behaviour with the
pin left open is part-specific, so any build must state
the enable wiring from the chosen part's datasheet,
never from habit.

The supply-voltage trap is the NE555 problem again,
wearing a different hat — Chapter 7's bench met it
first. Most TCXOs are 3.3 V parts: the ASTX-H12 runs
on 3.3 V (2.97 to 3.63 V), as do the ECS parts, and the
Epson parts run on 1.7 to 3.63 V. A 3.3 V HCMOS TCXO
guarantees an output HIGH of at least 90% of its
supply, about 2.97 V, which is below the 74HC
input-HIGH requirement of about 3.5 V at a 5 V supply.
Driving 5 V 74HC inputs directly from a 3.3 V TCXO is
marginal by specification. The fixes are the same
family as Chapter 7's: 74HCT inputs with TTL
thresholds, a level shifter, or a 5 V-tolerant
CMOS-output part. This section designs none of those
interfaces; it records that a TCXO build for the 5 V
bench needs an interface decision, and "wire the output
to the clock input" is not a complete instruction.
Never power a 3.3 V TCXO from 5 V to fix its output
level: the Epson part's absolute maximum supply is
4.0 V, and overvoltage kills the part. The exceptions
that reach 5 V are the Epson TG-3541CE, at 1.5 to 5.5 V
with a CMOS output, and the DS3231, at 2.3 to 5.5 V.

Through-hole TCXOs existed. Ecliptek made 14-pin DIP
TCXOs, in 5 V HCMOS, 5 V sine, 3.3 V HCMOS, and 3.3 V
sine versions, until the series was terminated on
10 May 2004 with no end-of-life buy window and no
replacement named (Ecliptek termination bulletin,
10 May 2004). The honest statement today is narrower
than "none exist": exactly one through-hole TCXO module
was found, the Maxim DS32KHZ in a 14-pin DIP (Maxim
DS32kHz data sheet, Rev. 071521), specified at ±2 ppm
from 0 to +40 °C and ±7.5 ppm over its full range, with
constrained availability. Its pinout is
**UNVERIFIED**, and no pinout is printed here. That
single constrained part against a whole surface-mount
catalogue is the measure of how far the TCXO has moved
from the breadboard. Cost, by contrast, is not the
barrier: in cost classes, a crystal costs cents, an
ordinary TCXO costs a few dollars, a DS3231 chip costs
ten-plus dollars from an authorised distributor, and a
precision parts-per-billion TCXO costs tens of dollars.
The reason this chapter does not build a TCXO clock is
not the few dollars; it is the 2-millimetre package and
the 3.3-volt output.

#### The DS3231: what a real timekeeper looks like

The worked example for the top of the ladder is the
DS3231 (Maxim Integrated, datasheet 19-5170, Rev. 10,
March 2015): a low-cost real-time clock with an
integrated TCXO and crystal in one 16-pin surface-mount
package. It counts seconds, minutes, hours, day, date,
month, and year, with leap-year compensation to 2100,
two time-of-day alarms, a readable temperature sensor,
and battery-backup switchover. The crystal is inside
the package, and the temperature sensor sits next to
it — the shortest possible thermal path, which is part
of why the compensation works as well as it does. Its
accuracy is ±2 ppm from 0 to +40 °C and ±3.5 ppm from
−40 to +85 °C, total accuracy with tolerance included,
and the datasheet's own summary is that it "maintains
the RTC to within ±2 minutes per year accuracy from
−40 °C to +85 °C" — which checks out arithmetically:
3.5 ppm times 31.6 seconds a year is 110.5 seconds,
1.84 minutes. Its supply, 2.3 to 5.5 V, is genuinely
5 V friendly, unlike most TCXOs. Crystal ageing is
±1.0 ppm for the first year and ±5.0 ppm over 0 to 10
years, after reflow and not production tested.

Its TCXO is the block diagram of the previous section
made concrete, in the datasheet's own description: the
controller reads the on-chip temperature sensor,
consults a lookup table for the required capacitance,
adds the ageing-offset register value, and sets a
switched capacitor bank at the crystal pins.
Conversions run on power-up and every 64 seconds, and
new capacitance values load when the temperature
reading changes. The temperature sensor reads to ±3 °C
accuracy with 0.25 °C resolution. An ageing-trim
register exists for trimming ageing out against a
reference; trimming needs a reference better than the
part being trimmed, which the reader of this book does
not have, so it is mentioned here and presented as no
beginner procedure.

The DS3231 is an example in this chapter, not a build,
for a structural reason: it is an I²C real-time clock,
and without an I²C master the reader cannot set the
time, read the time, or configure the outputs. Power
the chip alone and it counts from its reset state,
silently. Its two clock-like outputs are both
open-drain, needing external pull-ups: a 32.768 kHz
output, and a programmable square-wave output at 1 Hz,
1.024 kHz, 4.096 kHz, or 8.192 kHz, all needing I²C
writes to configure. The 32 kHz pin is compensated, but
the chip's accuracy specification is written for its
1 Hz timekeeping, and the part must not be presented as
a specified frequency reference or wired to a counter
as if it were a crystal oscillator. The chip itself is
a surface-mount SO package that does not fit a
breadboard; the beginner route is a breakout board, and
buying one is where the traps are.

**Buy and look: a DS3231 breakout.** Buy a breakout to
inspect, not to wire up: no wiring and no I²C in this
chapter. Read the chip marking first, and buy from a
source that names the exact part number. The DS3231M is
a different part: it uses a MEMS resonator instead of
quartz, is specified at ±5 ppm for its 1 Hz timekeeping,
and its 32 kHz output is reported to be uncompensated
and specified at ±2.5% — reported from the DS3231M
datasheet via secondary sources, the datasheet itself
not directly read, so the figure is carried as reported,
not as a verified datasheet value. Cheap modules sold
as "DS3231" are frequently fitted with M chips, or
remarked chips, and the board label does not establish
which chip is fitted. Note the package bulk — the
crystal is inside — and the battery holder. On the
ubiquitous blue ZS-042 breakout, widely reported hobby
sources describe a charging circuit designed for a
rechargeable LIR2032 cell; fitting an ordinary
non-rechargeable CR2032 puts a charging voltage on a
cell that must not be charged. That warning is carried
as widely reported, no module schematic having been
read; counterfeit and remarked chips on the cheapest
modules are likewise reported. The safe route is an
authorised-distributor chip or a reputable maker
breakout, such as Adafruit's Precision RTC Breakout,
which omits the charging circuit. Look, check the
marking, and put it back in the drawer. In this chapter
it is an example of what real timekeeping looks like,
and nothing more.

#### The accuracy ladder

Every figure below is quoted from a datasheet named in
this section or derived transparently from one by the
rule that seconds per day equal ppm times 0.0864.
Conditions travel with every number, because the
conditions are the honesty. "Worst case" means every
datasheet term at its maximum in the same direction — a
guarantee bound, not a prediction. The RC and 555 rows
carry no datasheet citation: the RC row is
estimate-only and has no ppm figure, and the 555 row
stays in percent-class terms, because no ppm stability
specification was verified for it.

| Rung | Error basis | Per day | Per 30 days | Conditions |
|---|---|---|---|---|
| RC oscillator | Factor-of-two class, estimate-only | Hours; ±4.8 h at ±20% | ±6 days at ±20% | No ppm figure exists |
| 555, untrimmed | ±27% worst case, worked budget | 6.5 h | 8.2 days | Electrolytic timing capacitor |
| 555, trimmed | 0.38–0.63% worst-case wander | 5.5–9.1 min | 2.7–4.5 h | Film capacitor; drifts with temperature/supply |
| Crystal, MHz, ordinary | ±55 ppm worst case | 4.75 s | 2.38 min | ±20 tol, ±30 stab, ±5 ageing |
| Crystal, MHz, tight grade | ±27 ppm worst case | 2.33 s | 1.17 min | ±10 tol, ±15 stab, ±2 ageing |
| Crystal, 32.768 kHz fork, indoors | ≤4 ppm, temp. term only | ≤0.35 s slow | ≤10.4 s slow | 15–30 °C; ±20 ppm tolerance extra |
| Crystal, 32.768 kHz fork, cold | −144 ppm, temp. term only | 12.4 s slow | 6.2 min slow | 60 °C from turnover |
| TCXO, ordinary | ±5.9 ppm worst case | 0.51 s | 15.3 s | −30 to +85 °C class |
| TCXO, high-stability | ±2.6 ppm worst case | 0.22 s | 6.7 s | After reflow, −40 to +85 °C |
| DS3231, room temperature | ±2 ppm total | 0.17 s | 5.2 s | 0 to +40 °C, tolerance included |
| DS3231, full range | ±3.5 ppm total | 0.30 s | 9.1 s | −40 to +85 °C, tolerance included |

Read the ladder as four different answers to "how well
can I know the time?", not as a smooth staircase. The
RC oscillator answers "roughly." The 555 answers "this
afternoon." The crystal answers "this season, on a
desk." The TCXO answers "this season, anywhere." The
555-to-crystal jump is the biggest single jump in
practical terms, from hours a day to seconds a day,
which is why the crystal earns its billing as the first
real timekeeper; the TCXO refines what the crystal
starts. And no rung reaches zero: every clock in this
book drifts, and the ladder is about how slowly, and
under what conditions. Beyond the TCXO lie
oven-controlled oscillators, which heat the crystal to
a constant temperature, and GPS-disciplined oscillators,
which steer an oscillator against satellite time
signals — both beyond this book, with no figures and no
circuits offered here.

#### Checking without an oscilloscope: the honest limits

The counting check that served the lower rungs — count
blinks against a phone stopwatch — breaks down
gracefully but firmly at the crystal rung, and
completely at the TCXO rung, and the chapter must
explain why, because the explanation is itself the
lesson of the ladder's top. Counting resolves an error
when the accumulated drift exceeds about one second,
the smallest interval a human can reliably judge
against a phone stopwatch. Time needed to see one
second of drift, **DERIVED ESTIMATES** from the ppm
rule:

| Error | Time to accumulate 1 s of drift |
|---|---|
| 10% (untrimmed 555) | 10 seconds |
| 1% (trimmed 555) | 100 seconds |
| 100 ppm (loose crystal, worst case) | 2.8 hours |
| 55 ppm (ordinary crystal, worst-case total) | 5.0 hours |
| 20 ppm (crystal tolerance alone) | 13.9 hours |
| 5.9 ppm (ordinary TCXO, worst-case total) | 1.96 days |
| 2 ppm (DS3231, room temperature) | 5.8 days |
| 0.5 ppm (TCXO, temperature term) | 23 days |

A crystal clock's error is checkable over a day. A
TCXO's error needs a week to a month of patient
comparison: resolving 2 ppm by counting takes about six
days to see one second of drift. The TCXO rung is
bought on datasheet trust, and this section says so
plainly. The checks that do work are slow ones. The
long comparison is the primary check: set the clock
against a phone clock, note the difference, leave it
running, and compare again after days for a crystal or
weeks for a TCXO; the accumulated difference divided by
the elapsed time is the average error in seconds per
day, directly comparable with the ladder. It needs
patience, not instruments. Dividing an output down to
about 1 Hz and watching it blink proves the oscillator
runs and the dividers work; it proves nothing about ppm
accuracy, and must be labelled a function check, never
an accuracy check — a 100 ppm error and a 1 ppm error
both blink at "about 1 Hz" to the eye. A multimeter's
frequency mode is a bonus check for order of magnitude
only: it cannot distinguish 32,768 Hz from 32,767 Hz
reliably, and 1 Hz at 32.768 kHz is 30 ppm. What cannot
be checked without instruments is the exact frequency
of any rung above the 555 to better than counting
accuracy over days, the TCXO's datasheet temperature
stability in an afternoon, the DS3231's ±2 ppm figure
without weeks of comparison, ageing on any timescale
this book can ask of a reader, or whether a clipped-sine
output is present and correct. Above the crystal rung,
you are buying a datasheet promise and verifying it the
slow way, by living with the clock. That is normal
engineering: datasheets exist precisely because not
everything can be checked on the bench.

## Bench builds

Four builds, in order, each one reusing the last: a 555 clock, a
crystal oscillator, the divider chains that turn fast clocks into
visible blinks, and the comparison run that makes the accuracy
ladder visible. Build in stages, and prove each stage before adding
the next, exactly as in Chapter 7: a fault found at the stage where
it was introduced is a five-minute fix, and the same fault found at
the end is a hunt through the whole board. Every check below uses a
multimeter, a stopwatch, or LEDs. Nothing here needs an
oscilloscope, and nothing here asks what a waveform looks like.

One honesty note governs Builds 2 and 3. The crystal oscillator
wiring diagrams are deferred: the resistor values and the 4060
crystal figure could not be verified from the datasheet text
available, and this chapter will not print a schematic it cannot
stand behind. Builds 2 and 3 specify everything that is verified -
parts, load-capacitor values, pins, divisions, checks - and say
plainly what waits. Do not wire a crystal oscillator from memory or
from a forum schematic and call it this chapter's build.

### Build 1: the 555 clock at 1 Hz

Build the 555 astable at 1 Hz, directly, with no divider. Chapter 7
ran the 555 at about 4096 Hz and divided down; here the blink itself
is the clock, so every error in the timing network shows in the
count. That is the point: this build teaches what an RC clock is
worth.

Wire the circuit drawn in the theory section's figure: R1 6.8 kΩ
from VCC to DISCH (pin 7), R2 150 kΩ from DISCH to the timing
node, THRES (pin 6) shorted to TRIG (pin 2) at that node, C 4.7 µF
from the timing node to ground, RESET (pin 4) tied to VCC, CONT
(pin 5) to ground through 0.01 µF, and OUT (pin 3) through a 1 kΩ
resistor and an LED to ground, plus a CLK OUT terminal taken from
the same output node. GND is pin 1 and VCC is pin 8 (TI SLFS022I).
No other components belong in the figure; the decoupling
capacitors and the trimmer below are bench additions, described
separately, not part of the figure.

The values are DESIGN VALUES, from the astable formula f = 1.44 /
((R1 + 2 x R2) x C) (TI SLFS022I, section 8.3.2; ST Doc ID 2182 Rev.
6):

```text
R1 + 2 x R2 = 6.8k + 300k = 306.8 kΩ
(R1 + 2 x R2) x C = 306.8k x 4.7 µF = 1.4420 s
f = 1.44 / 1.4420 = 0.9986 Hz
T = 1.0014 s
tHIGH = 0.693 x 156.8k x 4.7 µF = 0.511 s
tLOW = 0.693 x 150k x 4.7 µF = 0.489 s
duty (HIGH) = 51.1%
```

The 0.9986 Hz figure is 0.14% below 1 Hz, and it must never be
presented as what the reader will measure. The arithmetic is exact;
the parts are not. The capacitor's tolerance dwarfs the arithmetic;
trimming is the honest route to 1 Hz.

Film or electrolytic: say which, and mean it. The theory section
works the budgets in full; the build consequences are these.
Untrimmed, the worst case is plus or minus 27.3% with a plus or
minus 20% electrolytic capacitor (6.5 hours per day) and plus or
minus 8.25% with good parts (2.0 hours per day): trimming is not
optional for a clock that must read 1 Hz. Trimmed at room
temperature with a film capacitor, only drift terms remain, and
the worst-case wander over 10 °C and plus or minus 0.1 V of
supply is 0.63% with polyester and 0.38% with polypropylene —
minutes per day with ordinary room-temperature changes. With an
electrolytic capacitor no trimmed budget can be computed at all:
its temperature coefficient was not found in the sources read
(UNVERIFIED), and its leakage adds an unquantified
temperature-dependent term. The book's headline stands: the 555
teaches oscillation and division; it does not keep time. Do not use
an X7R or other high-K ceramic capacitor as the timing capacitor:
its capacitance varies strongly with voltage and temperature, and no
single number captures it. For decoupling and the CONT bypass, X7R
is fine, because value accuracy does not matter there.

Decoupling is not optional. The bipolar 555's output stage draws
large transient currents during transitions: Renesas FN2867
quantifies the bipolar supply-current spikes at 300-400 mA, against
2-3 mA for the CMOS ICM7555. TI recommends a 0.1 µF ceramic bypass
capacitor from VCC to ground, and ST recommends more: a minimum of
0.1 µF in parallel with 1 µF electrolytic (ST Doc ID 2182 Rev. 6,
section 4.6). Fit the 0.1 µF ceramic close to pins 8 and 1, and add
the 1 µF electrolytic alongside it, because the 555 shares its
supply with logic in every build in this chapter. A multimeter
cannot see the spikes - they are nanosecond-scale - so the fix is
preventive, not diagnosed by measurement. Fit the same 0.1 µF for
a CMOS 555 too; its spikes are about 100 times smaller, but
bypassing is still good practice, and "CMOS needs no decoupling"
must not be taught as a rule.

The RESET pull-up trap. When RESET is not used, tie it to VCC: TI
SLFS022I section 8.3.1 says "to prevent false triggering, when RESET
is not used, it should be connected to VCC", and a floating RESET
pin is a wiring fault, not a style choice. For the bipolar NE555,
tie it directly with a wire. Do not copy the TLC555's 10 kΩ pull-up
example onto the NE555: the NE555's RESET pin draws 0.1 mA typical
and 0.4 mA maximum (TI SLFS022I/K), so through 10 kΩ at maximum
current the drop is 4.0 V, leaving the pin at 1.0 V, exactly at the
maximum reset threshold and not guaranteed out of reset. At typical
current the pin sits at 4.0 V and works, which is why the fault is
intermittent and confusing. With 1 kΩ the drop is at most 0.4 V and
the pin sits at 4.6 V or above: safe. The book rule is: bipolar 555,
tie unused RESET directly to VCC; if RESET must be pulled up through
a resistor because it is also driven, use 1 kΩ or less and verify
the pin voltage with the meter. For the TLC555 the 10 kΩ example is
sound, because its RESET current is 75 pA maximum (TI SLFS043K Rev.
K, January 2026, section 5.6), so a 10 kΩ pull-up drops microvolts.
Never transfer the TLC555's 10 kΩ example to the NE555.

Build and check, in order:

1. Power rails first, supply off. Fit one 100 nF decoupling
   capacitor across VCC and ground at the 555 position, the 10 µF
   bulk capacitor across the rails near the supply entry, and the
   555's own 0.1 µF plus 1 µF close to pins 8 and 1.
2. Wire the astable exactly as the figure shows. If the timing
   capacitor is electrolytic, its positive terminal goes to the
   THRES/TRIG node, where the voltage stays between one third and
   two thirds of VCC, always positive. Wire CONT (pin 5)
   to ground through 0.01 µF; do not leave it floating, or noise
   modulates both thresholds and the frequency wanders.
3. Fit the LED with its 1 kΩ series resistor from OUT to ground, as
   the figure shows.
4. Power on and count. Count 60 blinks against a stopwatch: 60
   blinks in 60 seconds is 1 Hz within plus or minus 1 blink, about
   plus or minus 1.7% counting error. With a plus or minus 20%
   capacitor the count over 60 seconds can be anywhere from about 48
   to about 75. That spread is the lesson, not a fault: the formula
   was exact, the parts were not. Do not trim by eye. A blink "looks
   like 1 Hz" over a wide range, and trimming by eye bakes a 10-20%
   error into the build.
5. Trim by count. Put the 50 kΩ trimmer in series with R2 and adjust
   until 60 blinks land inside 60 seconds, then re-count to confirm.
   Repeat the 60-second count ten
   minutes later, and again after the circuit has warmed up: the
   count moves, and most of what moves is the RC network and the
   trim drifting, not the chip. The chip's own contribution is small
   - 150 ppm per °C and 0.3% per volt, typical, as above - and
   the capacitor dominates.
6. Bonus checks, in this order of trust. A multimeter on DC volts at
   OUT reads about 2.5 V for a near-50% square wave at 5 V: a stuck
   output reads a rail, a toggling one reads mid-rail. That is a
   sanity check only. A meter frequency range, if fitted, reads the
   1 Hz output directly, but meter capability at 1 Hz is UNVERIFIED
   for any specific meter, so the blink count is the primary check
   and the meter is a bonus.

What success looks like: an LED blinking once per second by count,
after trimming, with the trimmed rate visibly drifting over minutes.
If the LED blinks far too fast or slow, the R or C decade is wrong;
counting catches it immediately. If the timing is erratic, check the
electrolytic polarity and the CONT capacitor before suspecting the
chip. If the 555 output must drive HC logic, do not feed it straight
in: see the level note in Build 3. The TLC555CP is the verified
substitute in this same circuit - same 8-pin pinout, functionally
interchangeable per its datasheet, with a CMOS output
that clears the HC input requirement by specification (see the
theory section's output-level comparison) - with one
warning carried from the theory: its temperature drift is not
specified in its datasheet, so no trimmed drift budget can be
computed for it, and the NE555's 150 ppm per °C must not be
borrowed. With the same film capacitor and resistors its untrimmed
accuracy is similar to the NE555 build, and its trimmed wander is
dominated by the same capacitor tempco plus an unspecified chip
term.

### Build 2: the crystal oscillator (wiring diagram deferred)

This build is specified only as far as the research verifies it:
the parts, the inverter, the load-capacitor DESIGN VALUES, the
protection reasoning, and the checks. The full wiring diagram
waits for two things this chapter does not yet have: a visual
read of the Nexperia 74HC4060 Rev. 7 Fig. 11 page and the
74HCU04 crystal figure, from the PDF, and a bench test of the
exact circuit. No datasheet-backed resistor values for a discrete
74HCU04 Pierce oscillator were established, the 4060 figure's
component values came out of text extraction garbled, and the
resistor values found in forums and secondary sources conflict
wildly. Until both are done, this section specifies the parts
and the checks and defers the diagram, explicitly. Do not wire
this build from a forum schematic.

The inverter is the 74HCU04, and the U matters. The Pierce circuit
needs an inverter biased into its linear region as an amplifier.
Murata's Timing Devices FAQ recommends the unbuffered type (4069UB /
74HCU04) single-stage CMOS inverter, and says triple-buffered types
(4049/4011/74HC04) or Schmitt-trigger types cannot be recommended,
because their extremely high gain may frequently develop abnormal
oscillation, with CR/LC/ring oscillation superimposed on the
resonator waveform. The 74HC04 the reader already knows is the
buffered part, and it is wrong here. The 74HC14 is wrong here too: a
Schmitt trigger has no usable linear region, and its hysteresis
fights the bias point. The 74HC14 stays in its own jobs - debouncing
and buffering the 555 - and never drives the crystal. Nexperia's
74HCU04 Rev. 7 datasheet lists "linear amplifier" and "crystal
oscillator" among the part's applications, and its Table 8 gives
external-component values for resonators below 1 MHz. The DIP route
is TI: SN74HCU04N (TI SCLS079E) or CD74HCU04E (TI SCHS127D Rev. D,
May 2004). Nexperia has no DIP 74HCU04: its Rev. 7 ordering table
lists only surface-mount packages, and type 74HCU04N was removed in
revision 7. The pinout is the standard hex-inverter pinout, the same
as the 74HC04 and 74HC14: 1A pin 1, 1Y pin 2, 2A pin 3, 2Y pin 4, 3A
pin 5, 3Y pin 6, GND pin 7, 4Y pin 8, 4A pin 9, 5Y pin 10, 5A pin
11, 6Y pin 12, 6A pin 13, VCC pin 14 (Nexperia 74HCU04 Rev. 7, Table
2). Tie every unused gate input to VCC or ground, never floating, as
in every chapter.

The load capacitors are DESIGN VALUES, worked from the crystal's
specified load capacitance CL by the formula in the theory
section (ST AN2867 Rev. 16, August 2022, section 3.3):
C = 2 x (CL - Cs) for equal capacitors, with Cs = 5 pF as the
planning allowance. CL is not the value of either load
capacitor, not their sum, and not a property the reader can
measure with a multimeter. Fitting two capacitors each equal to
CL is the commonest beginner error in all of crystal electronics:
for an 18 pF crystal it gives a load 4 pF low and a frequency
about 80-100 ppm fast (DERIVED ESTIMATE), and the circuit still
oscillates, which is why the error survives for years. The
residual CL error of a few pF moves the frequency by tens of
ppm, which still beats the 555 by a factor of several hundred.
The DESIGN VALUES, with the assumption stated every time:

| Crystal | CL | C1 = C2 | Check |
|---|---|---|---|
| 32.768 kHz | 12.5 pF | 15 pF | 15/2 + 5 = 12.5 pF |
| 8 MHz, 18 pF | 18 pF | 27 pF | 27/2 + 5 = 18.5 pF |
| 4 MHz, 18 pF | 18 pF | 27 pF | 27/2 + 5 = 18.5 pF |
| 8 or 16 MHz, 20 pF | 20 pF | 30 pF | see note below |

For the 20 pF crystals the arithmetic gives 2 x (20 - 5) = 30 pF,
which is an E24 value, not an E12 value: E12 runs 22, 27, 33 pF. Fit
27 pF (1.5 pF low) or 33 pF (1.5 pF high); either leaves a 1.5 pF CL
error, worth about 30 ppm, which is fine. The
load-capacitor values depend on CL and Cs, not on frequency: a 4 MHz
and a 16 MHz crystal with the same CL take the same capacitors. Use
C0G/NP0 ceramic capacitors only for the load capacitors, as AN2867's
section 3.7 example specifies C0G. Do not use X7R or electrolytic
capacitors here. Keep both capacitors' ground leads short and to the
same ground point near the chip, and keep the whole oscillator
tight: crystal, capacitors, and inverter adjacent. Long wandering
wires add stray capacitance and pickup. Direction of error, certain
from AN2867: CL too high pulls the frequency low, CL too low pulls
it high; more capacitance loads the crystal down.

Overdrive protection is by design, because a no-scope reader cannot
check the drive level: both AN2867 measurement methods need an
oscilloscope with specialised probes, and probing the crystal
nodes with ordinary leads stops the oscillator or pulls its
frequency. The theory section quantifies the trap; the build
facts are these. The tuning-fork limit is 1 µW maximum (Abracon
AB38T/AB26T datasheet, Rev. 1.4.2021); the drive level for the
ECS ECS-.327-12.5-13X part itself was not published on the
product page or listing read, and is UNVERIFIED for that exact
part, so the 1 µW figure is the class value for 2 x 6 mm
tuning-fork crystals, not an ECS-published number for this part.
The MHz limits are far larger — the Abracon ABL series allows
100 µW typical and 1 mW maximum, a thousand times the
tuning-fork limit. A 5 V HCU04 driving a watch crystal with no
series resistor, or a MHz-sized resistor, overdrives it by one
to two orders of magnitude (DERIVED ESTIMATE: 1 V RMS across
the 35 kΩ ESR alone dissipates 29 µW, 29 times the limit).
The 32 kHz circuit and the MHz circuit are different circuits
with different resistor values, never one circuit with the
crystal swapped. The reader protects the crystal by building
the specified circuit with the specified resistor values, not
by measuring the drive level. "It oscillates, so the drive
must be fine" is not an argument: oscillation proves the loop
has gain, not that the crystal is within its limit.

The series-resistor discrepancy, stated, not settled. For the 32.768
kHz HCU04 circuit, two sources give different series-resistor values
and neither has been verified by measurement. Nexperia's 74HCU04
Rev. 7 Table 8, for the 25-54.9 kHz row, gives R1 (feedback) 22 MΩ,
R2 (series) 100 kΩ, C1 56 pF, C2 10 pF, as typical values to be used
as an initial setup. The asymmetric capacitors are not a
contradiction of the symmetric 15 pF pair above; the theory
section's load-capacitance discussion shows why. The AN2867
section 3.5.3 reactance method, RExt
= 1 / (2 x π x F x CL2), gives about 324 kΩ for the symmetric 15 pF
capacitors of this section. The two differ by a factor of three.
Both limit drive; the larger limits more but eats more gain margin,
and at 32 kHz the HCU04's gain margin is enormous, so even the
larger value leaves ample margin. This chapter does not pick one and
does not split the difference: the value is settled by a bench test
of the exact circuit, with the oscillation checks below as the
verification, and the residual question - whether either value keeps
the drive level under 1 µW at 5 V - is UNVERIFIED without a
scope-based drive measurement. The same honesty applies at MHz: the
AN2867 method gives starting estimates, not verified build values,
and this section does not print them as instructions. For the 4060's
own crystal circuit, Nexperia 74HC4060 Rev. 7 section 12.2 states
one datasheet-backed number: "R2 is the power limiting resistor. For
starting and maintaining oscillation a minimum transconductance is
necessary, so R2 should not be too large. A practical value for R2
is 2.2 kΩ." Whether 2.2 kΩ suits a tuning-fork crystal specifically
is not stated in the extracted text, and the figure's other
component values did not survive text extraction, so that number is
recorded here, not issued as a build instruction. Do not increase a
series resistor "until it looks safe": there is no no-scope way to
see safety, and too much series resistance starves the loop of gain
and stops the oscillator.

Startup patience is part of the specification. AN2867 section 3.6:
an oscillator paired with a few-MHz crystal typically starts after a
few milliseconds, and the start-up time of a 32.768 kHz crystal
ranges from 1 to 5 seconds. High Q means slow amplitude buildup. The
bench procedure is: power on, wait 10 seconds, then observe, for the
32 kHz circuit; 1 second for MHz circuits, where nothing after a
second means something is wrong. A reader who powers up, counts to
two, sees nothing, and starts rewiring will chase a phantom fault.
One open question rides alongside the 4060 variant: no manufacturer
source found states that the HC4060 starts reliably with a 30 kΩ-ESR
tuning-fork crystal at 5 V, and forum anecdote exists in both
directions. The 4060 plus watch-crystal combination is not presented
as known-good in this chapter until a bench test of the exact
circuit says so.

The checks, ready for when the wiring diagram lands. Check the
divided output, never the crystal node: the crystal node is a
high-impedance, picofarad-scale circuit, and a meter lead, a
fingertip, or a probe adds capacitance of the same order as the load
capacitors and can stop the oscillation or pull the frequency.
Measure only at buffered or divided outputs. The checks, in order:
power off, check the supply rails are not shorted and the crystal
reads open on a resistance range (a short means a damaged part or a
lead bridge); power on and wait (10 seconds at 32 kHz, 1 second at
MHz); a momentary DC bias check at the oscillator inverter's input
pin, expecting roughly VCC/2, about 2.5 V, if the gate is biased in
its linear region - near 0 V or near 5 V means the gate is railed -
with the caveat that the meter's 10 MΩ input loads a 10-22 MΩ
feedback resistor, so the reading is mid-rail-ish versus railed, not
a precise voltage, and the probes must not stay on the node; then
the decisive check, divided-output counting, as in Build 3. If no
divider output toggles, the oscillator is not running: check the
inverter, the bias, the series resistor, and the wiring. If divider
outputs toggle but the counted rates are wrong, the oscillator is
running at the wrong frequency: check the load capacitors and the
crystal marking, and suspect a wrong-mode crystal if every absolute
rate is off by about a factor of three with the ratios right. Swap one thing
at a time if all checks fail: first the crystal, then the inverter
chip, then the capacitors.

What waits, listed so nothing is faked: the Pierce wiring diagram
with verified resistor values; the 4060 crystal wiring diagram from
a visual read of Nexperia Rev. 7 Fig. 11; the resolution of the 100
kΩ versus 324 kΩ discrepancy by bench test; and the 4060 plus
tuning-fork startup question. Everything else in this build - parts,
load capacitors, inverter, startup wait, checks - is specified and
stands.

### Build 3: the divider chains - fast clocks down to visible blinks

Division ratios are exact. A divider does not drift, does not need
trimming, and multiplies the crystal's accuracy down to human speed
without degrading it. The reader proves each ratio by counting,
which turns the divider chain into its own test equipment. Two
chains are specified here: the Chapter 7 chain, proved already, and
the 4060 chain from the 32.768 kHz crystal. The divider wiring in
both chains is pin-verified and complete. The crystal connections to
the 4060 wait with Build 2; the 4060 divider section itself can be
proved today from an external clock, as described below.

Naming first, because this chip has two. This chapter uses Nexperia
numbering for the 4060 throughout, with pins and divisions stated
every time. Nexperia's rule is the same as the 4040's: Qn divides by
2 to the power (n+1). TI labels the same pins one higher: TI Qn
divides by 2 to the power n, so TI's Q14 on pin 3 is Nexperia's Q13
on pin 3, and both divide by 16384. Any tutorial, forum post, or
schematic using the other manufacturer's labels will be off by one
stage everywhere. Pins and divisions are
from Nexperia 74HC4060 Rev. 7 (27 March 2024) and TI SCHS207G
(February 1998, revised October 2003), which agree on pins.

The 4060's missing taps must be stated before any ladder: there is
no divide-by-2, no divide-by-4, and no divide-by-8 output, and there
is no divide-by-2048 output either. The brought-out outputs are
Nexperia Q3 to Q9 and Q11 to Q13. The fastest available tap is
divide-by-16, and the ladder jumps by a factor of 4 between
divide-by-1024 and divide-by-4096, because the divide-by-2048 stage
is not brought out. A reader counting "each stage halves it" will
think the chain is broken at exactly that step. It is not broken;
the tap does not exist.

Chain A: the Chapter 7 chain, 555 to 1 Hz. The NE555 astable at
about 4096 Hz - RA 1 kΩ, RB 15 kΩ fixed plus the 10 kΩ trimmer, C 10
nF film or ceramic, THRES shorted to TRIG, RESET tied to VCC, CONT
to ground through 10 nF, as wired in Chapter 7 - feeds one spare
74HC14 gate, and that gate's output feeds the 4040 CP (pin 10). The
buffer is not decorative. A bipolar NE555 output is not guaranteed
into HC inputs, as Chapter 7 establishes in its output-level
section: the 555's HIGH sits well below the rail under load, and
plain 74HC inputs at 5 V need about 3.5 V. Chapter 7 routes the 555
through a spare HC14 gate, whose output is a full CMOS swing, and
this chapter does exactly the same. Do not re-decide it, and never
power the 555 from a higher supply to fix its HIGH level while the
logic runs at 5 V. The TLC555CP, with its rail-to-rail output, may
drive HC logic directly and needs no buffer; that is the one case
where the HC14 stage may be omitted. Polarity does not matter for
the divider: the inverter flips the square wave, and the 4040 still
sees one falling edge per period.

The 4040 wiring, pin-verified against Nexperia 74HC4040 Rev. 8 (16
February 2024): CP pin 10, MR pin 11 tied to ground (it must not
float), Q11 pin 1 (divide by 4096), Q10 pin 15 (divide by 2048), Q9
pin 14 (divide by 1024), Q8 pin 12 (divide by 512), Q0 pin 9 (divide
by 2), GND pin 8, VCC pin 16. Leave unused Q outputs unconnected;
outputs may float, inputs may not. At a correct 4096 Hz input, Q8 is
8 Hz, Q9 is 4 Hz, Q10 is 2 Hz, and Q11 is 1 Hz. Trim the 555 until
Q11 blinks once per second against a stopwatch over 60 seconds,
exactly as in Chapter 7 Stage 0, and do not proceed until it does.
The faster checkpoints are the ladder: Q10 blinks twice per second,
Q9 four times per second at the limit of comfortable counting, and a
multimeter frequency range, if fitted, reads about 8 Hz on Q8 and
about 4 Hz on Q9 when correct.

Chain B: the 4060 chain, 32.768 kHz to 1 Hz. The ladder, Nexperia
numbering, pins and divisions every time:

| Output | Pin | Division | Frequency |
|---|---|---|---|
| Q3 | 7 | divide by 16 | 2048 Hz |
| Q4 | 5 | divide by 32 | 1024 Hz |
| Q5 | 4 | divide by 64 | 512 Hz |
| Q6 | 6 | divide by 128 | 256 Hz |
| Q7 | 14 | divide by 256 | 128 Hz |
| Q8 | 13 | divide by 512 | 64 Hz |
| Q9 | 15 | divide by 1024 | 32 Hz |
| (no Q10) | - | divide by 2048 | 16 Hz, unobservable |
| Q11 | 1 | divide by 4096 | 8 Hz |
| Q12 | 2 | divide by 8192 | 4 Hz |
| Q13 | 3 | divide by 16384 | 2 Hz |

The popular claim that a 4060 with a 32.768 kHz crystal gives 1 Hz
is false. The last output, Nexperia Q13 on pin 3, dividing by 16384
(TI Q14 on the same pin), gives 2 Hz, not 1 Hz. One more divide-by-2
is required, and half a 74HC74 provides it. The 4060's other pins:
oscillator terminals RS pin 11, RTC pin 10, CTC pin 9 (Nexperia
names; TI labels both pins 9 and 10 with the same symbol in its
pinout, so this chapter uses the Nexperia names and pin numbers in
prose), MR pin 12, GND pin 8, VCC pin 16. MR is an overriding
asynchronous active-HIGH reset: tie it low, or a floating MR invites
spurious resets from noise and handling, and a counter that resets
randomly looks exactly like an oscillator fault. The counter
advances on the HIGH-to-LOW transition of the oscillator input RS.
The crystal connections to pins 9, 10, and 11 wait with Build 2's
deferred diagram. What can be proved today is the divider section:
drive RS (pin 11) with an external clock - the buffered 555 output
from Chain A, for example - and leave RTC (pin 10) and CTC (pin 9)
floating, per Nexperia Rev. 7 section 1. Fed with 4096 Hz, Nexperia
Q11 on pin 1 (divide by 4096) gives 1 Hz, and the ladder above
scales down by a factor of 8. That test proves the divider chain and
the pin table before any crystal is involved.

The extra divide-by-2: half a 74HC74, one D flip-flop with its Q-bar
output wired back to its D input, so it toggles on every clock edge.
Use the first half: 1CLR pin 1 tied HIGH, 1D pin 2 wired to 1Q-bar
pin 6, 1CLK pin 3 fed from the 4060's Nexperia Q13 output on pin 3
(divide by 16384, 2 Hz), 1PRE pin 4 tied HIGH, 1Q pin 5 the 1 Hz
output, GND pin 7, VCC pin 14 (TI SCLS094F Rev. F, June 2021; TI's
own applications line for this part is "divide a clock signal by 2
or 4"). CLR and PRE are active LOW, so HIGH is inactive. The 74HC74
is rising-edge triggered, the opposite of the falling-edge 4040,
390, and 4060: the 2 Hz output's rising edges clock the flip-flop,
one toggle per rising edge, giving 1 Hz at 50% duty. A divide-by-2
output is 50% by construction, whatever the source looked like. Tie
the second half's inputs, never floating: 2D pin 12 and 2CLK pin 11
to ground, 2CLR pin 13 and 2PRE pin 10 HIGH; its outputs, 2Q pin 9
and 2Q-bar pin 8, may float. An LED with a 1 kΩ resistor on 1Q (pin
5) blinks once per second when the chain is right.

Prove each stage before connecting the next. Put an LED on two
adjacent divider outputs and count both over the same interval: the
ratio must be exactly 2:1. Nexperia Q13 on pin 3 (divide by 16384)
blinks 120 times in 60 seconds; Nexperia Q12 on pin 2 (divide by
8192) blinks 240 times. Any other ratio means a wiring error, a
wrong pin, or the oscillator running at the wrong frequency. Work
from the slow end upward, one stage at a time, and remember the gap:
from Nexperia Q9 on pin 15 (divide by 1024, 32 Hz) the next
observable output is Nexperia Q11 on pin 1 (divide by 4096, 8 Hz), a
factor of 4, not 2. Individual blinks are countable by eye up to
about 2 Hz comfortably; flicker is visible to about 10-20 Hz; above
about 20 Hz the LED looks steadily lit at reduced brightness. So the
countable outputs in the 4060 ladder are Nexperia Q11 on pin 1
(divide by 4096, 8 Hz, fast flicker), Nexperia Q12 on pin 2 (divide
by 8192, 4 Hz, fast but countable with effort), Nexperia Q13 on pin
3 (divide by 16384, 2 Hz, comfortable), and the
74HC74 output (1 Hz). Everything faster is proved by ratio, not by
counting, or with a meter frequency range as a bonus where the meter
has one. A chain debugged stage by stage has no invisible errors; a
chain wired all at once has nothing but invisible errors. The 4060's
RC oscillator mode, on the same three pins with a different external
network, is a different circuit: wiring the RC network with a
crystal gives RC-mode oscillation at an RC frequency with the
crystal doing nothing, drifting like an RC clock.

### Build 4: the comparison - ten minutes that separate the rungs

Read the arithmetic before sitting down for ten minutes. This build
compares two 1 Hz clocks started together and counts how far apart
they drift, and most of the accuracy ladder is invisible in a
ten-minute run. The chapter says so now, before the reader watches
nothing happen, because the invisibility is the result, not a
failure of the build.

The arithmetic, for a 10-minute (600-second) run. Drift in seconds
equals fractional error times run length:

| Fractional error | In 600 s | Visible by counting 1 Hz? |
|---|---|---|
| 1% (0.01) | 6.0 s | Yes, 6 counts apart |
| 0.1% (0.001) | 0.6 s | Barely, half a blink of phase slip |
| 0.01% (100 ppm) | 0.06 s | No |
| 20 ppm (crystal tolerance) | 0.012 s | No |
| 2 ppm (TCXO, 0-40 °C) | 0.0012 s | No |

A ten-minute run separates the 555 rung from the crystal rung, and
nothing finer. To see a one-count difference at 1 Hz, the run must
last 1 divided by the fractional error: for 100 ppm that is 10,000
seconds (2.8 hours), for 20 ppm 50,000 seconds (13.9 hours), for 2
ppm 500,000 seconds (5.8 days). Crystal against TCXO needs an
overnight run or counting a faster output, both described below. In
ten minutes the crystal clock and a TCXO clock still agree to the
second, while the 555 clock has walked away by seconds. The honest
statement is: in ten minutes you can see the 555 drift and you
cannot see the crystal drift, and that difference is the whole
chapter. The counting error itself sets a floor: plus or minus 1
count over 600 counts is plus or minus 0.17%, so a ten-minute count
cannot resolve anything finer than about 0.2% however carefully it
is done.

The setup. Two 1 Hz clocks side by side, each driving its own
seconds counter: Clock A is the 555 clock of Build 1, trimmed to 1
Hz at the start of the run; Clock B is the crystal clock of Builds 2
and 3, untrimmed, because it needs no trim. Each clock drives one
CD74HC390 wired as in Chapter 7 - units decade and tens decade on
eight BCD LEDs - so each side has its own two-digit seconds display.
Start both counters together: wire all four MR pins, both decades of both 390s, to the same
debounced RESET output from Chapter 7 (10 kΩ pull-up, 10 kΩ series
resistor, 0.1 µF to ground into one 74HC14 gate, HIGH means
pressed), hold RESET, release it, and start the stopwatch at the
same moment. The two clocks are compared to each other, not to true
time, so no absolute reference is needed, and the phone stopwatch's
own accuracy does not enter the comparison: the difference between
the two counters is the measurement.

The procedure, exactly:

1. Trim Clock A by the 60-second count, as in Build 1, immediately
   before the run. Do not trim by eye. Record the trim count.
2. Check Clock B's 1 Hz output by the same 60-second count. It
   should already read 60 blinks in 60 seconds, within the plus or
   minus 1 count error, with no trim. If it does not, the fault is
   in Builds 2 or 3, not in this build: fix it there before
   comparing.
3. Hold both counters in RESET. Release RESET and start the
   stopwatch together. Both LEDs blink together at first.
4. Watch the phase. Within a minute or two the 555 LED is visibly
   out of step with the crystal LED, sometimes ahead, sometimes
   behind, depending on the trim. By ten minutes they are seconds
   apart and the phase relationship has cycled.
5. At exactly 600 seconds, read both counters and write down both
   numbers: "after 600 s, the 555 counter read N, the crystal
   counter read M". The difference is the measurement. Expect the
   555 side to be several counts away from 600 - of the order of
   0.1-1%, or 0.6-6 seconds of phase slip - and the crystal side to
   read 600 within the counting error. If the 555 side moves less,
   the build is lucky or the room is stable; if it moves more, the
   capacitor is the prime suspect, not the chip.
6. Repeat the run once, re-trimming Clock A first. The crystal side
   should repeat; the 555 side should wander differently each time.
   That difference in repeatability is the second measurement, and
   it matters as much as the first.

What to record, in a notebook, for each run: the date and time, the
room temperature if known, the trim count for Clock A, both counter
readings at 600 seconds, and the difference. Counting proves the
average frequency over the run. It does not prove the frequency was
steady during the run, it does not measure duty cycle, and it does
not detect an occasional missed edge. The comparison works because
it compares two averages, not because it watches instant-by-instant.

The overnight run is the honest way to see the finer rungs. Leave
both 1 Hz counters running for 24 hours (86,400 seconds):

| Error | Drift in 24 h |
|---|---|
| 0.1% (trimmed 555, plausible) | 86.4 s |
| 100 ppm | 8.64 s |
| 20 ppm (crystal tolerance) | 1.73 s |
| 7.5 ppm (TCXO, full range) | 0.65 s |
| 2 ppm (TCXO, 0-40 °C) | 0.17 s |

After 24 hours the crystal-versus-TCXO difference is about one or
two counts on the counter: marginal but real. The 555-versus-
crystal difference is over a minute. Start it before bed and read it
in the morning. But the counters must not overflow unnoticed: a
two-digit BCD counter wraps at 100 seconds, so an overnight run
needs five BCD digits per side (99,999 counts covers 86,400
seconds), which is three 390 chips per side with one decade spare.
Counting minutes instead, with a divide-by-60 stage, does not help:
1,440 counts over 24 hours makes 20 ppm worth 0.03 counts, invisible
again. Counting seconds with enough digits is the requirement. The
TCXO figures above are the Maxim DS32kHz datasheet numbers (plus or
minus 2 ppm from 0 to 40 °C, plus or minus 7.5 ppm from -40
to 85 °C); no TCXO is built in this chapter, and the figures
are here only to size the run that would separate the rungs.

The counting-rate trick is the other honest route to finer rungs,
with a genuine limitation. The plus or minus 1 count error is
absolute, not relative: it is plus or minus 1 whether 600 or 60,000
counts were taken. Count a faster divided output with counter chains
instead of eyeballing 1 Hz: at 100 Hz for 600 seconds there are
60,000 counts, and 100 ppm is 6 counts of difference, visible - if
the reader has two counter chains that can count to 60,000 and two
sources at nominally the same 100 Hz. The counting rate must exceed
1 divided by (error times time): for 100 ppm in 600 seconds, above
about 167 Hz; for 20 ppm in 600 seconds, above about 833 Hz. The
hard part is getting two sources to the same nominal rate: both
chains must be divided to the same frequency, and the 555 side must
be trimmed to match, which reintroduces trim error into exactly the
measurement meant to expose drift. That circularity is a genuine
limitation of the no-scope bench, and this chapter does not pretend
otherwise. The comparison build proves the big step, RC against
crystal, beautifully, and the fine steps, crystal against TCXO, only
with long runs. That is the result. The ladder from blinking to
timekeeping is not a set of adjectives; it is a set of numbers, and
now the reader has counted two of them.

## Gotchas

**The 4060 plus a 32.768 kHz crystal gives 2 Hz, not 1 Hz.**
Pin 3, Nexperia Q13, TI Q14, divides by 16384, and 32768 /
16384 is 2. Getting 1 Hz needs fifteen divide-by-2 stages
and the 4060 has fourteen. One more divide-by-2 — half a
74HC74 wired as a toggle — is required, and the same is true
of the 4020's Q13. A clock built on the bare 4060 runs at
double speed.

**TI and Nexperia number the 4060's outputs one apart, on the
same pins.** TI Qn divides by 2^n; Nexperia Qn divides by
2^(n+1). This book uses Nexperia numbering and gives pin
numbers plus divisions every time. A bare Q-number in prose,
without its pin and its division, is a wiring error waiting
to happen. Check the pin table of the exact part bought
before wiring.

**The 74HC14 is the wrong gate for a Pierce oscillator.** A
Schmitt trigger has hysteresis and no single-valued linear
region for the feedback resistor to bias into. The Pierce
amplifier must be the unbuffered 74HCU04. The HC14's
legitimate crystal role is after the oscillator, as a buffer
and squarer. The buffered 74HC04 is wrong too: its extra
stages add gain and phase shift that fight the crystal.

**Fitting C1 = C2 = CL is the commonest crystal error.** CL
is the load the crystal must see across its terminals, and
the two capacitors sit in series across it: CL =
(C1 x C2) / (C1 + C2) + Cstray. With a 5 pF stray allowance,
a 12.5 pF crystal takes 15 pF capacitors, not 12.5 pF. Use
C0G/NP0 ceramic, never X7R. And buy parallel-resonant
crystals with a CL in pF on the datasheet: a series-resonant
crystal in a Pierce circuit oscillates high, and no load
capacitor can fully correct it.

**A watch crystal overdrives silently.** Its limit is 1 µW
class, and a resistor-less 5 V drive exceeds it by one to
two orders of magnitude while the oscillator keeps running
beautifully. Protection is by design — the correct series
resistor — not by measurement: no multimeter check in this
book measures drive level. The 32 kHz series-resistor value
itself is not settled (100 kΩ against about 324 kΩ), and no
single value is printed as settled.

**Wait 10 seconds before declaring a 32 kHz oscillator
dead.** A 32.768 kHz crystal takes 1 to 5 seconds to start;
MHz crystals take milliseconds. A reader who powers up,
counts to two, sees nothing and starts rewiring chases a
phantom fault. Power on, wait 10 seconds, then observe.

**The bipolar 555's RESET pull-up trap.** The NE555's RESET
pin draws up to 0.4 mA, so a 10 kΩ pull-up drops 4.0 V and
leaves the pin at the 1.0 V maximum reset threshold — not
guaranteed out of reset. Tie unused RESET directly to VCC
with a wire; if it must be pulled up through a resistor,
use 1 kΩ or less and verify the pin voltage. Never transfer
the TLC555's 10 kΩ pull-up example to the NE555.

**The bipolar 555's HIGH output is not guaranteed into HC
logic.** At 5 V and 100 mA source current, NE555 VOH is
2.75 V minimum against the 74HC VIH requirement of about
3.5 V, and no datasheet row covers the light-load case.
Buffer through a spare 74HC14 gate, as Chapter 7 does.
"TTL-compatible" does not imply HC-compatible: TTL VIH is
about 2.0 V.

**A 555 has no total-accuracy spec, and trimming is the
whole game.** The error budgets in this chapter are
arithmetic from verified figures, not datasheet values.
Untrimmed with an electrolytic capacitor, worst case
±27.3%; trimmed with a film capacitor, worst-case wander
0.38–0.63% — minutes per day from ordinary
room-temperature changes. And the TLC555's temperature
drift is not specified at all: do not claim CMOS
superiority, and do not borrow NE555 drift figures for it.

**Binary division cannot make 1 Hz from 1 MHz or 4 MHz.**
The nearest powers of two give 0.953674 Hz — 4.86% slow,
about 70 minutes a day. Factor the total ratio into stage
ratios that exist: 32.768 kHz is 2^15, 4 MHz is 2^8 x 5^6,
1 MHz is 10^6. A fractional frequency in the middle of a
chain means the factoring is wrong; back up and re-factor.

**Never clock anything from a decoded or combinational
output.** Decoded combinations glitch while ripple outputs
settle, and a glitch reaching a clock input advances the
next stage an extra time, intermittently. The rule covers
synchronous parts too: TI documents a glitch on the 161's
carry output. Use carries and decoded combinations as
enables, sampled by a real clock edge, or re-time them
through a flip-flop. Decoding for observation — LEDs at
human-visible rates — is fine; the LEDs observe, they do
not clock anything.

**The 10-minute run separates the 555 from the crystal and
nothing finer.** A 1% error is 6 seconds in 600 seconds,
obvious; a 100 ppm error is 0.06 seconds, invisible.
Crystal against TCXO needs an overnight run or counting a
faster output — and resolving 2 ppm by counting takes
about six days to see one second of drift. The TCXO rung
is bought on datasheet trust, verified the slow way.

**A TCXO is not a drop-in breadboard part.** Current TCXOs
live in millimetre-scale surface-mount packages, most are
3.3 V parts whose output HIGH of about 2.97 V is below the
74HC requirement at 5 V, and the tightest parts provide
only a clipped-sine output that cannot drive logic
directly. No TCXO pinout is printed in this book: pad
assignments vary by manufacturer. The DS3231 breakout is
buy-and-look only in this chapter — and cheap modules are
frequently fitted with MEMS DS3231M chips, with the ZS-042
charging-circuit trap on top.

## Summary

- The 555 is an analogue timer with a digital soul: two
  comparators, a latch, and a discharge transistor, with
  thresholds at 1/3 and 2/3 VCC. Its formulas are exact; its
  accuracy is set by the timing network, and trimming is the
  whole game.
- A crystal is a mechanical resonator: the Pierce circuit
  needs an unbuffered 74HCU04 amplifier, load capacitors
  worked from CL with a stray allowance, and drive protection
  by design, because no multimeter measures microwatts inside
  quartz.
- Division is factoring: 32.768 kHz is 2^15, the 4060 gives
  fourteen stages and lands on 2 Hz, and every output in this
  book carries its pin and its division because TI and
  Nexperia number the same pins one apart.
- Ripple dividers are ideal for dividing one clock down and
  wrong for distributing a clock; never clock anything from a
  decoded output, on either family.
- Temperature compensation is curve-fitting: a sensor, a
  correction table, and a variable reactance steering the
  crystal's own repeatable curve back toward nominal. It fixes
  temperature; it does not fix ageing, tolerance, or fast
  transients.
- Every clock in this book drifts, and the ladder is about
  how slowly and under what conditions: the 555 answers "this
  afternoon", the crystal "this season, on a desk", the TCXO
  "this season, anywhere" — and the top rung is bought on
  datasheet trust.

## Extensions

- Run the comparison overnight: the same two counters, left
  running, separate the crystal rung from anything finer than
  the 10-minute run can show. Count a faster output if a week
  of patience is too much.
- Build the 4 MHz chain: divide by 4, then six decades
  through three 390s, with round checkable boundaries at every
  decade. It is the clearest teaching chain in the chapter,
  and the longest.
- Swap the Pierce oscillator for an oscillator module behind
  the same dividers: same counting checks, no load capacitors,
  no drive calculation. Read the module's datasheet pin table
  first — no module wiring is printed in this chapter.
- As an advanced project, a TCXO on a footprint-specific
  adapter, with the interface decisions this chapter records
  but does not design: 3.3 V supply, HCMOS output, enable
  wiring from the chosen part's datasheet. Surface-mount
  soldering and magnification required; no wiring is given
  here.

## References

- TI, NA/NE/SA/SE555, SLFS022K (September 1973, rev. March
  2026) — block diagram, astable and monostable sections, drift
  figures, RESET current.
- TI, NA/NE/SA/SE555, SLFS022I (September 1973, rev. September
  2014) — initial-error specification, astable and monostable
  sections, function table.
- ST, NE/SA/SE555, Doc ID 2182, Rev. 6 (January 2012) — astable
  formulas, drift corroboration, decoupling recommendation,
  50%-duty divider circuit.
- TI, TLC555, SLFS043K (August 1983, rev. January 2026) — CMOS
  output, RESET pull-up example, CONT drive ranges.
- TI, TLC555, SLFS043I (August 1983, rev. July 2019) — timing
  rows; TLC555CP packaging addendum dated 26 February 2019.
- TI, TLC555, SLFS043F (August 1983, rev. February 2005) —
  absolute-maximum ratings.
- Renesas, ICM7555/7556, FN2867, Rev. 10.01 (5 March 2020) —
  CMOS comparison, supply-current spikes, output-feedback
  50%-duty circuit.
- TI, LMC555, SNAS558J (February 2000, rev. March 2013) — VOH
  numbers, drift figures.
- Philips, AN170 (December 1988) — 555 applications: five-block
  description, resistor limits, diode 50%-duty topology,
  mid-1972 introduction.
- TI E2E support FAQ on monostable design (support guidance
  only) — LM555 priority, LMC555 accuracy note.
- KEMET, R82 polyester film, F3101_R82 (6 July 2023) —
  temperature coefficient.
- KEMET, A72 polypropylene film, F3039_A72 (27 July 2015) —
  temperature coefficient.
- Vishay, MRS25 metal film, Doc. 28724 (rev. 17 August 2011) —
  tolerance, temperature coefficient.
- Nichicon, CAT.8100J — UVZ/PJ electrolytic tolerance and
  leakage specification.
- Murata, MLCC specifications; Analog Devices tutorial (2012) —
  X7R voltage-coefficient example.
- Nexperia, 74HCU04 product data sheet, Rev. 7 (8 December
  2015) — pins, input capacitance, ordering and DIP removal,
  crystal figure and component tables.
- TI, SN54HCU04/SN74HCU04, SCLS079E (March 1984, rev. March
  2004) — unbuffered outputs, PDIP ordering; SN74HCU04N
  packaging addendum dated 30 July 2024.
- TI, CD54/74HCU04, SCHS127D (February 1998, rev. May 2004) —
  CD74HCU04E ordering; packaging addendum dated 16 April 2024.
- Nexperia, 74HC4060/74HCT4060 product data sheet, Rev. 7
  (27 March 2024) — outputs, terminals, pins, ordering,
  section 12.2 body text; Rev. 6 cross-checked. The section
  12.2 crystal figure (Fig. 11) was read only as extracted
  text, never visually.
- TI, CD54/74HC4060 and CD54/74HCT4060, SCHS207G (February
  1998, rev. October 2003) — pinout, PDIP ordering,
  counter/reset behaviour; CD74HC4060E packaging addendum
  dated 29 September 2026.
- OnSemi, MC74HC4060A, MC74HC4060A/D, Rev. 3 (March 2003) —
  division rule, decoding note, external-clock rule. Search
  extract.
- Nexperia, 74HC4040 product data sheet, Rev. 8 (16 February
  2024) — pins, dynamics table, ordering, N-variant removal
  on 3 February 2016.
- TI, SN74HC4040, SCLS160D (September 2003) and SCLS160E,
  Rev. E (March 2022) — pin-for-pin equivalence, QA–QL/CLK/CLR
  naming.
- TI, CD74HC4040, SCHS203D (February 1998, rev. October
  2003) — pinout, switching figures; the description sentence
  carrying the wrong stage count is not quoted.
- Nexperia, 74HC4020 product data sheet, Rev. 9 (27 March
  2024) — pins, dynamics table, ordering.
- TI, CD74HC4020, SCHS201C (February 1998, rev. October
  2003) — pin-for-pin equivalence, Q1′–Q14 naming.
- Nexperia, 74HC390 product data sheet, Rev. 6 (19 March
  2024) — pins, BCD/bi-quinary function, dynamics.
- TI, CD74HC390, SCHS185E, Rev. E (April 2022) — pinout,
  function tables 7-2/7-3, switching figures; CD74HC390E
  packaging addendum dated 15 July 2026.
- TI, SN74HC74, SCLS094F, Rev. F (June 2021) — pinout,
  divide-by-2 application; SN74HC74N packaging addendum dated
  18 September 2026.
- TI, SN74HC14, SCLS085L, Rev. L (February 2025); Nexperia,
  74HC14 product data sheet, Rev. 6 — HC14 pins and buffer use,
  as cited in Chapter 7.
- TI, SN74HC161, SCLS297D, Rev. D (September 2003) — carry
  glitch note, 18 MHz application limit, cascade principle.
  Search extract.
- Nexperia, 74HC163 product data sheet, Rev. 4 (28 December
  2015) — synchronous cascade principle. Banked from the
  Chapter 7 research.
- Nexperia, 74HC191 product data sheet, Rev. 5 (13 August
  2019); TI, SN74HC191, SCLS121D, Rev. D (December 1982, rev.
  October 2003) — terminal-count output warning. Banked from
  the Chapter 7 research.
- Nexperia, 74HC4017 product data sheet, Rev. 8 (27 March
  2024) — CP0/MR timing bounding the Q6 runt; Q5-9 output.
  Search extract.
- Philips, 74HC/HCT93 (December 1990) — decoding-spikes
  warning, quoted.
- Nexperia, 74HC365 product data sheet, Rev. 4 (27 January
  2016) — 74HC input levels.
- Chapter 7 of this book — CD74HC4020E ACTIVE per TI addendum
  15 July 2026, SN74HC4040N ACTIVE per TI addendum 8 January
  2026, divide-by-60 chains, 555-through-HC14 bench pattern.
- ST, AN2867, DocID 15287, Rev. 16 (August 2022) — Pierce
  topology, feedback-resistor values, load-capacitance
  formula, gain margin, drive level, start-up, pullability.
  Mirror copy; ST's own PDF not opened directly.
- TI, SPRA054 (October 1995) — series- versus
  parallel-resonant definitions. Search extract.
- Murata, Timing Devices FAQ (read 14 November 2026) —
  unbuffered-inverter recommendation for crystal oscillators.
- Q-Tech, QTAN-108 (undated); CTS, "Crystal Basics" note —
  overdrive corroboration; AT-cut cubic curve. Search
  extracts.
- Abracon, ABL datasheet (revised 27 March 2018) — range,
  fundamental to 33.999 MHz, load capacitance, drive, C0,
  ageing, ESR. Distributor reproductions.
- Abracon, ABLS datasheet (revised 7 April 2011) — SMD twin
  distinction. Distributor copy.
- Abracon, AB38T/AB26T datasheet, Rev. 1.4.2021 — watch-crystal
  tolerance, ESR, load capacitance, 1 µW drive.
- Abracon, AB series datasheet (revised 2 September 2010) —
  HC49 crystal tolerance, stability, ageing.
- Abracon, ABM7 series datasheet, Rev. T (17 April 2024) —
  tolerance, stability, ageing.
- Abracon, ABM13W series datasheet (revised 17 September
  2020) — tolerance, stability, ageing.
- Abracon, ABS07 datasheet (revised 10 August 2022) —
  tuning-fork tolerance, parabolic coefficient, turnover
  temperatures, ageing, drive level.
- Abracon, ABS07W datasheet (revised 8 March 2021) —
  tolerance, stability range, ageing.
- Epson, FC-135 datasheet, FC-135_E_Ver1.0 (2020) —
  tuning-fork tolerance, turnover temperature, parabolic
  coefficient, ageing.
- CTS, TFSM datasheet, DOC# 008-0566-0, Rev. D (2017) —
  parabolic coefficient, turnover, ageing. Mouser-hosted PDF
  extract.
- Geyer, KX-327ST datasheet, part no. 12.87114, version
  11.09.2023 — parabola corroboration, load capacitance, ESR,
  C0, ageing. Octopart extract.
- IQD, HC49/4H specification, Issue 15 (September 2019) —
  range, load capacitance, C0, drive, ESR. Distributor-hosted
  PDF extract.
- ECS, product pages and distributor listings (seen November
  2026) — ECS-.327-12.5-13X, ECS-40-20-4X, ECS-80-18-4X,
  ECS-80-20-4X, ECS-160-20-4X; HC-49U/HC-49US datasheets
  (ECS-200 series). Individual ECS datasheet PDFs not read;
  listing values flagged in the text.
- ECS, drawing DWG NO. ECS-10-13-1H (drawn 24 November 1998) —
  1 MHz crystal: tolerance, stability, load capacitance, ESR,
  drive. Mouser extract.
- Citizen, CFS-20632768DZFB — distributor-reported
  specifications only; Citizen datasheet not read.
- Abracon, ACH series — distributor listings only; ACH
  datasheet PDF not read. Pinout, enable and levels
  UNVERIFIED.
- Abracon, ASTX-H12 datasheet (revised 13 May 2015) — TCXO
  tolerance, temperature stability, supply/load sensitivity,
  ageing, supply and output levels.
- ECS, ECS-TXO-3225 datasheet (no revision date visible in
  the copy read — UNVERIFIED as to revision) — TCXO tolerance,
  temperature stability, ageing.
- Epson, TG2016/2520SMN data sheet, Spec No.
  TG2016/2520SMN_EN_ver.2.0, Ver. 2.0 — temperature stability
  grades, before/after-reflow tolerance, ageing, clipped-sine
  output, absolute-maximum supply, DC-cut capacitor note.
- Epson, TG-3541CE datasheet (2020; no specification number
  visible in the copy read) — 32.768 kHz DTCXO window accuracy
  figures, supply range, CMOS output.
- Maxim, DS3231 datasheet 19-5170, Rev. 10 (March 2015) —
  accuracy, crystal inside the package, ageing, temperature
  sensor, conversion interval, supply range, package.
- Maxim, DS32kHz data sheet, Rev. 071521 — accuracy figures,
  14-pin DIP; pinout UNVERIFIED.
- ECS, David Meaney, "Unlocking Precision: Exploring the
  Advancements in TCXO Technology" (22 April 2024, updated
  16 August 2024) — TCXO definition, analogue versus digital
  compensation, micro-jumps.
- Microchip, "Signal Types and Terminations" application note
  (undated copy) — clipped-sine outputs, 10 pF / 10 kΩ load.
- Ecliptek, termination bulletin (10 May 2004) — termination
  of the 14-pin DIP TCXO series, no replacement named.
- Secondary sources, hedged as reported in the text and not
  cited as datasheet values: DS3231M 32 kHz ±2.5% figure and
  MEMS architecture (DS3231M datasheet not directly read);
  ZS-042 charging circuit and counterfeit reports (no module
  schematic read); Adafruit Precision RTC Breakout product
  text (charging circuit omitted).
- Fluke, 87V specifications page (read 14 November 2026) —
  meter frequency-range example, bonus check only.
