const setupErrorHandlers = (app) => {
    app.use((req, res, next) => {
        res.status(404).send({ message: 'Resource not found' });
    });

    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    });
}

module.exports = { setupErrorHandlers };