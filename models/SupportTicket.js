const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'open', enum: ['open', 'closed'] },
    responses: [{ text: String, date: Date }]
}, { timestamps: true });

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
