const express = require('express');
const router = express.Router();
const Language = require('../models/language');
const Classification = require('../models/classes');
const Gender = require('../models/gender');

router.get('/languages', async (req, res) => {
  try {
    const languages = await Language.find();
    res.json(languages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching languages' });
  }
});

router.get('/classifications', async (req, res) => {
  try {
    const classifications = await Classification.find();
    res.json(classifications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching classifications' });
  }
});

router.get('/genders', async (req, res) => {
  try {
    const genders = await Gender.find();
    res.json(genders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching genders' });
  }
});

module.exports = router;
