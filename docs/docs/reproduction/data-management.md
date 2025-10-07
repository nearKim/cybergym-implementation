---
title: Dataset Management
sidebar_position: 5
---

# Dataset Management

CyberGym workloads depend on two dataset families:

1. **Task metadata** (ARVOS challenge definitions, OSS-Fuzz manifests, README templates).
2. **Execution artefacts** (container layers, corpora, patched binaries) consumed by Docker runners.

The upstream project provides scripts and mirrored archives to simplify retrieval. Choose the option that matches your storage budget.

## Directory Layout

Decide where datasets should live before downloading. Keeping them outside the Git workspace avoids accidental commits.

```text
/data/
  cybergym_data/           # cloned metadata repository
  cybergym-oss-fuzz/       # extracted OSS-Fuzz execution assets
  cybergym-oss-fuzz-subset # optional lightweight subset
```

Set absolute paths in your `.env` file later so helper scripts can resolve them consistently.

## Fetch Task Metadata (Required)

```bash
git clone https://huggingface.co/datasets/sunblaze-ucb/cybergym /data/cybergym_data
```

The repository tracks ARVO and OSS-Fuzz task descriptors along with helper scripts. Because the clone is Git-based, `git pull` keeps it up to date with newly released tasks.

## Acquire Execution Artefacts

### Option A – Research Subset (~50 GB)

Best for laptops or short-lived CI jobs.

```bash
python scripts/server_data/download_subset.py --output /data/cybergym-oss-fuzz-subset
wget https://huggingface.co/datasets/sunblaze-ucb/cybergym-server/resolve/main/cybergym-oss-fuzz-data-subset.7z -O /data/cybergym-oss-fuzz-subset.7z
7z x /data/cybergym-oss-fuzz-subset.7z -o/data/cybergym-oss-fuzz-subset
```

### Option B – Full Corpus (~10 TB)

Required for perfect parity with the benchmark publication.

```bash
python scripts/server_data/download.py --tasks-file /data/cybergym_data/tasks.json --output /data/cybergym-oss-fuzz
bash scripts/server_data/download_chunks.sh --output /data/cybergym-oss-fuzz
7z x /data/cybergym-oss-fuzz/cybergym-oss-fuzz-data.7z -o/data/cybergym-oss-fuzz
```

The scripts fetch multi-part archives. Ensure you have enough free disk before extraction; the `7z` command temporarily duplicates chunks while expanding.

## Validate Downloads

After extraction, inspect directory sizes and spot-check expected files:

```bash
du -sh /data/cybergym_data
find /data/cybergym-oss-fuzz -maxdepth 2 -type d | head
```

If you see `.git/lfs` placeholders or unusually small directories, re-run `git lfs pull` inside `/data/cybergym_data` and confirm your Hugging Face token has access to the mirrors.

## Keep Datasets Fresh

- Schedule a cron job or CI step to run `git -C /data/cybergym_data pull` weekly.
- For OSS-Fuzz “latest” tasks, re-run the download script when a new release lands and update your `.env` file to point to the refreshed directory.
- Consider using ZFS/Btrfs snapshots or object storage to capture immutable dataset versions for published experiments.
