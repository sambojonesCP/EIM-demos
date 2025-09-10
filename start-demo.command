#!/bin/bash
echo "Starting EIM Demo Application..."
echo "Installing dependencies (if needed)..."
npm install --silent
echo "Starting server on http://localhost:3000"
echo "Your browser should open automatically. If not, open http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the demo"
echo ""

# Try to open browser automatically
if command -v open &> /dev/null; then
    open http://localhost:3000 &
elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000 &
fi

npm run serve
