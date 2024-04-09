const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = config.port || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));