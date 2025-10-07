# PoC Lifecycle and Data Flow

This note explains how a proof-of-concept (PoC) flows through the system once an agent generates a submission. Use it alongside `Architecture.md` when debugging, extending the server, or wiring automated evaluations.

## 1. Task Packaging

1. The CLI (`python -m cybergym.task.gen_task`) constructs a `TaskConfig` that encodes the task ID, difficulty, output directory, dataset roots, and server URL.
2. Task-specific generators (`arvo_task.py`, `oss_fuzz_task.py`) copy challenge artifacts, hydrate README templates, and write a submission script pre-populated with the agent ID, checksum, and server endpoint.
3. The generator returns a `Task` model containing the agent ID + checksum pair. Both values must be preserved when calling the submission script.

## 2. Submission Request

1. The generated `submit.sh` script posts multipart form data to the server (`/submit-vul` or `/submit-fix`).
2. The server rehydrates the request body into a `Payload` model (task ID, agent ID, checksum, raw PoC bytes, `require_flag`).
3. The checksum is recomputed server-side (`verify_task`) to guard against tampering.

## 3. Deduplicated Persistence

1. `server_utils.submit_poc` hashes the PoC payload and checks for existing records via `get_poc_by_hash`.
2. If the PoC already exists for the same agent/task/hash, the stored exit code + output is returned without rerunning Docker.
3. Otherwise, a new UUID (`poc_id`) is allocated, the raw PoC is written to disk under `LOG_DIR/<hash>/poc.bin`, and a SQLAlchemy row is upserted through `get_or_create_poc`.

## 4. Execution Pipeline

1. `run_container` routes execution to either `run_arvo_container` or `run_oss_fuzz_container` depending on the task prefix.
2. Docker volumes mount the PoC file alongside task-specific runtime assets (e.g., `binaries/` or OSS-Fuzz `out/` directories).
3. Exit codes are normalized—timeouts are mapped to `CustomExitCode.Timeout`, which the post-processor converts into a success code with human-readable messaging while optionally injecting a flag for CTF-style tasks.

## 5. Artifact Logging & Database Updates

1. After execution, outputs are stored in `output.vul` / `output.fix` files next to the PoC binary.
2. `update_poc_output` writes the exit codes back to the database.
3. SQLAlchemy event listeners (`events.py`) capture both insert and update operations, forwarding the serialized record to the `ArtifactLogger`.
4. The logger creates a JSON snapshot per PoC (`<poc_id>.json`) and appends a JSONL entry to `poc_records.jsonl`, enabling easy auditing or downstream analytics.

## 6. Verification and Reruns

1. The `/verify-agent-pocs` endpoint (or `helpers/verify.py`) retrieves all PoC records for a given agent and replays them via `run_poc_id`.
2. OSS-Fuzz “latest” tasks skip fix-mode execution because no patched binary is provided.
3. Reruns refresh on-disk outputs and database exit codes, ensuring the artifact log reflects the latest execution trace.

## 7. Cleanup Considerations

* Removing a PoC requires deleting its directory under the log root and the corresponding database row—otherwise SQLAlchemy events may log dangling metadata.
* Docker images (`n132/arvo`, `cybergym/oss-fuzz-base-runner`) are pulled on demand; consider pre-pulling them in CI pipelines to amortize startup cost.
* When rotating salts or API keys, regenerate tasks to ensure checksums remain valid.

---

Understanding this lifecycle helps pinpoint issues such as checksum mismatches, repeated submissions, or missing Docker assets when troubleshooting PoC evaluation runs.