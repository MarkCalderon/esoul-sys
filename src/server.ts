import { RouteError } from './core/types';
import { Request, Response, NextFunction } from 'express';
import express from 'express';

require('dotenv').config();
require('./core/passport.config');

const morgan = require('morgan');
const mongoLib = require('./lib.mongo');

const app = express();
const port = process.env.PORT;

// General middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// DB Connection
mongoLib.connect({ url: process.env.DATABASE_URL});

// Routes
app.use('/reservations', require('./entities/reservation/reservation.routes'));
app.use('/', (_req: Request, res: Response): Response => res.json("Hello World!"));

// Guard routes
app.use((_req: Request, res: Response, next: NextFunction) => {
  const error: RouteError = new Error('Not Found');
  error.status = 404;
  error.message = 'Route not found';
  next(error);
});

app.use((error: RouteError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || 'Internal Server Error',
      status: error.status,
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});