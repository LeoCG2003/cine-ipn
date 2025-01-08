const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Ticket = require('../models/ticket_price');
const Room = require('../models/seats');
// Fetch all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movies', details: error.message });
  }
});

// Fetch all ticket prices
router.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tickets', details: error.message });
  }
});

// Fetch all theater rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching rooms', details: error.message });
  }
});

module.exports = router;
