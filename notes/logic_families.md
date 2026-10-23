# Logic Families

## Digital Logic Semiconductor Families Comparison

| Logic Family | Primary Transistor Type | Relative Power Consumption | Propagation Delay (Speed) | Defining Feature / Status |
| :--- | :--- | :--- | :--- | :--- |
| **TTL** (Transistor-Transistor Logic) | Bipolar (BJT) | Medium-High | Moderate (~10 ns) | Pioneered early computing; highly rugged but obsolete for dense chips. |
| **ECL** (Emitter-Coupled Logic) | Bipolar (BJT - Non-saturating) | Ultra-High | Ultra-Fast (<1 ns) | High heat generation; steered current to achieve maximum speed in early supercomputers. |
| **CMOS** (Complementary MOS) | MOS (NMOS + PMOS pair) | Near-Zero (Static) / Scales with Freq (Dynamic) | Fast to Ultra-Fast | Virtually zero power draw when idle; forms the backbone of all modern microprocessors. |
| **BiCMOS** (Bipolar CMOS) | Hybrid (BJT + MOS) | Medium | Very Fast | Combines CMOS low-power logic with BJT high-current driving capability; used in mixed-signal/RF. |
| **FinFET / GAAFET** | 3D MOS Structure | Low (Highly optimized against leakage) | Sub-nanosecond | The modern extension of CMOS used in nano-scale nodes (3nm/2nm) to prevent quantum leakage. |

## Power Electronics Switching Families Comparison

| Switching Family | Dominant Power Tier | Max Frequency Range | Key Physical Advantage | Main Limitation |
| :--- | :--- | :--- | :--- | :--- |
| **Silicon MOSFET** | Low (< 600 V) | MHz Range | Ultra-fast, cheap | High losses at high voltage |
| **GaN FET** | Medium (< 900 V) | MHz Range | High speed, tiny footprint | Higher cost, fragile gate oxide |
| **SiC MOSFET** | High (650 V – 3.3 kV+) | 100 kHz – 500 kHz | High voltage + high speed | High substrate defect cost |
| **IGBT** | High (600 V – 6.5 kV) | 1 kHz – 50 kHz | Low conduction loss at high power | Current tail limits speed |
| **Thyristor** | Ultra-High (up to 10 kV+) | Line Freq (50/60 Hz) | Ultimate power density | Cannot easily turn off via gate |
