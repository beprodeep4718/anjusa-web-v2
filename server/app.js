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
import artworkRoutes from './routes/artwork.route.js';
import adminRoutes from './routes/admin.route.js';
import studentRoutes from './routes/student.route.js';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CORS_ORIGIN?.split(',') || [
    'http://localhost:5173',
    'http://localhost:3000'
  ],
}));

app.use("/api/notice", noticeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/artwork", artworkRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/", (_, res) => {
  res.send("Welcome to Anjusa API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
  connectDB();
});