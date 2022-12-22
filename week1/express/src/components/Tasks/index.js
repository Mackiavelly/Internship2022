const service = require('./service');

async function findAll(req, res) {
	try {
		const objectsAll = await service.findAll({ ...req.query, ...req.body });

		return res.status(200).json({
			data: objectsAll,
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
		const objectCreate = await service.create(req.body);

		return res.status(201).json({
			data: objectCreate,
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
		const objectOne = await service.find(req.params, { ...req.query, ...req.body });

		return res.status(201).json({
			data: objectOne,
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
		const objectRemove = await service.remove(req.params);

		return res.status(201).json({
			data: objectRemove,
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
		const objectUpdate = await service.update(req.params, req.body);

		return res.status(201).json({
			data: objectUpdate,
		});
	} catch (error) {
		return res.status(500).json({
			error: error.message,
			details: null,
		});
	}
}

async function generate(req, res) {
	try {
		const objectsGenerated = await service.generate(req.params.count);

		return res.status(201).json({
			data: objectsGenerated,
		});
	} catch (error) {
		return res.status(500).json({
			error: error.message,
			details: null,
		});
	}
}

async function pagger(req, res) {
	try {
		const objectsPagger = await service.pagger(req.params, req.query);

		return res.status(201).json({
			data: objectsPagger,
		});
	} catch (error) {
		return res.status(500).json({
			error: error.message,
			details: null,
		});
	}
}

async function getTasksByUserId(req, res) {
	try {
		const objectsUsersTasks = await service.getTasksByUserId(req.params);

		return res.status(200).json({
			data: objectsUsersTasks,
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
	generate,
	pagger,
	getTasksByUserId,
};
