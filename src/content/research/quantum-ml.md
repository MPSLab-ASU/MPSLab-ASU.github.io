---
title: "Quantum Machine Learning"
status: "Active"
description: "Pioneering the next generation of artificial intelligence by exploring the intersection of quantum computing and advanced machine learning models."
icon: "Brain"
order: 4
---

## Vision

We strive to create a symbiotic partnership between two transformative frontiers: using machine learning to stabilize quantum hardware and using quantum computing to redefine the limits of ML algorithms. We aim to achieve "Quantum Advantage" on near-term (NISQ) devices by making quantum circuits noise-resilient and adaptive.

## Key Research Challenges

- **Barren Plateaus or Vanishing gradients**: The training of QML models is frequently hampered by the "Barren Plateau" phenomenon, a quantum analog to the vanishing gradient problem in classical deep learning. As the number of qubits or the depth of the circuit increases, the gradient of the cost function often vanishes exponentially, leaving the optimization landscape flat and featureless. This makes it nearly impossible for classical optimizers to find a path toward a global minimum. Hardware-efficient ansätz and localized cost functions that preserve gradient signals across high-dimensional Hilbert spaces are needed.
- **NISQ-Era Hardware Constraints**: We are currently operating in the Noisy Intermediate-Scale Quantum (NISQ) era, where quantum devices possess a limited number of qubits and lack full fault tolerance. These systems are highly susceptible to environmental decoherence and gate errors, which accumulate rapidly as circuit depth increases, often drowning out the true "quantum signal" with noise. Addressing this requires the development of noise-resilient algorithms and error-mitigation strategies that can extract meaningful computational results within the limited coherence times of today’s processors.
- **The Data Encoding Bottleneck**: A fundamental challenge in QML is the efficient transformation of classical information into quantum states—a process known as data encoding. While techniques like Amplitude Encoding can represent data exponentially more compactly than classical memory, the gate complexity required to prepare these states often creates a significant computational overhead. Furthermore, the choice of encoding (e.g., Angle vs. Basis vs. Amplitude) acts as a non-linear feature map that dictates the expressivity and generalization power of the entire model. Encoding architectures that can balance high-dimensional representation power with low-depth hardware requirements to ensure a tangible advantage over classical feature engineering are needed.

## Recent Results

![qml-research](/images/research/qml/qml.png)
QPMeL learns classical embeddings of quantum data that utilizes a quality-performance trade-off model to optimize the efficiency and accuracy of quantum machine learning pipelines.

One of our recent breakthroughs is QPMeL (Quantum Polar Metric Learning), a framework designed to bypass the traditional instabilities of quantum training. QPMeL uses a quantum-aware, classically-trained approach: by mapping classical data to the surface of independent unit spheres (aligned with the Bloch sphere), the model learns "Rotational Representations" that translate directly into quantum states.

- **Overcoming Barren Plateaus**: While standard QML models often struggle with "Barren Plateaus" when trained on quantum hardware, QPMeL offloads the primary optimization to a classical "head." By using our novel Projective Metric Function (PMeF), QPMeL avoids the flat gradients of the quantum loss landscape, ensuring stable and fast convergence even as the system scales.
- **Hardware-Efficiency**: QPMeL encodings are hardware-efficient by design, requiring only a single layer of $R_y$ and $R_z$ gates per qubit. This drastically reduces circuit depth compared to standard ansatz, allowing high-fidelity execution within the limited coherence times of current noisy hardware.
- **Adaptive Representation**: Instead of using fixed, manual mappings, QPMeL utilizes trainable encodings that allow the model to learn the most effective way to separate features in Hilbert space. This results in the first QML model capable of scaling to 10-class classification and 15-way multi-modal (image-text) few-shot learning with state-of-the-art accuracy.
