const express = require('express');
const router = express.Router();
const Certificate = require('../models/CertificateModel');

// Fetch certificate by courseId (which is actually `id` in your Course model)
router.get('/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ course: req.params.id });
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;