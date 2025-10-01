---
sidebar_position: 1
---

# Introduction

Welcome to **CyberGym**, an implementation of competitive multi-agent reinforcement learning with adaptive opponent synthesis for cybersecurity applications.

## Overview

CyberGym provides a framework for training reinforcement learning agents in adversarial cybersecurity environments. The key features include:

- **Multi-Agent Learning**: Support for training multiple agents simultaneously in competitive scenarios
- **Adaptive Opponent Synthesis**: Dynamic generation and adaptation of opponent strategies
- **Cybersecurity Focus**: Environments and scenarios specifically designed for security applications
- **Modular Architecture**: Easily extensible components for agents, environments, and models

## Paper Reference

This implementation is based on the paper:
> [CyberGym: Competitive Multi-Agent Reinforcement Learning with Adaptive Opponent Synthesis](https://arxiv.org/pdf/2506.02548)

## Key Concepts

### Adversarial Learning
The framework implements adversarial training where agents learn to both attack and defend in cybersecurity scenarios.

### Opponent Modeling
Agents learn to model and predict opponent behaviors, adapting their strategies accordingly.

### Population-Based Training
Multiple agent populations evolve simultaneously, creating diverse and robust strategies.

## Getting Started

To get started with CyberGym:

1. [Install](./installation) the framework and dependencies
2. Follow the [Quick Start](./quick-start) guide to run your first experiment
3. Learn about [Configuration](./configuration) options to customize your experiments

## Architecture

The framework consists of several key components:

- **Environments**: Cybersecurity simulation environments
- **Agents**: RL agents implementing various algorithms (PPO, SAC, etc.)
- **Models**: Neural network architectures for policy and value functions
- **Training**: Distributed training infrastructure with experiment tracking