const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Admin = require('../models/admin');

router.post('/', async (req, res) => {
  try {
    const { cinemaId, name, User_name, email } = req.body;

    // Create a new cinema document
    const newAdmin = new Admin({
      cinemaId,
      name,
      email,
      User_name,
      Password,
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Movie uploaded successfully', Admin: newAdmin });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload movie', details: error.message });
  }
});


module.exports = router;