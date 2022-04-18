import { config } from 'dotenv';
import express, { Request } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

config();

import middlewares from './middlewares';
import routes from './routes';

export const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.json());
morgan.token('body', (req: Request) => JSON.stringify(req.body));
app.use(
  morgan(
    ':http-version :method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
  )
);

routes.forEach((route) => {
  const middlewares = route.middlewares || [];
  app[route.method](route.path, ...middlewares, route.controller);

  console.log(`Route: ${route.path}, method: ${route.method.toUpperCase()}`);
});

app.use(middlewares.handleAppError);
