const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const fs = require('fs');
const Movie = require('../models/Movie');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Google Drive API setup
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const KEYFILEPATH = path.join(__dirname, '../admin(YO)/proyecto-cine-ipn-admin.json');

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});


const drive = google.drive({ version: 'v3', auth });

const { PassThrough } = require('stream');

async function uploadToGoogleDrive(file) {
  const fileMetadata = {
    name: file.originalname,
    parents: ['1HxBDJBDbeU_MbWu4nG0xbzXO50NesUjx'], // Replace with your Google Drive folder ID
  };

  // Convert buffer to stream
  const bufferStream = new PassThrough();
  bufferStream.end(file.buffer);

  const media = {
    mimeType: file.mimetype,
    body: bufferStream, // Use the stream instead of the buffer
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id, webViewLink',
  });

  return response.data;
}


// Define the route
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, sinopsis, gender, language, subtitles, director, studio, year, duration } = req.body;

    // Upload the file to Google Drive
    const driveFile = await uploadToGoogleDrive(req.file);

    // Construct the image URL
    const imageUrl = driveFile.webViewLink;

    // Create a new movie document
    const newMovie = new Movie({
      name,
      sinopsis,
      gender,
      language,
      subtitles,
      director,
      studio,
      year,
      duration,
      image: imageUrl, // Save the Google Drive URL
    });

    await newMovie.save();

    res.status(201).json({ message: 'Movie uploaded successfully', movie: newMovie });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload movie', details: error.message });
  }
});

module.exports = router;
