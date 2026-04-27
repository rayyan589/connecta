#!/bin/bash
echo "Starting Connect..."

# Start backend
cd backend && npm install && npm run dev &
BACKEND_PID=$!

sleep 3

# Start frontend
cd ../frontend && npm install && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Backend:  http://localhost:5000"
echo "✅ Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

wait $BACKEND_PID $FRONTEND_PID
