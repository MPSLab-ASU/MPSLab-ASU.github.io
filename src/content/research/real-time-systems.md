---
title: "Real-Time Systems"
status: "Extended"
description: "Our vision:Our vision is to enable correct-by-construction cyber-physical system design using software-managed memory hierarchies with our efficient memory management schemes and accurate analysis ..."
icon: "Clock"
order: 23
image: "/images/research/real-time-systems.png"
---

## Real-Time Systems

Our vision:Our vision is to enable correct-by-construction cyber-physical system design using software-managed memory hierarchies with our efficient memory management schemes and accurate analysis techniques.

Cyber-physical systemsare systems in which cyber world interacts with physical world. Software components (in cyber world) monitor and control physical components (in physical world) throughfeedback loops that consist of sensing, computation, and actuation.In these feedback loops, tasks read input from sensors, compute or decide what the desired action is, and perform that action through actuation of physical components.

Cyber-physical systems havestrict timing constraints that must be satisfied for their correct operations.These timing constraints specify the deadline for each task, by which the task must finish its execution. In safety-critical applications like automotive systems, avionics, medical devices, any failure in this may lead to a catastrophic disaster. For instance, in the example of autonomous driving, the software must finish calculating the amount of braking or steering before it is too late to prevent a crash. It is crucial, therefore, to find the worst-case execution times (WCETs) of all tasks to ensure that all tasks can meet their deadlines.A correct-by-construction approach enables the assertion of the timing correctness at design time, before testing.
