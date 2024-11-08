import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
// Routers
import jobRouter from './routes/jobRouter.js';

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

app.post('/', (req, res) => {
  res.json({ message: 'data received', data: { message: req.body } });
});

// Job Router
app.use('/api/v1/jobs', jobRouter);

// Not Found Route
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not Found!' });
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'Something Went Wrong' });
});

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
