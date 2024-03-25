const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const mongoose= require('mongoose')
require('dotenv').config()
const authRoute = require('./routes/authRoute')
const {requireAuth, authAdmin} = require("./utils/utils");
const adminRoute = require( './routes/adminRoute');

// middlewares
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

// database connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/', authRoute);
app.use('/admin', authAdmin, adminRoute);