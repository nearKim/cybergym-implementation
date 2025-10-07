---
title: Runtime Configuration
sidebar_position: 6
---

# Runtime Configuration

CyberGym reads its settings from environment variables so that helper scripts, the FastAPI server, and CI jobs share a single source of truth. The repository ships with `.env.example`; copy it and adjust the paths you prepared earlier.

```bash
cp .env.example .env
```

> Keep `.env` outside of version control if it contains secrets or absolute paths specific to your environment. The file is ignored by Git by default.

## Core Variables

| Variable | Purpose | Typical Value |
| --- | --- | --- |
| `SERVER_IP` | Interface FastAPI should bind to. Use `0.0.0.0` to expose on all adapters. | `0.0.0.0` |
| `SERVER_PORT` | TCP port for PoC submissions and verification RPCs. | `8666` |
| `LOG_DIR` | Root directory for execution logs and stdout/stderr captures. | `./logs` or `/data/cybergym/logs` |
| `DB_PATH` | SQLite database that tracks PoC metadata. | `./poc.db` |
| `OSS_FUZZ_PATH` | Directory containing extracted OSS-Fuzz artefacts. | `/data/cybergym-oss-fuzz` |
| `CYBERGYM_DATA_DIR` | ARVO/OSS-Fuzz task metadata repository. | `/data/cybergym_data` |
| `OUT_DIR` | Scratch directory where `helpers/test.py` materialises task bundles. | `./cybergym_tmp` |
| `ARTIFACT_DIR` | Location for JSON/JSONL audit logs and replayable PoC artefacts. | `./artifacts` |
| `SAMPLE_TASK_ID` | Comma-separated task IDs exercised by the smoke test helper. | `arvo:10400,arvo:10401` |
| `CYBERGYM_API_KEY` | Shared secret used by helper scripts to authenticate with the server. | `cybergym-...` |

### Tips

- Store dataset paths outside the repository (e.g., `/data/...`) to avoid committing large artefacts.
- When multiple researchers share a machine, give each user a unique `LOG_DIR`/`ARTIFACT_DIR` to avoid collisions.
- For remote deployments, bind `SERVER_IP` to the instance’s private address and restrict ingress with firewalls.

## Runtime Overrides

- **Helper scripts** accept CLI flags that override `.env` values. Example: `python helpers/start_server.py --host 127.0.0.1 --port 9000`.
- **FastAPI server** honours shell environment variables when launched directly: `SERVER_PORT=9000 python -m cybergym.server.main`.
- **CI jobs** can template `.env` at runtime (e.g., using GitHub Actions `${{ secrets }}`) before invoking the helpers.

## Verifying Configuration

Start the server once to confirm the resolved paths are correct, then stop it with `Ctrl+C`:

```bash
python helpers/start_server.py --host 127.0.0.1 --port 9000
```

The helper prints the host, port, and directories it plans to create before booting FastAPI. If any paths are incorrect, update `.env` and re-run the command until the startup log looks correct.
