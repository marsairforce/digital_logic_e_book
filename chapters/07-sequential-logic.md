# Chapter 7 — Sequential logic: memory, counters and clocks

## Purpose

Give a circuit a memory of its past. After this chapter the reader can
use latches, flip-flops, registers and counters on purpose, generate a
clean clock, and finish with a working counter that becomes a clock:
a seconds counter, 00 to 59, proved on BCD LEDs. Clocks in depth, and
display technology, each get their own chapter later in the book; this
chapter keeps only the clock its bench needs.

## Prerequisites

- Chapter 5: combinational blocks

## You will need

Orderables below are manufacturer PDIP listings, not a fresh distributor stock snapshot
(UNVERIFIED as a current-availability claim; no live stock
check is claimed). If an orderable has changed, the
function and pinout in the datasheet revision cited are
what to match, not the letters after the number.

- 1 x NE555P (TI, PDIP-8): astable clock, about 4096 Hz
- 1 x SN74HC14N (TI, PDIP-14): one gate buffers the 555
  output, one gate debounces RESET, four gates spare
  with their inputs tied
- 1 x SN74HC4040N (TI, PDIP-16): divide-by-4096 divider,
  Q11 to 1 Hz, Q8-Q10 as test points
- 1 x CD74HC390E (TI, PDIP-16): seconds counter, half 1
  units decade, half 2 tens decade, BCD wired
- 1 x SN74HC08N (TI, PDIP-14): one AND gate detects
  tens = 6, three gates spare
- 1 x SN74HC32N (TI, PDIP-14): one OR gate combines
  tens = 6 with manual RESET, three gates spare
- 8 x red LED, 5 mm or 3 mm: BCD monitor, units Q0-Q3
  and tens Q0-Q3
- 9 x resistor 1 kΩ, 1/4 W: eight LED series resistors
  (about 2.3 mA each, by the Chapter 5 LED calculation)
  plus the 555 RA
- 1 x resistor 15 kΩ, 1/4 W: 555 RB, fixed part
- 1 x trimmer potentiometer 10 kΩ: 555 RB, trim part,
  for 4096 Hz calibration
- 2 x resistor 10 kΩ, 1/4 W: RESET pull-up and RESET
  series resistor in the debouncer
- 1 x capacitor 10 nF, film or ceramic: 555 timing
  capacitor (not electrolytic at this frequency)
- 1 x capacitor 10 nF, ceramic: 555 CONT (pin 5)
  decoupling
- 1 x capacitor 0.1 µF (100 nF), ceramic: RESET
  debounce capacitor
- 6 x capacitor 100 nF, ceramic: decoupling, one per IC
- 1 x capacitor 10 µF, electrolytic: bulk decoupling
  across the 5 V rails near the supply entry, polarity
  observed
- 1 x pushbutton, normally-open momentary, through-hole:
  manual RESET, press to reset to 00
- 5 V regulated supply, breadboard or breadboards,
  solid-core jumper wire, multimeter, as in Chapters 1-2

Pin numbers for the 74HC08 and 74HC32 gates are given in
the schematic, using the standard TI gate placement
(gate 1: inputs pins 1 and 2, output pin 3, GND pin 7,
VCC pin 14). UNVERIFIED: that placement was not checked
against the 74HC08/74HC32 datasheets for this chapter —
check it before building from the schematic alone. Pin
numbers for the 74HC390 below come from Nexperia's
74HC390 Rev. 6 (19 March 2024) pin description table;
the pin diagram itself is the authority and its
cross-check is still open (UNVERIFIED as a diagram
cross-check).

What you already own from earlier chapters, not a new
purchase: breadboard, jumper wire, 5 V supply, multimeter,
100 nF capacitors and 1 kΩ resistors if bought in bulk,
and red LEDs. The genuinely new purchases are the 555,
the 4040, the 390, the 08 and the 32; the 74HC14 may
already be owned from Chapter 2's Schmitt work.

## Theory

### One bit of memory

Everything in this chapter grows out of one idea: a circuit that
remembers. Combinational logic answers the question "what are the
inputs right now?" Sequential logic answers a different question:
"what happened before, and what should I do about it now?" The
smallest possible answer to that second question is one bit of
memory — a circuit with two stable states, either of which it
holds until something tells it to change. You can build that
circuit from two ordinary gates, and it is worth building, because
once you have watched two gates hold a bit, every latch and
flip-flop in this chapter is just a tidier, faster, better-behaved
version of the same trick.

#### The SR latch from two NOR gates

Take two NOR gates and cross-couple them: the output of each gate
feeds one input of the other. Call the outputs Q and Q-bar, and
call the two free inputs S (set) and R (reset). A NOR gate's
output is HIGH only when both of its inputs are LOW (Nexperia
74HC02 Rev. 9, Table 3), so the pair behaves like this:

| S | R | Q | Q-bar | What happened |
|---|---|---|---|---|
| 0 | 0 | holds | holds | Memory: nothing changes |
| 1 | 0 | 1 | 0 | Set: Q is driven HIGH |
| 0 | 1 | 0 | 1 | Reset: Q is driven LOW |
| 1 | 1 | 0 | 0 | Forbidden: both outputs LOW |

With S and R both LOW, the latch simply sits. Each gate sees a LOW
on its free input, so each gate's output is the inverse of the
other gate's output, and the pair holds whatever state it was last
put into. That is the memory. Drive S HIGH and Q goes HIGH; take S
away again and Q stays HIGH, because the cross-coupling now holds
it there. Drive R HIGH and the same thing happens in reverse.

The fourth row is the one to respect. S = R = 1 forces both
outputs LOW, so Q and Q-bar are no longer complements of each
other. Anything downstream that assumes Q-bar is NOT Q — and most
circuits do assume exactly that — is now being lied to. Worse
still is what happens when you release both inputs together. The
two gates race each other: whichever gate's output changes first
tips the pair into one state or the other, and which gate wins is
a property of the two physical gates' propagation delays, not of
the logic. No datasheet specifies the winner. So the honest
wording is "unpredictable on release", never "it goes to 0" or
"it goes to 1". At the bench, the honest test is to assert the
forbidden state, release it repeatedly, and watch the LEDs land
in different states on different tries. The race itself is over
in tens of nanoseconds — far faster than a multimeter can follow
— so the meter shows only the settled result, never the race.
Seeing the race, or the brief interval when both outputs are
equal, needs an oscilloscope.

There is one more thing no datasheet will tell you about this
latch: what state it powers up in. None of the gate datasheets
checked specifies the power-up state of a cross-coupled pair, so
treat it as unknown. If a build needs a known starting state, it
must drive Set or Reset explicitly after power-up, or use a
flip-flop with an asynchronous clear (see below). Never write
"it powers up at 0".

#### The NAND version: same latch, upside-down inputs

Build the same cross-coupled pair from two NAND gates instead.
A NAND gate's output is LOW only when both of its inputs are HIGH
(Nexperia 74HC00 Rev. 11, Table 3). The behaviour is the mirror
image of the NOR latch, and the inputs are active-LOW, usually
written S-bar and R-bar:

| S-bar | R-bar | Q | Q-bar | What happened |
|---|---|---|---|---|
| 1 | 1 | holds | holds | Memory: nothing changes |
| 0 | 1 | 1 | 0 | Set: Q is driven HIGH |
| 1 | 0 | 0 | 1 | Reset: Q is driven LOW |
| 0 | 0 | 1 | 1 | Forbidden: both outputs HIGH |

Notice the two traps here. First, "set" now means pulling an input
LOW, not driving it HIGH — a diagram that labels a NAND latch's
inputs plain "S" and "R", without the active-low bars or bubbles,
is wrong and will confuse the build. Second, the forbidden state
is the mirror image of the NOR version: both outputs HIGH instead
of both LOW. Either way the outputs stop being complements, and
either way the release is a race with an unpredictable outcome.
The rule is the same in both versions: never assert both inputs
at once, and never design a circuit that depends on what happens
when you do.

#### Latch versus flip-flop: level against edge

A latch is level-sensitive: while its enable level is active, its
output follows its input. The 74HC75 is the canonical example —
while its LE (latch enable) input is HIGH, Q follows D; it is
transparent, and only when LE falls does it hold what D was. The
74HC75 is transparent while LE is HIGH (Nexperia 74HC75 Rev. 6,
function description).

A flip-flop is edge-triggered: its output changes only at one
clock edge — rising for the 74HC74 and 74HC109, falling for the
74HC73, 74HC107 and 74HC112 — and then it ignores its input
until the next edge, provided the setup and hold requirements in
the next section are met.

That distinction bites at the bench in two different ways, and
both involve a bouncing pushbutton. A bouncing input driving a
latch's data while the latch is enabled passes straight through
to the output, bounce by bounce; if the enable itself is the
bouncing signal, the latch repeatedly opens and closes and can
capture a bounce mid-flight, so the stored bit can be the value
from any bounce, not the settled value. A bouncing input driving
a flip-flop's clock is a different failure: an edge-triggered
flip-flop is immune to the level of a slow input, but not to
extra edges. Every bounce that crosses the clock threshold in the
triggering direction is a clock event, so a counter clocked from
a raw pushbutton advances several counts per press. That is the
single most common bench surprise in this chapter, and it is
fully visible with LEDs and no oscilloscope: one press, several
counts. The practical rule follows directly: never wire a
pushbutton straight to a counter clock or a latch enable and
expect one event per press. The signal needs debouncing first — by the Schmitt-trigger
stage this chapter uses — and the debouncing method later
in this chapter exists precisely because of this section.

Slow inputs deserve a separate warning, because "slow" and
"bouncing" are not the same problem. Several of these parts claim
Schmitt-trigger action on their clock inputs — Nexperia says so
for the 74HC74 (Rev. 5), 74HC73 (Rev. 8) and 74HC109 (Rev. 6) —
which makes them tolerant of a slow clock edge, but Schmitt
action does not debounce: a bouncing signal still crosses the
thresholds repeatedly. TI makes the same point differently,
saying clock triggering occurs at a voltage level and is not
directly related to rise and fall time (SN74HC109 Rev. C, and
SN74HC112 Rev. I), and TI warns in the same datasheets that
operating in the threshold region can cause double clocking from
induced grounding, and that unused inputs must never be left
floating. The bench rules that follow are simple: never leave an
input floating, and never feed a slow or noisy signal straight
into a plain CMOS input — route it through a Schmitt-trigger
stage first.

One number is worth carrying here as a warning that "slow is not
free". Nexperia specifies a maximum input transition rate for the
74HC74-Q100 (Rev. 5): at VCC = 4.5 V, 139 ns/V. A switch contact
that dwells in the threshold region longer than this is outside
the recommended operating conditions. Note that this figure is
from the automotive Q100 variant; it is quoted here as the
caution it is, not as a figure verified for every 74HC74.

#### D and JK flip-flops

Two families of flip-flop cover everything this chapter needs.
Naming first, because the vendors disagree on words while agreeing
on behaviour: Nexperia calls the asynchronous inputs SD (set-direct)
and RD (reset-direct); TI calls them PRE (preset) and CLR (clear),
and the CD74HC107 calls its reset input R. This chapter uses
preset and clear, and states the equivalence once: SD = PRE =
preset, RD = CLR = clear. All of them, in every part below, are
active-LOW and asynchronous: they override clock and data
immediately, without waiting for an edge. There is no synchronous
preset or clear in this family set, so do not describe any of
these parts as having one.

The D flip-flop is the simplest to think with. On its active clock
edge it copies D to Q, and between edges it holds. The 74HC74 is a
dual D flip-flop, positive-edge-triggered (Nexperia 74HC74-Q100
Rev. 5; TI SNx4HC74 Rev. F). With preset and clear inactive
(HIGH), a LOW-to-HIGH clock transition captures D into Q. Pull
preset LOW and Q goes HIGH regardless of clock and data; pull
clear LOW and Q goes LOW regardless of clock and data. Pull both
LOW and both outputs go HIGH while both are LOW — the 74's
forbidden combination, with the same release warning as the gate
latch: on simultaneous release to HIGH, the next state is
unpredictable (onsemi 74HC74/D function-table footnote, in the
same wording as the Nexperia-era Philips table). One sourcing
note matters for the bench: the Nexperia Q100 ordering is
surface-mount only, so the breadboard route is TI's SN74HC74N
in PDIP 14, listed in TI Rev. F device information. Distributor
stock was not re-checked for this chapter. UNVERIFIED: the TI
Rev. F timing table was not checked for this chapter, so the
74HC74 timing figures in the next section are Nexperia Q100
figures, not TI figures.

The JK flip-flop is the D flip-flop's more flexible cousin. On its
active clock edge, J = 1, K = 0 sets Q HIGH; J = 0, K = 1 resets
Q LOW; J = K = 0 holds the previous state; and J = K = 1 toggles
Q — it flips to the opposite of whatever it was. That toggle row
is why JK flip-flops are the natural building block for counters:
tie J and K HIGH and the flip-flop divides its clock by two, every
edge. Three of the four parts below follow that textbook table
exactly. The fourth does not, and it is the trap this section
exists to warn you about.

The 74HC73 is a dual JK, negative-edge-triggered, with reset only
(Nexperia 74HC73 Rev. 8). Its clock acts on the HIGH-to-LOW
transition, and J and K must be stable one setup time before that
edge "for predictable operation". Its reset input is asynchronous
and active-LOW: when LOW it forces Q LOW and Q-bar HIGH, overriding
clock and data. There is no preset input on the 73 — to force Q
HIGH you must clock in J = 1, K = 0. Do not describe the 73 as
having preset. And the 73 carries the easiest wiring mistake in
the whole JK family: its power pins are not on the usual corners.
VCC is pin 4 and GND is pin 11 (Rev. 8, pinout diagram), not pins
14 and 7. Any schematic copied from a part-number list alone will
wire it wrong; draw the 73 from its datasheet. A further caution:
Nexperia Rev. 8 ordering lists SO14 and TSSOP14 only, and a DIP
74HC73 from TI was not verified for this chapter, so this chapter
does not promise a DIP 74HC73. UNVERIFIED: DIP availability of the
74HC73.

