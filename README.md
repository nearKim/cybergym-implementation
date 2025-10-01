# CyberGym Implementation

Implementation of ["CyberGym: Competitive Multi-Agent Reinforcement Learning with Adaptive Opponent Synthesis"](https://arxiv.org/pdf/2506.02548)

## 🚀 Quick Start

### Prerequisites

Install `uv` for fast Python package management:
```bash
# On macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Or with Homebrew
brew install uv
```

### Installation

```bash
# Clone the repository
git clone https://github.com/nearKim/cybergym-implementation.git
cd cybergym-implementation

# Create virtual environment with uv
uv venv

# Activate virtual environment
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies with uv
uv pip install -e .

# For development (includes testing and linting tools)
uv pip install -e ".[dev]"
```

### Running Experiments

```bash
# Train baseline agent
python scripts/train.py

# Run with custom config
python scripts/train.py agent.learning_rate=1e-4 training.total_timesteps=500000

# Run hyperparameter sweep
python scripts/train.py --multirun agent.learning_rate=1e-4,3e-4,1e-3
```

## 📚 Documentation

Documentation is automatically deployed to GitHub Pages and available at:
- **Production**: https://nearkim.github.io/cybergym-implementation/
- **Local Development**: [http://localhost:3000](http://localhost:3000)

### Local Documentation Server

```bash
cd docs
npm install
npm start
```

### GitHub Pages Setup

1. Go to **Settings** → **Pages** in your GitHub repository
2. Under **Source**, select **GitHub Actions**
3. Push changes to the `main` branch to trigger automatic deployment

## 🏗️ Project Structure

```
cybergym-implementation/
├── cybergym/               # Core implementation
│   ├── agents/            # RL agent implementations
│   ├── environments/      # Cybersecurity environments
│   ├── models/           # Neural network architectures
│   ├── utils/            # Utility functions
│   └── configs/          # Configuration management
├── data/                 # Data directory
│   ├── raw/             # Raw experimental data
│   ├── processed/       # Processed datasets
│   └── results/         # Experimental results
├── docs/                # Documentation (Docusaurus)
├── experiments/         # Experiment scripts
│   ├── baselines/      # Baseline comparisons
│   └── ablations/      # Ablation studies
├── notebooks/          # Jupyter notebooks
├── scripts/           # Training and evaluation scripts
└── tests/            # Unit tests
```

## 🔬 Reproducing Paper Results

To reproduce the results from the paper:

```bash
# Run all baseline experiments
bash experiments/run_baselines.sh

# Run ablation studies
bash experiments/run_ablations.sh
```

## 📊 Experiment Tracking

We use Weights & Biases for experiment tracking. Set up your account:

```bash
wandb login
```

## 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=cybergym --cov-report=html
```

## 🛠️ Development

### Using uv for dependency management

```bash
# Add a new dependency
uv pip install package-name

# Sync dependencies from pyproject.toml
uv pip sync

# Upgrade a specific package
uv pip install --upgrade package-name

# Lock dependencies
uv pip compile pyproject.toml -o uv.lock
```

### Code Quality

```bash
# Format code
make format

# Run linting
make lint

# Install pre-commit hooks
pre-commit install
```

## 📝 Citation

If you use this code in your research, please cite:

```bibtex
@article{cybergym2024,
  title={CyberGym: Competitive Multi-Agent Reinforcement Learning with Adaptive Opponent Synthesis},
  author={...},
  journal={arXiv preprint arXiv:2506.02548},
  year={2024}
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.