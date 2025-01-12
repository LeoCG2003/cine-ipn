const express = require('express');
const router = express.Router();
const TheaterRoom = require('../models/seats');
const Movies = require('../models/Movie');
const Show = require('../models/function');
const { spawn } = require('child_process');

router.post('/', async (req, res) => {
  const { email, reservedSeats, showId, movieName } = req.body;
  const message = { reservedSeats, showId };
  const jsonMessage = JSON.stringify(message);

  // Validate required data
  if (!email || !reservedSeats || !showId) {
    return res.status(400).send('Missing required data');
  }

  try {
    // Extract seat IDs
    const seatIds = reservedSeats.map((seat) => seat._id);

    // Find the show by ID and update the seats' states
    const show = await Show.findById(showId).populate('seats');
    if (!show) {
      return res.status(404).send('Show not found');
    }

    let seatsUpdated = 0;

    // Update seat states
    show.seats.forEach((seat) => {
      if (seatIds.includes(seat._id.toString()) && seat.state !== 2) {
        seat.state = 2; // Mark as reserved
        seatsUpdated++;
      }
    });

    // If no seats were updated, return a response
    if (seatsUpdated === 0) {
      return res.status(400).send('No seats were updated (may already be reserved)');
    }

    // Save the updated show
    await show.save();
          // Send the password via email
    const pythonProcess = spawn('python', ['./routes/send_tickets.py', email, jsonMessage]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`Email sent: ${data.toString()}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error sending email: ${data.toString()}`);
    });

      res.status(200).send({ message: 'Seats updated successfully', show });
  } catch (error) {
      console.error('Error updating seats:', error);
      res.status(500).send('Internal Server Error');
  }
});
module.exports = router;
