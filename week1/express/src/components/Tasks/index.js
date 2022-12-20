const service = require('./service');

async function findAll(req, res) {
	try {
		const users = await service.findAll({ ...req.query, ...req.body });

		return res.status(200).json({
			data: users,
		});
	} catch (error) {
		return res.status(500).json({
			error: error.message,
			details: null,
		});
	}
}

async function create(req, res) {
	try {
		const users = await service.create(req.body);

		return res.status(201).json({
			data: users,
		});
	} catch (error) {
		return res.status(500).json({
			error: error.message,
			details: null,
		});
	}
}

async function find(req, res) {
	try {
		const users = await service.find(req.params, { ...req.query, ...req.body });

		return res.status(201).json({
			data: users,
		});
	} catch (error) {
		return res.status(500).json({
			error: error.message,
			details: null,
		});
	}
}

async function remove(req, res) {
	try {
		const users = await service.remove(req.params);

		return res.status(201).json({
			data: users,
		});
	} catch (error) {
		return res.status(500).json({
			error: error.message,
			details: null,
		});
	}
}

async function update(req, res) {
	try {
		const users = await service.update(req.params, req.body);

		return res.status(201).json({
			data: users,
		});
	} catch (error) {
		return res.status(500).json({
			error: error.message,
			details: null,
		});
	}
}

module.exports = {
	findAll,
	create,
	remove,
	update,
	find,
};
