const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const collection = require('../models/cinema');

router.post('/', async (req, res) => {
    try {
      // Fetch all cinema documents
      const data = await collection.find();
      console.log(data);
  
      res.status(201).json({ message: 'Successfully retrieved data', data });
    } catch (error) {
      res.status(500).json({ error: 'Failed', details: error.message });
    }
  });
  


module.exports = router;