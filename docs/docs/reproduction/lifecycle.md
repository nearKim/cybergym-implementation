---
title: Lifecycle Execution
sidebar_position: 7
---

# Lifecycle Execution

This walkthrough exercises the entire CyberGym pipeline on a local machine: start the server, generate challenge bundles, submit PoCs, and replay them for determinism checks. Keep two terminals handy—one for the server and one for client tooling.

## Preconditions

- `.env` is populated with valid dataset paths and directories (see [Runtime Configuration](./configuration.md)).
- Docker is running and `docker ps` works without elevated privileges.
- Your Python environment with the editable `cybergym` installation is active.
- On Docker Desktop, ensure the `desktop-linux` context is selected (`docker context use desktop-linux`) and that no stale `DOCKER_HOST` overrides are present.

## 1. Launch the Submission Server

```bash
python helpers/start_server.py
```

The helper performs the following steps:

1. Loads environment variables from `.env`.
2. Creates the log, artifact, and scratch directories if they are missing.
3. Boots the FastAPI app on `SERVER_IP:SERVER_PORT` (default `0.0.0.0:8666`).

Leave this terminal open. Visit [http://localhost:8666/docs](http://localhost:8666/docs) to inspect the automatically generated OpenAPI schema.


## 2. Generate Tasks & Submit Sample PoCs

Use the smoke-test helper to generate challenge bundles and submit the bundled PoCs back to the server.

```bash
python helpers/test.py
```

- Task IDs default to the comma-separated list defined in `SAMPLE_TASK_ID`.
- Override the selection by passing IDs: `python helpers/test.py arvo:10400 oss-fuzz:libpng-1.6.39`.
- Generated bundles land in `${OUT_DIR}` and include `README.md`, `submit.sh`, and PoC binaries.

Monitor the server terminal for log entries confirming Docker runs, exit codes, and artifact logging.

## 3. Inspect Artefacts

After the helper completes, validate that the expected directories exist:

- `${OUT_DIR}/<task_id>/` – hydrated challenge bundles.
- `${ARTIFACT_DIR}/poc_records.jsonl` – append-only log of PoC submissions.
- `${LOG_DIR}/<hash>/` – stdout/stderr captures and replayable binaries.

The JSONL log records the agent ID, task ID, exit code, and checksum used for verification.

## 4. Replay Stored PoCs

Confirm determinism by replaying each stored PoC against the running server.

```bash
python helpers/verify.py
```

Filter runs when debugging specific workloads by targeting a single agent:

```bash
python helpers/verify.py agent_id=8113f33401d34ee3ae48cf823b757ac7
```

Successful runs print a summary table with check marks per agent. Any mismatched exit code triggers an error so you can inspect the corresponding log directory.

## 5. Understand the PoC Lifecycle

The helper scripts wrap the same flow used during research experiments:

1. `cybergym.task.gen_task` packages the challenge and emits metadata containing the agent ID and checksum.
2. Generated `submit.sh` scripts POST multipart data to `/submit-vul` or `/submit-fix`.
3. `cybergym.server.server_utils.submit_poc` deduplicates payloads, validates checksums, and orchestrates Docker execution.
4. SQLAlchemy events append JSON snapshots and JSONL rows under `${ARTIFACT_DIR}` for each run.
5. `helpers/verify.py` calls `/verify-agent-pocs` to re-execute stored PoCs and update the database with fresh exit codes.

Refer back to the [System Architecture](./architecture.md) page if you need a visual reference for this lifecycle.

## 6. Optional Cleanup

Reset the workspace between experiments by removing generated artefacts:

```bash
python helpers/cleanup.py --yes
```

This deletes the directories referenced by `OUT_DIR`, `LOG_DIR`, and `ARTIFACT_DIR`. Re-run the smoke test afterwards to regenerate fresh bundles.
