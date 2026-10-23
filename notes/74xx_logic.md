# 74xx Series Logic Family Reference Table

This was created as a convenient list

See also: [List of 7400 series integrated circuits](https://en.wikipedia.org/wiki/List_of_7400-series_integrated_circuits)

> Note some 74xx components in this table never existed or were not a part number.
> Most likely there was a priority to make this Wikipedia table have complete consecutive numbers.

It was not clear to me from looking at the Wikipedia table which parts are still in production, and which ones are obsolete or would be extremely difficult to source.

## List by function

If the part number exists on DigiKey there is a datasheet link here.

I found the master device list that Nexperia currently makes. I tried to get this from Texas Instruments, but their website seems to be a fractured sharded mess and is missing most every part that does not start with "SN".

After editing and adjusting the spreadsheet (that is in this folder too) we now can see nice tables of active devices organized by feature.

> - ignoring the modern weird new low voltage CMOS and specialty things.

> The 74HC4000 are teh 4000 series pinouts rebuilt with 7400-series High-Speed CMOS speed and voltage tolerances.

|                              Category | Part Number                     | Pins | Units | Function                                                                  | Series                                 | Kicad |
| ------------------------------------: | ------------------------------- | ---: | ----: | :------------------------------------------------------------------------ | -------------------------------------- | :---: |
|                          **SWITCHES** |                                 |      |       |                                                                           |                                        |   -   |
|                       Analog switches | <a id="744051">744051</a>       |   16 |       | Single-pole. octal-throw analog switch                                    | [74HC4051](74HC4051.pdf)               |   Y   |
|                       Analog switches | <a id="744052">744052</a>       |   16 |       | Dual single-pole. quad-throw analog switch                                | [74HC4052](74HC4052.pdf)               |   Y   |
|                       Analog switches | <a id="744053">744053</a>       |   16 |       | Triple single-pole. double-throw analog switch                            | [74HC4053](74HC4053.pdf)               |   Y   |
|                       Analog switches | <a id="744066">744066</a>       |   14 |       | Quad single-pole. single-throw analog switch                              | [74HC4066](74HC4066.pdf)               |   Y   |
|                       Analog switches | <a id="744067">744067</a>       |   24 |       | Single-pole. 16-throw analog switch                                       | [74HC4067](74HC4067.pdf)               |   Y   |
|                       Analog switches | <a id="744316">744316</a>       |   16 |       | Quad single-pole. single-throw analog switch with translation             | [74HC4316](74HC4316.pdf)               |   Y   |
|                       Analog switches | <a id="744351">744351</a>       |   20 |       | Single-pole. octal-throw analog switch with latch                         | [74HC4351](74HC4351.pdf)               |   Y   |
|                       Analog switches | <a id="744851">744851</a>       |   16 |       | Single-pole. octal-throw analog switch                                    | [74HC4851](74HC4851.pdf)               |   Y   |
|                       Analog switches | <a id="744852">744852</a>       |   16 |       | Dual single-pole. quad-throw analog switch                                | [74HC4852](74HC4852.pdf)               |   Y   |
|                         **AND GATES** |                                 |      |       |                                                                           |                                        |   -   |
|                             AND Gates | <a id="7408">7408</a>           |   14 |     4 | Quad 2-input AND Gate                                                     | [LS](74LS08.pdf) [HC](74HC08.pdf)      |   Y   |
|                             AND Gates | <a id="7411">7411</a>           |   14 |     3 | Triple 3-input AND Gate                                                   | [LS](74LS11.pdf) [HC](74HC11.pdf)      |   Y   |
|                             AND Gates | <a id="7421">7421</a>           |   14 |     2 | Dual 4-input AND Gate                                                     | [LS](74LS21.pdf) [HC](74HC21.pdf)      |   Y   |
|                        **NAND GATES** |                                 |      |       |                                                                           |                                        |   -   |
|                            NAND Gates | <a id="7400">7400</a>           |   14 |     4 | Quad 2-input NAND Gate                                                    | [LS](74LS00.pdf) [HC](74HC00.pdf)      |   Y   |
|                            NAND Gates | <a id="7410">7410</a>           |   14 |     3 | Triple 3-input NAND Gate                                                  | [LS](74LS10.pdf) [HC](74HC10.pdf)      |   Y   |
|                            NAND Gates | <a id="7420">7420</a>           |   14 |     2 | Dual 4-input NAND Gate                                                    | [LS](74LS20.pdf) [HC](74HC20.pdf)      |   Y   |
|                            NAND Gates | <a id="7430">7430</a>           |   14 |     1 | 8-input NAND Gate                                                         | [LS](74LS30.pdf) [HC](74HC30.pdf)      |   Y   |
|                         **NOT GATES** |                                 |      |       |                                                                           |                                        |   -   |
|                             NOT Gates | <a id="7404">7404</a>           |   14 |     6 | Hex Inverter                                                              | [LS](74LS04.pdf) [HC](74HC04.pdf)      |   Y   |
|                         **NOR GATES** |                                 |      |       |                                                                           |                                        |   -   |
|                             NOR Gates | <a id="7402">7402</a>           |   14 |     4 | Quad 2-input NOR Gate                                                     | [LS](74LS02.pdf) [HC](74HC02.pdf)      |   Y   |
|                             NOR Gates | <a id="7427">7427</a>           |   14 |     3 | Triple 3-input NOR Gate                                                   | [LS](74LS27.pdf) [HC](74HC27.pdf)      |   Y   |
|                          **OR GATES** |                                 |      |       |                                                                           |                                        |   -   |
|                              OR Gates | <a id="7432">7432</a>           |   14 |     4 | Quad 2-input OR Gate                                                      | [LS](74LS32.pdf) [HC](74HC32.pdf)      |   Y   |
|                              OR Gates | <a id="744075">744075</a>       |   14 |     3 | Triple 3-input OR gate                                                    | [HC](74HC4075.pdf)                     |   Y   |
|                         **XOR GATES** |                                 |      |       |                                                                           |                                        |   -   |
|                             XOR Gates | <a id="7486">7486</a>           |   14 |     4 | Quad 2-input XOR Gate                                                     | [LS](74LS86.pdf) [HC](74HC86.pdf)      |   Y   |
| **Open collector output logic gates** |                                 |      |       |                                                                           |                                        |   -   |
|                                   AND | <a id="7409">7409</a>           |   14 |     4 | Quad 2-input AND Gate (Open Collector)                                    | [LS](74LS09.pdf)                       |   Y   |
|                                  NAND | <a id="7403">7403</a>           |   14 |     4 | Quad 2-input NAND Gate (Open Collector)                                   | [LS](74LS03.pdf) [HC](74HC03.pdf)      |   Y   |
|                                  NAND | <a id="7438">7438</a>           |   14 |     4 | Quad 2-input NAND Buffer (Open Collector)                                 | [LS](74LS38.pdf)                       |   Y   |
|                                  NAND | <a id="74133">74133</a>         |   16 |     1 | 13-Input Positive-NAND Gates                                              | [ALS](74ALS133.pdf) [HC](74HC133.pdf)  |   Y   |
|                                   NOR | <a id="7433">7433</a>           |   14 |     4 | Quad 2-input NOR Buffer (Open Collector)                                  | [LS](74LS33.pdf)                       |   Y   |
|                                   NOT | <a id="7405">7405</a>           |   14 |     6 | Hex Inverter (Open Collector)                                             | [LS](74LS05.pdf)    [HC](74HC05.pdf)   |   Y   |
|                                  XNOR | <a id="74266">74266</a>         |   14 |     4 | Quad 2-input XNOR Gate with Open-Collector Outputs                        | [LS](74LS266.pdf)  [HC](74HC266.pdf)   |   Y   |
|  **Logic gatew with Schmitt trigger** |                                 |      |       |                                                                           |                                        |   -   |
|                                  NAND | <a id="74132">74132</a>         |   14 |     4 | Quad 2-input NAND Schmitt Trigger                                         | [LS](74LS132.pdf) [HC](74HC132.pdf)    |   Y   |
|                                   NOT | <a id="7414">7414</a>           |   14 |     6 | Hex Inverter Schmitt Trigger                                              | [LS](74LS14.pdf) [HC](74HC14.pdf)      |   Y   |
|      **Buffers with Schmitt trigger** |                                 |      |       |                                                                           |                                        |   -   |
|                                Buffer | <a id="747014">747014</a>       |   14 |     6 | Hex buffer precision Schmitt-trigger                                      | [HC](74HC7014.pdf)                     |   Y   |
|                                Buffer | <a id="747032">747032</a>       |   14 |     4 | Quad 2-input OR gate Schmitt trigger                                      | [HC](74HC7032.pdf)                     |   Y   |
|                                Buffer | <a id="747540">747540</a>       |   20 |       | Octal inverter/line driver Schmitt-trigger (3-State)                      | [HC](74HC7540.pdf)                     |   Y   |
|                                Buffer | <a id="747541">747541</a>       |   20 |       | Octal buffer/line driver Schmitt-trigger (3-State)                        | [HC](74HC7541.pdf)                     |   Y   |
| **Logic Gates with buffered outputs** |                                 |      |       |                                                                           |                                        |   -   |
|                                  NAND | <a id="7437">7437</a>           |   14 |     4 | Quad 2-input NAND Buffer                                                  | [LS](74LS37.pdf)                       |   Y   |
|                          **Encoders** |                                 |      |       |                                                                           |                                        |   -   |
|                              Encoders | <a id="74147">74147</a>         |   16 |       | 10-Line to 4-Line Priority Encoder                                        | [HC](74HC147.pdf)                      |   Y   |
|                              Encoders | <a id="74148">74148</a>         |   16 |       | 8-Line to 3-Line Priority Encoder                                         | [LS](74LS148.pdf)  [HC](74HC148.pdf)   |   Y   |
|                          **Decoders** |                                 |      |       |                                                                           |                                        |   -   |
|                              Decoders | <a id="7442">7442</a>           |   16 |       | BCD to Decimal Decoder                                                    | [LS](74LS42.pdf) [HC](74HC42.pdf)      |   Y   |
|                              Decoders | <a id="7447">7447</a>           |   16 |       | BCD to 7-Segment Decoder/Driver (Active Low)                              | [LS](74LS47.pdf)                       |   Y   |
|                              Decoders | <a id="74145">74145</a>         |   16 |       | BCD to Decimal Decoder/Driver                                             | [LS](74LS145.pdf)                      |   Y   |
|                              Decoders | <a id="744511">744511</a>       |   16 |       | BCD to 7-segment latch/decoder/driver with lamp test input                | [HC](74HC4511.pdf)                     |   Y   |
|                      **Multiplexers** |                                 |      |       |                                                                           |                                        |   -   |
|                          Multiplexers | <a id="74151">74151</a>         |   16 |       | 8-to-1 Line Data Selector/Multiplexer                                     | [LS](74LS151.pdf) [HC](74HC151.pdf)    |   Y   |
|                          Multiplexers | <a id="74153">74153</a>         |   16 |     2 | Dual 4-to-1 Line Data Selector/Multiplexer                                | [LS](74LS153.pdf) [HC](74HC153.pdf)    |   Y   |
|                          Multiplexers | <a id="74157">74157</a>         |   16 |     4 | Quad 2-to-1 Line Data Selector/Multiplexer                                | [LS](74LS157.pdf) [HC](74HC157.pdf)    |   Y   |
|                          Multiplexers | <a id="74251">74251</a>         |   16 |       | Data Selectors/Multiplexers With 3-State Outputs                          | [LS](74LS251.pdf) [HC](74HC251.pdf)    |   Y   |
|                          Multiplexers | <a id="74253">74253</a>         |   16 |     2 | Dual 4-Line To 1-Line Data Selectors/Multiplexers 3-State Outputs         | [LS](74LS253.pdf) [HC](74HC253.pdf)    |   Y   |
|                          Multiplexers | <a id="74257">74257</a>         |   16 |     4 | Quadruple 2-Line to 1-Line Multiplexers Non-Inverting 3-State Outputs     | [LS](74LS257.pdf) [HC](74HC257.pdf)    |   Y   |
|                          Multiplexers | <a id="74258">74258</a>         |   16 |     4 | Quadruple 2-Line to 1-Line Multiplexers Inverting 3-State Outputs         | [LS](74LS258.pdf) [HC](74HC258.pdf)    |   Y   |
|                          Multiplexers | <a id="74298">74298</a>         |   16 |     4 | Quad 2-Input Multiplexer with Storage Latch                               | [LS](74LS298.pdf)                      |   Y   |
|                    **Demultiplexers** |                                 |      |       |                                                                           |                                        |   -   |
|                        Demultiplexers | <a id="74137">74137</a>         |   16 |       | 3-to-8 Line Decoder/Demultiplexer With Address Latches                    | [ALS](74ALS137.pdf)  [HC](74HC137.pdf) |   Y   |
|                        Demultiplexers | <a id="74138">74138</a>         |   16 |       | 3-to-8 Line Decoder/Demultiplexer           LS74](74LS74.pdf)             | [74HC74](74HC74.pdf)                   |   Y   |
|                        Demultiplexers | <a id="74139">74139</a>         |   16 |     2 | Dual 2-to-4 Line Decoder/Demultiplexer                                    | [LS](74LS139.pdf)    [HC](74HC139.pdf) |   Y   |
|                        Demultiplexers | <a id="74154">74154</a>         |   24 |       | 4-to-16 Line Decoder/Demultiplexer                                        | [HC](74HC154.pdf)                      |   Y   |
|                        Demultiplexers | <a id="74236">74237</a>         |   16 |       | 3-to-8 decoder/demultiplexer with address latches                         | [HC](74HC237.pdf)                      |   Y   |
|                        Demultiplexers | <a id="74238">74238</a>         |   16 |       | 3-to-8 Line Decoder/Demultiplexer                                         | [HC](74HC238.pdf)                      |   Y   |
|                        Demultiplexers | <a id="74514">74514</a>         |   24 |       | 4-to-16 decoder/demultiplexer with address latches                        | [HC](74HC4514.pdf)                     |   Y   |
|            **Buffers / Line Drivers** |                                 |      |       |                                                                           |                                        |   -   |
|                Buffers / Line Drivers | <a id="74125">74125</a>         |   14 |     4 | Quad Bus Buffer Gate (3-State Outputs)                                    | [LS](74LS125.pdf) [HC](74HC125.pdf)    |   Y   |
|                Buffers / Line Drivers | <a id="74126">74126</a>         |   14 |     4 | Quad Bus Buffer Gate (3-State Outputs)                                    | [LS](74LS126.pdf)  [HC](74HC126.pdf)   |   Y   |
|                Buffers / Line Drivers | <a id="74241">74241</a>         |   20 |       | Octal Buffer/Line Driver (Non-Inverting 3-State)                          | [LS](74LS241.pdf)  [HC](74HC241.pdf)   |   Y   |
|                Buffers / Line Drivers | <a id="74243">74243</a>         |   20 |       | Quadruple Bus Tranceivers                                                 | [LS](74LS243.pdf)  [HC](74HC243.pdf)   |   Y   |
|                Buffers / Line Drivers | <a id="74244">74244</a>         |   20 |       | Octal Buffer/Line Driver (Non-Inverting 3-State)                          | [LS](74LS244.pdf)  [HC](74HC244.pdf)   |   Y   |
|                Buffers / Line Drivers | <a id="74245">74245</a>         |   20 |       | Octal Bidirectional Transceiver (3-State)                                 | [LS](74LS245.pdf)  [HC](74HC245.pdf)   |   Y   |
|                Buffers / Line Drivers | <a id="74365">74365</a>         |   16 |     6 | Hex Buffers And Line Drivers (3-State)                                    | [LS](74LS365.pdf)  [HC](74HC365.pdf)   |   Y   |
|                Buffers / Line Drivers | <a id="74367">74367</a>         |   16 |     6 | Hex Buffers And Line Drivers (3-State)                                    | [LS](74LS367.pdf)  [HC](74HC367.pdf)   |   Y   |
|                Buffers / Line Drivers | <a id="74540">74540</a>         |   20 |       | Octal Buffers/Line Drivers with 3-State Outputs                           | [LS](74LS540.pdf)  [HC](74HC540.pdf)   |   Y   |
|                Buffers / Line Drivers | <a id="74541">74541</a>         |   20 |       | Octal Buffers/Line Drivers with 3-State Outputs                           | [LS](74LS541.pdf)  [HC](74HC541.pdf)   |   Y   |
|  **Inverting Buffers / Line Drivers** |                                 |      |       |                                                                           |                                        |   -   |
|      Inverting Buffers / Line Drivers | <a id="74240">74240</a>         |   20 |       | Octal Buffer/Line Driver (Inverting 3-State)                              | [LS](74LS240.pdf) [HC](74HC240.pdf)    |   Y   |
|      Inverting Buffers / Line Drivers | <a id="74366">74366</a>         |   16 |       | Hex inverter/line driver (3-state)                                        | [HC](74HC366.pdf)                      |   Y   |
|      Inverting Buffers / Line Drivers | <a id="74368">74368</a>         |   16 |       | Hex inverter/line driver (3-state)                                        | [LS](74LS368.pdf) [HC](74HC368.pdf)    |   Y   |
|                           **Latches** |                                 |      |       |                                                                           |                                        |   -   |
|                               Latches | <a id="7475">7475</a>           |   16 |       | 4-Bit Bistable Latch                                                      | [LS](74LS75.pdf)   [HC](74HC75.pdf)    |   Y   |
|                               Latches | <a id="74259">74259</a>         |   16 |       | 8-Bit Addressable Latches                                                 | [LS](74LS259.pdf)  [HC](74HC259.pdf)   |   Y   |
|                               Latches | <a id="74279">74279</a>         |   16 |     4 | Quadruple SR Latch                                                        | [LS](74LS279.pdf)                      |   Y   |
|                               Latches | <a id="74373">74373</a>         |   20 |       | Octal D-Type Transparent Latch (3-State)                                  | [LS](74LS373.pdf)  [HC](74HC373.pdf)   |   Y   |
|                               Latches | <a id="74573">74573</a>         |   20 |       | Octal D-Type Transparent Latch (3-State)                                  | [HC](74HC573.pdf)                      |   Y   |
|                 **D Type Flip-FLops** |                                 |      |       |                                                                           |                                        |   -   |
|                     D Type Flip-Flops | <a id="7474">7474</a>           |   14 |     2 | Dual D-Type Positive-Edge-Triggered Flip-Flop                             | [LS](74LS74.pdf)  [HC](74HC74.pdf)     |   Y   |
|                     D Type Flip-Flops | <a id="74173">74173</a>         |   16 |     4 | Quad D-Type Flip-Flop with Clear (3-state)                                | [LS](74LS173.pdf) [HC](74HC173.pdf)    |   Y   |
|                     D Type Flip-Flops | <a id="74174">74174</a>         |   16 |     6 | Hex D-Type Flip-Flop with Clear                                           | [LS](74LS174.pdf) [HC](74HC174.pdf)    |   Y   |
|                     D Type Flip-Flops | <a id="74175">74175</a>         |   16 |     4 | Quad D-Type Flip-Flop with Clear                                          | [LS](74LS175.pdf) [HC](74HC175.pdf)    |   Y   |
|                     D Type Flip-Flops | <a id="74273">74273</a>         |   20 |       | Octal D-Type Flip-Flop with Clear                                         | [LS](74LS273.pdf) [HC](74HC273.pdf)    |   Y   |
|                     D Type Flip-Flops | <a id="74374">74374</a>         |   20 |       | Octal D-Type Edge-Triggered Flip-Flop (3-State)                           | [LS](74LS374.pdf) [HC](74HC374.pdf)    |   Y   |
|                     D Type Flip-Flops | <a id="74377">74377</a>         |   20 |       | Octal D-Type Flip-Flop With Data Enable                                   | [LS](74LS377.pdf) [HC](74HC377.pdf)    |   Y   |
|                     D Type Flip-Flops | <a id="74574">74574</a>         |   20 |       | Octal D-Type Edge-Triggered Flip-Flop (3-State)                           | [HC](74HC574.pdf)                      |   Y   |
|                     D Type Flip-Flops | <a id="7416374">7416374</a>     |   48 |       | 16-bit D-type flip-flop; positive-edge trigger (3-state)                  | [LVC](74LVC16374A.pdf)                 |   Y   |
|                    **J-K Flip-Flops** |                                 |      |       |                                                                           |                                        |   -   |
|                        J-K Flip-Flops | <a id="7473">7473</a>           |   14 |     2 | Dual JK Flip-Flop with Clear                                              | [LS](74LS73.pdf)   [HC](74HC73.pdf)    |   Y   |
|                        J-K Flip-Flops | <a id="7476">7476</a>           |   16 |     2 | Dual JK Flip-Flop with Preset and Clear                                   | [LS](74LS76.pdf)                       |   Y   |
|                        J-K Flip-Flops | <a id="74107">74107</a>         |   14 |     2 | Dual J-K flip-flop with reset; negative-edge trigger                      | [LS](74LS107.pdf)  [HC](74HC107.pdf)   |   Y   |
|                        J-K Flip-Flops | <a id="74109">74109</a>         |   16 |     2 | Dual J-/K flip-flop with set and reset; positive-edge trigger             | [LS](74LS109.pdf)  [HC](74HC109.pdf)   |   Y   |
|                        J-K Flip-Flops | <a id="74112">74112</a>         |   16 |     2 | Dual J-K flip-flop with set and reset; negative-edge trigger              | [LS](74LS112.pdf)  [HC](74HC112.pdf)   |   Y   |
|               **BCD/Decade Counters** |                                 |      |       |                                                                           |                                        |   -   |
|                   BCD/Decade Counters | <a id="74390">74390</a>         |   16 |     2 | Dual Decade Ripple Counter                                                | [LS](74LS390.pdf) [HC](74HC390.pdf)    |   Y   |
|                   BCD/Decade Counters | <a id="744017">744017</a>       |   16 |       | Johnson decade counter with 10 decoded outputs                            | [HC](74HC4017.pdf)                     |   Y   |
|                   **Binary Counters** |                                 |      |       |                                                                           |                                        |   -   |
|                       Binary Counters | <a id="7490">7490</a>           |   14 |       | BCD Counter                                                               | [LS](74LS90.pdf)                       |   Y   |
|                       Binary Counters | <a id="7492">7492</a>           |   14 |       | 4-Bit Divide-by-12 Counter                                                | [LS](74LS92.pdf)                       |   Y   |
|                       Binary Counters | <a id="7493">7493</a>           |   14 |       | 4-Bit Binary Counter                                                      | [LS](74LS93.pdf) [HC](74HC93.pdf)      |   Y   |
|                       Binary Counters | <a id="74160">74160</a>         |   16 |       | 4-Bit Synchronous BCD Counter (Direct Clear)                              | [HC](74HC160.pdf)                      |   Y   |
|                       Binary Counters | <a id="74161">74161</a>         |   16 |       | 4-Bit Synchronous Binary Counter (Direct Clear)                           | [LS](74LS161.pdf) [HC](74HC161.pdf)    |   Y   |
|                       Binary Counters | <a id="74163">74163</a>         |   16 |       | 4-Bit Synchronous Binary Counter (Synchronous Clear)                      | [LS](74LS163.pdf) [HC](74HC163.pdf)    |   Y   |
|                       Binary Counters | <a id="74190">74190</a>         |   16 |       | Presettable Synchronous 4-Bit BCD Up/Down Counter                         | [HC](74HC190.pdf)                      |   Y   |
|                       Binary Counters | <a id="74191">74191</a>         |   16 |       | Synchronous Up/Down Binary Counter                                        | [LS](74LS191.pdf) [HC](74HC191.pdf)    |   Y   |
|                       Binary Counters | <a id="74192">74192</a>         |   16 |       | Synchronous Up/Down BCD Counter                                           | [HC](74HC192.pdf)                      |   Y   |
|                       Binary Counters | <a id="74193">74193</a>         |   16 |       | Synchronous Up/Down Binary Counter                                        | [LS](74LS193.pdf) [HC](74HC193.pdf)    |   Y   |
|                       Binary Counters | <a id="74393">74393</a>         |   14 |     2 | Dual4-Bit Binary Counter with Invividual Clocks                           | [LS](74LS393.pdf) [HC](74HC393.pdf)    |   Y   |
|                       Binary Counters | <a id="74590">74590</a>         |   16 |       | 8-bit binary counter with output register (3-state)                       | [LS](74LS590.pdf) [HC](74HC590.pdf)    |   Y   |
|                       Binary Counters | <a id="74HC4020">74HC4020</a>   |   16 |       | 14-stage binary ripple counter                                            | [HC](74HC4020.pdf)                     |   Y   |
|                       Binary Counters | <a id="74HC40240">74HC4024</a>  |   14 |       | 7-stage binary ripple counter                                             | [HC](74HC4024.pdf)                     |   Y   |
|                       Binary Counters | <a id="74HC4040">74HC4040</a>   |   16 |       | 12-Bit Asynchronous Binary Counters                                       | [HC](74HC4040.pdf)                     |   Y   |
|                       Binary Counters | <a id="74HC40103">74HC40103</a> |   16 |       | 8-bit synchronous binary down counter                                     | [HC](74HC40103.pdf)                    |   Y   |
|                   **Shift Registers** |                                 |      |       |                                                                           |                                        |   -   |
|                       Shift Registers | <a id="74164">74164</a>         |   14 |       | 8-Bit Parallel-Out Serial Shift Register                                  | [LS](74LS164.pdf)  [HC](74HC164.pdf)   |   Y   |
|                       Shift Registers | <a id="74165">74165</a>         |   16 |       | 8-Bit Parallel-In / Serial-Out Shift Register                             | [LS](74LS165.pdf)  [HC](74HC165.pdf)   |   Y   |
|                       Shift Registers | <a id="74166">74166</a>         |   16 |       | 8-Bit Parallel-In / Serial-Out Shift Register                             | [LS](74LS166.pdf)  [HC](74HC166.pdf)   |   Y   |
|                       Shift Registers | <a id="74194">74194</a>         |   16 |       | 4-Bit Bidirectional Universal Shift Register                              | [LS](74LS194.pdf)  [HC](74HC194.pdf)   |   Y   |
|                       Shift Registers | <a id="74195">74195</a>         |   16 |       | 4-Bit Parallel-Access Shift Register                                      | [HC](74HC195.pdf)                      |   Y   |
|                       Shift Registers | <a id="74299">74299</a>         |   20 |       | 8-Bit Universal Shift Register; Three-State                               | [LS](74LS299.pdf)  [HC](74HC299.pdf)   |   Y   |
|                       Shift Registers | <a id="74589">74589</a>         |   20 |       | 8-Bit Serial or Parallel-Input/Serial-Output Shift Register (3-State)     | [HC](74HC589.pdf)                      |   Y   |
|                       Shift Registers | <a id="74594">74594</a>         |   16 |       | 8-Bit Serial-In/Parallel-Out Shift Register with Output Latches           | [LS](74LS594.pdf)  [HC](74HC594.pdf)   |   Y   |
|                       Shift Registers | <a id="74595">74595</a>         |   16 |       | 8-Bit Serial-In/Parallel-Out Shift Register with Output Latches (3-State) | [LS](74LS595.pdf)  [HC](74HC595.pdf)   |   Y   |
|                       Shift Registers | <a id="74597">74597</a>         |   16 |       | 8-Bit parallel-out shift register, parallel input storage register        | [LS](74LS597.pdf)  [HC](74HC597.pdf)   |   Y   |
|                       Shift Registers | <a id="74598">74598</a>         |   20 |       | 8-Bit parallel-out shift register, parallel input storage register        | [LS](74LS598.pdf)                      |   Y   |
|                       Shift Registers | <a id="744094">744094</a>       |   16 |       | 8-bit serial-in/ shift register with output register (3-state)            | [HC](74HC4094.pdf)                     |   Y   |
|                    **Multivibrators** |                                 |      |       |                                                                           |                                        |   -   |
|                        Multivibrators | <a id="74121">74121</a>         |   14 |       | Monostable Multivibrator                                                  | [LS](74LS121.pdf)                      |   Y   |
|                        Multivibrators | <a id="74122">74122</a>         |   14 |       | Monostable Multivibrator with Clear                                       | [LS](74LS122.pdf)                      |   Y   |
|                        Multivibrators | <a id="74123">74123</a>         |   16 |     2 | Dual Monostable Multivibrator with reset                                  | [LS](74LS123.pdf) [HC](74HC123.pdf)    |   Y   |
|                        Multivibrators | <a id="74221">74221</a>         |   16 |     2 | Dual non-retriggerable monostable multivibrator with reset (Schmitt)      | [LS](74LS221.pdf) [HC](74HC221.pdf)    |   Y   |
|                        Multivibrators | <a id="74423">74423</a>         |   16 |     2 | Dual retriggerable monostable multivibrator with reset                    | [LS](74LS423.pdf) [HC](74HC423.pdf)    |   Y   |
|                        Multivibrators | <a id="744538">744538</a>       |   16 |     2 | Dual retriggerable precision monostable multivibrator (EOL)               | [HC](74HC4538.pdf)                     |   Y   |
|               **Digital Comparators** |                                 |      |       |                                                                           |                                        |   -   |
|                   Digital Comparators | <a id="7485">7485</a>           |   16 |       | 4-Bit Magnitude Comparator                                                | [LS](74LS85.pdf)  [HC](74HC85.pdf)     |   Y   |
|                   Digital Comparators | <a id="74688">74688</a>         |   20 |       | 8-bit magnitude comparator                                                | [HC](74HC688.pdf)                      |   Y   |
|                   **Special Purpose** |                                 |      |       |                                                                           |                                        |   -   |
|                       Special Purpose | <a id="7431">7431</a>           |   16 |     6 | Hex Delay Element / Delay Line Generator                                  | [LS](74LS31.pdf)                       |   Y   |
|                       Special Purpose | <a id="74173">74173</a>         |   16 |       | 4-Bit D-Type Register (3-State)                                           | [HC](74HC173.pdf)                      |   Y   |
|                       Special Purpose | <a id="74280">74280</a>         |   14 |       | 9-bit odd/even parity generator/checker                                   | [HC](74HC280.pdf)                      |   Y   |
|                       Special Purpose | <a id="74283">74283</a>         |   16 |       | 4-Bit Binary Full Adders With Fast Carry                                  | [LS](74LS283.pdf) [HC](74HC283.pdf)    |   Y   |
|                       Special Purpose | <a id="744046">744046</a>       |   16 |       | Phase-locked-loop with VCO                                                | [HC](74HC4046.pdf)                     |   Y   |

