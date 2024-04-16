const express = require('express');
const router = express.Router();
const { getAllUsersAdmin, updateUser, deleteUser, createUser, toggleUserVerification } = require('../controllers/adminController');
const { isAdmin } = require('../middleware/authMiddleware');
const { getTickets, updateTicket, closeTicket } = require('../controllers/supportController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/users', isAdmin, getAllUsersAdmin);
router.put('/users/:userId', isAdmin, updateUser);
router.delete('/users/:userId', isAdmin, deleteUser);
router.post('/users', isAdmin, createUser);
router.put('/users/:userId/verify', isAdmin, toggleUserVerification);
router.get('/tickets', authenticateToken, isAdmin, getTickets);
router.put('/tickets/:ticketId', isAdmin, updateTicket);
router.put('/tickets/:ticketId/close', isAdmin, closeTicket);

module.exports = router;