const SupportTicket = require('../models/SupportTicket');
const jwt = require('jsonwebtoken');

exports.createTicket = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { description } = req.body;
        const newTicket = new SupportTicket({
            user: decoded.userId,
            description
        });

        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: "Error creating support ticket", error: error.toString() });
    }
};

exports.getTickets = async (req, res) => {
    try {
        const tickets = await SupportTicket.find().populate('user', 'fullName');
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tickets", error: error.toString() });
    }
};

exports.updateTicket = async (req, res) => {
    const { ticketId } = req.params;
    const { response } = req.body;
    try {
        const ticket = await SupportTicket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        ticket.responses.push({ text: response, date: new Date() });
        await ticket.save();
        res.json({ message: "Ticket updated", ticket });
    } catch (error) {
        res.status(500).json({ message: "Error updating ticket", error: error.toString() });
    }
};

exports.closeTicket = async (req, res) => {
    const { ticketId } = req.params;

    try {
        const ticket = await SupportTicket.findByIdAndUpdate(ticketId, { status: 'closed' }, { new: true });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json({ message: "Ticket closed successfully", ticket });
    } catch (error) {
        res.status(500).json({ message: "Error closing ticket", error });
    }
};
