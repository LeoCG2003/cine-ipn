require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const uploadMovieRoute = require('./routes/uploadMovie');
const verification = require('./routes/verification');
const owner_verification = require('./routes/owner_verification');
const New_Cinema = require('./routes/NewCinema');
const New_Admin = require('./routes/NewAdmin');
const cinemasRouter = require('./routes/cinemas');
const testing = require('./routes/test');

const upload = multer();


// Initialize Express app
const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (images, CSS, JS)


// Routes
app.use('/admin-data', verification);
app.use('/upload-movie', uploadMovieRoute);
app.use('/owner-data', owner_verification);
app.use('/cinema-data', New_Cinema);
app.use('/Admin-data', New_Admin);
app.use('/cinemas', cinemasRouter);
app.use('/test', testing);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB Atlas:', err);
  });



// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});