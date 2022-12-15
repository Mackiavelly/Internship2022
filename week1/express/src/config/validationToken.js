const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
		if (error) return res.sendStatus(403);
		req.params.id = user.id;

		return next();
	});

	return next();
}

module.exports = authenticateToken;
