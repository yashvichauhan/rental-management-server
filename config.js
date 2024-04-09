require('dotenv').config();

module.exports = {
    mongoUri: process.env.MONGODB_URI || 'mongodb+srv://yghasempour1:MwedjmDheur611tZ@yasharcluster.ygwlgkp.mongodb.net/?retryWrites=true&w=majority&appName=YasharCluster',
    port: process.env.PORT || 5000,
};
