const mongoose = require('mongoose');

const genderSchema = new mongoose.Schema({

  Name: { type: String, required: true },

});

module.exports = mongoose.model('Gender', genderSchema,'gender');