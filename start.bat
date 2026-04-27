@echo off
echo Starting Connect...
echo.
echo [1/2] Starting Backend...
start "Connect Backend" cmd /k "cd backend && npm install && npm run dev"
timeout /t 3 /nobreak >nul
echo [2/2] Starting Frontend...
start "Connect Frontend" cmd /k "cd frontend && npm install && npm run dev"
echo.
echo Both servers starting. Open http://localhost:5173 in your browser.
pause
