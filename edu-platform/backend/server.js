import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// ✅ Route imports
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ CORS with credentials and specific origin
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('✅ MongoDB connected');
});

// ✅ API Routes
app.use('/api/users', userRoutes);               // Register, login
app.use('/api/courses', courseRoutes);           // Get all courses
app.use('/api/quizzes', quizRoutes);             // Get quiz by courseId
app.use('/api/certificates', certificateRoutes); // Generate and fetch certificate

// ✅ Base route
app.get('/', (req, res) => {
  res.send('SkillVerse Backend Running');
});

// ✅ 404 route handler
app.use((req, res) => {
  res.status(404).json({ message: '❌ Route not found' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
