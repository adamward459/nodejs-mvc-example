import mongoose from 'mongoose';

import { app } from './server';

mongoose.connect(process.env.DB_URI, () => {
  console.log('Connected to db successfully');
  mongoose.set('debug', true);
});

app.listen(3000, () => {
  console.log('Server is running at PORT: 3000');
});
