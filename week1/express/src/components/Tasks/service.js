const { mongoose, db } = require('../../config/mongooseConnection');
const { Model } = require('./model');

function buildMongoId(id) {
	const { ObjectId } = mongoose.Types;

	return { _id: new ObjectId(id) };
}

async function findAll(data) {
	const tasks = await Model.find(data);

	return tasks;
}

async function find(params, data) {
	const tasks = await Model.find({ ...buildMongoId(params.id), ...data });

	return tasks;
}

async function create(body) {
	const tasks = new Model(body);
	const result = await tasks.save();

	if (result.error) {
		return result;
	}

	return {
		message: 'Created',
		model: result,
	};
}

async function update(params, body) {
	const task = await Model.findByIdAndUpdate(params.id, { estimatedTime: body.estimatedTime }, { returnDocument: 'after', runValidators: true });

	return {
		message: 'Updated',
		detail: task,
	};
}

async function remove(params) {
	const user = await Model.findByIdAndDelete(params.id);

	return {
		message: 'Deleted',
		detail: user,
	};
}

async function generate(count) {
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
	const createdBy = ['TL', 'PM', 'Support', 'Chack Noris'];
	const users = await db.collection('users').find().toArray();

	for (let i = 0; i < count; i += 1) {
		const randomTask = {
			createdBy: createdBy[getRandomInt(createdBy.length)],
			estimatedTime: getRandomInt(10),
			description: `description-${getRandomInt(100)}`,
			title: `title-${getRandomInt(100)}`,
			assignee: users[getRandomInt(users.length)]._id,
		};
		const task = new Model(randomTask);

		task.save();
	}

	return {
		message: `generate ${count} tasks`,
	};
}

module.exports = {
	create,
	findAll,
	find,
	update,
	remove,
	generate,
};
