const express = require('express');
const router = express.Router();
const multer = require('multer');
const Admin = require('../models/admin');

const upload = multer();

router.post('/', async (req, res) => {
    
    try {
      const A = req.body;
      const admin = await Admin.find(A);
      console.log('data ',A); 
      if (admin && admin.length > 0) {
        res.status(200).json({ message: 'Login successful', admin });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  });
  

module.exports = router;
