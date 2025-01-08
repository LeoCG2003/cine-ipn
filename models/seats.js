const mongoose = require('mongoose');

const TheaterRoomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seats: [
    {
      row: { type: Number, required: true },
      column: { type: Number, required: true },
      state: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('TheaterRoom', TheaterRoomSchema, 'theatherRoom');
