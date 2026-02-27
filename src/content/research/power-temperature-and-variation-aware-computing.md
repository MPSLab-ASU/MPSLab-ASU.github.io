---
title: "Power, Temperature and Variation aware Computing"
status: "Extended"
description: "Power consumption, process variations, and temperature are all problems due to technology scaling to incredible levels. Our approach to deal with power, temperature and process variations is to exp..."
icon: "Thermometer"
order: 20
image: "/images/research/power-temperature-and-variation-aware-computing.png"
---

## Power, Temperature and Variation aware Computing

Power consumption, process variations, and temperature are all problems due to technology scaling to incredible levels. Our approach to deal with power, temperature and process variations is to expose them to microarchitecture and software levels, where instruction scheduling and component sleep solutions can be developed to handle these issues.

Two important consequences of technology scaling are the increase in leakage power and increase in variation in the characteristics of manufactured devices. Leakage power is projected to contribute more than 40% of total power budget in processors fabricated in 65 nm technology and beyond. Unlike dynamic power, leakage power is highly sensitive to variations in gate dimensions as well as the operational temperature. High variation in the power consumption results in the significant overestimation of the specification, leading to increased design time/effort and results in significant loss of parameterized yield. Hence, reducing the total power, temperature and the variation in the power consumption is an important problem.

We introduce a leakage sensor in FUs, and develop a temperature and process variations aware power gating technique. Our power gating approach is based on the IPC, using which it determines how many FUs must be on. Once this is decided, based on the leakage of the FUs (which automatically takes temperature into account), which FUs should be power gates is determined.
