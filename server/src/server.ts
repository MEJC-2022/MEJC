import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { app } from './app';

dotenv.config();
const {MONGO_URL, MONGO_PORT} = process.env;

app.use(express.json());

async function main() {
  if (!MONGO_URL) {
    throw new Error('MONGO_URL environment variable is not set.');
  }
  if (!MONGO_PORT) {
    throw new Error('PORT environment variable is not set.');
  }

  await mongoose.connect(MONGO_URL);
  console.log('Connected to database');

  app.listen(MONGO_PORT, () => {
    console.log(`Server is running: http://localhost:${MONGO_PORT}`);
  });
}

main().catch(console.error);
