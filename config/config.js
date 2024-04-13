require('dotenv').config();

module.exports = {
    mongoUri: process.env.MONGODB_URI,
    port: process.env.PORT || 5000,
};