const mongo = require('mongodb');

const clientDB = new mongo.MongoClient(process.env.MONGO_URI);
const connection = clientDB.db('nodejs');

module.exports = {
    mongo,
    connection,
};
