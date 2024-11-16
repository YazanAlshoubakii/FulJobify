import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import { validateTest } from './middleware/validationMiddleware.js';

// Routers
import jobRouter from './routes/jobRouter.js';

// Middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/v1/test', validateTest, (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello ${name}!` });
});

// Job Router
app.use('/api/v1/jobs', jobRouter);

// Not Found Route
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not Found!' });
});

//Error Handling Middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server Running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
