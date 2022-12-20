const middleware = (Model) => (req, res, next) => {
	const data = { ...req.params, ...req.query, ...req.body };
	const user = new Model(data);
	const error = user.validateSync();

	if (error) {
		return res.status(400).json({
			message: 'Wrong params',
			details: error.message,
		});
	}

	return next();
};

module.exports = middleware;