### Other

This is the table I distilled from the Nexperia catalog. Most of this stuff can likely be put into the other categories here, I just have not got around to it yet.

| Category                       |                  Part Number | Pins | Function                                                                                     |
| ------------------------------ | ---------------------------: | ---: | :------------------------------------------------------------------------------------------- |
| Level shifters/translators     |     [74HC4049](74HC4049.pdf) |   16 | Hex inverter with 15V tolerant inputs                                                        |
| Level shifters/translators     |     [74HC4050](74HC4050.pdf) |   16 | Hex buffer with 15V tolerant inputs                                                          |
| Level shifters/translators     |     [74HC9112](74HC9112.pdf) |    8 | Single supply clock fan-out buffer                                                           |
| Multiplexer/demultiplexer      |     [74HC3253](74HC3253.pdf) |   16 | Dual 4:1 mux/demux                                                                           |
| Multiplexer/demultiplexer      |     [74HC3257](74HC3257.pdf) |   16 | Quad 2:1 mux/demux                                                                           |

### Obsolete

These parts are no longer in production, or exist but are hard to find in stock on DigiKey,
and then if they are in stock they are priced unbelievably high.

I started off keeping this list because there were parts I had in stock from long ago and I wanted to keep their datasheets, but not have them in the active list so I can think about not using them. I then was trying to currate this list for informational completeness, it turns out what is obsolete is complicated and depends on logic family too. I don't have a good way to articulate that stuff here.

