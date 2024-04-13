const userRoutes = require('./userRoutes');
const propertyRoutes = require('./propertyRoute');

const setupRoutes = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/properties', propertyRoutes);
}

module.exports = { setupRoutes };
