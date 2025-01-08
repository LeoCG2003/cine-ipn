const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
  movie_name: { type: String, required: true},
  classification: { type: String, required: true},
  start: { type: Date, required: true},
  finish: { type: Date, required: true},
  price: {type: Number, required: true},
  room_name: {type: String, required: true},
  seats: [
    {
      row: { type: Number, required: true },
      column: { type: Number, required: true },
      state: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('show', ShowSchema);