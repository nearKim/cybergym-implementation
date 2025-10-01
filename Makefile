.PHONY: help install dev test clean docs format lint setup

help:
	@echo "Available commands:"
	@echo "  setup      Set up uv and create virtual environment"
	@echo "  install    Install project dependencies with uv"
	@echo "  dev        Install development dependencies with uv"
	@echo "  test       Run tests"
	@echo "  clean      Clean build artifacts"
	@echo "  docs       Start documentation server"
	@echo "  format     Format code with black and isort"
	@echo "  lint       Run linting checks"

setup:
	@command -v uv >/dev/null 2>&1 || { echo "Installing uv..."; curl -LsSf https://astral.sh/uv/install.sh | sh; }
	uv venv
	@echo "Virtual environment created. Run 'source .venv/bin/activate' to activate"

install:
	uv pip install -e .

dev:
	uv pip install -e ".[dev]"
	pre-commit install

test:
	pytest tests/ -v --cov=cybergym --cov-report=html

clean:
	rm -rf build/ dist/ *.egg-info
	rm -rf .pytest_cache .coverage htmlcov
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete

docs:
	cd docs && npm install && npm start

docs-build:
	cd docs && npm install && npm run build

format:
	black cybergym/ scripts/ tests/
	isort cybergym/ scripts/ tests/

lint:
	flake8 cybergym/ scripts/ tests/
	mypy cybergym/
	black --check cybergym/ scripts/ tests/
	isort --check-only cybergym/ scripts/ tests/