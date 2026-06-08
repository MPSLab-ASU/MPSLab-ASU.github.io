---
title: "Reduced bit-width Instruction Set Architecture"
status: "Extended"
description: "Code size is an important constraint for many embedded systems, especially the ones in which the code is burnt on ROMs, which can be the major component on the chip. Dual instruction set, one compo..."
icon: "Binary"
order: 22
image: "/images/research/reduced-bit-width-instruction-set-architecture.png"
---

## Reduced bit-width Instruction Set Architecture

Code size is an important constraint for many embedded systems, especially the ones in which the code is burnt on ROMs, which can be the major component on the chip. Dual instruction set, one composed of full width instructions, and another composed of narrow instructions is a promising approach to reduce code size. Our research efforts are towards developing tools and techniques to compile for such reduced bit-width Instruction Set Architectures.

Programmable RISC processors are increasingly being used to design modern embedded systems. Examples of such systems include consumer electronics items, e.g., cell phones, printers, modems etc. Using RISC processors in such systems offers the advantage of increased design flexibility, high computing power and low on-chip power consumption. However, RISC processor systems suffer from the problem of poor code density which may require more ROM for storing program code. As a large part of the IC area is devoted to the ROM this is a severe limitation for large volume, cost sensitive embedded systems.

reduced bit-width ISA is an architectural feature in which the processor has two instruction set, one is composed of the normal 32-bit wide instructions, while the other has narrow 16-bit wide instructions. If the application can be expressed only in terms of narrow instructions, then 50% code compression can be achieved. Many embedded processors, including ARM-Thumb, MIPS 32/16 bit TinyRISC, ST100 and the ARC Tangent A5. Processors with rISA dynamically translate (or decompress, or expand) the narrow rISA instructions into corresponding normal instructions. This translation usually occurs before or during the decode stage. Typically, each rISA instruction has an equivalent instruction in the normal instruction set. This makes translation simple and can usually be done with minimal performance penalty. As the translation engine converts rISA instructions into normal instructions, no other hardware is needed to execute rISA instructions. Using rISA optimizes the fetch power of the processor also. This is because, fetch-width of the processor being the same, the processor when operating in rISA mode fetches twice as many rISA instructions (as compared to normal instructions) in each fetch operation. Thus while executing rISA instructions, the processor needs to make lesser fetch requests to the instruction memory. This results in a decrease in power and energy consumption by the instruction memory subsystem.
