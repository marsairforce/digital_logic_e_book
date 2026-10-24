# Datasheet manifest

Every datasheet this book relies on, with the exact revision its values
were verified against and the official source. See `README.md` in this
folder for how to rebuild a local PDF library from this list.

Local copies are **not** committed to this repo (see `.gitignore`).

Where the official-source column names a document number rather than a
link, search the manufacturer's site for that document number — it finds
the exact datasheet even when URLs change.

## Chapter 1 — transistors

Verified 23 October 2026.

| Part | Manufacturer | Document | Revision checked | Official source | Local filename | Used in |
| --- | --- | --- | --- | --- | --- | --- |
| MMBT3904 | onsemi | MMBT3904L, General Purpose Transistor, NPN Silicon | MMBT3904LT1/D Rev. 15, Sep 2026 | <https://www.onsemi.com/pub/Collateral/MMBT3904LT1-D.pdf> | onsemi-mmbt3904.pdf | Ch. 1 BJT table, worked example |
| MMDT3904 | Diodes Incorporated | MMDT3904, 40 V Dual NPN in SOT363 | DS30088 Rev. 19-2, Aug 2026 | <https://www.diodes.com/datasheet/download/MMDT3904.pdf> | diodes-mmdt3904.pdf | Ch. 1 BJT table |
| MMBT3906 | Diodes Incorporated | MMBT3906, 40 V PNP in SOT23 | DS30059 Rev. 23-2, Oct 2025 | <https://www.diodes.com/datasheet/download/MMBT3906.pdf> | diodes-mmbt3906.pdf | Ch. 1 BJT table |
| DMMT3906 (DMMT3906W) | Diodes Incorporated | DMMT3906W, 40 V Matched Pair PNP in SOT363 | DS30312 Rev. 13-2, Feb 2018 | <https://www.diodes.com/datasheet/download/DMMT3906W.pdf> | diodes-dmmt3906w.pdf | Ch. 1 BJT table |
| BC846BPN | Nexperia | BC846BPN, 65 V, 100 mA NPN/PNP general-purpose transistor | Product data sheet, accessed Oct 2026 (revision to record at next pass) | <https://www.nexperia.com/product/BC846BPN> | nexperia-bc846bpn.pdf | Ch. 1 BJT table |
| BSS123 | onsemi | BSS123, N-Channel Logic Level Enhancement Mode FET | BSS123/D Rev. 10, Nov 2021 | onsemi.com, document BSS123/D | onsemi-bss123.pdf | Ch. 1 MOSFET table |
| 2N7002DW | Diodes Incorporated | 2N7002DW, Dual N-Channel Enhancement Mode FET | DS30120 Rev. 8-2 | diodes.com, document DS30120 | diodes-2n7002dw.pdf | Ch. 1 MOSFET table, worked example |
| BSS84 | onsemi | BSS84LT1/D, MOSFET, Power, Single P-Channel, SOT-23, −50 V | Rev. 11, Jan 2020 | onsemi.com, document BSS84LT1/D | onsemi-bss84.pdf | Ch. 1 MOSFET table |
| BSS84AKS | Nexperia | BSS84AKS, 50 V, 160 mA dual P-channel Trench MOSFET | Rev. 1, 23 May 2011 | nexperia.com, BSS84AKS product page | nexperia-bss84aks.pdf | Ch. 1 MOSFET table |
| NTJD4105C | onsemi | NTJD4105C/D, MOSFET, Small Signal, Complementary, SC-88, 20 V / −8.0 V | Rev. 3, Jan 2025 | onsemi.com, document NTJD4105C/D | onsemi-ntjd4105c.pdf | Ch. 1 MOSFET table |

## Chapter 2 — gates

Verified 23 October 2026.

| Part | Manufacturer | Document | Revision checked | Official source | Local filename | Used in |
| --- | --- | --- | --- | --- | --- | --- |
| 74HC00 / 74HCT00 | Nexperia | 74HC00; 74HCT00 — Quad 2-input NAND gate | Rev. 11, 29 Apr 2025 | <https://www.nexperia.com/products/analog-logic-ics/logic/gates/nand-gates/serie/74hc00-74hct00> | nexperia-74hc00.pdf | Ch. 2 logic levels, noise margins, timing |

## Chapter 3 — logic families

Verified 23–24 October 2026.

| Part | Manufacturer | Document | Revision checked | Official source | Local filename | Used in |
| --- | --- | --- | --- | --- | --- | --- |
| 74LS00 | onsemi | SN74LS00/D, Quad 2-Input NAND Gate | Rev. 7, Oct 2001 | <https://www.onsemi.com/pub/Collateral/SN74LS00-D.PDF> | onsemi-sn74ls00.pdf | Ch. 3 74LS00 table, noise margins, fan-out |
| CD4011B | Texas Instruments | CD4011B, CMOS Quad 2-Input NAND Gate | Product data sheet, accessed Oct 2026 (revision to record at next pass) | <https://www.ti.com/product/CD4011B> | ti-cd4011b.pdf | Ch. 3 4000-series CMOS figures |
| MC10101 | onsemi | MC10101/D, Quad 2-Input OR/NOR Gate (MECL 10K) | Rev. 7, Jan 2002 | onsemi.com, document MC10101/D | onsemi-mc10101.pdf | Ch. 3 ECL 10K figures |
| BSS126 | Infineon | BSS126I, SIPMOS Small-Signal Transistor | Rev. 2.2, 1 Jul 2022 | infineon.com, document BSS126I | infineon-bss126.pdf | Ch. 3 NMOS depletion load |
| NTS4409N | onsemi | NTS4409N/D, MOSFET Single N-Channel Small Signal, ESD Protection | NTS4409N/D | onsemi.com, document NTS4409N/D | onsemi-nts4409n.pdf | Ch. 3 NMOS NOT switch |
| NTJD4401N | onsemi | NTJD4401N/D, Dual N-Channel 20 V MOSFET, SC-88 / SOT-363 | NTJD4401N/D | onsemi.com, document NTJD4401N/D | onsemi-ntjd4401n.pdf | Ch. 3 NMOS NAND switches |

## Later chapters

Entries are added here as each chapter is verified, in the same format:
74xx families (Ch. 4), combinational parts (Ch. 5), sequential parts
(Ch. 6), and the Appendix A 74xx list.
