const userRoutes = require('./userRoutes');
const propertyRoutes = require('./propertyRoute');
const adminRoutes = require('./adminRoutes');
const supportRoutes = require('./supportRoutes')

const setupRoutes = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/properties', propertyRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/support', supportRoutes);
}

module.exports = { setupRoutes };