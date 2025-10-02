---
sidebar_position: 2
---

# Input Dataset

Quality of PoC generation is an acceptable and important metric to use to evaluate the cybersecurity capabilities of AI agents on challenging real-world problems. Input dataset is a key component to train and evaluate the agents. In this section, we introduce the input dataset used in CyberGym.

## Research-Level Dataset Requirements

Our ideal datasets for the vulnerability and exploit generation should meet the following criteria:
1. Real-world vulnerabilities and exploits and not simply Capture The Flag (CTF) style theoretical exploits.
2. Vulnerabilities are well-documented and reproducible.

### ARVO and OSS-Fuzz datasets

[Atlas of Reproducible Vulnerabilities in Open-source software](https://arxiv.org/abs/2408.02153), a.k.a ARVO, is the backbone input dataset used in CyberGym. It consists of a large-scale dataset from OSS-Fuzz of real-world security vulnerabilities and their corresponding proof-of-concept (PoC) exploits. This dataset is increasing in size, as long as OSS-Fuzz keeps updating. This dataset targets at the memory vulnerability and are tested by re-compilation. However, ARVO has one major limitation: it purely focuses on memory vulnerabilities of C/C++ programs. 

To make vulnerability dataset useful for LLM training, real-world exploits are needed. ARVO is a good candidate because it contains the metadata including: inputs that cause the vulnerability, patches that fix the issue, and the ability to compile and further execute the pre-patch and post-patch code.

Google [OSS-Fuzz](https://google.github.io/oss-fuzz/) is a comprehensive open source dataset, containing details of security vulnerability, including how they were triggered, and how they were patched. Google provides a good tutorial on Fuzzing and how to use [libFuzz](https://github.com/google/fuzzing/blob/master/tutorial/libFuzzerTutorial.md).


## Dataset Preparation