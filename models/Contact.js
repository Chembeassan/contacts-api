const { getDb } = require('../config/db');

class Contact {
  constructor({ firstName, lastName, email, favoriteColor, birthday }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.favoriteColor = favoriteColor;
    this.birthday = birthday;
  }

  // Save a new contact to the database
  async save() {
    const db = getDb();
    const result = await db.collection('contacts').insertOne(this);
    return result.insertedId;
  }

  // Static method to update a contact
  static async updateById(id, updates) {
    const db = getDb();
    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    return result.modifiedCount;
  }

  // Static method to delete a contact
  static async deleteById(id) {
    const db = getDb();
    const result = await db.collection('contacts').deleteOne(
      { _id: new ObjectId(id) }
    );
    return result.deletedCount;
  }
}

module.exports = Contact;
