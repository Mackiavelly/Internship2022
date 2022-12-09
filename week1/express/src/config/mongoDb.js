const mongo = require('mongodb');

const clientDB = new mongo.MongoClient(process.env.MONGO_URI);
const db = clientDB.db('nodejs');

module.exports = {
    mongo,
    db,
};
