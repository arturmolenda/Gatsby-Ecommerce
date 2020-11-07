import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import products from './data/products.js';
dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
  app.use(morgan('dev'));
}

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
