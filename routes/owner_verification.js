const express = require('express');
const multer = require('multer');
const router = express.Router();
const Owner = require('../models/owner');

// Configure multer to parse FormData
const upload = multer();

router.post('/', upload.none(), async (req, res) => {
    //console.log('Request body:', req.body); 
    
    try {
      const A = req.body;
      const owner = await Owner.find(A);
      if (owner && owner.length > 0) {
        res.status(200).json({ message: 'Login successful', owner });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error.message });
    }
});

module.exports = router;