|                          |                          Part Number | Pins | Units | Function                                                           |
| -----------------------: | -----------------------------------: | ---: | ----: | :----------------------------------------------------------------- |
|               NAND Gates |    <a id="7401">[7401](7401.pdf)</a> |   14 |     4 | Quad 2-input NAND Gate (Open Collector)                            |
|                NOT Gates |    <a id="7406">[7406](7406.pdf)</a> |   14 |     6 | Hex Inverter (Open Collector)                                      |
| Bufferers / Line Drivers |    <a id="7407">[7407](7407.pdf)</a> |   14 |     6 | Hex Buffer/Driver (30V Open Collector)                             |
|                          |    <a id="7412">[7412](7412.pdf)</a> |   14 |     3 | Triple 3-input NAND Gate (Open Collector)                          |
|                          |    <a id="7413">[7413](7413.pdf)</a> |   14 |     2 | Dual 4-input NAND Schmitt Trigger                                  |
|                          |    <a id="7415">[7415](7415.pdf)</a> |   14 |     3 | Triple 3-input AND Gate (Open Collector)                           |
|                          |    <a id="7416">[7416](7416.pdf)</a> |   14 |     6 | Hex Inverter Buffer/Driver (15V Open Collector)                    |
|                          |    <a id="7417">[7417](7417.pdf)</a> |   14 |     6 | Hex Buffer/Driver (15V Open Collector)                             |
|                          |    <a id="7418">[7418](7418.pdf)</a> |   14 |     2 | Dual 4-input NAND Schmitt Trigger                                  |
|                          |    <a id="7419">[7419](7419.pdf)</a> |   14 |     2 | Hex Inverter Schmitt Trigger                                       |
|                          |    <a id="7422">[7422](7422.pdf)</a> |   14 |     2 | Dual 4-input NAND Gate (Open Collector)                            |
|                          |    <a id="7423">[7423](7423.pdf)</a> |   16 |     2 | Dual 4-input NOR Gate With Strobe                                  |
|                          |    <a id="7424">[7424](7424.pdf)</a> |   14 |     2 | Quad 2-input NAND Gate Schmitt Trigger                             |
|                          |    <a id="7425">[7425](7425.pdf)</a> |   14 |     2 | Dual 4-input NOR Gate With Strobe                                  |
|                          |    <a id="7426">[7426](7426.pdf)</a> |   14 |     4 | Quad 2-input NAND Gate (15V Open Collector)                        |
|                          |    <a id="7428">[7428](7428.pdf)</a> |   14 |     4 | Quad 2-input NOR Buffer                                            |
|                          |    <a id="7435">[7435](7435.pdf)</a> |   14 |     4 | Hex Non-Inverting Buffer (Open Collector)                          |
|                          |    <a id="7440">[7440](7440.pdf)</a> |   14 |     2 | Dual 4-input NAND Buffer                                           |
|                          |    <a id="7441">[7441](7441.pdf)</a> |   14 |     2 | BCD-To-Decimal Decoder/Driver for Nixie Tubes                      |
|                          |    <a id="7445">[7445](7445.pdf)</a> |   16 |       | BCD to Decimal Decoder/Driver                                      |
|                          |    <a id="7446">[7446](7446.pdf)</a> |   16 |       | BCD to 7-Segment Decoder/Driver (Open Collector)                   |
|                          |    <a id="7448">[7448](7448.pdf)</a> |   16 |       | BCD to 7-Segment Decoder/Driver (Active High)                      |
|                          |    <a id="7449">[7449](7449.pdf)</a> |   16 |       | BCD to 7-Segment Decoder/Driver (Active High) (Open Collector)     |
|                          |    <a id="7450">[7450](7450.pdf)</a> |   14 |     2 | Dual 2-wide 2-input AND-OR-INVERT Gate                             |
|                          |    <a id="7451">[7451](7451.pdf)</a> |   14 |     2 | Dual 2-wide 2-input AND-OR-INVERT Gate                             |
|                          |    <a id="7454">[7454](7454.pdf)</a> |   14 |       | 4-wide 2-input AND-OR-INVERT Gate                                  |
|                          |    <a id="7455">[7455](7455.pdf)</a> |   14 |       | 4-wide 2-input AND-OR-INVERT Gate                                  |
|                          |    <a id="7456">[7456](7456.pdf)</a> |    8 |       | Frequency Divider                                                  |
|                          |    <a id="7457">[7457](7457.pdf)</a> |    8 |       | Frequency Divider                                                  |
|                          |    <a id="7470">[7470](7470.pdf)</a> |   14 |       | AND-Gated JK Positive-Edge-Triggered Flip-Flop                     |
|                          |    <a id="7472">[7472](7472.pdf)</a> |   14 |       | AND-Gated JK Master-Slave Flip-Flop                                |
|                          |    <a id="7477">[7477](7477.pdf)</a> |   16 |       | 4-Bit D Latch                                                      |
|                          |    <a id="7483">[7483](7483.pdf)</a> |   16 |       | 4-Bit Binary Full Adder                                            |
|                          |    <a id="7489">[7489](7489.pdf)</a> |      |       | 64-Bit RAM (16x4)                                                  |
|                          | <a id="74128">[74128](74128.pdf)</a> |   14 |       | Line Drivers                                                       |
|                          | <a id="74141">[74141](74141.pdf)</a> |   16 |       | BCD to Decimal Decoder/Driver (Nixie Driver)                       |
|                          | <a id="74150">[74150](74150.pdf)</a> |   24 |       | 16-to-1 Line Data Selector/Multiplexer                             |
|          Special Purpose | <a id="74181">[74181](74181.pdf)</a> |   24 |       | 4-Bit Arithmetic Logic Unit and Function Generator                 |
|                          | <a id="74260">[74260](74260.pdf)</a> |   16 |     2 | Dual 5 input NOR Gates                                             |
|                          | <a id="74323">[74323](74323.pdf)</a> |   20 |       | Universal Shift/Storage Registers With Synchronous Clear (3-State) |

