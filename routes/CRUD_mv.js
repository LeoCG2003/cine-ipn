const express = require('express');
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

    // Find the movie name by ID
    const movieData = await Movie.findByIdAndDelete(movie_id);
    if (!movieData) {
      return res.status(404).json({ error: 'Movie not found.' });
    }
    res.json(movieData);
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ error: 'Failed to delete movie.', details: error.message });
  }
});

module.exports = router;
