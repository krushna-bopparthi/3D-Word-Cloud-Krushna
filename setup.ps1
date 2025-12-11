Write-Host "=== 3D Word Cloud Project Setup ===" -ForegroundColor Cyan

# -------------------------------------------------
# 1. Backend Setup
# -------------------------------------------------
Write-Host "`n[1/5] Setting up backend..." -ForegroundColor Yellow

Set-Location "./backend"

# Create venv if not exists
if (!(Test-Path "venv")) {
    Write-Host "Creating virtual environment..."
    python -m venv venv
}

# Activate venv (safe method)
Write-Host "Activating virtual environment..."
& "./venv/Scripts/Activate.ps1"

# Install backend dependencies
Write-Host "Installing backend dependencies..."
pip install -r requirements.txt

# Start backend in new PowerShell window
Write-Host "Starting FastAPI backend..."
Start-Process powershell -ArgumentList "-NoExit", "uvicorn app:app --reload"

# Return to root
Set-Location "../"

# -------------------------------------------------
# 2. Frontend Setup
# -------------------------------------------------
Write-Host "`n[2/5] Setting up frontend..." -ForegroundColor Yellow

Set-Location "./frontend"

Write-Host "Installing frontend dependencies (this may take a while)..."
npm install

Write-Host "Starting frontend..."
Start-Process powershell -ArgumentList "-NoExit", "npm run dev"

# Return to project root
Set-Location "../"

# -------------------------------------------------
# Completion Message
# -------------------------------------------------
Write-Host "`n=== Setup Complete! Project is running. ===" -ForegroundColor Green
Write-Host "Backend → http://127.0.0.1:8000" -ForegroundColor Cyan
Write-Host "Frontend → http://localhost:5173/" -ForegroundColor Cyan
