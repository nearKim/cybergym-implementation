# CyberGym Architecture Overview

This document summarizes the structure of the CyberGym fork that reproduces the research benchmark while introducing additional operational tooling. It covers the original architecture (task generation, submission server, and verification tooling) and the new features layered on top, such as helper scripts and artifact logging.

## High-Level System Diagram

```mermaid
flowchart LR
    subgraph DataStores[Benchmark Artifacts]
        D1[cybergym_data<br/>ARVO / OSS-Fuzz corpora]
        D2[oss-fuzz-data<br/>PoC execution images]
    end

    subgraph TaskGeneration[Task Generation CLI]
        TG[cybergym.task.gen_task]
        CFG[TaskConfig & difficulty rules]
    end

    subgraph AgentWorkspace[Agent Workspace]
        PKG[Generated task package]
        AG[Agent / Researcher]
    end

    subgraph Server[PoC Submission Server]
        API[FastAPI endpoints
        (submit-vul, submit-fix,
        query-poc, verify-agent-pocs)]
        DB[(SQLite PoC Records)]
        DL[Docker runners
        (ARVO / OSS-Fuzz)]
        LOG[Artifact Logger]
    end

    subgraph Helpers[Dev Helper Scripts]
        HS[start_server.py]
        HT[test.py]
        HV[verify.py]
    end

    D1 -- packages --> TG
    D2 -- runtime images --> DL
    TG -->|Task metadata| CFG
    TG -->|Task bundle| PKG
    PKG --> AG
    AG -->|submit PoC| API
    API --> DB
    API --> DL
    DL -->|execution result| API
    API --> LOG
    HS -. env & CLI .-> Server
    HT -. orchestrates .-> TaskGeneration
    HT -. submits .-> API
    HV -. queries .-> API
```

## Core Repository Layout

| Path | Description |
| --- | --- |
| `src/cybergym/task/` | Task generation CLI, difficulty presets, and ARVO/OSS-Fuzz packaging helpers. |
| `src/cybergym/server/` | FastAPI submission server, SQLAlchemy models, Docker execution harness, and artifact logging hooks. |
| `helpers/` | Convenience scripts for starting the server, running an end-to-end smoke test, and batch verification. |
| `scripts/` | Upstream utility scripts (e.g., dataset downloads and verification tooling). |
| `examples/agents/` | Example evaluation agents provided by the upstream project. |

## Core Modules (Upstream Baseline)

### Task Generation (`cybergym.task`)
* `gen_task.py` exposes a CLI that resolves the task type (`arvo`, `oss-fuzz`, or `oss-fuzz-latest`), applies difficulty presets, and materializes task bundles for an agent. Task metadata includes salted agent IDs and checksums for server-side validation.
* `arvo_task.py` copies the appropriate ARVO assets, renders task documentation from templates, and emits a ready-to-solve package.
* `oss_fuzz_task.py` mirrors the ARVO workflow for OSS-Fuzz datasets, allowing reproduction against archived or latest fuzz targets.
* `types.py` defines strongly typed Pydantic models shared across the generator and server, including checksum verification helpers.

### Submission Server (`cybergym.server`)
* `__main__.py` bootstraps the FastAPI app, enforces API-key protected routes, and exposes the following endpoints:
  * `POST /submit-vul` – public vulnerable PoC submissions.
  * `POST /submit-fix` – authenticated patch validation.
  * `POST /query-poc` – authenticated PoC record lookup.
  * `POST /verify-agent-pocs` – authenticated re-execution of all PoCs for an agent.
* `server_utils.py` orchestrates checksum validation, deduplicated PoC storage, Docker execution against ARVO or OSS-Fuzz images, and exit-code normalization.
* `pocdb.py` defines the SQLAlchemy model for PoC records and the SQLite engine factory.
* `types.py` provides request/response Pydantic models for server endpoints.

### Utilities (`cybergym.utils`)
* Shared helpers for JSON serialization and task ID parsing (e.g., extracting ARVO or OSS-Fuzz identifiers).

## Extended Features in This Fork

| Feature | Location | Notes |
| --- | --- | --- |
| Artifact logging for PoC lifecycle events | `src/cybergym/server/logging.py`, `src/cybergym/server/events.py` | Introduces a lightweight JSONL artifact trail (per-PoC files plus an append-only log) invoked automatically via SQLAlchemy events. |
| Developer helper scripts | `helpers/start_server.py`, `helpers/test.py`, `helpers/verify.py` | Streamline server bootstrapping, end-to-end smoke testing (task generation + PoC submission), and batch verification powered by the upstream `scripts/verify_agent_result.py`. |
| `.env`-driven configuration workflow | `DEV_GUIDE.md`, helper scripts | Loads environment variables to minimize manual flag passing when reproducing experiments. |
| Extended server endpoint for batch verification | `POST /verify-agent-pocs` | Enables re-running every stored PoC for a given agent directly from the API as part of verification tooling. |

## Operational Flow

1. **Bootstrap** – Install dependencies via `pip install -e '.[dev,server]'`, fetch benchmark datasets with Git LFS, and optionally populate a `.env` file for helper scripts.
2. **Start the Submission Server** – Launch FastAPI using `python -m cybergym.server` or the helper wrapper. The server creates log directories, initialises SQLite, and prepares artifact logging.
3. **Generate Tasks** – Use `python -m cybergym.task.gen_task` (or `helpers/test.py`) to materialize challenge bundles per task ID and difficulty.
4. **Submit PoCs** – Agents invoke the generated `submit.sh` script, which posts metadata plus PoC bytes to `/submit-vul` (and `/submit-fix` for patched binaries).
5. **Execution & Persistence** – The server validates checksums, runs the PoC inside the correct container, stores deduplicated results, and records outputs in both SQLite and the artifact log.
6. **Verification** – Researchers can re-run stored PoCs via the helper verification script or the `/verify-agent-pocs` endpoint to audit outcomes end-to-end.

## Future Extension Points

* **Task Templates** – Extend the templates in `src/cybergym/task/` to support additional dataset types or richer README scaffolding.
* **Artifact Analysis** – Build analytic tooling on top of the JSONL artifact logs for dashboards or CI metrics.
* **Automation Pipelines** – Integrate the helper scripts into CI jobs to continuously validate agents against a curated subset of tasks.