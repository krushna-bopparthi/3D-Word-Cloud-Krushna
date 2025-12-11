#!/bin/bash

echo "=== 3D Word Cloud Project Setup (macOS/Linux) ==="

# -------------------------------------------------
# 1. Backend Setup
# -------------------------------------------------
echo ""
echo "[1/5] Setting up backend..."

cd ./backend || exit

# Create venv if not exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv
echo "Activating virtual environment..."
source venv/bin/activate

# Install backend dependencies
echo "Installing backend dependencies..."
pip install -r requirements.txt

# Start backend in background
echo "Starting FastAPI backend..."
nohup uvicorn app:app --reload > backend.log 2>&1 &

# Go back to root
cd ..

# -------------------------------------------------
# 2. Frontend Setup
# -------------------------------------------------
echo ""
echo "[2/5] Setting up frontend..."

cd ./frontend || exit

echo "Installing frontend dependencies..."
npm install

echo "Starting frontend..."
nohup npm run dev > frontend.log 2>&1 &

cd ..

# -------------------------------------------------
# 3. Completion Message
# -------------------------------------------------
echo ""
echo "=== Setup Complete! Project is running. ==="
echo "Backend → http://127.0.0.1:8000"
echo "Swagger Docs → http://127.0.0.1:8000/docs"
echo "Frontend → http://localhost:5173/"
echo ""
echo "Logs: backend.log / frontend.log"
