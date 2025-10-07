# CyberGym Reproduction Playbook

This guide outlines a streamlined workflow for reproducing the CyberGym experiments featured in the research paper and extended by this fork. It consolidates instructions from `README.md`, `DEV_GUIDE.md`, and helper utilities into a single reproducible checklist.

## 1. Prerequisites
- **Hardware**: Linux host with sufficient disk space (10 TB for full OSS-Fuzz data or ~50 GB for the subset).
- **Software**: Python 3.10+, Docker (for sandbox runners), Git LFS.
- **Access**: Hugging Face account for dataset downloads (if required).

## 2. Clone and Configure
```bash
git clone <your-fork-url> cybergym
cd cybergym
cp .env.example .env
```

Update `.env` with paths that match your environment. Key variables are detailed in `DEV_GUIDE.md` under **Configuration**.

## 3. Install Dependencies
```bash
pip install -e '.[dev,server]'
```

## 4. Acquire Datasets
1. **Benchmark Tasks** (mandatory):
   ```bash
   git lfs install
   git clone https://huggingface.co/datasets/sunblaze-ucb/cybergym cybergym_data
   ```
2. **PoC Execution Assets** (choose one):
   - **Full corpus (~10 TB)**:
     ```bash
     python scripts/server_data/download.py --tasks-file ./cybergym_data/tasks.json
     bash scripts/server_data/download_chunks.sh
     7z x cybergym-oss-fuzz-data.7z
     ```
   - **Curated subset (~50 GB)**:
     ```bash
     python scripts/server_data/download_subset.py
     wget https://huggingface.co/datasets/sunblaze-ucb/cybergym-server/resolve/main/cybergym-oss-fuzz-data-subset.7z
     7z x cybergym-oss-fuzz-data-subset.7z
     ```

Point `OSS_FUZZ_PATH` and `CYBERGYM_DATA_DIR` (in `.env`) at the extracted directories.

## 5. Launch the Submission Server
Use the helper launcher to honor `.env` defaults while allowing CLI overrides:
```bash
python helpers/start_server.py
```

The server will ensure log, database, and artifact directories exist before starting FastAPI (`cybergym.server`).

## 6. Generate and Submit Tasks
In a separate terminal, run the exercise helper to verify task generation and submission end-to-end:
```bash
python helpers/test.py
```
- To target specific tasks, pass IDs as CLI arguments (`python helpers/test.py arvo:10400 oss-fuzz:42535201`).
- Outputs are written to `OUT_DIR` from `.env` (default `./cybergym_tmp`).

## 7. Verify Stored PoCs
After submissions, confirm PoC validity using the verification helper:
```bash
python helpers/verify.py
```
- Automatically discovers agent IDs in `logs/artifacts/poc_records/poc_records.jsonl`.
- Set `CYBERGYM_API_KEY` in `.env` or rely on the default value baked into the helper.

## 8. Cleanup Between Runs (Optional)
Reset working directories to avoid cross-run contamination:
```bash
python helpers/cleanup.py
```

## 9. Troubleshooting
Refer to `DEV_GUIDE.md` for detailed troubleshooting steps covering server startup, verification failures, and task generation errors.

## 10. Next Steps
- Integrate agents by initializing submodules in `examples/agents/` and following their README instructions.
- Extend datasets or helper scripts as needed (see `Architecture.md` for extension points).