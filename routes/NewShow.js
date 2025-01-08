const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Ticket = require('../models/ticket_price');
const Room = require('../models/seats');
const Show = require('../models/function');

function addMinutesToTime(time, wait) {
  const date = new Date(time);
  date.setMinutes(date.getMinutes() + wait);
  return date.toLocaleString();
}

router.post('/', async (req, res) => {
  try {
    const { name, price, time, room, wait } = req.body;

    // Fetch movie details
    const movie = await Movie.findOne({_id: name }).select('name classification language duration -_id');
    if (!movie) {
      return res.status(404).json({ error: `Movie with name "${name}" not found` });
    }

    // Fetch ticket details
    const ticket = await Ticket.findOne({ _id: price }).select('price -_id');
    if (!ticket) {
      return res.status(404).json({ error: `Ticket with price "${price}" not found` });
    }

    // Fetch room details
    const theaterRoom = await Room.findOne({_id: room }).select('name seats -_id');
    if (!theaterRoom) {
      return res.status(404).json({ error: `Room with name "${room}" not found` });
    }

    const minutes = Number(movie.duration) + Number(wait);
    const end_time = addMinutesToTime(time, minutes);
    // Check for overlapping shows in the same room
    const overlappingShow = await Show.findOne({
      room_name: theaterRoom.name,
      $or: [
        { start: { $lt: end_time }, finish: { $gt: time } }, // Overlap condition
      ],
    });

    if (overlappingShow) {
      return res.status(400).json({
        error: 'Room is already booked for this time period.',
        details: {
          existingShow: overlappingShow,
        },
      });
    }
    // Create a new show record
    const newShow = new Show({
      movie_name: movie.name,
      classification: movie.classification,
      price: ticket.price,
      start: time,
      finish: time,
      finish: end_time,
      room_name: theaterRoom.name,
      seats: theaterRoom.seats,
      
    });

    await newShow.save();

    res.status(201).json({ message: 'Show created successfully', show: newShow });
  } catch (error) {
    console.error('Error creating show:', error);
    res.status(500).json({ error: 'Failed to create show', details: error.message });
  }
});

module.exports = router;
