const express = require('express');
const Pelicula = require('../models/Movie');
const router = express.Router();

router.get('/movies', async (req, res) => {
  try {
    const movies = await Pelicula.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las películas', details: error.message });
  }
});

router.get('/moviesByName', async (req, res) => {
  try {
    const movieName = req.query.MoviesByName;
    console.log(movieName);

    if (!movieName) {
      return res.status(400).json({ error: 'Missing "MoviesByName" query parameter' });
    }

    const movies = await Pelicula.find({ name: movieName });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movies', details: error.message });
  }
});


module.exports = router;
