const express = require('express');
const router = express.Router();
const TheaterRoom = require('../../models/seats');

router.post('/', async (req, res) => {
  try {
    const { name, seats } = req.body;
    

    if (!name || !seats) {
      return res.status(400).json({ error: 'Name and seats are required' });
    }

    const room = new TheaterRoom({
      name: req.body.name,
      seats: req.body.seats,
    });

    await room.save();

    res.status(201).json({ message: 'Room saved successfully', room });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save room', details: error.message });
  }
});

module.exports = router;
