const mongoose = require('mongoose');

const classificationSchema = new mongoose.Schema({

  Name: { type: String, required: true },

});

module.exports = mongoose.model('Classification', classificationSchema,'classification');