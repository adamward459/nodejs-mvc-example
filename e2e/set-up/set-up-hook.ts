import path from 'node:path';

import { config } from 'dotenv';
import mongoose from 'mongoose';

config({
  path: path.resolve(process.cwd(), '.env.test'),
});

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI);
  console.log('Connected to DB test');
});

afterAll(async () => {
  await mongoose.connection.close();
  console.log('Disconnected from DB test');
});
