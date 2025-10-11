import express from 'express';
const app = express();
import dotenv from 'dotenv';
import { connectDB } from './config/dbConnect.js';
import cookieParser from 'cookie-parser';
import ErrorMiddleware from './middleware/errors.js';


// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to uncaught exception');
  process.exit(1);
});

// Load environment variables
dotenv.config({ path: 'backend/config/config.env' });

// Import database connection
connectDB();

app.use(express.json());
app.use(cookieParser());

// Import all routes
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js';

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);

// Using error middleware
app.use(ErrorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandled promise rejection');
  server.close(() => {
    process.exit(1);
  });
});