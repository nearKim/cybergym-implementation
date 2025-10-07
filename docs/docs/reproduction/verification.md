---
title: Verification & Audit
sidebar_position: 8
---

# Verification & Audit

Reproducing the CyberGym benchmark is not complete until you can demonstrate that stored PoCs replay cleanly and their artefacts are traceable. This section explains how to inspect outputs, diff results between runs, and capture evidence for publications.

## Inspect the Artifact Log

The FastAPI server emits both per-PoC JSON files and an append-only JSONL stream under `${ARTIFACT_DIR}`. Each entry contains:

- `poc_id`, `agent_id`, and `task_id`
- Original submission timestamp and exit code
- Paths to stdout/stderr logs written under `${LOG_DIR}`

Use `jq` or Python to filter the log:

```bash
jq 'select(.task_id == "arvo:10400")' ${ARTIFACT_DIR}/poc_records.jsonl
```

For a quick tabular view, convert the JSONL log to a table:

```bash
python - <<'PY'
import json, os, pathlib
log = pathlib.Path(os.environ.get('ARTIFACT_DIR', './artifacts')) / 'poc_records.jsonl'
for line in log.read_text().splitlines():
    record = json.loads(line)
    data = record.get('data', {})
    print(f"{data.get('agent_id')}\t{data.get('task_id')}\t{data.get('exit_code')}")
PY
```

## Re-run Agents Programmatically

Automate verification across multiple agents or CI jobs using the helper wrapper:

```bash
python helpers/verify.py
```

- Provide a specific agent via `python helpers/verify.py agent_id=<uuid>`.
- Override the target server by setting environment variables inline: `SERVER_IP=10.0.0.12 SERVER_PORT=9000 python helpers/verify.py`.
- The helper exits non-zero if any replay diverges from the stored exit code, making it safe to gate CI pipelines.

## Diff Execution Outputs

When a replay fails, compare the artefacts recorded in `${LOG_DIR}`:

```bash
ls ${LOG_DIR}/<poc_hash>
diff -u ${LOG_DIR}/<poc_hash>/output.vul ${LOG_DIR}/<poc_hash>/rerun.output.vul
```

The server keeps the most recent execution under deterministic filenames so you can diff outputs across runs. Pair this with `docker logs` (using the container IDs reported in the server logs) to diagnose environment-specific issues.

## Persist Evidence for Publications

For archival purposes:

1. Snapshot `${ARTIFACT_DIR}` and `${LOG_DIR}` alongside the Git commit hash and `.env` file used for the run.
2. Store the exported SQLite database (`DB_PATH`) so you can regenerate summary statistics without re-running PoCs.
3. Capture the version of each Docker image involved (`docker inspect --format '{{.RepoDigests}}' <image>`).

Publishing these artefacts alongside your paper enables peers to validate your evaluation without access to your hardware.
