const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: String,
  sinopsis: String,
  gender: String,
  language: String,
  subtitles: String,
  director: String,
  studio: String,
  year: Number,
  duration: Number,
  image: String, // Add this to store the image path
});

module.exports = mongoose.model('Movie', MovieSchema);