The 74HC107 is functionally identical to the 73 — dual JK,
negative-edge-triggered, reset only, asynchronous and active-LOW
(TI CD74HC107 Rev. D) — but it differs in terminal assignment and
in some parametric limits, in TI's own words. The 73 and 107 are
therefore not interchangeable pin-for-pin, even though they do
the same logic. The 107's pinout puts power on the standard
corners, GND on pin 7 and VCC on pin 14, and its clock inputs
have hysteresis for improved noise immunity. Its PDIP ordering is
CD74HC107E, but the E variant's current status was not re-checked
for this chapter, so check before recommending it as a buy.
UNVERIFIED: current status of CD74HC107E.

The 74HC112 is a dual JK, negative-edge-triggered, with both
preset and clear (TI SNx4HC112 Rev. I). It follows the standard
JK table: with preset and clear inactive, J = K = 0 holds,
J = 1, K = 0 sets, J = 0, K = 1 resets, and J = K = 1 toggles —
TI says so plainly: "toggle flip-flops by tying J and K high".
Preset LOW alone forces Q HIGH, clear LOW alone forces Q LOW,
both overriding clock and data. Both asserted is forbidden, and
here the vendors themselves disagree about what the outputs do
while both are LOW — TI Rev. I says both HIGH, the onsemi
MC74HC112A says both LOW — so this chapter prints neither pair.
The only safe statement is the one both vendors support: both
asserted is forbidden, the outputs are not complementary, and
the state after release is unpredictable. The 112's pinout is
again its own: power on pins 8 and 16, but J, K, clock, preset
and clear in different positions from the 109, so the 109 and
112 are not drop-in replacements for each other. TI's SN74HC112N
in PDIP 16 is listed ACTIVE in the Rev. I package addendum;
live stock was not re-checked.

#### Warning: the 74HC109 is NOT a standard JK

Do not substitute a 74HC109 for a JK flip-flop and expect the
textbook table. The 109 is a dual JK, positive-edge-triggered,
with preset and clear (Nexperia 74HC109 Rev. 6; TI SNx4HC109
Rev. C), and the two vendors agree on its function table — but
that table is not the standard one. Its K input is effectively
inverted relative to the textbook JK:

| J | K | Result on the rising edge (preset and clear inactive) |
|---|---|---|
| 1 | 0 | Toggle |
| 0 | 0 | Load 0 (Q = 0) |
| 1 | 1 | Load 1 (Q = 1) |
| 0 | 1 | Hold (no change) |

Compare that with a standard JK, where toggle is J = K = 1 and
hold is J = K = 0. On the 109 those two rows are swapped in
effect: J = K = 1 loads 1, and J = K = 0 loads 0. TI confirms it
from the other direction: "toggle flip-flops by grounding K and
tying J high", and "D-type flip-flops if J and K are tied
together" — tying J and K together gives Q = D, which is only
true because of the inverted K. The 109 is designed this way on
purpose, inheriting it from the LS109: tying J and K together
makes a D flip-flop.

The consequence is concrete and easy to get wrong. If a counter
build uses a 109 as a toggle, the wiring is J tied HIGH and K
tied LOW. Wire it J = K = HIGH expecting a toggle and it will
instead jam Q HIGH and sit there. Any sentence of the form "a JK
toggles when J = K = 1" must therefore carry "except the 109,
where J = 1, K = 0 toggles". The 73, 107 and 112 are standard
JKs; the 109 is not, and treating all four as interchangeable
is the single most dangerous assumption in this section. The
109's preset and clear behave like the 74's: asynchronous,
active-LOW, both LOW gives both outputs HIGH and an unpredictable
state on release. For the bench, TI's SN74HC109N in PDIP 16 is
listed ACTIVE in the Rev. C package addendum; live stock was not
re-checked.

In one view, the toggle table the chapter actually needs:

| Part | Edge | Toggle condition | Hold condition | Async inputs |
|---|---|---|---|---|
| 74HC74 (D) | rising | n/a (Q follows D) | no edge | Preset, clear, active-LOW |
| 74HC73 (JK) | falling | J = K = 1 | J = K = 0 | Clear only, active-LOW |
| 74HC107 (JK) | falling | J = K = 1 | J = K = 0 | Clear only, active-LOW |
| 74HC109 (JK) | rising | J = 1, K = 0 | J = 0, K = 1 | Preset, clear, active-LOW |
| 74HC112 (JK) | falling | J = K = 1 | J = K = 0 | Preset, clear, active-LOW |

### Timing without tears

Setup and hold time sound forbidding, and the datasheet tables
look worse, but the idea is one sentence long. Setup time is how
long before the active clock edge the data (D, or J and K) must
already be stable. Hold time is how long after the edge the data
must stay stable. The 74HC73 datasheet puts it as the condition
for "predictable operation"; the 74HC74 datasheet as data "that
meets the set-up and hold time requirements on the LOW-to-HIGH
clock transition" being stored. Violate either one and the
flip-flop may capture the old value, the new value, or — see
the metastability paragraph below — neither cleanly.

Here are the numbers to design to, all minimum required figures
at VCC = 4.5 V, the near-5 V test point the datasheets specify
at, over the −40 °C to +85 °C range unless noted. Read "setup"
as "data must be stable at least this long before the edge".
These are guaranteed figures, not typicals, and where two vendors
disagree the table gives both and the design rule at the end of
this section tells you which one to use.

| Part (source) | Setup, minimum | Hold, minimum |
|---|---|---|
| 74HC75 latch, D to LE (Nexperia Rev. 4) | 15 ns | 3 ns |
| 74HC74 (Nexperia 74HC74-Q100 Rev. 5) | 15 ns (18 ns over −40 to +125 °C) | 3 ns |
| 74HC73 (Nexperia Rev. 8) | 16 ns (20 ns over −40 to +85 °C) | 3 ns |
| 74HC107 (TI CD74HC107 Rev. D) | 20 ns (25 ns over −40 to +85 °C) | 3 ns |
| 74HC109 (Nexperia Rev. 6) | 14 ns (18 ns over −40 to +85 °C) | 5 ns |
| 74HC109 (TI SNx4HC109 Rev. C) | 20 ns | 0 ns |
| 74HC112 (TI SNx4HC112 Rev. I) | 25 ns | 0 ns |
| 74HC112 (Philips 1998 product specification) | 16 ns at 25 °C (20 ns over −40 to +85 °C) | 0 ns |

Two things jump out of that table, and both are the point of the
section. First, the numbers are tiny. At human speeds they are
invisible: a pushbutton press lasts milliseconds, a 1 Hz clock
period is a full second, and a 15–25 ns setup requirement is
roughly 40,000 times shorter than a 1 ms bounce. A builder working
by hand with switches and slow clocks will essentially never
violate setup or hold by being "too slow". Violations happen
when data and clock change at the same time, which is what ripple
counters and asynchronous inputs do — that is why the counters
material later in this chapter warns about decoding ripple
outputs and about clocking a flip-flop from another flip-flop's
output without checking the timing chain. Second, vendors
disagree. The 74HC109 is 14 ns setup from Nexperia and 20 ns from
TI; the 74HC112 is 25 ns from TI and 16 ns from Philips. Neither
vendor is wrong — they are different manufacturers' guarantees
for the same nominal part number. So the chapter's rule is
simple and non-negotiable: use the datasheet of the exact chip
in your hand, and if you do not know which vendor's chip you
have, use the largest (worst) number in the table. For the 109
that means designing to 20 ns setup and 5 ns hold; for the 112
it means 25 ns setup.

A related timing figure belongs alongside setup and hold:
recovery, the time an asynchronous input must be released before
the next clock edge, or the clock may be ignored or the state
may be wrong. Minimum recovery at 4.5 V: 74HC74-Q100, preset or
clear to clock, 8 ns (Nexperia Rev. 5); 74HC73, reset to clock,
16 ns (Nexperia Rev. 8); 74HC107, reset to clock, 12 ns (TI
Rev. D); 74HC109, preset or clear to clock, 14 ns (Nexperia
Rev. 6); 74HC112, TI Rev. I expresses it as a setup requirement
— preset and clear inactive 25 ns before the falling clock edge
(SN74). For scale only, not for design limits, clock-to-output
propagation delays at 4.5 V are in the tens of nanoseconds for
all of these parts (for example 74HC74-Q100 clock-to-Q typically
17 ns, maximum 44 ns, Nexperia Rev. 5). The scale is what matters
here: everything in this section happens in nanoseconds, while
everything your hands do happens in milliseconds.

One warning about reading these tables: several datasheets list
a negative typical hold time — the 74HC74-Q100's typical hold is
−2 ns, the Philips 74HC112's is −4 ns. A negative typical means
the part typically captures correctly even if data changes
slightly before the edge. It is not a guarantee and must never
be quoted as "hold time is −2 ns". The guaranteed figure is the
minimum column: 3 ns for the 74, 0 ns for the TI 112 and 109.
If negative hold is mentioned at all, label it "typical only,
do not design to it".

And one honesty note about instruments. Setup and hold
violations, and propagation delays in the tens of nanoseconds,
cannot be observed with a multimeter. The reader can observe
only their symptoms at human speed: a counter that occasionally
counts wrong, or a flip-flop that sometimes captures the old
value. Any claim of the form "measure the setup time on your
breadboard" would be false for this reader's instrument set, and
this chapter makes no such claim. The exact duration of a
particular switch's bounce is likewise not a manufacturer figure
— bounce is milliseconds long, thousands of times longer than
the nanosecond timing above, and the exact figure for the
reader's own switch is UNVERIFIED (measuring it needs an
oscilloscope; a multimeter is too slow to show individual
bounces and will only show the multiple-count symptom).

#### Metastability, honestly

If an input changes inside the setup/hold window around the clock
edge, the flip-flop is asked to decide between 0 and 1 at the
exact moment it has no valid answer. Its output can then hover
between the rails, or settle late — after the propagation delay
the datasheet promises. Downstream logic that samples that output
during the hover can read different values in different places:
the circuit disagrees with itself. That is metastability. It
bites only when an asynchronous signal — one not derived from the
same clock, such as a pushbutton, a signal from another clock
domain, or a serial line — meets a clock edge. A fully
synchronous breadboard circuit clocked at 1 Hz from one
oscillator, with data that changes well away from edges, is not
the danger case; it bites in real designs at high clock rates and
at clock-domain crossings, which is why it is in this chapter as
a concept, not as a bench exercise.

Real designs do not prevent metastability — that is impossible,
because an asynchronous edge can always land in the window. They
give it time to resolve: pass the asynchronous signal through two
flip-flops in series on the receiving clock, a two-flop
synchronizer, so the first flip-flop's possibly metastable output
has a whole clock period to settle before the second flip-flop
samples it. That reduces the failure rate by orders of magnitude
— longer resolve time means an exponentially smaller chance the
second flop catches it still undecided — but it never reaches
zero, and it costs a clock cycle of latency. This follows the
conclusion of TI's synchronizer notes SCAA011A (March 1996) and
SCZA004A, that a second flip-flop stage greatly reduces
metastability; TI's product-specific wording that metastability
can be "virtually eliminated" in a particular FIFO family must
not be generalised into "two flip-flops eliminate metastability".
The reader will almost certainly never see metastability on this
book's breadboard builds — slow clocks, LEDs, no oscilloscope —
and that is fine. The paragraph exists so that when they later
meet a design that synchronizes an external signal, the two-flop
pattern is already familiar rather than magic. And one plain
fact to close on: no print-worthy metastability MTBF, failure
rate, or resolution time constant exists for any 74HC flip-flop.
The 74HC datasheets specify setup, hold and propagation delay
only; metastability parameters are characterised for specific
synchronizer products, not for general-purpose 74HC flip-flops.
This chapter prints no such number, because none was found.

### Registers and shift registers

A flip-flop remembers one bit. A register remembers a byte. That is really all a register is: eight D flip-flops side by side, sharing one clock, so that a whole byte can be captured, held, and read back as a unit. Once you have that, you can hold a number while something else works on it, present a byte to a bus, or feed a byte into a circuit one bit at a time. The parts in this section all do that job, but they differ in the small details that decide which one belongs in a given circuit, and those details are where beginners get caught.

#### Registers as banks of D flip-flops: the 74HC273, 74HC374 and 74HC574

Start with the three octal registers, because they are the plainest form of the idea. The 74HC273, the 74HC374 and the 74HC574 are each eight positive-edge-triggered D flip-flops with a shared clock input, CP, and they are all 20-pin parts with VCC on pin 20, GND on pin 10 and CP on pin 11 (Nexperia Rev. 7 for the 273, Rev. 4 for the 374, and Rev. 4 for the Q100 variant for the 574). On every LOW-to-HIGH clock edge, each output Qn takes the value its input Dn held at the edge, and all three parts are non-inverting, so Qn equals Dn as clocked in. They run on the usual HC supply range of 2.0 to 6.0 V, and they clock on the rising edge only: there is no falling-edge option and no separate clock per bit. At the hand-clocked speeds used on a bench, and indeed at anything up to the guaranteed minimum clock frequency of 30 MHz at 4.5 V that all seven parts in this section share, speed is simply not something to worry about. That 30 MHz figure is a guaranteed minimum at 4.5 V, not a typical value dressed up as a promise, and it is the safe number to carry in your head for the whole family.

