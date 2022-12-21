const jwt = require('jsonwebtoken');

const verify = (token, key, options = {}) => new Promise((resolve, reject) => {
	jwt.verify(token, key, options, (error, payload) => {
		if (error) {
			reject(error);

			return;
		}
		resolve(payload);
	});
});

async function authenticateToken(req, res, next) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.sendStatus(401);

	const user = await verify(token, process.env.TOKEN_SECRET);

	req.params.id = user.id;

	return next();
}

module.exports = authenticateToken;