## Families

🪨 74S (Schottky): Released in the early 1970s. It used Schottky transistors to stop saturation and boost speeds, making it much faster than the original 7400 series. However, it is a power hog, drawing massive amounts of current. It is entirely obsolete today.

🐢 74LS (Low-power Schottky): The absolute king of the 1980s. It sacrificed some of the speed of the S family to massively reduce power consumption. While millions of legacy devices still use it, it is sl                       |                        |ow and weak compared to modern CMOS.

🐢 74ALS was the absolute evolutionary pinnacle of the original bipolar transistor family before CMOS took over the world

⚡ 74F (Fast): Introduced by Fairchild in the late 1970s/1980s as the ultimate performance evolution of bipolar TTL. It offered high speeds and excellent output drive capabilities but still consumed a large amount of power.

🏎️ 74VHC (Very High-Speed CMOS): Introduced by Fairchild (now onsemi) and expanded by Toshiba in the early 1990s as the ultimate upgrade to standard 74HC. It completely re-engineered the internal CMOS transistors to achieve the blazing speeds of the bipolar 74F (Fast) family while keeping the near-zero standby power consumption of CMOS.

- The Secret Feature: Unlike older CMOS, it completely removed the internal clamping diodes on the inputs. This gave it "over-voltage tolerance," allowing it to act as an incredibly cheap, bulletproof 5V-to-3.3V down-converter.

