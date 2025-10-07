---
title: Workspace Bootstrapping
sidebar_position: 4
---

# Workspace Bootstrapping

Once your base system is ready, clone the upstream source, install dependencies, and validate that the helper tooling resolves correctly.

## Clone the Repository

```bash
git clone https://github.com/nearKim/cybergym.git --branch develop
cd cybergym
git lfs install
```

Run `git lfs install` once per machine so that subsequent `git pull` operations fetch large dataset manifests referenced by LFS pointers.

If you are maintaining a fork for local experimentation, add the upstream remote to keep parity with research updates:

```bash
git remote add upstream https://github.com/nearKim/cybergym.git
git fetch upstream develop
git checkout -b reproduce upstream/develop
```

## Install Python Dependencies

With your virtual environment active, install the project in editable mode. The `dev` and `server` extras expose linting hooks, helper scripts, and FastAPI components required for the reproduction workflow.

```bash
pip install -e '.[dev,server]'
```

Re-run the command whenever upstream changes introduce new dependencies. On Apple Silicon, set `ARCHFLAGS="-arch arm64"` if a build backend complains about missing architecture flags.

Double-check that `pip` resolves from the environment you activated:

```bash
which pip
python -m pip --version
```

Both commands should reference the virtual environment directory (e.g., `.venv/bin/pip` or the Conda env path).

## Prime Docker Images (Optional but Recommended)

Pull the core execution images ahead of time to avoid long delays during the first PoC run:

```bash
docker pull n132/arvo
docker pull cybergym/oss-fuzz-base-runner
```

You can mirror these images to an internal registry if your environment restricts Docker Hub access.

## Sanity Checks

Confirm that the Python entry points are visible and the FastAPI app boots in help mode:

```bash
python -m cybergym.server.main --help
python helpers/start_server.py --help
python helpers/test.py --help
python helpers/verify.py --help
```

All commands should print usage information without raising import errors. If any module fails to resolve, double-check that the editable installation succeeded and that your `PYTHONPATH` is not shadowing the project root.
