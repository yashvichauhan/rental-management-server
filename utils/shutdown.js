const { closeDB } = require('../config/database');

const handleGracefulShutdown = (server) => {
    process.on('SIGINT', () => {
        console.log('SIGINT signal received: closing HTTP server');
        server.close(() => {
            console.log('HTTP server closed');
            closeDB();
        });
    });
}

module.exports = { handleGracefulShutdown };
