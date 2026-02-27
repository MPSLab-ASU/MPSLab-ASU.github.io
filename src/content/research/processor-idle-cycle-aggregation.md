---
title: "Processor Idle Cycle Aggregation"
status: "Extended"
description: "During execution, a processor is typically stalled for a significant amount of time doing nothing, but waiting for data from memory. However, these stall durations are typically small. Our research..."
icon: "Battery"
order: 25
image: "/images/research/processor-idle-cycle-aggregation.png"
---

## Processor Idle Cycle Aggregation

During execution, a processor is typically stalled for a significant amount of time doing nothing, but waiting for data from memory. However, these stall durations are typically small. Our research in this area is to aggregate these small but several stall cycles to create a larger stall, during which the processor can be switched to a lower-power mode.

Figure on the right plots the lengths of processor stalls over the execution of the qsort application from the MiBench benchmark suite running on the Intel XScale processor. Very small stalls (few cycles) represent processor stalls due to pipeline hazards, but a lot of stalls are approximately 30 cycles in length. This reflects the fact that the memory latency of the Intel XScale is about 30 cycles. An important observation from this graph is that although the processor is stalled for a considerable time (approximately 30% of the total program execution time) the length of each processor stall is small. The average length of a processor stall is 4 cycles, but none of them is greater than 100 cycles.

A processor stall, theoretically is an opportunity for optimization. System throughput and energy can be improved by temporarily switching to a different thread of execution, or the energy consumption of the system may be reduced by switching the processor to a low power state. Next figure shows the power state machine of the Intel XScale processor. In the default mode of operation, the XScale is in RUN state, consuming 450mW. XScale has three low power states: IDLE, DROWSY, and SLEEP. In the IDLE state the clock to the processor is gated, and the processor consumes only 10mW, but it takes 180 processor cycles to switch to and back from the IDLE state. However, no naturally occuring processor stall is more than 100 cycles, therefore there is no opportunity to reduce the power consumption.
