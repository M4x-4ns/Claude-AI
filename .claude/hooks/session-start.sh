#!/bin/bash
set -euo pipefail

# Only run in remote (Claude Code on the web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"

cd "$PROJECT_DIR"

# Install Node.js dependencies if package.json exists
if [ -f "package.json" ]; then
  echo "Installing Node.js dependencies..."
  npm install
fi

# Install Python dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
  echo "Installing Python dependencies..."
  pip install -r requirements.txt
fi

# Install Python dependencies via pyproject.toml (Poetry or pip)
if [ -f "pyproject.toml" ]; then
  if command -v poetry &>/dev/null; then
    echo "Installing Python dependencies via Poetry..."
    poetry install --no-interaction
  else
    echo "Installing Python dependencies via pip..."
    pip install -e . 2>/dev/null || pip install -e ".[dev]" 2>/dev/null || true
  fi
fi

# Install Ruby dependencies if Gemfile exists
if [ -f "Gemfile" ]; then
  echo "Installing Ruby dependencies..."
  bundle install
fi

# Install Go dependencies if go.mod exists
if [ -f "go.mod" ]; then
  echo "Downloading Go modules..."
  go mod download
fi

# Install Rust dependencies if Cargo.toml exists
if [ -f "Cargo.toml" ]; then
  echo "Fetching Rust dependencies..."
  cargo fetch
fi

echo "Session start hook completed successfully."
