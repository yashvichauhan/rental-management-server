require('dotenv').config();
const app = require('./app');
const { connectDB, closeDB } = require('./config/database');
const { handleGracefulShutdown } = require('./utils/shutdown');

const PORT = process.env.PORT || 5000;

connectDB();

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

handleGracefulShutdown(server);