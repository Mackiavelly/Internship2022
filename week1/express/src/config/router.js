require('dotenv').config({ path: '.env' });
const express = require('express');
const http = require('http');

const usersRouter = require('../components/Users/router');
const tasksRouter = require('../components/Tasks/router');

module.exports = {
	init(app) {
		const router = express.Router();

		app.use('/users', usersRouter);
		app.use('/tasks', tasksRouter);
		app.use((req, res) => {
			res.status(404).send(http.STATUS_CODES[404]);
		});
		app.use(router);
	},
};
