const express = require('express');
const router = express.Router();
const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts')
                           .find()
                           .sort({ lastName: 1 })
                           .toArray();
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single contact
router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const contact = await db.collection('contacts')
                          .findOne({ _id: new ObjectId(req.params.id) });
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

module.exports = router;
