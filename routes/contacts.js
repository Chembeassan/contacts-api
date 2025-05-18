const express = require('express');
const router = express.Router();
const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');
const Contact = require('../models/Contact');

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


// POST - Create a new contact
router.post('/', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const insertedId = await newContact.save();
    res.status(201).json({ _id: insertedId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad request' });
  }
});

// PUT - Update a contact
router.put('/:id', async (req, res) => {
  try {
    const modifiedCount = await Contact.updateById(req.params.id, req.body);
    if (modifiedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid ID or data' });
  }
});

// DELETE - Remove a contact
router.delete('/:id', async (req, res) => {
  try {
    const deletedCount = await Contact.deleteById(req.params.id);
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(204).end(); // No Content
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid ID' });
  }
});

module.exports = router;
