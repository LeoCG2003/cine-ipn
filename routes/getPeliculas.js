const express = require('express');
const Pelicula = require('../models/Movie'); // Asegúrate de que el modelo esté definido correctamente
const router = express.Router();

router.get('/movies', async (req, res) => {
  try {
    const movies = await Pelicula.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las películas', details: error.message });
  }
});

module.exports = router;
