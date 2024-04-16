const express = require('express');
const router = express.Router();
const { createTicket, getTickets, updateTicket } = require('../controllers/supportController');
const { isAdmin } = require('../middleware/authMiddleware');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/tickets', authenticateToken, createTicket);

module.exports = router;
