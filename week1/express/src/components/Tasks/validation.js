const middleware = (Model, scenario = []) => (req, res, next) => {
	const data = { ...req.params, ...req.query, ...req.body };
	const task = new Model(data);
	const error = task.validateSync(scenario);

	if (error) {
		return res.status(400).json({
			message: 'Wrong params',
			details: error.message,
		});
	}

	return next();
};

module.exports = middleware;
