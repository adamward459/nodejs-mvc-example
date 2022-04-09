import { Request } from 'express';

export type AuthedRequest = Request & {
  user: { objectId: string; email: string; role: string };
};
