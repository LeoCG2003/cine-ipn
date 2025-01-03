const express = require('express');
const router = express.Router();
// Function to fetch cinema names
const Cinemas = require('../models/cinema'); // Ensure this points to your schema file

async function fetchCinemaNames() {
  try {
    const cinemas = await Cinemas.find({}, { name: 1, _id: 0 });
    console.log('Cinema Names:', cinemas);
  } catch (error) {
    console.error('Error fetching cinema names:', error);
  }
}

fetchCinemaNames();

module.exports = router;