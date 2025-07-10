import express from 'express';
const app = express();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

import noticeRoutes from './routes/notice.route.js';
import authRoutes from './routes/auth.route.js';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
}));

app.use("/api/notice", noticeRoutes);
app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Anjusa API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
  connectDB();
});