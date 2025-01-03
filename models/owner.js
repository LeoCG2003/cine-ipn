const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  email: String,
  Password: String,
  name: String,
});

module.exports = mongoose.model('Owner', ownerSchema, 'owner'); // Ensure 'owner' matches the collection name
