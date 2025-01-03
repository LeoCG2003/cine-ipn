const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  location: { type: String, required: false},
  name: { type: String, required: true},
  contact: { type: Number, required: false},
});

module.exports = mongoose.model('cinemas', cinemaSchema); 
