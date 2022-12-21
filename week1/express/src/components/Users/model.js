const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const SALT_ROUNDS = 10;

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

	const salt = bcrypt.genSaltSync(SALT_ROUNDS);
	const hash = bcrypt.hashSync(user.password, salt);

	user.password = hash;

	return next();
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
	return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model('user', userSchema);