The differences between the three are the whole story. The 273 has a master reset, MR, on pin 1, active LOW and asynchronous, which means a LOW on MR forces every output LOW at once, independently of clock and data (Nexperia Rev. 7, section 1). In normal use MR must be held HIGH, and after power-up the outputs are only known to be zero if MR has actually been pulsed LOW, a point returned to below. The 273 has no output enable and no high-impedance state: its outputs are always driven. That makes it a plain holding register, good for capturing a byte and clearing it to zero on demand, and it also means it must never be put on a shared bus, because it cannot step aside to let another chip talk.

The 374 and the 574 are the bus registers, and they make the opposite trade. Neither has any clear or reset pin at all, so the only way to force one to zero is to clock in a zero byte. What they have instead is an output enable, OE, on pin 1, active LOW. When OE is HIGH, all eight outputs go to the high-impedance OFF-state, and the register keeps its stored byte untouched while it is disconnected; when OE goes LOW again, the same byte reappears, without needing to be reloaded (Nexperia Rev. 4, section 1, for both parts). OE is not a clear, and confusing the two is a real beginner error: disconnecting the outputs does not erase them.

Between the 374 and the 574 there is no functional difference at all, only a layout difference, and it is worth choosing deliberately. On the 374, as on the 273, the D and Q pins are interleaved around the package, and the two parts in fact share pins 2 to 20 exactly, with only pin 1 changing meaning, from MR on the 273 to OE on the 374. That is a genuine trap: swapping a 273 for a 374 without rewiring pin 1 quietly turns a reset into an output enable. On the 574, by contrast, all eight D inputs sit on one side of the package, on pins 2 to 9, and all eight Q outputs sit on the other side, on pins 19 down to 12, so a bus can flow straight through the chip. Note the order on that output side: Q7 is pin 12 and Q0 is pin 19, so the outputs run in reverse order down the right-hand side. Choose the 574 when the wiring matters, and the 374 when it does not; do not expect either to behave differently from the other.

One more bench-level difference concerns drive. The 273 has standard outputs, characterised at 4 mA at 4.5 V, with an absolute-maximum output current of 25 mA and a package VCC and GND current limit of 50 mA (Nexperia Rev. 7, sections 7 and 9). The 374 and 574 have bus-driver outputs, characterised at 6 mA at 4.5 V, with an absolute-maximum output current of 35 mA and a package limit of 70 mA (Nexperia Rev. 4, sections 7 and 9, for both parts). The characterised figure is the honest continuous-design figure; the absolute maximum is a damage limit, never a design target. That distinction will matter again, more sharply, with the 595 below.

#### Shift registers: the 74HC164, 74HC165, 74HC194 and 74HC595

A shift register is a register with its flip-flops chained together, so that on each clock edge every bit moves one stage along and a new bit enters at one end. That one idea buys two useful tricks. First, it turns serial data into parallel data, or the other way round, so a circuit that can only spare one or two wires can still move a whole byte. Second, it moves a pattern: a single 1 clocked into a shift register and then shifted along lights up one output after another, which is a simple way to sequence things, to scan, or to make a walking pattern. The four parts here cover the useful combinations of serial and parallel, in and out, and the differences between them are again the point.

The 74HC164 is the simplest shift register of the set: eight bits, serial in, parallel out, with no latch and no output enable (Nexperia Rev. 11, 28 May 2024). Data enters through two gated serial inputs, DSA on pin 1 and DSB on pin 2, and the bit shifted in is DSA AND DSB, so both must be HIGH to shift in a 1 and either LOW forces a 0 into Q0. Either input can therefore serve as an active-HIGH enable for data arriving on the other, which is the part's one subtlety, and it should be stated as an AND, not as two interchangeable data inputs. Its clear, MR on pin 9, is active LOW and asynchronous, forcing all outputs LOW independently of the other inputs, and it must be held HIGH in normal operation. Because there is no latch, the Q pins are the shift register itself: while a byte is being shifted in, the outputs show every intermediate pattern, so LEDs on a 164 visibly step through the shifting at hand-clocked speeds. There is no dedicated serial-out pin for cascading; feed Q7 on pin 13 into the next chip's DSA or DSB to extend the chain. Its outputs are standard outputs, characterised at 4 mA at 4.5 V with a 50 mA package limit, the same honest figures as the 273.

The 74HC165 is the mirror image of the 164: parallel in, serial out (Nexperia Rev. 5, 21 August 2017). Eight bits are loaded in parallel and then shifted out serially, most-significant bit first, and it also has a serial input, DS on pin 10, so chains can be built. The load is the first thing to get right. PL on pin 1 is active LOW and asynchronous, so when PL is LOW, D0 to D7 are loaded into the register immediately, regardless of CP and CE, and PL must be returned HIGH before shifting starts. A PL pulse that overlaps a clock edge, which a bouncy switch can easily produce, is a fault, not a feature. Once loaded, with PL HIGH and the clock enable CE on pin 15 LOW, each LOW-to-HIGH clock edge on CP, pin 2, shifts the register, and the first bit out on Q7, pin 9, is D7, then D6, and so on down to D0 last. CE is active LOW, so tie it to GND if the circuit does not need its hold feature, and note the datasheet footnote that CE may only change from HIGH to LOW while CP is LOW. The single most likely beginner misunderstanding of the 165 is to expect parallel outputs: there are none. The only way the byte comes out is serially, one bit per clock, on Q7, with a complementary output Q7-bar on pin 7. And the wiring needs care, because the D-pin order is scrambled: D0 to D3 run up pins 11 to 14 on one side, while D4 to D7 run down pins 3 to 6 on the other. Assuming the D pins run in order around the package will wire the loaded byte wrong. Like the 164, the 165 has standard outputs characterised at 4 mA at 4.5 V with a 50 mA package limit, and like the 164 it has no output latch and no output enable.

The 74HC194 is the teaching part of the set, and the only four-bit part here: a bidirectional universal shift register (Nexperia Rev. 4, 16 March 2021). Two mode pins, S0 on pin 9 and S1 on pin 10, select one of four things to do on the rising CP edge, pin 11, and the part has parallel inputs D0 to D3 on pins 3 to 6, parallel outputs Q0 to Q3 on pins 15 down to 12, and two serial inputs, DSR on pin 2 for shifting right and DSL on pin 7 for shifting left. Following the Rev. 4 function table, which is the authority for this part for the reason given below, both mode pins LOW means HOLD, with the register keeping its value and the clock ignored; S1 LOW and S0 HIGH means SHIFT RIGHT, with serial data entering at DSR and bits moving toward Q3; S1 HIGH and S0 LOW means SHIFT LEFT, with serial data entering at DSL and bits moving toward Q0; and both mode pins HIGH means PARALLEL LOAD, with D0 to D3 transferred to Q0 to Q3 on the rising clock edge. Direction is best defined by that pin movement, toward Q3 or toward Q0, and by which serial pin feeds it, rather than by the words left and right alone, because textbooks do not all draw Q0 on the same side. Note also that the 194's parallel load is synchronous: unlike the 165's asynchronous PL, it waits for a clock edge, and contrasting those two load styles, together with the 595's latch below, is the conceptual core of this section. The 194's clear, MR on pin 1, is active LOW and asynchronous, overriding all other inputs and forcing all outputs LOW, and it must be held HIGH normally. It has no output latch, no output enable and no 3-state outputs, and its outputs are standard outputs characterised at 4 mA at 4.5 V with a 50 mA package limit. For cascading, the previous chip's Q3 feeds the next chip's DSR for a shift-right chain, and the previous chip's Q0 feeds the next chip's DSL for a shift-left chain. Four bits is narrow on purpose: the 194 is here to teach bidirectionality and mode control, not to build a wide register from, and for eight bits the reader chains two 194s or picks a 164, 165 or 595 according to direction.

A caveat on the 194 must be carried in the text, not smoothed over. Nexperia Rev. 4 contradicts itself on this part: its section 1 prose pairs S0 HIGH with DSL and S1 HIGH with DSR, while its section 6 function table pairs them the other way round, with shift-left using DSL and shift-right using DSR, which also matches the classic 74194 convention. This draft follows the function table, because the table is internally consistent, with DSL feeding the shift-left row and DSR feeding the shift-right row. UNVERIFIED: that choice should still be confirmed on the bench, with one chip, LEDs and one known bit, before the mode table is treated as settled, and the bench check should confirm direction by pin movement rather than by the words left and right.

#### The 74HC595 as the LED driver's friend

The 74HC595 is the part to linger on, because it is the one a reader will reach for whenever a few microcontroller or logic pins have to drive a row of LEDs or a display, and because its most repeated specification is wrong (Nexperia Rev. 9, 28 February 2017). Inside the 595 are two eight-bit registers in series, plus a 3-state output stage, and keeping those two registers apart in your head is the whole trick. The first is the shift register, fed by DS on pin 14 and clocked by SHCP, the shift-register clock, on pin 11. Each LOW-to-HIGH SHCP edge shifts it one stage, and its last stage is brought out as Q7S on pin 9, the serial data output, for cascading. While data is being shifted, the shift register's contents are not visible on the Q0 to Q7 pins. The second is the storage register, clocked by STCP, the storage-register clock or latch, on pin 12. Each LOW-to-HIGH STCP edge copies the entire shift register into the storage register at once, and the storage register drives Q0 to Q7. The third control is OE, the output enable, on pin 13, active LOW: OE LOW lets the stored byte appear on Q0 to Q7, OE HIGH puts all of them into the high-impedance OFF-state, and blanking the display with OE does not lose the displayed byte, because operating OE does not affect the state of the registers, so re-enabling OE restores the byte without re-shifting.

That latch is why a 595 display does not flicker where a 164 display does. With a 164, every shift clock changes the displayed pattern mid-byte, so at hand-clocked speeds the reader watches the pattern crawl across the LEDs, and the final pattern only appears after the eighth clock. With a 595, the displayed byte does not change at all while eight SHCP pulses load the next byte into the invisible shift register; it changes once, all eight bits together, on the single STCP edge. The update is all-together only to within the STCP-to-output propagation delay, tens of nanoseconds, which is invisible at LED and human timescales and is not something a reader with a multimeter can or needs to check. Two wiring rules protect that benefit. First, keep SHCP and STCP separate: if both clocks are tied together, the shift register will always be one clock pulse ahead of the storage register, in the datasheet's own words, so the display lags by one bit and the flicker benefit is lost. Tying them together is a real beginner shortcut, and it should be called out as one. Second, OE gives an optional blanking tool: drive OE HIGH while shifting, then LOW after STCP, and the display never shows an intermediate state even if the latch were misused. It is not required for flicker-free operation once STCP is used correctly, but it is the right tool for display blanking.

The pin traps on the 595 deserve the same plain treatment, because they are all wiring errors waiting to happen. Q0 is pin 15, not pin 1: pins 1 to 7 are Q1 to Q7 in order, and Q0 sits alone on the other side, next to DS. A reader who assumes Q0 is pin 1 will wire the display bit-reversed plus one. Q7S on pin 9 is not Q7: Q7 on pin 7 is the latched parallel output, while Q7S is the raw last stage of the shift register and is the pin used for cascading to the next chip's DS, so cascading from Q7 instead of Q7S gives a display that lags by a latch cycle and breaks the chain timing. MR on pin 10 clears the shift register only, not the outputs: the function table is explicit that MR LOW gives Q7S LOW and the Qn outputs no change, so the stored and displayed byte only clears when a subsequent STCP edge copies the now-empty shift register into the storage register. A sentence saying that MR resets the outputs to zero would be false as written; the correct form is that MR clears the shift register, and a STCP pulse afterwards clears the display. Hold MR HIGH in normal operation. OE on pin 13 is active LOW, so tying OE HIGH by mistake gives a dead display with a perfectly good shift register, which is a first fault to check on the bench. Cascading itself is straightforward once Q7S is understood: common SHCP, common STCP, the first chip's Q7S into the second chip's DS, and so on, with OE and MR commonly tied across chips, OE LOW and MR HIGH in normal operation, so that after sixteen SHCP pulses for two chips and one STCP pulse, both displays update together.

Now the drive trap, stated plainly, because it is the number most often got wrong about this part. The 595's Q0 to Q7 outputs are bus-driver outputs, with VOH and VOL characterised at 6 mA at 4.5 V (Nexperia Rev. 9, section 10). The absolute-maximum output current is 35 mA per Qn pin, with 25 mA for Q7S, and the VCC and GND current limit for the package is 70 mA (Rev. 9, section 8). The 35 mA figure is a damage limit, not a drive rating, and the frequently repeated claim that the 595 can drive 35 mA per pin is wrong as design guidance. The honest design figure is the 6 mA characterisation. The package arithmetic follows from the 70 mA limit and is worth doing out loud: eight LEDs at the characterised 6 mA total 48 mA through VCC and GND, inside the 70 mA limit, while eight LEDs at 20 mA each total 160 mA, more than double the package limit, and must not be presented as a working design, even though no single pin exceeds 35 mA. If bright 20 mA LEDs are wanted, a driver stage after the 595 is needed, and that driver design is follow-up work, not specified here. A series resistor per LED is still required in any case, because the 595 is a logic output, not a constant-current driver, and nothing in Rev. 9 specifies LED current limiting. UNVERIFIED: no specific LED part or forward voltage was checked for this section, so any worked resistor value must be labelled with the LED forward voltage it assumed, and that value must come from the LED's own datasheet, not from the 595's.

