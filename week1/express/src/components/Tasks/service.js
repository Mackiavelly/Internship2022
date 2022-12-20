const { db } = require('../../config/mongooseConnection');
const Model = require('./model');

const collection = db.collection('tasks');

function buildMongoId(id) {
	return { _id: id };
}

async function findAll(data) {
	const users = await collection.find(data).toArray();

	return users;
}

async function find(params, data) {
	const users = await collection.find({ ...buildMongoId(params.id), ...data }).toArray();

	return users;
}

async function create(body) {
	// const userId = (await collection.insertOne(body)).insertedId;
	const user = new Model(body);
	const result = await user.save();

	if (result.error) {
		return result;
	}

	return {
		message: 'Created',
		model: result,
	};
}

async function update(params, body) {
	const user = await collection.updateOne(
		buildMongoId(params.id),
		{ $set: body },
	);

	return {
		message: 'Updated',
		detail: user,
	};
}

async function remove(params) {
	const user = await collection.deleteOne(buildMongoId(params.id));

	return {
		message: 'Deleted',
		detail: user,
	};
}

module.exports = {
	create,
	findAll,
	find,
	update,
	remove,
};