> FairChild and Toshiba championed 74VHC. Sometimes devices are called 74AHC. Texas Instruments and Nexpera.

🔀 74VHCT (Very High-Speed CMOS, TTL-compatible): Developed alongside VHC to act as the ultimate "bridge" chip for mixed-voltage systems. It keeps the exact same blazing speed and silicon structure as VHC, but modifies the input chemistry to use a fixed TTL threshold.

- The Single Purpose: It was engineered explicitly to solve the problem where 3.3V signals are too weak to drive a standard 5V CMOS chip. By dropping the high-input requirement down to a strict 2.0V, it became the gold standard for shifting 3.3V signals up to 5V rails reliably.

| Family | Era    | Technology    | Speed          | Power Consumption | Voltage Range | Best Used For Today                             |
| ------ | ------ | ------------- | -------------- | ----------------- | ------------- | ----------------------------------------------- |
| 74S    | 1970s  | Bipolar       | Fast           | ❌ Extremely High | 5V Only       | 🏛️ Antique/Retro restoration only.              |
| 74LS   | 1980s  | Bipolar       | Slow           | ⚠️ Medium         | 5V Only       | 🏛️ Maintaining legacy 1980s hardware.           |
| 74ALS  | 1980s  | Bipolar       | Faster than LS | Lower than LS     | 5V Only       | 🏛️ Maintaining legacy 1980s hardware.           |
| 74F    | 1980s  | Bipolar       | Very Fast      | ❌ High           | 5V Only       | ❌ Completely obsolete.                         |
| 74HC   | 1980s  | Standard CMOS | Medium         | ✅ Ultra-Low      | 2.0V – 6.0V   | 🟢 Pure 5V Arduino bench stock.                 |
| 74VHC  | 1990s+ | Advanced CMOS | Very Fast      | ✅ Ultra-Low      | 2.0V – 5.5V   | 👑 Modern bench stock; 5V → 3.3V down-shifting. |
| 74VHCT | 1990s+ | Advanced CMOS | Very Fast      | ✅ Ultra-Low      | 4.5V – 5.5V   | 👑 3.3V → 5V up-shifting                        |

