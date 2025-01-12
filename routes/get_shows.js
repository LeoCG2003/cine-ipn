const express = require('express');
const show = require('../models/function');
const Movie = require('../models/Movie'); // Correct casing
const router = express.Router();

console.log('in route');

// Get shows for a specific movie
router.get('/movie_Id', async (req, res) => {
  try {
    // Access `movie_id` from the query string
    const { movie_id } = req.query;

    if (!movie_id) {
      return res.status(400).json({ error: 'movie_id query parameter is required.' });
    }

    console.log(`Fetching shows for movie ID: ${movie_id}`);

    // Find the movie name by ID
    const movieData = await Movie.findById(movie_id).select('name -_id');
    if (!movieData) {
      return res.status(404).json({ error: 'Movie not found.' });
    }

    const movieName = movieData.name;

    // Fetch shows for the movie
    const shows = await show.find({ movie_name: movieName }).populate('room_name').exec();
    

    if (!shows.length) {
      return res.status(404).json({ error: 'No shows found for this movie.' });
    }

    res.json(shows);
  } catch (error) {
    console.error('Error fetching shows:', error);
    res.status(500).json({ error: 'Failed to fetch shows.', details: error.message });
  }
});

module.exports = router;
