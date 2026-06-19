---
title: "Machine Learning Acceleration"
status: "Extended"
description: "Hardware-software co-design and architectural innovations for efficient, high-performance execution of deep learning models on specialized accelerators and edge devices."
image: "/images/research/machine-learning-acceleration.png"
icon: "Cpu"
order: 1
---

## Vision

As AI models scale toward trillions of parameters, the bottleneck has shifted from raw computation to the complex interplay between data movement and architectural efficiency. We envision a future of Hardware-Software Co-design, where the execution of ML models is optimized through a deep understanding of both high-level parallelism and low-level hardware structures. Our goal is to build an intelligent orchestration layer that treats heterogeneous accelerators and their underlying memory hierarchies – from scratchpads and DMAs to multi-level caches and HBM – as a unified, programmable fabric. By architecting systems that can autonomously exploit every dimension of parallelism, we aim to redefine the performance limits of next-generation AI.

## Key Research Challenges

- **The Multi-Dimensional Parallelism Search Space:** Exploiting a single form of parallelism is no longer enough for modern large-scale models. The challenge lies in the simultaneous orchestration of data, pipeline, and tensor parallelism across a distributed and heterogeneous compute landscape. Scalable optimization frameworks that can discover the "golden" parallelization strategy for a specific model-hardware pair are needed.
- **Architectural Complexity and Memory Hierarchy Management:** Beyond the choice of accelerator lies a dense design space of caches, scratchpad memories, and DMA engines. Traditional execution flows often fail to exploit these low-level resources, leading to data starvation and memory stalls. Hardware-aware compilers that can intelligently manage scratchpad allocation and schedule DMA transfers to hide latency and maximize throughput across multi-level memory hierarchies are needed.
- **Mapping Complexity in Extremely Heterogeneous Systems:** Modern systems integrate a diverse array of compute units (CPUs, NPUs, GPUs, DSPs) and memory types (DDR, LPDDR, HBM, PNM, SSDs). Manually partitioning workloads across such a non-uniform landscape is prohibitively complex. Automated mapping and partitioning engines that can navigate the vast design space of heterogeneous compute and memory to ensure balanced workloads and energy-efficient execution are needed.

## Recent Results

![dMazeRunner](/images/research/mla/dmaze.webp)
DMazeRunner provides a holistic framework for exploring and optimizing the spatiotemporal mapping of complex loop nests onto the computational and memory resources of dataflow accelerators.To address the challenge of mapping complex ML workloads onto specialized hardware, we developed dMazeRunner, a framework designed to explore the vast spatiotemporal execution space of perfectly nested loops (such as convolutions and matrix multiplications) on dataflow accelerators.

To address the challenge of mapping complex ML workloads onto specialized hardware, we developed dMazeRunner, a framework designed to explore the vast spatiotemporal execution space of perfectly nested loops (such as convolutions and matrix multiplications) on dataflow accelerators.

- **Holistic Representation:** dMazeRunner utilizes a novel, holistic representation of loop nests that succinctly captures diverse execution methods, including various tiling, ordering, and parallelization strategies.
- **Accurate Modeling and Pruning:** The framework employs high-fidelity energy and performance models that explicitly account for computation, communication patterns, and data buffering. By implementing aggressive pruning heuristics, dMazeRunner discards invalid or redundant solutions, reducing search times from days to seconds.
- **Quantifiable Impact:** Our experiments demonstrate that dMazeRunner discovers execution methods that are, on average, 9× better in Energy-Delay-Product (EDP) and 5× faster than prior approaches. Even with rapid heuristics, it identifies solutions within 3% of the optimal, enabling both experts and non-experts to maximize hardware utilization and minimize off-chip memory access.
