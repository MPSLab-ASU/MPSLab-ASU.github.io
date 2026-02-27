---
title: "Cyber-Physical and IoT Systems"
status: "Extended"
description: "Time is a foundational aspect of Cyber-Physical Systems (CPS). Correct timing of system events is critical to optimize responsiveness to the environment, in terms of timeliness, accuracy, and preci..."
icon: "Wifi"
order: 16
image: "/images/research/cyber-physical-and-iot-systems.png"
---

## Cyber-Physical and IoT Systems

Time is a foundational aspect of Cyber-Physical Systems (CPS). Correct timing of system events is critical to optimize responsiveness to the environment, in terms of timeliness, accuracy, and precision in the knowledge, measurement, prediction, and control of CPS behavior (DAC Special Session 2016).

In order to design more resilient and reliable CPS, first and foremost, there should be a way to specify the timing constraints that a constructed Cyber-Physical System must meet. Only then, we can seek systematic approaches to check if all timing constraints are being met, and develop correct-by-construction methodologies. In this regard, we have developed a logic, Timestamp Temporal Logic (TTL) to specify the timing constraints on a distributed CPS (TTL-EMSOFT-TECS-2017). Designers can specify the timing requirement that a CPS must satisfy in a succinct and intuitive manner in TTL. For example, they can express that some two events on two different parts of the system must occur within 1 millisecond of each other. Further, we designed an FPGA-based testbed that can hook up to a CPS and take in these timing constraints specified in TTL and verify if the timing constraints are being met (CPS Timing Testbed,ReConfig 2015). One of the great features of using TTL to express timing constraints is that the time monitoring logic becomes very simple. TTL logic does not need to compute whether the constraint is being met at each and every instance of time but it re-evaluates a constraint only when there is an event that can affect the outcome. This enables our approach, TMA to perform online timing monitoring of CPS (TMA-DAC 2018) for less required computation and resources. Furthermore, we have come up with the minimum design parameters of the timing CPS that are required to enable testing the timing of CPS. For example, a system that is sampling at milliseconds level cannot test a timing constraint that has a requirement of accuracy to the level of microseconds (Testbed-DAC-2017).

We have built several CPS applications to test the need and effectiveness of our approaches. We have built a i) flying paster – a system needed in the printing press to continue the paper feed from another roller when the current roller finishes. ii) We have been able to align the phase of different motors up to milliseconds even when they are connected through the internet. iii) Synchronize the image capture time from different cameras, so that a 3D image reconstruction can be done with minimal blurring, and iv) developed a time-sensitive traffic intersection design for autonomous vehicles (Crossroads-DAC-2017).