## Bridging 5v and 3.3v considerations

| Supply (Vcc) | Input Logic | 74HC | 74VHC | 74VHCT (TTL Inputs) |
|------------- |-------------|------|-------|---------------------|
| 5V | 5V |  ✅ Perfect <br> • Native design | ✅ Perfect <br> • Native design | ✅ Perfect <br> • Native design |
| 5V | 3.3V | ⚠️ Unreliable<br>• Min Vh is 3.5V<br>• 3.3V is too low | ⚠️ Unreliable<br>• Min Vh is 3.5V<br>• 3.3V is too low |  ✅ Perfect<br>• Min Vh is 2.0V<br>• Excellent 3.3V → 5V up-shifter |
| 3.3V | 5V |  ❌ Dangerous• 5V inputs forward-bias the ESD protection diodes• Will damage the chip without current-limiting resistors | ✅ Perfect<br>• Inputs tolerate 5V safely<br>• Excellent 5V → 3.3V down-shifter |  ❌ Invalid<br>• Supply voltage is too low<br>• Out of datasheet spec (4.5V min) |
| 3.3V | 3.3V |  ✅ Perfect<br>• Fully specified down to 2.0V | ✅ Perfect<br>• Fully specified down to 2.0V | ❌ Invalid• Supply voltage too low• Out of datasheet spec (4.5V min) |

For I2C busses,

- use a level shifter. BSS138 - I made these before.!!

For SPI busses,

- 74VHCT1G125SE-7 (or similar suffix): A single-gate, 5V-powered TTL buffer to up-shift one SPI line (like SCLK or MOSI) from 3.3V to 5V.
- 74VHC1G125SE-7: A single-gate, 3.3V-powered buffer to down-shift the MISO line from 5V to 3.3V.
