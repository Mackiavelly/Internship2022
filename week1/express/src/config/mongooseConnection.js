const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI_LOCAL, { dbName: 'internship', serverSelectionTimeoutMS: 1000 }, (error) => {
	if (error) throw error;
	console.log('Successfully connected to mongodb server! (mongoose)');
});

module.exports = { mongoose };
