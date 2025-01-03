
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  Cinema_id: { type: String, required: true},
  Name: { type: String, required: true },
  User_name: { type: String, required: true },
  Password: { type: String, required: true },
  email: { type: String, required: true },

});

module.exports = mongoose.model('Admin', adminSchema,'admin');