Two further cautions belong with this section as a whole. The first is power-up state. UNVERIFIED: none of the seven datasheets checked states a guaranteed power-up output value, so this section must not claim that any of these parts powers up at zero, or at any other value. The bench-safe procedure is to pulse the clear on the 273, 164, 194 and the 595's shift register, or to clock in a known byte on the 374, 574 and 165, after power-up, before trusting the display. The second is sourcing. UNVERIFIED: every Nexperia ordering table checked for this section lists only surface-mount packages, and no through-hole ordering code for any of the seven parts appears in those documents, so whether a through-hole variant of each part is currently sold by another vendor was not checked here and must not be asserted. Until a follow-up checks distributor stock and a datasheet per part, this section must not promise the reader a through-hole 273, 374, 574, 164, 165, 194 or 595; the honest interim wording is that the Nexperia documents checked are surface-mount only, and the reader would need either a through-hole variant from another vendor, to be specified after checking, or a surface-mount-to-through-hole carrier board. That flag bites any parts list drawn from this section directly.

### Counters

A flip-flop remembers one bit. A counter is what you get when you
arrange flip-flops so that each clock pulse moves the whole group
one step along a fixed sequence: 0, 1, 2, 3, and so on, until the
sequence wraps around and starts again. Counters are how a circuit
keeps time, divides a fast clock down to a slow one, steps through
a sequence of operations in turn, and counts events too fast or
too numerous for a person to follow by hand.

There are two families in this section, and the difference between
them is the difference between a relay race and a marching band.
In a ripple counter, each flip-flop hands its output to the next
one as its clock, so the change ripples down the chain one stage
at a time. In a synchronous counter, every flip-flop shares the
same clock, so the whole counter steps together. Ripple counters
are simpler. Synchronous counters are cleaner. The rest of this
section is about knowing which price you are paying, and when
each one is worth it.

A note on the numbers below, before they start arriving. Every
delay is a manufacturer figure at the conditions stated beside
it, with the document and revision cited at the end of this
section. At the speeds this chapter works at — seconds, hertz,
a few kilohertz — delays of tens of nanoseconds are utterly
invisible: no LED flickers that fast, and no multimeter measures
it. What you can check with your eyes and a meter is the
counting itself: the sequence, the reset behaviour, the load
behaviour, and whether a counter waits for its clock. The
nanosecond figures matter only when a counter's outputs drive
other logic, and the chapter says so wherever that is the case,
rather than asking you to observe something your tools cannot
show you.

#### Ripple counters: simple, with ripple delay as the price

In a ripple counter, each flip-flop is clocked by the previous
stage's output, not by the common clock. The outputs therefore do
not change together: they change one after another, separated by
one stage delay each. That is the whole of the price, and it is
worth stating plainly. A decoded combination of the outputs —
for example, ANDing several Q outputs together to detect a
particular count — passes briefly through wrong intermediate
states on its way to the right one. The 74HC93 datasheet says
this explicitly: "State changes of the Qn outputs do not occur
simultaneously because of internal ripple delays. Therefore,
decoded output signals are subject to decoding spikes and should
not be used for clocks or strobes" (Philips 74HC/HCT93,
December 1990). Those spikes are tens of nanoseconds wide. You
cannot see them, and this chapter does not pretend otherwise.
The rule still matters, precisely because you cannot see the
moment a decoded ripple output would clock something it should
not: do not drive another clock from a decoded ripple-counter
output. Use ripple counters for displays and for frequency
division, where the outputs themselves are the product. Use
something synchronous when the outputs feed other logic.

##### 74HC93: two sections and a gated reset

The 74HC93 is a 4-bit binary ripple counter in a 14-pin package,
and the first thing to understand about it is that it is not
one counter with one clock. It is two sections: a divide-by-2
section and a divide-by-8 section, each with its own clock input
(CP0 and CP1), each changing on the HIGH-to-LOW clock transition
(Philips 74HC/HCT93, December 1990).

For 4-bit operation you wire the sections together yourself:
connect Q0 externally to CP1 and apply the input to CP0. Then
divisions of 2, 4, 8 and 16 appear at Q0, Q1, Q2 and Q3 at the
same time, and the chip counts 0 to 15 before wrapping around.
Break that one wire and the two sections count independently —
a useful bench check, because it makes the two-section structure
visible in a way the bare part number never does. Feed the input
to CP1 alone and you have a 3-bit counter instead, with
divisions of 2, 4 and 8 at Q1, Q2 and Q3, while Q0 sits aside as
a separate divide-by-2.

The reset is the bench gotcha, and it is worth learning before
you wire a button to it. The 93 has a gated-AND asynchronous
master reset: MR1 and MR2, both active HIGH, and both must be
HIGH to reset. A HIGH on both "overrides both clocks and resets
(clears) all flip-flops". A button wired to only one MR input,
with the other left LOW, will never reset the chip at all — and
that failure looks exactly like a dead chip until you read the
reset description. In practice, tie one MR HIGH permanently and
pulse the other, or AND your reset signal into both. As with
every part in this book, all unused inputs must be tied to VCC
or GND, never left floating.

For scale, the 1990 specification gives a CP0-to-Q0 propagation
delay of 12 ns typical for the HC part at VCC = 5 V, CL = 15 pF,
25 °C, and an fmax of 100 MHz for HC (77 MHz for HCT). Those are
typical values from a 1990 document, not maxima from a current
revision, and the chapter quotes them as such.

**UNVERIFIED:** a single clean "CP-to-Q3, worst case, at 5 V"
figure for the 93 in a current Nexperia revision was not
retrieved, so this section illustrates ripple accumulation with
the 4020 and 4040 numbers below, which come from current
revisions, rather than quoting a 93 total from the 1990 table.

##### 74HC390: one package, two decades, two wirings

The 74HC390 packs two independent 4-bit decade counters into one
16-pin package (Nexperia, Rev. 6, 19 March 2024). Each decade is
itself split into a divide-by-2 section (clock nCP0) and a
divide-by-5 section (clock nCP1), each triggered by the
HIGH-to-LOW transition. One package can be configured to divide
by 2, 4, 5, 10, 20, 25, 50 or 100, using the two counters
together for 100.

The wiring decides what the bits mean, and the two wirings give
different sequences — they are not two ways of getting the same
answer. For BCD decade counting, connect nQ0 to nCP1 and apply
the input to nCP0. The count then runs, in the order nQ0 nQ1
nQ2 nQ3, from 0000 through 1001 in ordinary binary-coded
decimal, and back to 0000. For bi-quinary counting, connect nQ3
to nCP0 instead, apply the input to nCP1, and nQ0 becomes the
decade output — but the bit-weighting is different, and the
sequence is different with it. Bi-quinary is a historically
interesting way of thinking about divide-by-5 followed by
divide-by-2, but it is not BCD under another name, and a clock
that wants seconds and minutes wants the BCD wiring.

Reset, too, is per counter rather than chip-wide: each decade
has its own asynchronous master reset (1MR, 2MR), active HIGH,
and a HIGH on one "overrides the clocks and sets the four
outputs LOW" for that decade only. The two decades reset
independently, unlike the 4020 and 4040 below, which have a
single chip-wide reset.

The Rev. 6 dynamic figures give a feel for the ripple inside
the divide-by-5 section, and they carry a small warning against
tidy rules of thumb. At 4.5 V, CL = 50 pF, 25 °C: nCP0-to-nQ0 is
17 ns typical, 29 ns maximum (14 ns typical at 5 V, CL = 15 pF);
nCP1-to-nQ1 is 18 ns typical, 31 ns maximum; but nCP1-to-nQ2 is
27 ns typical, 42 ns maximum — Q2 is slower than Q1 and Q3 from
the same clock. The divide-by-5 section is not a uniform
one-delay-per-stage chain, so "each stage adds the same delay"
is a useful approximation for the long dividers below, not a
universal law. Reset takes 19 ns typical, 33 ns maximum
(nMR-to-nQn at 4.5 V), and fmax is 30 MHz minimum, 60 MHz
typical at 4.5 V. The HC part's recommended supply range is
2.0–6.0 V; the "4.5 V to 5.5 V" range that appears in the
features list is the JEDEC compliance range quoted there, not
the full operating range.

For the bench, the 390 is a TI buy: Nexperia's Rev. 6 ordering
table lists only surface-mount variants, while TI's CD74HC390E
in PDIP-16 is ACTIVE (TI SCHS185E, Rev. E, April 2022). Give the
full orderable number, not the bare "74HC390", or a reader will
land on an SMT-only listing.

##### 74HC4020 and 74HC4040: long binary dividers

When the job is simply to divide a clock by a large power of
two, reach for a long ripple divider. The 74HC4020 is a 14-stage
binary ripple counter and the 74HC4040 is a 12-stage one
(Nexperia 74HC4020 Rev. 9, 27 March 2024; 74HC4040 Rev. 4,
20 March 2014). Both clock on the HIGH-to-LOW transition, both
have a single asynchronous master reset, active HIGH, that
clears every stage and forces all outputs LOW independent of
the clock, and both count from zero up to 2 to the power of
the number of stages minus one: 0–16383 for the 4020, 0–4095
for the 4040. Each output Qn divides the input by 2 to the
power (n + 1), so the last output of the 4020, Q13, divides by
16384, and the last output of the 4040, Q11, divides by 4096.

The difference that trips people up is which outputs actually
reach a pin. The 4040 brings out all twelve of its outputs,
Q0–Q11, so every power of two up to 4096 is available: Q0
divides by 2, Q1 by 4, Q2 by 8, Q3 by 16, and so on up to Q11
at 4096. The 4020 brings out only twelve of its fourteen
stages: Q0 and Q3–Q13. Q1 and Q2 exist inside the chip but
have no pin — the 16-pin package cannot fit fourteen outputs
plus clock, reset and power — so there is no divide-by-4 or
divide-by-8 output on a 4020 at all. A design that assumes
those ratios from a 4020 will fail at the wiring stage, not
at the theory stage; use a 4040, or a 93 or 390 stage, for
those ratios.

Ripple accumulation can now be put in numbers, and the 4020
figures show it cleanly. At 5 V, CL = 15 pF, the 4020's
CP-to-Q0 delay is 11 ns typical and each stage-to-stage delay
is 6 ns typical, so CP-to-Q13 works out, by derived arithmetic
rather than as a quoted datasheet line, to roughly 11 + 13 × 6
= 89 ns typical — about eight times the first-stage delay. At
4.5 V, CL = 50 pF, the corresponding figures are 14 ns typical,
28 ns maximum for CP-to-Q0, and 8 ns typical, 15 ns maximum
per stage, giving a worst-case shape of roughly 28 + 13 × 15
= 223 ns. The 4040 gives a similar picture: 14 ns typical
CP-to-Q0 and 8 ns typical per stage at 5 V, CL = 15 pF, for a
derived CP-to-Q11 of roughly 14 + 11 × 8 = 102 ns typical.

**UNVERIFIED:** the 4040's per-stage figures are 1990
quick-reference values carried in the Rev. 4 lineage, not a
freshly extracted Rev. 4 table row, and no current-revision
4040 dynamic table was cleanly extracted for this chapter; do
not upgrade those figures to a Rev. 4 table citation without
re-checking.

At the chapter's clock speeds, 100–200 ns of ripple skew is
utterly irrelevant to an LED display. The eye cannot see it
and a multimeter cannot measure it. It only matters when
decoding the outputs into other logic, or clocking something
else from a decoded output. That is the honest price of a
ripple counter: free at human speeds, paid in glitches at
logic speeds.

Two sourcing and naming cautions belong here, because both
bite at the ordering stage. First, Nexperia's current ordering
tables list no DIP for the 4020, and the 4040's DIP listing
sits in the 2014 Rev. 4 table with no newer revision found, so
its current Nexperia DIP status is **UNVERIFIED**; the TI
routes are CD74HC4020E and SN74HC4040N or CD74HC4040E, and the
current ACTIVE status of the CD74HC4020E was not confirmed
from a TI product page for this chapter, so it needs a
drafting-time status check before any "order this" wording.
Second, the 4000-series originals number their first output
Q1, while the 74HC4020 and 74HC4040 number it Q0, so a reader
moving between a CD4020 or CD4040 datasheet and a 74HC4020 or
74HC4040 datasheet will see output labels shifted by one.
**UNVERIFIED:** whether TI's CD74HC4020 and CD74HC4040 parts
are pin-for-pin substitutes for the Nexperia parts — the TI
datasheets use different output naming, and the SN74HC4040
uses different clock and reset naming (CLK/CLR) — so do not
present the TI and Nexperia parts as drop-in substitutes in a
schematic without a pin-table comparison.

#### Synchronous counters: everyone changes together

A synchronous counter clocks all of its flip-flops from the
same clock, on the rising (LOW-to-HIGH) edge, so the outputs
change together. TI's description of the 191 puts it well:
this mode of operation "eliminates the output counting spikes
normally associated with asynchronous (ripple-clock) counters"
(TI SCLS121D). The cost is more control pins — enables, load,
clear — and the need to understand which control wins when
several are asserted at once. That cost is worth paying
whenever a counter's outputs drive other logic, because the
whole counter then changes on a clock edge and never between
edges.

##### 74HC160, 74HC161 and 74HC163: one family, two differences

The 160, 161 and 163 are best taught as one family with a
two-way table, not as three unrelated parts. All three are
4-bit, presettable, synchronous counters with two count
enables and a look-ahead carry for cascading. They differ in
exactly two dimensions: count sequence and clear timing.

| Part | Counts | Clear |
| --- | --- | --- |
| 74HC160 | Decade (BCD): 0–9, then 0 | Asynchronous, active LOW (MR) |
| 74HC161 | Binary: 0–15, then 0 | Asynchronous, active LOW (MR/CLR) |
| 74HC163 | Binary: 0–15, then 0 | Synchronous, active LOW (CLR) |

