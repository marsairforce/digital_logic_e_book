# Digital Logic Recipe Book

This document houses the schematic configurations, physics, and layout notes for the foundational logic gates across six distinct semiconductor eras.

Use the interactive index matrix below to jump directly to the specific technology recipe and layout notes.

---

## 🗺️ Master Logic Family Index Matrix

| Gate Type | RTL (1960s) | DTL (Mid-1960s) | TTL (1970s) | ECL (High-Speed) | NMOS (Depletion-Load) | CMOS (Complementary) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **NOT** | [View RTL NOT](#rtl-not-gate) | [View DTL NOT](#dtl-not-gate) | [View TTL NOT](#ttl-not-gate) | [View ECL NOT](#ecl-not-gate) | [View NMOS NOT](#nmos-not-gate) | [View CMOS NOT](#cmos-not-gate) |
| **NAND** | [View RTL NAND](#rtl-nand-gate) | [View DTL NAND](#dtl-nand-gate) | [View TTL NAND](#ttl-nand-gate) | [View ECL NAND](#ecl-nand-gate) | [View NMOS NAND](#nmos-nand-gate) | [View CMOS NAND](#cmos-nand-gate) |
| **NOR** | [View RTL NOR](#rtl-nor-gate) | [View DTL NOR](#dtl-nor-gate) | [View TTL NOR](#ttl-nor-gate) | [View ECL NOR](#ecl-nor-gate) | [View NMOS NOR](#nmos-nor-gate) | [View CMOS NOR](#cmos-nor-gate) |
| **AND** | [View RTL AND](#rtl-and-gate) | [View DTL AND](#dtl-and-gate) | [View TTL AND](#ttl-and-gate) | [View ECL AND](#ecl-and-gate) | [View NMOS AND](#nmos-and-gate) | [View CMOS AND](#cmos-and-gate) |
| **OR** | [View RTL OR](#rtl-or-gate) | [View DTL OR](#dtl-or-gate) | [View TTL OR](#ttl-or-gate) | [View ECL OR](#ecl-or-gate) | [View NMOS OR](#nmos-or-gate) | [View CMOS OR](#cmos-or-gate) |
| **XOR** | [View RTL XOR](#rtl-xor-gate) | [View DTL XOR](#dtl-xor-gate) | [View TTL XOR](#ttl-xor-gate) | [View ECL XOR](#ecl-xor-gate) | [View NMOS XOR](#nmos-xor-gate) | [View CMOS XOR](#cmos-xor-gate) |

---

## ⚡ 1. Resistor-Transistor Logic (RTL) Recipes

### RTL NOT Gate

- **Theory:** The original digital logic gate. A passive pull-up resistor sets the default state to HIGH. A bipolar junction transistor (BJT) pulls the output down to Ground when the base is driven.
- **ASCII Layout:**

```text
          VCC
           │
          [R_pullup]
           │
           ├────────── OUTPUT
         ┌─┴─┐
  IN ────┤NPN│
         └─┬─┘
          GND
```

- **KiCad Screenshot Placeholder:**
  `![RTL NOT Schematic](placeholders/rtl_not.png)`

### RTL NAND Gate

- **Theory:** Formed by placing NPN transistors in a vertical series stack below a passive resistor. Both transistors must turn on to complete the path to Ground. Suffer from high \(V_{OL}\) offsets due to stacked \(V_{CE(sat)}\) limits.
- **ASCII Layout:**

```text
          VCC
           │
          [R_pullup]
           │
           ├────────── OUTPUT
         ┌─┴─┐
  IN A ──┤NPN│
         └─┬─┘
         ┌─┴─┐
  IN B ──┤NPN│
         └─┬─┘
          GND
```

- **KiCad Screenshot Placeholder:**
  `![RTL NAND Schematic](placeholders/rtl_nand.png)`

### RTL NOR Gate

- **Theory:** The most robust gate in the RTL era. BJTs are placed in parallel side-by-side. If *either* input goes HIGH, the output node drops forcefully to Ground. This architecture was the backbone of the Apollo Guidance Computer.
- **ASCII Layout:**

```text
            VCC
             │
            [R_pullup]
             │
             ├─────────────── OUTPUT
       ┌─────┴─────┐
     ┌─┴─┐       ┌─┴─┐
  A ─┤NPN│     B ─┤NPN│
     └─┬─┘       └─┬─┘
       └─────┬─────┘
            GND
```

- **KiCad Screenshot Placeholder:**
  `![RTL NOR Schematic](placeholders/rtl_nor.png)`

### RTL AND Gate

- **Theory:** Built by combining an RTL NAND gate followed directly by an RTL NOT gate inverter stage.
- **KiCad Screenshot Placeholder:** `![RTL AND](placeholders/rtl_and.png)`

### RTL OR Gate

- **Theory:** Built by taking an RTL NOR gate and feeding the combined output through a standard RTL NOT inverter to flip the phase.
- **KiCad Screenshot Placeholder:** `![RTL OR](placeholders/rtl_or.png)`

### RTL XOR Gate

- **Theory:** Implemented by arranging four independent RTL NOR gates in a cross-coupled distribution network to compute conditional inequality.
- **KiCad Screenshot Placeholder:** `![RTL XOR](placeholders/rtl_xor.png)`

---

## 📥 2. Diode-Transistor Logic (DTL) Recipes

### DTL NOT Gate

- **Theory:** Replaces input base resistors with dedicated input isolation steering diodes. A level-shifting diode ensures the output BJT does not false-trigger from noise on the input wire.
- **ASCII Layout:**

```text
        VCC      VCC
         │        │
        [R1]     [R2]
         │        │
  IN ───┤├─┬───┤├─┼────────── OUTPUT
        D_in   D_shift ┌─┴─┐
                   └───┤NPN│
                       └─┬─┘
                        GND
```

- **KiCad Screenshot Placeholder:**
  `![DTL NOT Schematic](placeholders/dtl_not.png)`

### DTL NAND Gate

- **Theory:** The native logical configuration for DTL. Adding parallel input diodes creates an inherent active AND array at the base node. If any diode is pulled low by an external signal, it steals base current from the output transistor.
- **ASCII Layout:**

```text
        VCC            VCC
         │              │
        [R1]           [R2]
         │              │
  A ───┤├─┬──────────┤├─┼────────── OUTPUT
  B ───┤├─┘D_inputs D_shift ┌─┴─┐
                        └───┤NPN│
                            └─┬─┘
                             GND
```

- **KiCad Screenshot Placeholder:**
  `![DTL NAND Schematic](placeholders/dtl_nand.png)`

### DTL NOR Gate

- **Theory:** Formed by placing separate DTL NOT transistor switching blocks in parallel configurations sharing a single load resistor.
- **KiCad Screenshot Placeholder:** `![DTL NOR](placeholders/dtl_nor.png)`

### DTL AND Gate

- **Theory:** A native DTL NAND topology cascaded into a dedicated single DTL inverter stage to fix phase mapping.
- **KiCad Screenshot Placeholder:** `![DTL AND](placeholders/dtl_and.png)`

### DTL OR Gate

- **Theory:** Constructed by running inputs through independent diode logic routing strings into a common DTL inverter driver base.
- **KiCad Screenshot Placeholder:** `![DTL OR](placeholders/dtl_or.png)`

### DTL XOR Gate

- **Theory:** Structured using a matrix of cross-wired DTL NAND cells to drive high-contrast switching logic.
- **KiCad Screenshot Placeholder:** `![DTL XOR](placeholders/dtl_xor.png)`

---

## 🏛️ 3. Transistor-Transistor Logic (TTL) Recipes

### TTL NOT Gate

- **Theory:** The definitive 74-series classic. Replaces input diodes with a multi-emitter BJT configuration. Features a "totem-pole" active output push-pull driver stage that speeds up edge transitions dramatically compared to passive resistors.
- **ASCII Layout:**

```text
              VCC             VCC
               │               │
              [R1]            [R2]
               │               │
            ┌──┴──┐         ┌──┴──┐
            │ Multi ── Phase │NPN  │ (Top Totem)
  IN ───────┤ Emit│   Split ┼──┤├─┼─────── OUTPUT
            └─────┘   BJT   │  D  │
                            └──┬──┘
                            ┌──┴──┐
                            │NPN  │ (Bottom Switch)
                            └──┬──┘
                              GND
```

- **KiCad Screenshot Placeholder:**
  `![TTL NOT Schematic](placeholders/ttl_not.png)`

### TTL NAND Gate

- **Theory:** The native baseline of 7400 IC technology. Multiple independent input emitters are etched on a single input transistor die. Grounding any input emitter pulls base charge away from the internal phase-splitter.
- **ASCII Layout:**

```text
              VCC
               │
              [R1]
               │
  IN A ─────┐┌─┴──┐
  IN B ─────┼┤Multi  (Phase Splitter and Totem Output downstream)
            ││Emit│
            └─────┘
```

- **KiCad Screenshot Placeholder:**
  `![TTL NAND Schematic](placeholders/ttl_nand.png)`

### TTL NOR Gate

- **Theory:** Formed by placing separate input transistors in parallel layout patterns feeding a shared phase-splitter configuration.
- **KiCad Screenshot Placeholder:** `![TTL NOR](placeholders/ttl_nor.png)`

### TTL AND Gate

- **Theory:** A multi-emitter TTL NAND circuit routed internally into a fast non-inverting totem output buffer node.
- **KiCad Screenshot Placeholder:** `![TTL AND](placeholders/ttl_and.png)`

### TTL OR Gate

- **Theory:** A multi-stage layout where parallel input networks trigger an internal inverting totem tree.
- **KiCad Screenshot Placeholder:** `![TTL OR](placeholders/ttl_or.png)`

### TTL XOR Gate

- **Theory:** The structural schematic mapping of the classic 74HC86, tracking individual signals over differential internal junctions.
- **KiCad Screenshot Placeholder:** `![TTL XOR](placeholders/ttl_xor.png)`

---

## 🚀 4. Emitter-Coupled Logic (ECL) Recipes

### ECL NOT Gate

- **Theory:** The absolute fastest silicon logic family. BJTs are kept permanently out of saturation to completely eliminate storage delay bottlenecks. Operates on a highly stable **Differential Current Steering Pair** matched against an exact internal reference voltage (\(V_{ref}\)).
- **ASCII Layout:**

```text
                VCC (0V Ground)
                 ├───┬───┐
                [R1][R2][R3]
                 │   │   │
        ┌────────┴┐  │   └───── OUTPUT (Complement)
      ┌─┴─┐     ┌─┴─┐│
  IN ─┤NPN│     │NPN├┼───────── OUTPUT (True)
      └─┬─┘     └─┬─┘│V_ref
        └────┬────┘  │
            [R_tail]─┘
             │
            VEE (-5.2V Power Rail)
```

- **KiCad Screenshot Placeholder:**
  `![ECL NOT Schematic](placeholders/ecl_not.png)`

### ECL NAND Gate

- **Theory:** Achieved by wiring parallel differential pairs over inverted current steering trees to implement high-speed differential evaluation.
- **KiCad Screenshot Placeholder:** `![ECL NAND](placeholders/ecl_nand.png)`

### ECL NOR Gate

- **Theory:** The native core gate for ECL. Parallel transistors share a single common collector load resistor. If any input rises, current steers away from the reference leg, slamming the primary output low while providing simultaneous complementary outputs.
- **KiCad Screenshot Placeholder:** `![ECL NOR](placeholders/ecl_nor.png)`

### ECL AND Gate

- **Theory:** Easily available from the exact same differential current tree as a NAND gate by simply tapping the opposite side of the structural reference pair.
- **KiCad Screenshot Placeholder:** `![ECL AND](placeholders/ecl_and.png)`

### ECL OR Gate

- **Theory:** Tapped directly from the non-inverting node collector lines of an ECL NOR steering block, requiring zero extra inverter stages!
- **KiCad Screenshot Placeholder:** `![ECL OR](placeholders/ecl_or.png)`

### ECL XOR Gate

- **Theory:** Built by cross-coupling stacked current steering differential switches, steering currents at sub-nanosecond tracking speeds.
- **KiCad Screenshot Placeholder:** `![ECL XOR](placeholders/ecl_xor.png)`

---

## ⚙️ 5. Depletion-Load NMOS Recipes

### NMOS NOT Gate

- **Theory:** **Your custom sandbox configuration.** An active depletion-mode FET (BSS126) with its Gate tied to its Source acts as a self-biased, constant-current smart pull-up load. An enhancement-mode switch (NTS4409N) forces a sharp pull-down.
- **ASCII Layout:**

```text
               VDD (+3.3V)
                    │
              ┌─────┴─────┐
              │  BSS126   │  <-- Active Load
              └─────┬─────┘
                    ├───[ 1.0 kΩ ]───┐
                    │                ├─── OUTPUT
                    └────────────────┤
                               ┌─────┴─────┐
                     INPUT ────┤ NTS4409N  │ <-- Active Switch
                               └─────┬─────┘
                                    GND
```

- **KiCad Screenshot Placeholder:**
  `![NMOS NOT Schematic](placeholders/nmos_not.png)`

### NMOS NAND Gate

- **Theory:** **Your core universal CPU block.** Built by placing two or more enhancement-mode switches vertically in series beneath a single common BSS126 constant-current load. Eliminates complex CMOS layout configurations on PCBs.
- **ASCII Layout:**

```text
               VDD (+3.3V)
                    │
              ┌─────┴─────┐
              │  BSS126   │  <-- Active Load
              └─────┬─────┘
                    ├───[ 1.0 kΩ ]───┐
                    │                ├─── OUTPUT
                    └────────────────┤
                               ┌─────┴─────┐
                     INPUT A ──┤NTJD4401N_1│ <-- Top Switch
                               └─────┬─────┘
                               ┌─────┴─────┐
                     INPUT B ──┤NTJD4401N_2│ <-- Bottom Switch
                               └─────┬─────┘
                                    GND
```

- **KiCad Screenshot Placeholder:**
  `![NMOS NAND Schematic](placeholders/nmos_nand.png)`

### NMOS NOR Gate

- **Theory:** Formed by putting enhancement switches in parallel configurations below a shared BSS126 active load block.
- **ASCII Layout:**

```text
                 VDD (+3.3V)
                      │
                ┌─────┴─────┐
                │  BSS126   │  <-- Active Load
                └─────┬─────┘
                      ├───[ 1.0 kΩ ]───┐
                      │                ├─── OUTPUT
                      └────────────────┤
                 ┌────┴────┐
               ┌─┴─┐     ┌─┴─┐
     INPUT A ──┤FET│     │FET├── INPUT B
               └─┬─┘     └─┬─┘
                 └────┬────┘
                     GND
```

- **KiCad Screenshot Placeholder:**
  `![NMOS NOR Schematic](placeholders/nmos_nor.png)`

### NMOS AND Gate

- **Theory:** Constructed by cascading a standard NMOS NAND series stack directly into a dedicated NMOS NOT gate inverter block.
- **KiCad Screenshot Placeholder:** `![NMOS AND](placeholders/nmos_and.png)`

### NMOS OR Gate

- **Theory:** Formed by routing parallel input switches (NOR setup) straight into an NMOS NOT gate inverter block to adjust phase.
- **KiCad Screenshot Placeholder:** `![NMOS OR](placeholders/nmos_or.png)`

### NMOS XOR Gate

- **Theory:** Implemented via pass-transistor logic trees or an arrangement of four interconnected NMOS NAND cell daughterboards.
- **KiCad Screenshot Placeholder:** `![NMOS XOR](placeholders/nmos_xor.png)`

---

## 💎 6. Complementary MOS (CMOS) Recipes

### CMOS NOT Gate

- **Theory:** Zero static power dissipation. Employs a complementary pair of active switches: a P-channel MOSFET connected to VDD and an N-channel MOSFET connected to Ground. One is always open-circuit while the other is closed.
- **ASCII Layout:**

```text
          VDD (+3.3V)
           │
         ┌─┴─┐
  IN ──┬─┤P-CH   (PMOS)
       │ └─┬─┘
       │   ├────────── OUTPUT
       │ ┌─┴─┐
       └─┤N-CH   (NMOS)
         └─┬─┘
          GND
```

- **KiCad Screenshot Placeholder:**
  `![CMOS NOT Schematic](placeholders/cmos_not.png)`

### CMOS NAND Gate

- **Theory:** Built by placing N-channel switching elements in series paths leading down to Ground, while placing matching P-channel switching elements in parallel networks reaching up to the VDD rail.
- **ASCII Layout:**

```text
                 VDD (+3.3V)
           ┌──────┴──────┐
         ┌─┴─┐         ┌─┴─┐
  A ──┬──┤P-CH         │P-CH├───┐
      │  └─┬─┘         └─┬─┘    │
  B ──┼────┼─────────────┘      │
      │    └──────┬─────────────┴── OUTPUT
      │         ┌─┴─┐
      └─────────┤N-CH (A)
                └─┬─┘
                ┌─┴─┐
                │N-CH (B)
                └─┬─┘
                 GND
```

- **KiCad Screenshot Placeholder:**
  `![CMOS NAND Schematic](placeholders/cmos_nand.png)`

### CMOS NOR Gate

- **Theory:** The exact topological flip of a NAND gate. P-channel transistors are stacked in series reaching up to VDD, while N-channel transistors are arrayed in parallel networks leading down to Ground.
- **ASCII Layout:**

```text
                 VDD (+3.3V)
                      │
                    ┌─┴─┐
             A ─────┤P-CH
                    └─┬─┘
                    ┌─┴─┐
             B ─────┤P-CH
                    └─┬─┘
                      ├───────────── OUTPUT
                ┌─────┴─────┐
              ┌─┴─┐       ┌─┴─┐
       A ─────┤N-CH       │N-CH├──── B
              └─┬─┘       └─┬─┘
                └─────┬───┘
                     GND
```

- **KiCad Screenshot Placeholder:**
  `![CMOS NOR Schematic](placeholders/cmos_nor.png)`

### CMOS AND Gate

- **Theory:** Constructed by routing a complementary CMOS NAND cell directly into a standard CMOS inverter stage.
- **KiCad Screenshot Placeholder:** `![CMOS AND](placeholders/cmos_and.png)`

### CMOS OR Gate

- **Theory:** Formed by cascading a basic CMOS NOR cell straight into a standard CMOS inverter stage.
- **KiCad Screenshot Placeholder:** `![CMOS OR](placeholders/cmos_or.png)`

### CMOS XOR Gate

- **Theory:** Incredibly elegant in CMOS. Built using active **Transmission Gates (TG)** that pass raw input voltages directly across to the output under switching control, dropping overall transistor layout counts drastically.
- **KiCad Screenshot Placeholder:** `![CMOS XOR](placeholders/cmos_xor.png)`
