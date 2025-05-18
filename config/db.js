const { MongoClient } = require('mongodb');
let db;

async function initDb() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    db = client.db('contactsDB'); // <-- specify your database here
    console.log('✅ MongoDB Connected to contactsDB');
    return db;
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    throw err;
  }
}

function getDb() {
  if (!db) throw Error('Database not initialized');
  return db;
}

module.exports = { initDb, getDb };

