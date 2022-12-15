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
		match: [/^\w+([\.-_]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Type a valid email address'],
		index: {
			unique: true,
		},
	},
});

userSchema.pre('save', function(next) {
	const user = this;

	if (!user.isModified('password')) next();
	bcrypt.genSalt(SALT, (errorSalt, salt) => {
		if (errorSalt) return next(errorSalt);
		bcrypt.hash(user.password, salt, (errorHash, hash) => {
			if (errorHash) return next(errorHash);
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = (candidatePassword, cb) => {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('user', userSchema);
