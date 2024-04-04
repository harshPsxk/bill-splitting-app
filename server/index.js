const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());

console.log('MongoDB URI:', process.env.MONGO_URI);

const connectDB = require('./config/db');
connectDB()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed', err);
    process.exit(1);
  });

app.use(express.json());

const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
