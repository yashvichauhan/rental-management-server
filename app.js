const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { setupRoutes } = require('./routes');
const { setupErrorHandlers } = require('./middleware/errorHandlers');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

setupRoutes(app);
setupErrorHandlers(app);

module.exports = app;
