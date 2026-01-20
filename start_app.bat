@echo off
SETLOCAL

:: Get the directory of the script
SET "SCRIPT_DIR=%~dp0"
CD /D "%SCRIPT_DIR%"

echo ==========================================
echo Starting Sorrawit.AI Web Resume
echo ==========================================

:: Start Backend
echo Starting Python Backend (Sorrawit.AI)...
:: Check if venv exists and use it
IF EXIST "backend\venv\Scripts\python.exe" (
    echo Found venv, using it...
    start "Sorrawit.AI Backend" cmd /k "backend\venv\Scripts\python backend/main.py"
) ELSE (
    echo Venv not found, using global python...
    start "Sorrawit.AI Backend" cmd /k "python backend/main.py"
)

:: Wait for backend to start
timeout /t 3 /nobreak >nul

:: Start Frontend
echo Starting React Frontend...
start "Sorrawit.AI Frontend" cmd /k "npm run dev -- --open"

echo ==========================================
echo Access the resume at: http://localhost:5173
echo Backend API at: http://localhost:9743
echo ==========================================
echo Press any key to close this launcher (servers will keep running)...
pause