The sources are Nexperia Rev. 4 for each part: the 160
(27 March 2019) states that a LOW at MR "sets Q0 to Q3 LOW
regardless of the levels at input pins CP, PE, CET and CEP
(thus providing an asynchronous clear function)"; the 161
(4 October 2018) carries the same asynchronous wording, and TI
agrees (SCLS297D: "The clear function for the 'HC161 devices
is asynchronous"); the 163 (28 December 2015) is titled as a
synchronous-reset part, and TI agrees (SCLS298D: "The clear
function for the 'HC163 devices is synchronous. A low level
at the clear (CLR) input sets all four of the flip-flop
outputs low after the next low-to-high transition of CLK,
regardless of the levels of the enable inputs").

The bench meaning of that distinction is the single most
important point in this section, and it replaces the
skeleton's gotcha wording with something you can check
without any instrument beyond your eyes. An asynchronous
clear acts immediately, mid-count, without waiting for a
clock edge: pull MR/CLR LOW on a 160 or 161 and the outputs
go LOW at once. That is exactly what a reset button wants,
and exactly what a "detect 9 (or 15) and reset now"
shortening circuit uses — but the clear pulse is itself
asynchronous logic, so a decoded-clear loop can glitch and
re-trigger, and a hand-wired divide-by-N built this way
sometimes counts short. A synchronous clear waits: pull CLR
LOW on a 163 and nothing happens until the next rising clock
edge, at which point the outputs go LOW. The counter therefore
always changes on a clock edge, never between edges — cleaner
in a synchronous system — but a reset press that ends
between clock edges will not be visible until the next edge.
At a 1 Hz clock that lag is up to one full second, and you
will see it with the naked eye: hold CLR LOW on a 163 and a
161 side by side, release between ticks, and the 161 clears
at once while the 163 waits for the next tick. No instrument
is needed, and none is claimed.

**UNVERIFIED:** the exact clear-versus-load priority for the
163 — if CLR and LOAD are both asserted at the same clock
edge, which wins — was not extracted from a function table
for this chapter, so this section does not state it. For the
160, the function table does show reset overriding everything
(MR LOW gives all outputs LOW regardless of clock, enables
and load), and load overriding the enables; that much is
verified for the 160.

All three parts share their parallel load behaviour. Load is
synchronous: a LOW on PE (Nexperia naming) or LOAD (TI naming)
does not change the outputs immediately. On the next rising
clock edge, the data on D0–D3 (Nexperia) or A–D (TI) is copied
to Q0–Q3. Load overrides the count enables — it works even if
CEP or CET is LOW — but it does not override an asynchronous
clear on the 160 or 161, where clear wins. Load is how you
build a divide-by-N that is neither a power of two nor ten,
by starting the count part-way through its sequence instead
of at zero.

**UNVERIFIED:** the exact "load on terminal count" wiring
for a divide-by-N load example — which output feeds back to
PE/LOAD, and whether an extra gate is needed — was not
verified against an application figure for this chapter, so
this section asserts no such wiring diagram; a worked,
datasheet-checked diagram is needed before one is printed.

Cascading these parts into a wider counter is where the
synchronous design pays for its extra pins. Both enables must
be HIGH to count: CEP (count enable parallel, TI: ENP) and
CET (count enable trickle/carry, TI: ENT). If either is LOW,
the counter holds its count. CET is fed forward to enable
the terminal-count output (TC on Nexperia, RCO on TI SN
parts): TC/RCO is HIGH only when CET is HIGH and the counter
is at terminal count — 9 for the 160, 15 for the 161 and 163 —
and the TC pulse lasts approximately as long as a HIGH output
of Q0, about one clock period's high phase, not a narrow
spike. The lower stage's TC/RCO is used to enable the next
higher stage, so the higher stage counts once per full cycle
of the lower stage, all stages share the same clock, and the
wide counter stays synchronous: internal look-ahead carry
buys you a wide counter with no ripple accumulation across
chips. The maximum cascaded clock frequency is set by the
CP-to-TC delay plus the CEP-to-CP setup time
(fmax = 1 / (tP(max)(CP to TC) + tSU(CEP to CP)), Nexperia
160 Rev. 4).

For scale, the 160's Rev. 4 figures at CL = 50 pF, 25 °C are:
CP-to-Qn 22 ns typical, 37 ns maximum at 4.5 V (19 ns typical
at 5 V, CL = 15 pF); CP-to-TC 25 ns typical, 43 ns maximum at
4.5 V; CET-to-TC 17 ns typical, 30 ns maximum at 4.5 V.

**UNVERIFIED:** the exact pin-to-pin cascade recipe — which
enable input of the upper stage receives the lower stage's
TC, and what the other enable is tied to — was not verified
against a datasheet application figure. The datasheets'
prose ("TC … can be used to enable the next cascaded stage")
is verified; a specific wiring diagram is not, and this
section prints none from memory.

A sourcing note that changes what the reader can actually
buy, stated plainly rather than buried. The 74HC160 has no
DIP anywhere: Nexperia's Rev. 4 ordering table lists only
the surface-mount 74HC160D, Nexperia's product page marks the
part discontinued, and no TI SN74HC160 or CD74HC160 DIP
datasheet was found for this chapter. The 160 must therefore
not be listed as a bench buy anywhere. Its BCD worked example
in this chapter is paper-only, or it is done with a 390 —
the decade counter the bench actually has. The 161 and 163,
by contrast, are TI bench buys: SN74HC161N and SN74HC163N in
PDIP-16 (TI SCLS297D and SCLS298D, Rev. D), with CD74HC161E
and CD74HC163E as the CD alternatives; Nexperia is SMT-only
for both, and Nexperia marks the 163 discontinued outright.

##### Up/down counters: 74HC191 versus 74HC193

The 191 and 193 share the label "synchronous up/down binary
counter" in some part lists, and that shared label hides every
difference that matters. Both are 4-bit binary (0–15),
synchronous in count, with asynchronous parallel load. Almost
everything else differs, and the two are neither
pin-compatible nor control-compatible. Treat them as
different answers to the question "how do I count both ways?"

The 74HC191 (Nexperia Rev. 5, 13 August 2019; TI SCLS121D,
Rev. D) has one clock and one direction pin. The clock
(CP/CLK) is rising-edge triggered, and a single up/down
control input (U/D, TI: D/U) picks the direction: LOW counts
up, HIGH counts down. A count-enable input CE (TI: CTEN),
active LOW, inhibits counting when HIGH. Two cautions from
the datasheet are worth keeping as bench habits: CE may go
LOW with the clock in either state, but the LOW-to-HIGH CE
transition must occur only while the clock is HIGH, and U/D
should be changed only while CE or CP is HIGH. A direction
change made at the wrong moment is a classic bench bug — a
count in the wrong direction, or a missed count — and it
looks like a faulty chip until you check when you flipped
the pin.

The 191's load is asynchronous, unlike the 160 family's
synchronous load: data on D0–D3 appears on the outputs as
soon as PL/LOAD goes LOW, overriding counting, with no clock
edge needed. And the 191 has no master reset or clear pin at
all — the single easiest factual error to make with this
part. To get to zero, you load 0000. This section describes
no 191 reset pin, because there is not one.

The 191's two cascading outputs serve different purposes. The
MAX/MIN output (TC in Nexperia naming) is normally LOW and
goes HIGH when the counter reaches 15 counting up, or 0
counting down, staying HIGH until a state change, a preset,
or a U/D change. Nexperia warns: "Do not use the TC output
as a clock signal because it is subject to decoding spikes"
— the same ripple-counter warning, appearing here because
MAX/MIN is a decoded output even on a synchronous counter.
The ripple-carry output RCO (RC in Nexperia naming) is active
LOW: when TC is HIGH and CE is LOW, RCO follows the clock
pulse. Cascading feeds RCO to the next stage's CTEN for
parallel clocking, or to its CLK for parallel enabling, and
MAX/MIN enables look-ahead for high-speed cascading. TI's
headline figures for the 191 are a typical tpd of 13 ns,
2–6 V operation, ±4 mA output drive at 5 V, and 80 µA maximum
ICC (SCLS121D).

The 74HC193 (Nexperia data sheet dated 14 March 2024; TI
SCLS122D, Rev. D) answers the same question with two clocks
and no direction pin. It has a count-up clock CPU and a
count-down clock CPD, each rising-edge triggered: to count
up, pulse CPU while CPD is held HIGH; to count down, pulse
CPD while CPU is held HIGH. Direction is chosen by which
wire you pulse, not by a level on a pin — the bench wiring
and the mental model are completely different from the 191.
Only one clock input may be held HIGH at a time for
predictable behaviour; the older text is blunter, warning
that otherwise the circuit "will either count by twos or not
at all".

Where the 191 has no reset, the 193 has an asynchronous
master reset MR, active HIGH, that "will disable the
parallel load gates, override both clock inputs and set all
outputs LOW" — it clears at any time, regardless of the
clocks. Its parallel load PL, active LOW, is asynchronous
like the 191's, and reset overrides load (MR HIGH disables
the load gates). The 193's two terminal-count outputs, TCU
and TCD, are normally HIGH: at maximum count (15), the next
HIGH-to-LOW transition of CPU drives TCU LOW until CPU goes
HIGH again, duplicating the count-up clock waveform, and
symmetrically TCD goes LOW when the counter is at zero and
CPD goes LOW. They "can be used as the clock input signals
to the next higher order circuit in a multistage counter,
since they duplicate the clock waveforms" — but, crucially,
"Multistage counters will not be fully synchronous, since
there is a slight delay time difference added for each stage
that is added" (Nexperia). A cascaded 193 chain is a ripple
chain in disguise at the carry level, unlike a cascaded
161/163 chain whose stages share one clock. That sentence is
the reason this section does not call a cascaded 193 chain
fully synchronous, even though each 193 on its own counts
synchronously.

One more 193 trap belongs on the bench, because it produces
a phantom count that looks like a wiring fault. "If one of
the clock inputs is LOW during and after a reset or load
operation, the next LOW-to-HIGH transition of that clock
will be interpreted as a legitimate signal and will be
counted." After resetting or loading a 193, make sure the
idle clock is HIGH, or the first "count" after the reset
will be one you never asked for. TI's headline figures for
the 193 are a typical tpd of 20 ns and 2–6 V operation
(SCLS122D).

**UNVERIFIED:** exact fmax and maximum propagation-delay
numbers for the Nexperia 191 and 193 in their current
revisions were not cleanly extracted; this section uses the
TI headline tpd figures above (13 ns and 20 ns typical) and
quotes no Nexperia maxima.

At a glance:

| | 74HC191 | 74HC193 |
| --- | --- | --- |
| Direction control | One U/D level pin | Two clock pins (CPU/CPD); pulse the one you want |
| Clock(s) | One, rising edge | Two, rising edge each |
| Count enable | Yes: CE, active LOW | No single enable (the idle clock held HIGH is the inhibit) |
| Master reset | None — load 0000 to zero | Yes: MR, active HIGH, asynchronous, overrides load and clocks |
| Parallel load | Asynchronous, PL active LOW | Asynchronous, PL active LOW |
| Terminal outputs | TC (MAX/MIN, normally LOW, HIGH at 15 up / 0 down) + RCO (active LOW, follows clock when TC and CE active) | TCU + TCD (normally HIGH, pulse LOW duplicating the active clock at 15 up / 0 down) |
| Cascaded chain | Synchronous (parallel clocking via RCO to CTEN) | Not fully synchronous — a delay accumulates per stage |

#### Decade and Johnson counters and decoded outputs: the 74HC4017

The 74HC4017 is a decade counter, and it is also the part most
likely to be misread in this chapter, so its description starts
with what it is not. It is a 5-stage Johnson counter with 10
decoded outputs (Nexperia Rev. 5, 3 February 2016). It is a
decade counter in the sense that it has ten states, 0–9, and
then repeats. It is not a BCD counter: there is no 4-bit
binary-coded output anywhere on the chip. Instead, each state
is presented as one dedicated output pin, and exactly one
output is HIGH at a time, the other nine LOW. A reader who
wires Q0–Q3 to a BCD decoder expecting a binary number will
get nonsense, and that confusion is predictable enough to
warn against in advance.

That one-hot presentation is the 4017's whole appeal. Each
output is HIGH for one clock period out of ten, so each output
is also the clock divided by 10, at a duty cycle of 1/10. An
LED on each output, with its series resistor, walks around
the ring one step per clock — the canonical beginner 4017
circuit, and one that needs no instrument beyond your eyes.
The same idea scales to sequencing: each output can enable
or trigger a different stage of a process in turn, and
combining outputs with diode-ORing makes longer or repeated
patterns (OR-ing Q0–Q4 together, for example, gives a
5-clock-long HIGH pulse per 10-clock cycle). Diode-ORing is
standard bench technique, not something the 4017 datasheet
specifies, so this section presents it as technique, with
its own diode-drop and resistor sizing to be worked out as
design content, not as a datasheet quote.

**UNVERIFIED:** the 4017 datasheet's own per-pin output-current
maximum was not extracted for this chapter, so this section
quotes no per-pin mA figure for the 4017; LEDs need their own
series resistors and anything beyond a couple of LEDs needs a
transistor buffer, as a matter of ordinary HC output practice
rather than a quoted 4017 limit.

Clocking, in Nexperia's naming, uses two clock inputs, CP0
and CP1. The counter advances on either a LOW-to-HIGH
transition at CP0 while CP1 is LOW, or a HIGH-to-LOW
transition at CP1 while CP0 is HIGH. The bench-simplest
arrangement is to tie CP1 LOW and clock CP0 on rising edges.
TI's CD part names the same two pins CP and CE — clock and
clock-enable — and describes counting on the rising clock
while CE is LOW; the pin numbers coincide with the Nexperia
part's CP0/CP1 positions, but the names and the second-clock
description differ, so do not present the TI and Nexperia pin
descriptions as identical text.

Reset is asynchronous, active HIGH, and overriding: "A HIGH
on MR resets the counter to zero (Q0 = Q5-9 = HIGH; Q1 to Q9 =
LOW) independent of the clock inputs (CP0 and CP1)." Read
that reset state carefully, because it surprises first-time
users in the best possible way: reset does not make all
outputs LOW. Q0 is HIGH after reset, because state 0 is
"Q0 on". A reader probing with a multimeter after reset and
finding Q0 HIGH has a working chip, not a fault.

The carry output Q5-9 (pin 12) is active LOW: LOW while the
counter is in states 5, 6, 7, 8 and 9, and HIGH for states
0–4 — a divide-by-10 wave at half duty, offset by half a
cycle. "When cascading counters, the Q5-9 output … can be
used to drive the CP0 input of the next counter" (Nexperia).
TI's CD part calls pin 12 TC (carry) and describes it as
transitioning after output 9 goes LOW, in conjunction with
the clock-enable input to cascade several stages.

**UNVERIFIED:** whether TI's TC waveform is identical to
Nexperia's Q5-9 waveform. The descriptions sound similar but
are not word-identical, so a cascade diagram drawn for one
must be re-checked against the other's datasheet before
publication.

Two more 4017 facts deserve a place before the worked
example. First, the pin order is not sequential on the
package: Q0–Q9 sit on pins 3, 2, 4, 7, 10, 1, 5, 6, 9, 11
respectively. Any wiring diagram must be drawn from the pin
table, not from "Q0 is on pin 3, so Q1 must be pin 4".
Second, the Johnson register corrects itself: "following any
illegal code the counter returns to a proper counting mode
within 11 clock pulses" (Nexperia). A 5-stage Johnson counter
has 32 possible flip-flop states but only 10 legal ones, so
if noise or a mid-sequence reset puts it in an illegal state,
it recovers by itself within 11 clocks — just clock it a
dozen times and watch the LED sequence settle. That is a
genuinely reassuring bench fact for a beginner, and it needs
no instrument to appreciate.

Sourcing for the 4017 is the shakiest in this section, and
this section does not smooth that over.

**UNVERIFIED:** the current ACTIVE status of TI's
CD74HC4017E in PDIP-16 (TI SCHS200D, Rev. D, October 2003,
ordering table) was not confirmed from a TI product page
checked for this chapter — the page extract showed the M, MT and PW
variants as OBSOLETE and did not show the E variant's status.
Nexperia's Rev. 5 ordering table lists the DIP 74HC4017N,
but distributor listings now mark Nexperia DIP variants
obsolete and only a surface-mount variant was shown Active
on a Nexperia product page checked for this chapter, so current
Nexperia DIP production is likewise **UNVERIFIED** and looks
discontinued. The chapter must not promise a
current-manufacturer DIP 4017. The practical advice is to
buy whichever DIP 4017 (Nexperia N or TI E) a distributor
actually has, and to check the pin table of the exact part
bought, because the TI and Nexperia clock and carry naming
differs. A drafting-time status check is required before any
"order this" wording for the 4017.

### Clocks

A sequential circuit needs something to tell it when to move, and
that something is a clock: a square wave that steps the circuit
from one state to the next, once per period. This section gives
you two ways to make one, and the honesty warning that goes with
each. The deep clocks chapter comes later; this is only enough
to run the bench build at the end of this chapter, and to know
what its limits are.

#### The 74HC14 Schmitt-trigger oscillator

One gate of a 74HC14, one resistor, one capacitor, and you have
an oscillator. Wire the gate output through resistor R to a node,
wire capacitor C from that node to ground, and wire the node back
to the gate input. The capacitor voltage bounces between the
gate's two Schmitt thresholds, VT- and VT+, and the gate output
flips each time a threshold is crossed. That is the whole
circuit.

The 74HC14 inverts, but for a clock that does not matter: the
output is a square wave either way. What does matter is that no
datasheet gives a formula or a guaranteed frequency for this
circuit. The frequency below is a DERIVED ESTIMATE, worked out
from the threshold voltages, and you should treat it that way.

The thresholds come from Nexperia's 74HC14 product data sheet,
Rev. 6 (19 September 2012), transfer characteristics at 25 °C.
At 4.5 V, VT+ is 2.38 V typical and VT- is 1.40 V typical. The
capacitor charges toward the HIGH rail and discharges toward
0 V, and the time for an RC charge or discharge between two
levels gives a period of

```text
T = R x C x ln( ((VH - VT-) / (VH - VT+)) x (VT+ / VT-) )
```

Putting in VH = 4.5 V, VT+ = 2.38 V, VT- = 1.40 V gives
ln(2.486) = 0.91, so, as a DERIVED ESTIMATE from typical
thresholds:

```text
f ~ 1.10 / (R x C)
```

At the book's 5 V bench supply the datasheet has no 5 V row, so
the 4.5 V constant is carried over as an approximation.
Interpolating the typical thresholds to 5 V (VT+ ~ 2.63 V,
VT- ~ 1.56 V, DERIVED ESTIMATE) re-runs through the same
formula to ln ~ 0.90, essentially the same constant. Present
f ~ 1.1/(R x C) as the working estimate at 5 V, approximate,
not 1.10 to two significant figures.

Use R between 10 kΩ and 100 kΩ and C between 1 nF and 10 µF.
Below 10 kΩ the charging current starts to sag the gate's
output rails and the formula degrades; above 100 kΩ input
leakage and stray breadboard capacitance start to move the
effective thresholds. Below 1 nF stray capacitance is no
longer negligible against C; above 10 µF electrolytic leakage
and tolerance dominate.

And now the warning, stated plainly: expect the real frequency
to be within roughly a factor of two of the estimate, and trim
it if the value matters. Resistor tolerance moves the
frequency by the same percentage, capacitor tolerance by
±10-20% or more, and individual chips sit somewhere inside
the datasheet's threshold bands, so the constant itself moves.
A trimpot in series with R, adjusted while watching the
output, is how you get the frequency you actually want.
Use a second gate of the same chip as a buffer between the
oscillator node and anything else: hanging a load on the
oscillator gate's output shifts its effective rails and
therefore its frequency.

The 74HC14 oscillator is the right part for tones, blink rates,
and a clock fast enough to watch a counter run. It is the
wrong part for a wall clock. Never use it as a timekeeper.

#### The 555 as an honorary digital part

The 555 is an analogue chip with a digital soul: two
comparators, an SR flip-flop (this chapter's own first topic),
and a discharge transistor, with thresholds fixed by an
internal three-resistor divider at 1/3 and 2/3 of VCC
(TI SLFS022I, Sep 1973, rev. Sep 2014, section 8.3.2). It
belongs in this book because it is the cheapest honest way to
get a slow, visible clock, and because its insides are a
worked example of the chapter's latch and threshold ideas.
It is not a logic family, and its output levels are not
logic levels. That last sentence is the part most books skip,
and this one must not. See the bench build below for what it
means in practice.

In the astable circuit, R1 runs from VCC to DISCH (pin 7),
R2 runs from DISCH to THRES (pin 6), THRES is shorted to
TRIG (pin 2), and the timing capacitor C runs from THRES/TRIG
to ground. RESET (pin 4) is tied to VCC: it is active LOW and
overrides everything, and leaving it floating is a classic
fault. CONT (pin 5) goes to ground through 0.01 µF (10 nF)
for noise immunity (ST Doc ID 2182, Rev. 6, Jan 2012,
typical astable schematic). Pin numbers are the standard
8-pin 555 pinout from TI SLFS022I: 1 GND, 2 TRIG, 3 OUT,
4 RESET, 5 CONT, 6 THRES, 7 DISCH, 8 VCC.

The formulas, identical in TI SLFS022I and ST Doc 2182
Rev. 6, are:

```text
charge time (OUT HIGH):  tHIGH = 0.693 x (R1 + R2) x C
discharge time (OUT LOW): tLOW = 0.693 x R2 x C
period:                  T = 0.693 x (R1 + 2 x R2) x C
frequency:               f = 1.44 / ((R1 + 2 x R2) x C)
HIGH duty:               D = (R1 + R2) / (R1 + 2 x R2)   (always above 50%)
```

Duty is always above 50% because the capacitor charges
through R1 + R2 but discharges through R2 only. For a
counter clock that does not matter, since counters trigger
on one edge, but do not claim a 50% duty cycle from the
classic circuit.

As a worked example, here are DESIGN VALUES for a nominal
1 Hz clock, solved from f = 1.44/((R1 + 2R2) x C):

```text
R1 = 6.8 kΩ,  R2 = 150 kΩ,  C = 4.7 µF
R1 + 2 x R2 = 306.8 kΩ
(R1 + 2 x R2) x C = 1.4420 s
f = 1.44 / 1.4420 = 0.9986 Hz   (DESIGN VALUE, 0.14% below 1 Hz)
T = 1.0014 s
tHIGH = 0.511 s,  tLOW = 0.489 s,  duty (HIGH) = 51.1%
```

Do not present 0.9986 Hz as what you will measure. The
arithmetic accuracy is meaningless next to the timing
capacitor's tolerance: a ±20% electrolytic 4.7 µF moves the
real frequency by ±20%. Build with these values, then trim
(make R2 a 150 kΩ fixed resistor plus a 50 kΩ trimpot in
series) and check by counting blinks against a stopwatch
for 60 seconds: 60 blinks in 60 seconds is 1 Hz within
counting error.

The timekeeping warning, with the arithmetic shown: a 1%
frequency error is 14.4 minutes per day, and a 10% error,
a plausible untrimmed electrolytic error, is ±2.4 hours per
day. So call what you build in this chapter a seconds
counter, not an accurate clock. Its drift is itself a
teaching point, not a defect to hide. This chapter only
needs a clock you can see ticking; accurate timekeeping
is a later chapter's subject, not this one's.

### Switch debouncing done properly

A mechanical switch does not make one clean contact. Its
contacts bounce open and closed for milliseconds, and each
bounce is a fresh edge to anything counting. Chapter 2
established the division of labour that this section repeats:
hysteresis alone does not debounce a switch whose contacts
bounce rail to rail, because each bounce re-crosses both
thresholds. The RC is what removes the bounces, and the
Schmitt gate is what turns the result into one clean edge.
Both parts are needed. A plain gate with no hysteresis would
chatter on the slow ramp; hysteresis with no capacitor would
still bounce rail to rail.

The bench method in this chapter is the RC-into-Schmitt
method, using an ordinary SPST pushbutton, the kind already
in the reader's kit. It replaces the SR-latch option for
manual RESET: the latch needs a changeover switch, and the
reader's pushbutton has only two terminals.

#### The circuit

The author's own debouncer, ported to the book's 5 V bench
as one gate of a 74HC14:

- 5 V through a 10 kΩ pull-up resistor to the switch node.
- The pushbutton from the switch node to ground: pressed,
  the switch node is pulled to ground; released, it is
  pulled up to 5 V.
- A 10 kΩ series resistor from the switch node to the gate
  input node.
- A 0.1 µF capacitor from the gate input node to ground.
- The gate input node into one gate of the 74HC14.

The time constants are DESIGN VALUES from those parts:
the capacitor discharges through the 10 kΩ series resistor
when the button is pressed, a time constant of about 1 ms,
and charges through the pull-up plus the series resistor,
20 kΩ in total, when the button is released, a time
constant of about 2 ms. Those are the time constants of the
circuit, not bounce figures for any particular switch.
No switch-manufacturer bounce datasheet was checked for
this chapter, so no bounce duration in milliseconds is
quoted as a manufacturer number (UNVERIFIED as a cited
number); the counting test below is the arbiter, not a
bounce figure.

#### Why it works

The capacitor voltage moves slowly, through the resistors,
while a bounce gap is brief. During a bounce gap the
capacitor voltage barely moves and never re-crosses a
Schmitt threshold, so the gate output does not re-trip.
The Schmitt gate then snaps the resulting slow ramp into
one clean edge.

The 74HC14 inverts, and here that is exactly what the
bench build wants. Button released: the capacitor charges
up, the gate input is HIGH, and the output is LOW. Button
pressed: the capacitor discharges, the gate input is LOW,
and the output is HIGH. HIGH means pressed. The bench
build's RESET input is active HIGH, so the inverter output
feeds it directly, with no extra gate. (The opposite
polarity, a buffer instead of an inverter, would give
LOW means pressed; it is noted here and not used.)

The delay is real and should be named: the output changes
a few milliseconds after the finger moves, on the order of
the 1-2 ms time constants above. That is imperceptible to
a human pressing a button, and irrelevant for a manual
RESET. It would matter if the button were being used as a
fast clock or a timing input; do not use a debounced button
for either.

#### Checking it, and the heavier option

You cannot see bounce without an oscilloscope, and this
book does not assume one. Check by counting instead, using
the chapter's own counter as the instrument. Before the
debounced output is wired to its destination, feed it
temporarily into a counter clock input and press the button
20 times, slowly and deliberately. The count must advance
by exactly 20. If it advances by 21 or more on any press,
the debounce has failed for that switch: increase the
capacitor and retest. The heavier option for a stubborn
switch is to swap the 0.1 µF capacitor for 1 µF, which
scales both time constants by ten, to about 10 ms
discharge and about 20 ms charge. If the count is still
wrong after that, re-check the wiring before blaming the
switch: a capacitor wired to the wrong node, or a floating
gate input, fails exactly like bad bounce.

## Worked example

You do not need to build this to follow it, and that is the
point: four decade counters, chained the right way, turn a
one-pulse-per-second tick into a one-pulse-per-minute tick
and then a one-pulse-per-hour tick, with nothing but counting.
Start with a 1 Hz clock — one pulse every second. The chain
is divide-by-10, divide-by-6, divide-by-10, divide-by-6, and
each stage's job is one line long.

The trick that makes the chain readable is where the ticks
are taken from. On every 4017 in this chain, the tick passed
to the next stage is the rising edge of Q0 — the moment the
stage returns to state 0 and starts a new cycle. Q0 is HIGH
for exactly one clock period out of ten on a free-running
4017, so its rising edge happens exactly once per cycle:
once per ten input pulses on a divide-by-10 stage, and once
per six input pulses on a divide-by-6 stage. Counting Q0
rising edges is counting completed cycles, and that is what
each stage hands on.

Stage 1 is a plain 4017 dividing by 10. Its input is the
1 Hz clock, one pulse per second. It steps Q0, Q1, Q2, and so
on up to Q9, then wraps back to Q0. The Q0 rising edge at
each wrap is one tick per ten seconds. That is the stage's
whole job: turn seconds into tens of seconds.

Stage 2 is a 4017 wired to divide by 6, and it is the first
place the reset pin earns its keep. Left alone, a 4017 counts
ten states; wired for divide-by-6, its Q6 output is connected
back to its asynchronous MR input. The stage counts Q0, Q1,
Q2, Q3, Q4, Q5 — six states — and the moment the next clock
would raise Q6, MR goes HIGH and resets the chip straight
back to Q0. The Q0 rising edge produced by that reset is the
stage's output tick, and it arrives once per six input ticks.
Six tens of seconds is sixty seconds, so stage 2's tick is
one per minute. That is the minute tick, built from a
divide-by-10 followed by a divide-by-6: 10 × 6 = 60.

Stage 3 is a plain 4017 dividing by 10 again, and its input
is now the minute tick. It counts ten minutes, Q0 through
Q9, and its Q0 rising edge at each wrap is one tick per ten
minutes. Its job is the tens-of-minutes digit of the clock
you are building on paper.

Stage 4 is a second divide-by-6 stage, wired exactly like
stage 2, with Q6 wired to async MR. Its input is the
ten-minute tick, it counts six of them, and its Q0 rising
edge at each reset is one tick per sixty minutes: one per
hour. The full chain is 10 × 6 × 10 × 6 = 3600, and 3600
seconds is one hour, which is a satisfying check that the
four stages multiply to the answer they were meant to give.

Read the chain backwards as a sanity check, because that is
how you will debug any divider chain you build later. The
hour tick must arrive once per 3600 input pulses; the
ten-minute tick once per 600; the minute tick once per 60;
the ten-second tick once per 10. If any stage's tick arrives
at the wrong rate, the fault is in that stage's divide ratio
— a wiring error in its reset connection on a divide-by-6
stage, or a miscounted wrap on a divide-by-10 stage — and
the stages before it can be checked independently, one ratio
at a time.

**UNVERIFIED:** the exact reset-pulse behaviour of the
divide-by-6 wiring — whether the Q6 state that triggers
reset is visible at all, and whether extra gating is needed
to make the reset pulse clean — was not verified against an
application figure for this chapter. The chain above is a
paper design: its divide ratios follow directly from the
4017's counting sequence and its asynchronous reset, but a
bench version needs a tested diagram, not this prose, before
it is presented as a build.

## Bench build: a seconds counter, 00 to 59, on BCD LEDs

Build what this chapter described: a counter that becomes
a clock, proved on eight BCD LEDs and nothing fancier.
Seven-segment displays and decoder drivers get their own
chapter later.

The chain, in one sentence: an NE555 astable at about
4096 Hz, buffered through a spare 74HC14 gate, divided by
a 74HC4040 to 1 Hz, counted by one CD74HC390 as seconds
units and tens, and shown on eight BCD LEDs. Reset-at-60
is one AND gate and one OR gate, plus the debounced
manual RESET from the previous section.

![Seconds counter: NE555 clock, 74HC14 buffer, 74HC4040
divider, 74HC390 counter, eight BCD LEDs](../images/ch07-seconds-counter.svg)

Why this shape, and why not a 555 running directly at 1 Hz?
A direct 1 Hz 555 needs a large electrolytic timing
capacitor, whose tolerance and leakage would dominate the
accuracy, and it gives no intermediate test frequencies.
The divider version costs one extra chip and one trim
step, and in return it teaches division as a concept, it
reuses a chip already met in Chapter 6, and it gives a
ladder of test points: at a correct 4096 Hz input, the
4040's Q8 is 8 Hz, Q9 is 4 Hz, Q10 is 2 Hz, and Q11 is
1 Hz. Each of those can be checked by counting blinks or
with a multimeter frequency range, if the reader's meter
has one. Multimeter frequency capability varies by meter
(UNVERIFIED for any specific meter), so the blink count
is the primary check and the meter is a bonus.

Parts: see [You will need](#you-will-need) above.

### The output-level problem, stated honestly

A bipolar NE555 output is not rail-to-rail: its output
stage drops roughly 1.5-1.7 V below the rail under load
(TI SLFS022I describes the output only as TTL-compatible
and able to sink or source up to 200 mA). Plain 74HC inputs
at 5 V need VIH of about 3.5 V, by interpolation from
Nexperia's 74HC365 Rev. 4 static characteristics (VIH min
3.15 V at 4.5 V, 4.2 V at 6.0 V; the 5 V figure is a
DERIVED ESTIMATE, not a table row). A HIGH somewhere near
3.3 V would be below that requirement, so a bipolar NE555
driving 74HC inputs directly is marginal by specification,
even though it often appears to work on a bench. The exact
NE555 VOH values at 5 V under load were not read directly
from TI SLFS022I's electrical table for this chapter (UNVERIFIED as exact numbers), and they are
not printed here; the qualitative conclusion does not
depend on them.

The fix costs nothing, because the chip is already in the
build: route the 555 output through one spare 74HC14
inverter before the divider. The HC14's output is a full
CMOS swing, about 0 V to about 5 V, comfortably above HC
VIH and below VIL, and its Schmitt input cleans up the
555's edges. Polarity does not matter here: the inverter
flips the square wave, and the 4040 still sees one falling
edge per period. The seconds just start half a cycle later,
which is meaningless for a free-running counter. Never
power the 555 from a higher supply to fix its HIGH level
while the logic runs at 5 V: a higher output would exceed
the HC inputs' absolute maximum.

### Build order

Build in stages, and prove each stage before adding the
next. A fault found at the stage where it was introduced
is a five-minute fix; the same fault found at the end is
a hunt through the whole board.

#### Stage 0: power, clock, divider

1. Power rails first, supply off. Fit one 100 nF
   decoupling capacitor across VCC and ground at every
   IC position, close to the chip, and the 10 µF bulk
   capacitor across the rails near the supply entry.
   One 0.1 µF capacitor per VCC terminal is good
   practice for every IC here.
2. Fit the NE555. Wire RA = 1 kΩ from VCC to DISCH
   (pin 7) and RB = 15 kΩ fixed plus the 10 kΩ trimmer
   in series from DISCH to the timing node. Wire the
   10 nF timing capacitor from the timing node to
   ground, short THRES (pin 6) to TRIG (pin 2) at that
   node, tie RESET (pin 4) to VCC, and wire CONT
   (pin 5) to ground through 10 nF. GND is pin 1,
   OUT is pin 3, VCC is pin 8 (TI SLFS022I).
3. Wire the 555 OUT (pin 3) into one 74HC14 gate, gate 1
   (input pin 1, output pin 2; Nexperia 74HC14 Rev. 6
   pin list: gate inputs 1, 3, 5, 9, 11, 13, outputs
   2, 4, 6, 8, 10, 12, GND pin 7, VCC pin 14). Wire
   that gate's output to the 4040 CP (pin 10).
4. Fit the 74HC4040. Tie MR (pin 11) to ground: it must
   not float, since an undriven MR on a ripple counter
   is a counting fault waiting for noise. Leave unused
   Q outputs unconnected; outputs may float, inputs
   may not. Q11 is pin 1, Q10 is pin 15, Q9 is pin 14,
   Q8 is pin 12, Q0 is pin 9, GND is pin 8, VCC is
   pin 16 (Nexperia 74HC4040 Rev. 8, 16 February 2024).
5. Fit one LED with a 1 kΩ series resistor from 4040
   Q11 to ground, as the divider check LED. It is one
   of the eight BCD LEDs, reused here and moved to the
   counter in Stage 1, or kept if board space allows.

The 555 values are DESIGN VALUES, not measured results.
The target is 4096 Hz into the 4040, so Q11 (divide by
4096) is exactly 1 Hz. From f = 1.44/((RA + 2RB) x C)
with C = 10 nF, the required RA + 2RB is
1.44 / (4096 x 10 nF) = about 35,156 Ω. With RA = 1 kΩ
and the trimmer at 0 Ω, RA + 2RB = 31 kΩ, about
4645 Hz (fast); with the trimmer at mid-travel, 5 kΩ,
RA + 2RB = 41 kΩ, about 3512 Hz (slow). The 4096 Hz
target, RB about 17.1 kΩ and the trimmer about 2.1 kΩ,
sits inside the trim range with margin both ways, so
component tolerance can be trimmed out. Duty at the
target is about 51%, which is irrelevant here, since
the 4040 counts falling edges, one per period
regardless of duty.

What success looks like: with the trimmer roughly
centred, the Q11 LED blinks visibly but not at 1 Hz.
Trim until it blinks once per second against a stopwatch
over 60 seconds: 60 blinks in 60 seconds. Faster
checkpoints: Q10 blinks twice per second, Q9 four times
per second at the limit of comfortable counting, and a
multimeter frequency range, if fitted, reads about
8 Hz on Q8 and about 4 Hz on Q9 when correct. If this
stage is wrong, nothing downstream can be right, so do
not proceed until Q11 blinks at one second.

#### Stage 1: the counter on BCD LEDs

6. Fit the CD74HC390. Its clocks are HIGH-to-LOW
   triggered and its MR inputs are active HIGH and
   asynchronous (Nexperia 74HC390 Rev. 6). Per half,
   the BCD wiring is: clock into CP0, jumper Q0 to
   CP1, outputs Q0 (1), Q1 (2), Q2 (4), Q3 (8).
   Half 1: CP0 pin 1, MR pin 2, Q0 pin 3, CP1 pin 4,
   Q1 pin 5, Q2 pin 6, Q3 pin 7, GND pin 8. Half 2:
   Q3 pin 9, Q2 pin 10, Q1 pin 11, CP1 pin 12, Q0
   pin 13, MR pin 14, CP0 pin 15, VCC pin 16.
7. Wire the units half: clock (CP0, pin 1) from 4040
   Q11 (pin 1), jumper Q0 (pin 3) to CP1 (pin 4).
   Wire the tens half: clock (CP0, pin 15) from units
   Q3 (pin 7), jumper Q0 (pin 13) to CP1 (pin 12).
   Why units Q3 works as the tens clock: in BCD, Q3
   is HIGH for counts 8 and 9 and falls when the
   counter wraps 9 to 0, exactly one falling edge per
   10 counts, and the 390's clocks are HIGH-to-LOW
   triggered, so the tens half advances once per
   10 seconds. No extra carry gate is needed; say why
   it works rather than presenting it as a magic wire.
8. Fit the eight BCD LEDs, each through its own 1 kΩ
   resistor to ground: units Q0-Q3 (pins 3, 5, 6, 7)
   and tens Q0-Q3 (pins 13, 11, 10, 9). Bit-weight
   order matters and must be stated once, plainly:
   Q0 is the 1s bit, Q3 is the 8s bit. Reversing Q0
   and Q3 gives a digit that counts in a scrambled
   order (1, 2, 4, 8 become 8, 4, 2, 1), a classic
   wiring fault. Leave the 390 MR pins (2 and 14)
   unwired for now; Stage 2 connects them. Do not
   leave them floating in the finished build.

What success looks like: the units LEDs step in BCD,
0000, 0001, 0010, up to 1001, then wrap to 0000. Codes
1010 to 1111 must never appear; if they do, the BCD
wiring Q0 to CP1 is wrong or a half is clocked wrong.
The tens LEDs step once per units wrap, one step every
10 seconds. The counter runs at the clock's speed and
no other: if it runs at the wrong speed, the fault is
in the clock or divider (trim, 4040 wiring, MR tied
to ground), not in the 390, which cannot run a bit
fast; it counts its clock. If it does not advance at
all, check that 4040 Q11 is toggling, then the units
CP0 connection.

#### Stage 2: debounced RESET, then reset-at-60

9. Build the debouncer from the previous section on
   the spare 74HC14 gates. Use gate 2 (input pin 3,
   output pin 4). Wire 5 V through the 10 kΩ pull-up
   to the switch node, the pushbutton from the switch
   node to ground, the 10 kΩ series resistor from
   the switch node to the gate input node, and the
   0.1 µF capacitor from the gate input node to
   ground. Pressed, the gate input is LOW and the
   output is HIGH; released, the gate input is HIGH
   and the output is LOW. HIGH means pressed.
10. Test the debouncer by counting, before wiring it
    to the counter's reset. Temporarily disconnect
    the 1 Hz clock from the units CP0 and feed the
    debounced output into units CP0 instead. Press
    the button 20 times, slowly and deliberately:
    the units count must advance by exactly 20, one
    per press-and-release (the output falls on
    release, and the 390 counts falling edges). If
    it advances by 21 or more, swap the 0.1 µF
    capacitor for 1 µF and retest. When the test
    passes, restore the 1 Hz clock to units CP0.
11. Wire reset-at-60. One 74HC08 AND gate takes tens
    Q1 (390 pin 11, the 2s bit) and tens Q2 (390
    pin 10, the 4s bit) as inputs. Tens = 6 in BCD is
    Q2 plus Q1, with Q3 = 0 and Q0 = 0, so the AND
    output is HIGH exactly when the tens half reads 6.
    In principle tens = 7 also has Q1 and Q2 HIGH,
    but the counter can never reach 7, because it is
    reset at 6 first; no extra inhibit gate is needed,
    and the chapter should say so rather than adding
    one silently.
12. One 74HC32 OR gate takes the AND output and the
    debounced RESET as inputs. Its output goes to
    both 390 MR pins, pin 2 and pin 14. The 390's MR
    is active HIGH and asynchronous: a HIGH on MR
    overrides the clocks and sets the four outputs
    LOW (Nexperia Rev. 6). Asserting MR on both
    halves guarantees 00 regardless of state,
    including after a manual RESET mid-count or a
    power-up in an unknown state. Asserting only the
    tens MR would also work in normal running, since
    the units half is necessarily 0 at the moment the
    tens half reaches 6, but that relies on an
    invariant the reader cannot see, and it fails
    after any glitch that breaks the invariant. The
    OR gate costs one gate on a chip already in the
    build; robustness is worth it.
13. Tie every unused input to ground or VCC, never
    floating: the spare 74HC14 gates, the three spare
    AND gates, and the three spare OR gates. An unused
    gate with tied inputs is correct, not wasteful,
    and beginners leaving them floating is the actual
    fault. Unused outputs may float.

What success looks like: the counter counts 00 to 59
in BCD on the LEDs, then returns to 00. Watch the
59 to 00 transition in particular: both halves clear
together. If the display shows 60 even momentarily,
the reset AND/OR wiring is wrong; meter the OR output
and it must pulse HIGH at 60, then fall. The reset
pulse is self-terminating: as soon as the tens half
clears, Q1 and Q2 fall, the AND output falls, and MR
releases, so counting resumes normally from 00.
Pressing RESET at any moment clears both halves to 00
immediately, between clock ticks if necessary, since
the reset is asynchronous; releasing it lets counting
resume from 00 on the next 1 Hz tick.

## Gotchas

**The 4040's Q11 divides by 4096, not 2048.** The 4040
is 12 toggle stages, so stage 11 divides by 2 to the
power 12, which is 4096. A 4096 Hz oscillator therefore
gives exactly 1 Hz at Q11. Binary division gives powers
of two only: the 4040 does not divide by 10 or 60, and
it does not produce a decimal display. The divide-by-10
decades and the divide-by-60 reset are the 390's job.
Any sentence like "the 4040 divides down to seconds"
must be "the 4040 divides 4096 Hz to 1 Hz; the 390
counts the seconds".

**Decoding a ripple counter's outputs: the glitches are
real, but at bench level they are invisible.** Both the
4040 and the 390 are ripple counters: inside the chip,
each stage triggers the next, so the outputs do not all
change at the same instant. Between one settled count
and the next, the outputs pass through intermediate
states that last nanoseconds. Those states are real
logic states, and a combinational decoder watching the
outputs can see them. At this build's speeds, though,
they are far below anything an LED or an eye can show:
a nanosecond-scale intermediate state against a
one-second tick is invisible at bench level, with no
oscilloscope, and the counting checks above are the
right checks. The rule still matters, and it travels
with the reader: never decode a ripple counter's
outputs combinationally without thinking about
intermediate states, and never feed a decoded ripple
output into something that acts on a single edge
without asking what the intermediate states will do
to it. In this build, the reset-at-60 AND output is
used only as a level into the asynchronous reset, and
its self-terminating behaviour is checked by watching
59 go to 00, not by inspecting nanoseconds.

**Ripple delay scales with the job.** The same ripple
delay that was the whole point of Chapter 6's
carry-delay race, where nanoseconds were measurable,
is utterly negligible at 1 Hz: the 4040's Q11 lags its
clock by roughly 100 ns (DERIVED ESTIMATE from the
Nexperia quick-reference stage delays quoted earlier
in this chapter), against a one-second period. The
lesson is scaling: a delay that dominates at megahertz
vanishes at one hertz, and the other way round.

**The 555's edges are not logic levels until buffered.**
Covered above, repeated here because it is the fault
most likely to waste an evening: if the counter counts
erratically or not at all with the 555 wired straight
to the divider, the buffer gate is the missing part,
not a faulty chip.

**Floating inputs, again.** Every unused gate input
tied, every control pin driven: 555 RESET to VCC, 4040
MR to ground, 390 MR pins to the OR output once Stage 2
is wired. A counter that counts on its own, or a reset
that fires on its own, is usually an undriven input
listening to noise.

**One resistor per LED.** The eight BCD LEDs each get
their own 1 kΩ resistor. Sharing a resistor between
LEDs makes brightness depend on how many are lit,
because they would share current.

**If it does not work, bisect by stage.** Stage 0 wrong
means clock or divider: trim, 4040 MR to ground, buffer
gate wired. Stage 1 wrong means counter wiring: BCD
jumper Q0 to CP1 on each half, bit order Q0 = 1 to
Q3 = 8, tens clock from units Q3. Stage 2 wrong means
reset wiring: AND inputs tens Q1 and Q2, OR output to
both MR pins, debouncer output HIGH when pressed. Test
stage by stage with the multimeter: a 390 output is
either near 5 V or near 0 V, and the BCD table says
which it should be at each count.

## Summary

- A latch holds one bit while its enable is active; a flip-flop takes
  the bit on a clock edge. That one distinction runs the whole chapter.
- Setup and hold are bench rules, not fine print: be stable before the
  edge, stay stable just after it, and when vendors disagree, use your
  chip's datasheet, else the worst number.
- Registers hold bytes; shift registers move them one wire at a time.
  The 595's latch is what makes a shifted display readable, and its
  package current limit is what decides how bright its LEDs may be.
- Ripple counters are simple and pay in delay; synchronous counters
  change together and pay in wiring. The 4017 is a Johnson counter
  with decoded outputs, not a BCD counter.
- A seconds counter is a 1 Hz clock, a divide-by-4096, a 390 counting
  00 to 59, and a reset that fires at 60 — and a debounced switch for
  the human in the loop.

## Extensions

- Where the ladder leads next: state machines by hand, then the same
  ideas in an FPGA (Verilog/VHDL) and in a microcontroller — the sequel
  volumes.
- Clocks in depth, and display technology, each get their own chapter
  later in the book.

## References

- Nexperia, 74HC02 product data sheet, Rev. 9 — NOR latch
  function table.
- Nexperia, 74HC00 product data sheet, Rev. 11 — NAND latch
  function table.
- Nexperia, 74HC75 product data sheet, Rev. 6 — latch function
  description; Rev. 4 timing table (15 ns setup, 3 ns hold).
- Nexperia, 74HC74-Q100 product data sheet, Rev. 5 — D
  flip-flop timing, recovery, input transition rate.
- TI, SNx4HC74, Rev. F — device information, SN74HC74N PDIP.
- onsemi, 74HC74/D — both-outputs-HIGH footnote on
  simultaneous preset/clear release.
- Nexperia, 74HC73 product data sheet, Rev. 8 — JK function,
  pinout (VCC pin 4, GND pin 11), timing.
- TI, CD74HC107, Rev. D — JK function, PDIP ordering.
- Nexperia, 74HC109 product data sheet, Rev. 6 — inverted-K
  function table, timing.
- TI, SNx4HC109, Rev. C — function table, SN74HC109N PDIP
  ACTIVE listing.
- TI, SNx4HC112, Rev. I — JK function, timing, SN74HC112N
  PDIP ACTIVE listing.
- onsemi, MC74HC112A — both-outputs-LOW disagreement on
  simultaneous preset/clear.
- Philips, 74HC112 product specification, 1998 — 16 ns
  setup figure.
- TI, SCAA011A (March 1996) and SCZA004A — synchronizer
  notes; two-flop synchronizer greatly reduces metastability.
- Nexperia, 74HC273 and 74HCT273, Octal D-type flip-flop
  with reset; positive-edge trigger, Rev. 7, 6 September
  2021.
- Nexperia, 74HC374 and 74HCT374, Octal D-type flip-flop;
  positive edge-trigger; 3-state, Rev. 4, 2 March 2021.
- Nexperia, 74HC574-Q100 and 74HCT574-Q100, Octal D-type
  flip-flop; positive edge-trigger; 3-state, Rev. 4,
  13 July 2022, with onsemi 74HC574/D, Rev. 1, March 2007,
  as a cross-check for the plain part.
- Nexperia, 74HC164 and 74HCT164, 8-bit serial-in,
  parallel-out shift register, Rev. 11, 28 May 2024.
- Nexperia, 74HC165 and 74HCT165, 8-bit parallel-in/serial
  out shift register, Rev. 5, 21 August 2017.
- Nexperia, 74HC194, 4-bit bidirectional universal shift
  register, Rev. 4, 16 March 2021.
- Nexperia, 74HC595 and 74HCT595, 8-bit serial-in, serial
  or parallel-out shift register with output latches;
  3-state, Rev. 9, 28 February 2017.
- Philips, 74HC/HCT93 product specification, December 1990
  (file IC06) — 74HC93 sections, gated-AND reset, decoding
  spikes warning.
- Nexperia, 74HC390 / 74HCT390 product data sheet, Rev. 6,
  19 March 2024 — BCD and bi-quinary wiring, per-decade
  reset, dynamic figures.
- Nexperia, 74HC4020 / 74HCT4020 product data sheet, Rev. 9,
  27 March 2024 — 14 stages, Q0 and Q3–Q13 pinned out,
  derived ripple accumulation.
- Nexperia, 74HC4040 / 74HCT4040 product data sheet, Rev. 4,
  20 March 2014 — 12 stages, Q0–Q11 pinned out, Q11 =
  divide-by-4096.
- Nexperia, 74HC160 product data sheet, Rev. 4,
  27 March 2019 — decade sequence, asynchronous clear.
- Nexperia, 74HC161 product data sheet, Rev. 4,
  4 October 2018 — binary sequence, asynchronous clear.
- Nexperia, 74HC163 product data sheet, Rev. 4,
  28 December 2015 — binary sequence, synchronous clear.
- TI, SN74HC161, SCLS297D, Rev. D, January 1996, revised
  September 2003 — asynchronous clear wording, PDIP ordering.
- TI, SN74HC163, SCLS298D, Rev. D, January 1996, revised
  October 2003 — synchronous clear wording, PDIP ordering.
- Nexperia, 74HC191 product data sheet, Rev. 5,
  13 August 2019 — one clock, U/D pin, no reset pin,
  asynchronous load.
- TI, SN74HC191, SCLS121D, Rev. D, December 1982, revised
  October 2003 — MAX/MIN and RCO, decoding-spikes warning.
- Nexperia, 74HC193 product data sheet, dated
  14 March 2024 — two clocks, asynchronous MR, TCU/TCD,
  cascaded chain not fully synchronous.
- TI, SN74HC193, SCLS122D, Rev. D, December 1982, revised
  October 2003 — two clocks, MR, terminal outputs.
- Nexperia, 74HC4017 / 74HCT4017 product data sheet, Rev. 5,
  3 February 2016 — Johnson counter, decoded outputs,
  Q0 HIGH after reset, Q5-9 carry, self-correction.
- TI, CD74HC4017, SCHS200D, Rev. D, November 1997, revised
  October 2003 — CD ordering table, CP/CE and TC naming.
- TI, CD74HC93, SCHS138C, August 1997, revised September
  2003; packaging addendum dated 9 November 2025 —
  CD74HC93E PDIP-14 ACTIVE.
- TI, CD74HC390, SCHS185E, Rev. E, September 1997, revised
  April 2022 — CD74HC390E PDIP-16 ACTIVE.
- TI, CD74HC4020, SCHS201C, Rev. C, February 1998, revised
  October 2003 — CD74HC4020E PDIP-16 ordering.
- TI, SN74HC4040, SCLS160D, Rev. D, December 1982, revised
  September 2003 — SN74HC4040N PDIP-16 ordering.
- Nexperia, 74HC14 product data sheet, Rev. 6,
  19 September 2012 — VT+, VT-, hysteresis at 2.0, 4.5
  and 6.0 V; gate pin list; supply 2–6 V.
- TI, SN74HC14, SCLS085L, Rev. L, February 2025 —
  SN74HC14N PDIP listing (bench-sourcing cross-check;
  threshold numbers in this chapter are taken from Nexperia
  Rev. 6, not from Rev. L).
- TI, NE555/SA555/SE555, SLFS022I, Sep 1973, rev.
  Sep 2014 — astable formulas, thresholds about 1/3
  and 2/3 VCC, pinout, TTL-compatible output able to
  sink or source up to 200 mA.
- ST, NE555, Doc ID 2182, Rev. 6, Jan 2012 — same
  astable formulas; 0.01 µF on CONT (pin 5) in the
  typical astable schematic.
- Nexperia, 74HC365, Rev. 4, 27 January 2016 —
  representative plain-74HC input levels, VIH min
  3.15 V at 4.5 V and 4.2 V at 6.0 V, used only for
  the interpolated 5 V VIH estimate of about 3.5 V.
- Nexperia, 74HC4040, Rev. 8, 16 February 2024, and
  TI, SNx4HC4040, SCLS160E, Rev. E, March 2022 —
  HIGH-to-LOW CP, HIGH on MR clears asynchronously,
  SN74HC4040N PDIP listing, Q11 pin 1, CP pin 10,
  MR pin 11.
- TI, SN74HC08N / SN74HC32N — DIP orderables as listed
  in this chapter, following Chapter 5's TI DIP pattern;
  gate-to-pin mappings UNVERIFIED (see You will need).
