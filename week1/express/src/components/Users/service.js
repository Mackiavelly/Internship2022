// const fs = require('fs').promises;

require('dotenv').config({ path: '.env' });
const jwt = require('jsonwebtoken');
<<<<<<< HEAD

const { mongo, connection } = require('../../config/mongoConnection');
const { mongoose } = require('../../config/mongooseConnection');

const User = require('./model');
=======
const { mongo, db } = require('../../config/mongoDb');
>>>>>>> e00e7c6c8e2cdc28ef93677b3d8b986a49450063

const collection = db.collection('users');

function generateAccessToken(data) {
	return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function buildMongoId(id) {
	return { _id: new mongo.ObjectId(id) };
}

async function findAllUsers(data) {
	const users = await collection.find(data).toArray();

	return users;
}

async function findUser(params, data) {
	const users = await collection.find({ ...buildMongoId(params.id), ...data }).toArray();

	return users;
}

async function createUser(body) {
	// const userId = (await collection.insertOne(body)).insertedId;
	const user = new User(body);
	const result = await user.save();

	if (result.error) {
		return result;
	}

	return {
		message: 'Created',
		model: result,
	};
}

async function updateUser(params, body) {
	const user = await collection.updateOne(
		buildMongoId(params.id),
		{ $set: body },
	);

	return {
		message: 'Updated',
		detail: user,
	};
}

async function deleteUser(params) {
	const user = await collection.deleteOne(buildMongoId(params.id));

	return {
		message: 'Deleted',
		detail: user,
	};
}

async function singInUser(body) {
	const userFind = await collection.findOne(body);

	if (userFind === null) {
		return {
			message: 'SingIn: name or pass are wrong!',
		};
	}

	const { _id: userId } = userFind;
	const token = generateAccessToken({ id: userId });
	const userUpdate = await collection.updateOne(
		userFind,
		{ $set: { ...userFind, access_token: token } },
	);

	return {
		message: 'Sing In - Success',
		access_token: token,
		detail: userUpdate,
	};
}

async function accountUser(params) {
	const userFind = await collection.findOne(buildMongoId(params.id));

	if (userFind === null) {
		return {
			message: 'Account: user not found!',
		};
	}

	return {
		message: 'Account - Success',
		user: userFind,
	};
}

module.exports = {
	createUser,
	findAllUsers,
	findUser,
	updateUser,
	deleteUser,
	singInUser,
	accountUser,
};
