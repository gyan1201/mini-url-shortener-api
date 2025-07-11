const express = require('express');
const validator = require('validator');
const Url = require('./models/url'); // Adjust path as needed
const router = express.Router();

const generateShortCode = () => Math.random().toString(36).substring(2, 8);

router.post('/shorten', async (req, res, next) => {
  try {
    if (!req.body || !req.body.url) {
      return res.status(400).json({ error: 'Missing URL in request body' });
    }
    const { url } = req.body;

    if (!validator.isURL(url, { require_protocol: true })) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    let shortCode;
    let retries = 0;
    const maxRetries = 5;

    while (retries < maxRetries) {
      shortCode = generateShortCode();
      const existingUrl = await Url.findOne({ shortCode });
      if (!existingUrl) break;
      retries++;
    }

    if (retries === maxRetries) {
      return res.status(500).json({ error: 'Failed to generate unique short code' });
    }

    const newUrl = new Url({ originalUrl: url, shortCode });
    await newUrl.save();
    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
  } catch (error) {
    next(error);
  }
});

router.get('/:code', async (req, res, next) => {
  try {
    const { code } = req.params;
    const url = await Url.findOne({ shortCode: code });
    if (url) {
      res.redirect(302, url.originalUrl);
    } else {
      res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;