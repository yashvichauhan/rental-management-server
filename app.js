const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes);

module.exports = app;