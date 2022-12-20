const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URI_LOCAL, { dbName: 'internship', serverSelectionTimeoutMS: 1000 }, (error) => {
	if (error) throw error;
	console.log('Successfully connected to mongodb server! (mongoose)');
});

const db = mongoose.connection;

db.on('open', () => {
	console.log('open event (mongoose)');
});
db.on('connected', () => {
	console.log('connected event (mongoose)');
});
db.on('error', (error) => {
	console.log('error event (mongoose)');
	console.log(error);
});

module.exports = { mongoose, db };
