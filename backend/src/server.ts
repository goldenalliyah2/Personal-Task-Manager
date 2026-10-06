import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'MONGODB_URI is not defined in the environment variables.',
  );
}

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(
        `TaskDuty API running on http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();