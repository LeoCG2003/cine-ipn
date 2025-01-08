const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({

  Name: { type: String, required: true },

});

module.exports = mongoose.model('Language', languageSchema,'language');