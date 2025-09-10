@echo off
echo Starting EIM Demo Application...
echo Installing dependencies (if needed)...
call npm install --silent
echo Starting server on http://localhost:3000
echo Your browser should open automatically. If not, open http://localhost:3000
echo.
echo Press Ctrl+C to stop the demo
echo.

REM Try to open browser automatically
start http://localhost:3000

call npm run serve
pause
