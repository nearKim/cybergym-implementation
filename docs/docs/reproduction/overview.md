---
title: Reproduction Overview
sidebar_position: 1
---

# Reproduction Overview

This playbook explains how to rebuild the complete **CyberGym** benchmark stack that powers the upstream [`nearKim/cybergym`](https://github.com/nearKim/cybergym/tree/develop) project. It is written for researchers who need deterministic, auditable runs of the paper's experiments on fresh hardware.

The documentation is organised by the lifecycle of a reproduction run:

| Phase | What You Will Achieve | Primary References |
| --- | --- | --- |
| **Environment** | Prepare an isolated Python workspace with Docker support and research-friendly defaults. | [Environment Provisioning](./environment.md) |
| **Repository & Data** | Sync the upstream source tree, download ARVOS/OSS-Fuzz datasets, and prime Git LFS assets. | [Workspace Bootstrapping](./workspace.md), [Dataset Management](./data-management.md) |
| **Configuration** | Capture runtime paths, credentials, and ports in a `.env` contract for scripts and services. | [Runtime Configuration](./configuration.md) |
| **Execution** | Launch the submission server, generate challenge bundles, submit PoCs, and capture artifacts. | [Lifecycle Execution](./lifecycle.md) |
| **Verification** | Re-run stored PoCs, track metrics, and diff outputs for reproducibility guarantees. | [Verification & Audit](./verification.md) |
| **Automation** | Embed the workflow into CI or research infrastructure and keep workspaces healthy. | [Automation & Hygiene](./automation.md), [Troubleshooting](./troubleshooting.md) |

Each section cross-references the upstream developer guide where deeper architectural context is helpful. If you are unfamiliar with the moving pieces, start with the [System Architecture](./architecture.md) primer before diving into the hands-on steps.

## Assumptions

- You control a Linux or macOS workstation with Docker privileges (WSL2 works for Windows hosts).
- You have network access to Hugging Face mirrors used by the upstream project.
- You are comfortable with Python packaging, Git, and container orchestration.

Researchers deploying to cluster environments or CI will find additional guidance in the automation section.
