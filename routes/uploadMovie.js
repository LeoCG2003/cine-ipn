const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const { PassThrough } = require('stream');
const multer = require('multer');
const path = require('path');
const Movie = require('../models/Movie');
const Language = require('../models/language');
const Classification = require('../models/classes');
const Gender = require('../models/gender');

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Google Drive setup
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const KEYFILEPATH = path.join(__dirname, '../admin(YO)/proyecto-cine-ipn-admin.json');

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

async function uploadToGoogleDrive(file) {
  const fileMetadata = {
    name: file.originalname,
    parents: ['1HxBDJBDbeU_MbWu4nG0xbzXO50NesUjx'],
  };

  const bufferStream = new PassThrough();
  bufferStream.end(file.buffer);

  const media = {
    mimeType: file.mimetype,
    body: bufferStream,
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id, webViewLink',
  });

  return response.data;
}

function UrlToThumbnail(driveUrl) {
  // Extract the file ID from the original URL
  const fileIdMatch = driveUrl.match(/\/d\/([^/]+)/);
  
  if (!fileIdMatch) {
    throw new Error("Invalid Google Drive URL format");
  }

  const fileId = fileIdMatch[1];

  // Construct the thumbnail URL
  const thumbnail = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  return thumbnail;
}

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, sinopsis, gender, language, subtitles, classification, director, studio, year, duration } = req.body;

    if (!name || !sinopsis || !gender || !language || !classification || !director || !studio || !year || !duration) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Validate and fetch related documents
    const genderDoc = await Gender.findOne({ nombre: gender });
    const languageDoc = await Language.findOne({ nombre: language });
    const subtitlesDoc = subtitles ? await Language.findOne({ nombre: subtitles }) : null;
    const classificationDoc = await Classification.findOne({ nombre: classification });

    if (!genderDoc || !languageDoc || !classificationDoc) {
      return res.status(400).json({ error: 'Invalid related data provided.' });
    }

    // Upload the file to Google Drive
    const driveFile = await uploadToGoogleDrive(req.file);
    const Url_T = UrlToThumbnail(driveFile.webViewLink)

    const newMovie = new Movie({
      name,
      sinopsis,
      gender: genderDoc._id,
      language: languageDoc._id,
      subtitles: subtitlesDoc ? subtitlesDoc._id : null,
      classification: classificationDoc._id,
      director,
      studio,
      year,
      duration,
      image: Url_T,
    });

    await newMovie.save();

    res.status(201).json({ message: 'Movie uploaded successfully', movie: newMovie });
  } catch (error) {
    console.error('Error uploading movie:', error);
    res.status(500).json({ error: 'Failed to upload movie', details: error.message });
  }
});

module.exports = router;
