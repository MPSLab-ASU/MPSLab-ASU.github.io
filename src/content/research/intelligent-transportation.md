---
title: "Intelligent Transportation Systems"
status: "Active"
description: "Developing robust software, perception pipelines, and safety-critical architectures for next-generation intelligent and autonomous vehicles."
icon: "Car"
order: 1
---

## Vision

We aim to advance the state-of-the-art in two critical directions: first, by enhancing autonomous vehicle perception through multi-modal and cooperative sensing to ensure safe navigation in complex environments; and second, by evolving traffic infrastructure into an intelligent observer capable of detecting incidents and understanding their systemic impact at a city scale. By bridging the gap between vehicle-level sensing and infrastructure-level orchestration, we strive to build a transportation network that is fundamentally resilient to both physical uncertainties and digital vulnerabilities.

## Key Research Challenges

- **The Perception and Data Gap**: Individual AVs are limited by their own line-of-sight and the extreme rarity of real-world incident data. Multi-modal cooperative sensing and generative "Real-to-Sim" and “Sim-to-Real” modeling are needed to provide vehicles with shared perception and a library of kinematically feasible edge cases for rigorous safety validation.
- **Trust in Cooperative Systems**: Enhancing vehicle intelligence through cooperation introduces the risk of data falsification or sensor malfunctions. Robust security architectures that combine real-time authentication with decentralized consensus are needed to ensure that the "cooperative brain" of a connected fleet remains trustworthy.
- **City-Scale Incident Intelligence**: Relying on centralized, macroscopic traffic data leads to slow response times and low detection accuracy. Scalable, infrastructure-based intelligence that can detect, localize, and quantify the ripple effects of incidents using sparse, microscopic sensing is needed to manage urban resilience at scale.

## Recent Results

### Theme I: Advancing AVs via Secure, Cooperative Perception

Our research focuses on extending the "eyes" of the vehicle through cooperation while ensuring the absolute integrity of shared data. Through our work on CONClave (DAC 2024), we developed a tightly coupled authentication and consensus protocol that allows a fleet to identify and isolate malicious or faulty sensors 1.8x faster than existing baselines, ensuring that cooperative perception remains a reliable asset for safe navigation. Furthermore, by replacing static error models with dynamic, parameterized covariance generation, we demonstrated a 1.4x improvement in the accuracy of fusing data between moving vehicles and stationary infrastructure, effectively neutralizing the localization errors inherent in mobile sensing.

![CONClave](/images/research/its/conclave.png)
CONClave is a secure cooperative perception framework that integrates multi-party authentication, decentralized consensus, and sensor trust-scoring to protect autonomous vehicle fleets from malicious data injection and sensor malfunctions.

### Theme II: Advancing Infrastructure via Distributed Incident Detection

Our work on the infrastructure side centers on turning sparse roadside sensors into a high-fidelity monitoring network capable of city-scale oversight. Through the development of IncidentNet (ITSC 2024), we have pioneered a deep learning framework that can detect and localize traffic incidents even when they occur outside a sensor's direct field of view, achieving a 98% detection rate in urban environments with sparse sensor coverage. By utilizing a novel methodology to generate realistic synthetic microscopic traffic data, our frameworks can accurately quantify how local incidents alter traffic flow across the broader city grid, enabling proactive, automated traffic management that mitigates gridlock and improves emergency response.

![IncidentNet](/images/research/its/incidentnet.png)
IncidentNet is a deep learning framework that utilizes microscopic traffic patterns from sparse roadside sensors to detect, localize, and estimate the severity of traffic incidents, even when they occur outside the sensor's direct field of view.
