import { Request } from 'express';
import mongoose from 'mongoose';

export type AuthedRequest = Request & {
  user: { objectId: mongoose.Types.ObjectId; email: string; role: string };
};
