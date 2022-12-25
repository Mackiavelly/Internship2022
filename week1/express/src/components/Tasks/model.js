const mongoose = require('mongoose');

const { Schema } = mongoose;

const scenarios = {
	create: ['assignee', 'title', 'description', 'estimatedTime', 'createdBy', 'status'],
	update: ['estimatedTime'],
};

const schemaTasks = new Schema({
	assignee: { type: mongoose.ObjectId, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	estimatedTime: { type: Number, require: true },
	createdBy: { type: String, require: true },
	status: { type: String },
});

module.exports = {
	Model: mongoose.model('tasks', schemaTasks),
	scenarios,
};
