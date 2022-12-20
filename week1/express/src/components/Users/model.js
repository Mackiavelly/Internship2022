const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const SALT = 10;

const userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true },
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: true,
		match: [/^\w+([.-_]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Type a valid email address'],
		index: {
			unique: true,
		},
	},
	token: { type: String },
});

userSchema.pre('save', function preSave(next) {
	const user = this;

	if (!user.isModified('password')) return next();
	bcrypt.genSalt(SALT, (errorSalt, salt) => {
		if (errorSalt) return next(errorSalt);
		bcrypt.hash(user.password, salt, (errorHash, hash) => {
			if (errorHash) return next(errorHash);
			user.password = hash;

			return next();
		});

		return next();
	});

	return next();
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword, callBack) {
	return bcrypt.compareSync(candidatePassword, this.password, (error, isMatch) => {
		if (error) return callBack(error);

		return callBack(null, isMatch);
	});
};

module.exports = mongoose.model('user', userSchema);
