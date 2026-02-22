import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import { connectDB } from './db/index.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import './passport.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Trust proxy is required for Render/Vercel/Heroku to correctly identify protocol (http vs https)
app.set('trust proxy', 1);

app.use(cors({
    origin: [
        'http://localhost:5173', 
        process.env.CLIENT_URL,
        'https://peer-to-peer-barter-system.vercel.app' 
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(passport.initialize());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/sessions', sessionRoutes);

app.get('/', (req, res) => {
  res.send('SkillBarter API is running');
});

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || []
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
