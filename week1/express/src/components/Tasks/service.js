const { mongoose, db } = require('../../config/mongooseConnection');
const { Model } = require('./model');
const UserModel = require('../Users/model');

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
	const createdBy = ['TL', 'PM', 'Support', 'Chuck Norris'];
	const users = await db.collection('users').find().toArray();

	for (let i = 0; i < count; i += 1) {
		const task = new Model({
			createdBy: createdBy[getRandomInt(createdBy.length)],
			estimatedTime: getRandomInt(10),
			description: `description-${getRandomInt(100)}`,
			title: `title-${getRandomInt(100)}`,
			// eslint-disable-next-line no-underscore-dangle
			assignee: users[getRandomInt(users.length)]._id,
		});

		task.save();
	}

	return {
		message: `generate ${count} tasks`,
	};
}

async function pagger(params, query) {
	const perPage = 5;
	const page = query.page || 1;
	const pageNumber = (page < 1) ? 1 : page;
	const skip = (pageNumber - 1) * perPage;
	const totalTasks = await Model
		.find({ assignee: params.id })
		.count();
	const tasks = await Model
		.find({ assignee: params.id })
		.limit(perPage)
		.skip(skip);
	const detail = tasks === 0
		? 'Empty page.'
		: `Show page #${pageNumber}, rows ${perPage}, from ${skip + 1} to ${skip + perPage}.`;

	return {
		tasks,
		totalTasks,
		detail,
	};
}

async function getTasksByUserId(params) {
	/* eslint-disable quote-props */
	const aggregate = [
		{
			'$match': buildMongoId(params.id),
		}, {
			'$lookup': {
				'from': 'tasks',
				'localField': '_id',
				'foreignField': 'assignee',
				'as': 'tasks',
			},
		}, {
			'$project': {
				'_id': 0,
				'tasks': '$tasks',
				'name': {
					'$concat': [
						'$firstName', ' ', '$lastName',
					],
				},
				'totalTasks': {
					'$size': '$tasks',
				},
				'totalEstimation': {
					'$sum': '$tasks.estimatedTime',
				},
			},
		},
	];
	const tasks = await UserModel.aggregate(aggregate);

	return tasks;
}

module.exports = {
	create,
	findAll,
	find,
	update,
	remove,
	generate,
	pagger,
	getTasksByUserId,
};
