---
sidebar_position: 2
---

# Installation

This section covers the installation process for CyberGym.

## Clone the Repository
1. Clone the CyberGym repository:
```bash
git clone https://github.com/nearKim/cybergym.git
git checkout develop
```
2. Right now you should have a repository called `cybergym`. It's recommended to work from the `develop` branch. It's beneficial to save the environment variable of cybergym root directory:

Bash
```bash
cd cybergym
CYBERGYM_ROOT=$(pwd)
```

Fish
```sh
cd cybergym
set CYBERGYM_ROOT (pwd)
```

## Python Environment and Docker
### Virtual Environment Setup
1. It is recommended to use a [Miniconda](https://www.anaconda.com/docs/getting-started/miniconda/install) virtual environment to manage dependencies. You can create a virtual environment using the following command:
```bash
conda create -n cybergym 'python==3.12' 
```
2. Activate the virtual environment:
```bash
conda activate cybergym
```
3. Verify that you are using `pip` from the virtual environment:
```bash
which pip
```
4. At the root directory of the cybergym repository, install the required Python packages using pip:
```bash
pip install -e '.[dev,server]'
```

### Docker Installation
1. Please use a Docker Desktop. Note that `colima` is not properly supported.
2. Install Docker from [Docker's official website](https://www.docker.com/products/docker-desktop/)

## Download Server Data
1. Download the subset of server data required for CyberGym. You can use the following command:
```bash
python scripts/server_data/download_subset.py
wget https://huggingface.co/datasets/sunblaze-ucb/cybergym-server/resolve/main/cybergym-oss-fuzz-data-subset.7z
7z x cybergym-oss-fuzz-data-subset.7z
```