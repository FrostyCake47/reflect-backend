// src/app.ts
import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import connectDB from './config/db';
import chapterRoutes from './routes/chapterRoutes';
import entryRoutes from './routes/entryRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!.. DOes it edit now');
});


app.use('/api/users', userRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/entries', entryRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

