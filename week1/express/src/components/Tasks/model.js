const mongoose = require('mongoose');

const { Schema } = mongoose;

const scenarios = {
	create: ['assignee', 'title', 'description', 'estimatedTime', 'createdBy'],
	update: ['estimatedTime'],
};

const schemaTasks = new Schema({
	assignee: { type: mongoose.ObjectId, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	estimatedTime: { type: Number, require: true },
	createdBy: { type: String, require: true },
});

module.exports = {
	Model: mongoose.model('tasks', schemaTasks),
	scenarios,
};
