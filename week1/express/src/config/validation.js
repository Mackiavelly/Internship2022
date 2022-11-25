const middleware = (model) => (req, res, next) => {
    const data = { ...req.params, ...req.query, ...req.body };

    const { error } = model.validate(data);

    if (error) {
        return res.status(400).json({
            message: 'Wrong params',
            details: error.message,
        });
    }

    return next();
};

module.exports = middleware;
