const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');
const { spawn } = require('child_process');

router.post('/', async (req, res) => {
  try {
    const { name, User_name, email, Password } = req.body;

    // Check if the email is already registered
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create a new admin document
    const newAdmin = new Admin({
      name,
      email,
      User_name,
      Password: hashedPassword,
    });

    await newAdmin.save();

    // Send the password via email
    const pythonProcess = spawn('python', ['./routes/send_email.py', email, Password]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`Email sent: ${data.toString()}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error sending email: ${data.toString()}`);
    });

    res.status(201).json({ message: 'Admin created and email sent successfully', Admin: newAdmin });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: 'Failed to create admin', details: error.message });
  }
});

module.exports = router;
