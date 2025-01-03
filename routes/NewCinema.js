const express = require('express');
const router = express.Router();
const Cinema = require('../models/cinema');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

router.post('/', async (req, res) => {
  try {
    const { name, location, contact } = req.body;

    // Create a new cinema document
    const newCinema = new Cinema({
      name,
      location,
      contact,
    });

    await newCinema.save();

    res.status(201).json({ message: 'Movie uploaded successfully', Cinema: newCinema });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload movie', details: error.message });
  }
});


module.exports = router;
