const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');

app.use(express.json());

router.post('/', async (req, res) => {
  try {
    const { user, password } = req.body;

    // Validate the input
    if (!user || !password) {
      return res.status(400).json({ error: 'Missing username or password' });
    }

    console.log('User Input Username:', user);
    console.log('User Input Password:', password);

    // Find admin by username
    const admin = await Admin.findOne({ User_name: user });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials (user not found)' });
    }

    console.log('Admin from DB:', admin);

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, admin.Password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials (password mismatch)' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful', admin });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
