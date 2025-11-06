import { RouteError } from './core/types';
import express from 'express';
const morgan = require('morgan');
const mongoLib = require('./lib.mongo');


const app = express();
const port = 4343;

require('dotenv').config();
require('./core/passport.config');

// General middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// DB Connection
mongoLib.connect({ url: process.env.DATABASE_URL});

// Routes
app.use('/reservations', require('./entities/reservation/reservation.routes'));
app.use('/', (_req: express.Request, res: express.Response): express.Response => res.json("Hello World!"));

// Guard routes
app.use((_req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error: RouteError = new Error('Not Found');
  error.status = 404;
  error.message = 'Route not found';
  next(error);
});

app.use((error: RouteError, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
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