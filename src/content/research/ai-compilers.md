---
title: "AI-driven Multi-Level Compilers"
status: "Active"
description: "Leveraging machine learning techniques to optimize compiler designs, creating intelligent intermediate representations for emerging and heterogeneous architectures."
image: "/images/research/active/ai-driven-multi-level-compilers.gif"
icon: "BookOpen"
order: 2
---

## Vision

As computing enters a post-Moore’s Law era of extreme hardware heterogeneity, traditional compilers can no longer keep pace with the complexity of specialized architectures. We envision a future where compilers serve as intelligent orchestrators, utilizing Multi-level representations to preserve high-level application semantics that are typically lost during translation. To manage the vast optimization space across these diverse platforms, we aim to build AI-driven engines that autonomously learn and apply the best strategies for each workload.

## Key Research Challenges

- **The Abstraction Gap in Heterogeneous Computing**: Traditional compilers typically "lower" code into generic representations too early, discarding critical high-level application semantics. This loss of intent prevents the compiler from performing global optimizations that are only visible at higher abstraction tiers. New methodologies that maintain multiple levels of IR simultaneously to exploit domain-specific patterns are needed.
- **Decoupling Cost Models from Optimization Heuristics**: In current compilers, the "pass" (the transformation) and the "cost model" (the logic that decides if the transformation is beneficial) are tightly intertwined. This makes it impossible to update the compiler for new hardware without rewriting core logic. A clean separation of concerns where modular AI-cost models can be plugged into generic optimization passes is needed to enable rapid hardware portability.
- **The Phase Ordering and Pass Selection Problem**: The sequence and selection of optimization passes significantly impact performance, yet the "optimal" order varies wildly between different programs. Standard compilers rely on a fixed order that often leads to sub-optimal results or missed opportunities for acceleration. Intelligent, context-aware agents that can dynamically determine the most effective pass sequence and selection for a specific piece of code are needed to make compilation truly adaptive.

## Recent Results

![qml-research](/images/research/aic/dsp-mlir.png)
DSP-MLIR is a multi-level compiler infrastructure that leverages domain-specific abstractions and MLIR-based transformations to automate the mapping and optimization of signal processing applications onto heterogeneous hardware accelerators.

To demonstrate the power of intent-preserving compilation, we developed DSP-MLIR, an open-source framework built on the MLIR ecosystem. This framework ensures that high-level signal processing intent is preserved and optimized from the source code down to the hardware.

- **Closing the Abstraction Gap**: DSP-MLIR introduces a high-level, Python-like DSL and a dedicated DSP Dialect with over 90 operations. This preserves domain-specific intent (such as FFTs, filters, and windowing) deep into the compilation flow, allowing for 16 high-level transformations based on DSP theorems that traditional compilers typically miss.
- **Performance & Productivity**: Our results show that DSP-MLIR can reduce development effort by 4x to 5x compared to standard C, while providing a 12% average speedup on CPUs and DSPs and a 10% reduction in binary size compared to state-of-the-art compilers like GCC and Hexagon-Clang.
- **Unified Optimization**: By integrating with the MLIR framework, our work provides a path toward a unified compilation flow where DSP and ML kernels are co-optimized for modern edge processors, enabling seamless deployment across diverse, high-performance platforms.
