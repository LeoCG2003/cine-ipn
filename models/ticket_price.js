const mongoose = require('mongoose');

const Ticket_Price = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: {type: Number, required: true},
  
});

module.exports = mongoose.model('ticket_price', Ticket_Price, 'Ticket_price');
