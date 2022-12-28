const { Router } = require('express');
const m2s = require('mongoose-to-swagger');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const component = require('./index');
const validation = require('./validation');
const validationToken = require('../../config/validationToken');
const { Model, scenarios } = require('./model');

const router = Router();
const swaggerSchemas = m2s(Model);

const optionsSwagger = {
	components: {
		schemas: {
			tasks: swaggerSchemas,
		},
	},
};

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, optionsSwagger));

router.get('/task', validationToken, component.pagger);

router.get('/all', validationToken, component.getTasksByUserId);

router.get('/', component.findAll);

router.get('/:id', component.find);

router.post('/', validation(Model), component.create);

router.delete('/:id', component.remove);

router.patch('/:id', validation(Model, scenarios.update), component.update);

router.put('/:id', validation(Model, scenarios.update), component.update);

router.post('/generate/:count', component.generate);

module.exports = router;
