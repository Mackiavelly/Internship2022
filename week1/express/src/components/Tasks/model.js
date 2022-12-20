const mongoose = require('mongoose');

const { Schema } = mongoose;

const tasksSchema = new Schema({
	assignee: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	estimatedTime: { type: Number, require: true },
	createdBy: { type: String, require: true },
});

module.exports = mongoose.model('tasks', tasksSchema);
