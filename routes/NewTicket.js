const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket_price'); 


router.post('/', async (req, res) => {
  try {
    const { name, price} = req.body;

    // Create a new cinema document
    const newTicket = new Ticket({
      name,
      price,
    });

    await newTicket.save();

    res.status(201).json({ message: 'Ticket created successfully', Ticket: newTicket });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload ticket', details: error.message });
  }
});


module.exports = router;