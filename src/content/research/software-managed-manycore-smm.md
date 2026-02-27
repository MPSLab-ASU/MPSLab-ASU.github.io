---
title: "Software Managed Manycore (SMM)"
status: "Extended"
description: "Multicore with Software Programmable Memory"
icon: "Server"
order: 17
image: "/images/research/software-managed-manycore-smm.png"
---

## Software Managed Manycore (SMM)

Multicore with Software Programmable Memory

Multi-cores provide a way to continue increasing performance, without much increase in the power consumption of the processor. One major challenge in developing multi-core architectures is scaling the memory hierarchy. Maintaining the illusion of a single unified memory in hardware is becoming infeasible. This is because: first, that the power and performance overheads of automatic memory management in hardware (i.e. by caches) is becoming prohibitive, and second, that cache coherency protocols do not scale to hundreds and thousands of cores.

Software Managed Manycore (SMM) architectures are scalable multi-core designs that employ Software Programmable Memory (SPM) in each core — the more power-efficient alternative of caches. The above figure shows an example of SMM architectures. SMM processors can only access code and data that are current on their local SPM. That is to say, the data movement between the close-to-processor memory and the main memory has to be done explicitly in software — typically through the use of Direct Memory Access (DMA) instructions. Our research objective is to develop compiler technology to automatically compile applications for these architectures with memory transfer requests automatically inserted at proper program points and make them usable.
