import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { AppDataSource } from './config/db';
import apiRoutes from './routes/routes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

// --- Middlewares ---
// Enable CORS for all routes (allows your frontend to connect)
app.use(cors());

app.use(express.json());

// --- API Routes ---
app.use('/api', apiRoutes);

// Simple health-check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP' });
});

// Initialize database connection and start server
const startServer = async () => {
  try {
    // Initialize the data source
    await AppDataSource.initialize();
    console.log('✅ Database connected successfully');

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error during database initialization:', error);
    process.exit(1);
  }
};

startServer();