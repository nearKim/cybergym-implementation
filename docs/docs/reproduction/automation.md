---
title: Automation & Hygiene
sidebar_position: 9
---

# Automation & Hygiene

Embedding CyberGym into CI or shared research infrastructure requires a few extra guardrails. The practices below keep workspaces reproducible, controllable, and cost-effective.

## Deterministic Job Templates

- **Pin dependencies** – Lock `pip freeze > requirements-lock.txt` for CI images and rebuild when upstream changes. Pair with `pip install -r requirements-lock.txt` during job setup.
- **Template `.env` files** – Use environment-specific templates (e.g., `config/.env.ci`) rendered via your CI platform. Avoid storing secrets in the repository.
- **Preload datasets** – Mount the `/data` volume into runners or cache the OSS-Fuzz subset between jobs to minimise cold-start time.

## Suggested CI Workflow

1. Checkout repository (`actions/checkout` or equivalent) with Git LFS enabled.
2. Restore cached datasets (for example using `actions/cache` keyed by dataset checksum).
3. Install Python dependencies using the pre-built lockfile.
4. Launch the server in the background (for example `python helpers/start_server.py &`) and capture the process ID.
5. Execute smoke tests (`python helpers/test.py`) and verification (`python helpers/verify.py`).
6. Collect `${ARTIFACT_DIR}` and `${LOG_DIR}` as build artefacts for downstream inspection.
7. Stop the background server with `pkill -f cybergym.server` or by sending `SIGINT` to the recorded PID.

## Disk & Container Hygiene

- Use `python helpers/cleanup.py --yes` between jobs to prevent log directories from filling the workspace.
- Prune Docker artefacts (`docker system prune --volumes`) on long-running agents to keep cache usage predictable.
- When rotating dataset versions, update symlinks rather than rewriting `.env` to simplify rollbacks.

## Scaling to Multi-Node Environments

- Deploy the FastAPI server on a dedicated node and expose it via an internal load balancer. Point worker nodes to the shared endpoint by exporting `SERVER_IP`/`SERVER_PORT` before invoking the helpers.
- Store the SQLite database on a network filesystem (or migrate to PostgreSQL using SQLAlchemy) to avoid single-node bottlenecks.
- Schedule dataset sync jobs separately from PoC execution to keep runtime nodes lightweight.

## Observability Hooks

- Forward `${LOG_DIR}` to your central logging stack (e.g., Loki, ELK) for long-term retention.
- Scrape FastAPI metrics by wrapping the server with an ASGI middleware such as Prometheus if you need per-endpoint timing data.
- Emit summary metrics from CI (number of successful verifications, failing task IDs) and alert when counts deviate from historical baselines.
