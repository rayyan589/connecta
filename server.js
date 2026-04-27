require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const { connectDB } = require('./config/database');
const routes = require('./routes/index');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { generalLimiter } = require('./middleware/rateLimiter');
const { setupSocket } = require('./services/socketService');
const logger = require('./utils/logger');

const app = express();
const server = http.createServer(app);

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

app.use(cors({
  origin: (origin, cb) => {
    // Allow all localhost/127.0.0.1 origins in development
    if (!origin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return cb(null, true);
    }
    const allowed = (process.env.FRONTEND_URL || '').split(',').map(o => o.trim()).filter(Boolean);
    if (allowed.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use('/api/', generalLimiter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads/profiles')));

app.get('/health', (req, res) => res.json({ success: true, message: 'Connect API running' }));
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

const io = new Server(server, {
  cors: { origin: (origin, cb) => cb(null, true), methods: ['GET', 'POST'], credentials: true },
  connectionStateRecovery: { maxDisconnectionDuration: 2 * 60 * 1000 },
});

setupSocket(io);
app.set('io', io);

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    logger.info(`Open http://localhost:5173 in your browser`);
  });
};

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled rejection:', err);
  server.close(() => process.exit(1));
});

start();
