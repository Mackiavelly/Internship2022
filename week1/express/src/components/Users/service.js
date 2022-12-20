const jwt = require('jsonwebtoken');
const { mongoose, db } = require('../../config/mongooseConnection');
const User = require('./model');

const collection = db.collection('users');

function generateAccessToken(data) {
	return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function buildMongoId(id) {
	const { ObjectId } = mongoose.Types;

	return { _id: new ObjectId(id) };
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
	const user = await User.findOne({ email: body.email });

	console.log(user);

	if (user === null) {
		return {
			message: 'SingIn: user no exists!',
		};
	}

	const compare = await user.comparePassword(body.password, (error, isMatch) => {
		if (error) throw error;

		return isMatch;
	});

	if (compare) {
		const { _id: userId } = user;
		const token = generateAccessToken({ id: userId });

		user.token = token;
		await user.save();

		return {
			message: 'Sing In - Success',
			detail: user,
		};
	}

	return {
		message: 'SingIn: wrong password!',
	};
}

async function accountUser(params) {
	const userFind = await User.findOne(buildMongoId(params.id));

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
