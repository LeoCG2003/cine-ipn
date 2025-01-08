const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  sinopsis: { type: String, required: true },
  gender: { type: mongoose.Schema.Types.ObjectId, ref: 'Gender', required: true },
  language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true },
  subtitles: { type: mongoose.Schema.Types.ObjectId, ref: 'Language' }, // Assuming subtitles reference languages
  classification: { type: mongoose.Schema.Types.ObjectId, ref: 'Classification', required: true },
  director: { type: String, required: true },
  studio: { type: String, required: true },
  year: { type: Number, required: true },
  duration: { type: Number, required: true },
  image: { type: String, required: true }, // URL of the image in Google Drive
  sold: { type: String, default: 0 },
});

module.exports = mongoose.model('Movie', MovieSchema);
