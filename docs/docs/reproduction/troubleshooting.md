---
title: Troubleshooting Guide
sidebar_position: 10
---

# Troubleshooting Guide

Use this checklist when the reproduction workflow diverges from the expected behaviour.

## Installation & Environment

| Symptom | Diagnosis | Fix |
| --- | --- | --- |
| `pip install` fails with compiler errors | Native extensions require build tools. | Install `build-essential` (Linux) or Xcode Command Line Tools (macOS). |
| Docker commands require `sudo` | User is not part of the `docker` group. | `sudo usermod -aG docker $USER && newgrp docker`. |
| `git lfs pull` downloads pointer files only | Git LFS not initialised or credentials missing. | Run `git lfs install` and ensure Hugging Face token has access. |

## Server Startup

| Symptom | Diagnosis | Fix |
| --- | --- | --- |
| `Address already in use` | Another process bound to `SERVER_PORT`. | Change the port in `.env` or stop the conflicting process. |
| `sqlite3.OperationalError: unable to open database file` | `DB_PATH` points to a non-existent directory. | Create the directory or use an absolute path. |
| Docker image pull fails | Registry blocked or offline. | Mirror required images internally or pre-load them on the host. |

## Task Generation & Submission

| Symptom | Diagnosis | Fix |
| --- | --- | --- |
| `FileNotFoundError` for dataset assets | `OSS_FUZZ_PATH` or `CYBERGYM_DATA_DIR` incorrect. | Update `.env` with absolute paths and rerun the helper. |
| `checksum mismatch` errors | Task bundle modified after generation. | Regenerate the task to refresh checksums; avoid editing `submit.sh`. |
| Docker exits with code 137 | Container ran out of memory. | Increase Docker memory limits (macOS) or provision more RAM. |

## Verification

| Symptom | Diagnosis | Fix |
| --- | --- | --- |
| `verify.py` reports inconsistent exit codes | Non-deterministic PoC or missing artefact. | Inspect `${LOG_DIR}` for the PoC hash and rerun with a single task. |
| Verification cannot reach the server | API key mismatch or host unreachable. | Confirm `CYBERGYM_API_KEY` and `SERVER_IP`/`SERVER_PORT` values. |
| JSONL log missing entries | Artifact logger lacks write permissions. | Ensure `${ARTIFACT_DIR}` is writable and not mounted read-only. |

## Performance & Scaling

- Pre-pull Docker images and warm caches on CI runners to avoid timeouts.
- Limit simultaneous workloads by curating `SAMPLE_TASK_ID` to a small subset when running on modest hardware.
- For long-lived experiments, rotate logs (`logrotate` or manual pruning) to prevent disk exhaustion.

If an issue persists, consult the upstream [DEV_GUIDE.md](https://github.com/nearKim/cybergym/blob/develop/DEV_GUIDE.md) or open a GitHub discussion with reproducible steps and logs.
