---
title: Environment Provisioning
sidebar_position: 3
---

# Environment Provisioning

CyberGym assumes a modern Python stack with Docker available for sandboxed execution. The steps below standardise the baseline across researchers and CI machines.

## Supported Platforms

- **Linux** (Ubuntu 22.04+ recommended) with the Docker Engine package.
- **macOS** 13+ using Docker Desktop. Apple Silicon hosts work, but expect longer dataset extraction times.
- **Windows** via WSL2. Install Docker Desktop and expose the WSL2 integration for your distribution.

> For reproducibility runs, dedicate at least **16 GB RAM** and **100 GB** of free disk for the curated datasets. Mirroring the full OSS-Fuzz corpus requires multiple terabytes of storage.

## System Dependencies

Install the following packages before creating the Python environment:

| Tool | Purpose | Suggested Installation |
| --- | --- | --- |
| Git & Git LFS | Sync code and pull large dataset manifests. | `sudo apt install git git-lfs` |
| Python 3.12+ | Runtime for helper scripts and the FastAPI server. | `sudo apt install python3.12 python3.12-venv` (or Miniconda) |
| 7-Zip | Extract multi-part dataset archives. | `sudo apt install p7zip-full` |
| Curl/Wget | Fetch release artefacts from Hugging Face mirrors. | `sudo apt install curl wget` |
| Docker | Isolate PoC execution inside containers. | [docker.com](https://docs.docker.com/get-docker/) |

Verify Docker connectivity before proceeding:

```bash
docker info
```

If the command fails, make sure the daemon is running and your user is part of the `docker` group (Linux) or that Docker Desktop is open (macOS/Windows).

For Docker Desktop hosts, explicitly switch to the Linux VM context before you attempt to build or run containers:

```bash
docker context use desktop-linux
docker context ls
```

The `docker context ls` output should show an asterisk next to `desktop-linux`. If you previously exported a `DOCKER_HOST` variable, unset it to avoid bypassing the Desktop-managed socket:

```bash
# Bash / Zsh
unset DOCKER_HOST

# fish
set -e DOCKER_HOST
```

## Python Environment

Create an isolated virtual environment to avoid polluting your system Python:

```bash
# Example using Miniconda
conda create -n cybergym "python>=3.12,<3.14"
conda activate cybergym

# Or with venv
python -m venv .venv
source .venv/bin/activate
```

Confirm that `python --version` prints the expected interpreter and that `pip` resolves inside the environment before installing project dependencies.

## Network & Credential Considerations

- The dataset download scripts pull from Hugging Face. Configure `HF_TOKEN` in your shell if your organisation uses a private mirror.
- Outbound HTTPS access is required to fetch Docker base images (`n132/arvo`, `cybergym/oss-fuzz-base-runner`). Pre-pull these images on air-gapped clusters and adjust your Docker registry proxies accordingly.
- If reproducing results inside CI, cache the dataset directories on persistent volumes to avoid re-downloading tens of gigabytes per run.
