---
title: "Software Branch Hinting"
status: "Extended"
description: "As power-efficiency becomes the paramount concern in processor design, architectures are coming up that completely do away with hardware branch prediction, and rely solely on software branch hintin..."
icon: "GitBranch"
order: 18
image: "/images/research/software-branch-hinting.png"
---

## Software Branch Hinting

As power-efficiency becomes the paramount concern in processor design, architectures are coming up that completely do away with hardware branch prediction, and rely solely on software branch hinting. A popular example is the Synergistic Processing Unit (SPU) in the IBM Cell processor. To be able to minimize the branch penalty using branch hint instructions, in addition to estimating the branch probabilities, it is important to carefully insert branch hints.

For software branch hinted processors, the application may contain branch hint instructions which indicate that the branch instructions at specified PC addresses will jump to specified target addresses. Just like hardware branch predictors, software branch hinting mechanism also requires a Branch Target Buffer (BTB). When a hint instruction is executed, the BTB entry is first updated, and then target instructions are loaded to the Hint Target Buffer from the specified target address.The hardware usually fetches instructions from Inline Prefetch Buffer which is constantly loaded with the sequential instructions according to PC address. When a branch instruction is fetched, the PC address is compared with the branch address in the BTB entry. If it matches, the instructions are fetched from Hint Target Buffer instead of Inline Prefetch Buffer.

For software branch hinting to work best, there two fundamental considerations: first is to estimate the taken probabilities of branches, and the second is to find the locations in the code for branch hint instructions to minimize branch penalty. Even if we know the taken probabilities of all the branches, minimizing branch penalty by means of branch hint instructions is not trivial. The reasons derive from two constraints of the given architecture. Firstly, for a branch hint to be effective, there must be some separation between a branch and its hint. The hint instruction must be executed several instructions earlier than the branch. Second, only a limited number (one for the Cell SPU) of branch hints can be active at any given time. For example, if two branches are too closely located in the control flow, the second branch cannot have enough separation. To hint the second branch, its hint needs to be placed above the first branch, and this will overwrite the hint for the first branch.Thus, hints may conflict with each other, and reduce the achievable benefits.
