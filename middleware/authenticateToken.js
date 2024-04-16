const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Authorization header is missing' });

    const tokenParts = authHeader.split(' ');

    if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
        return res.status(401).json({ message: 'Authorization header is malformed' });
    }

    const token = tokenParts[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            const message =
                err.name === 'JsonWebTokenError' ? 'Invalid token' :
                    err.name === 'TokenExpiredError' ? 'Token expired' :
                        'Token verification failed';
            return res.status(403).json({ message });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = authenticateToken;