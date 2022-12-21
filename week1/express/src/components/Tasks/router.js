const { Router } = require('express');
const component = require('./index');
const validation = require('./validation');
const { Model, scenarios } = require('./model');

const router = Router();

router.get('/', component.findAll);

router.get('/:id', component.find);

router.post('/', validation(Model), component.create);

router.delete('/:id', component.remove);

router.patch('/:id', validation(Model, scenarios.update), component.update);

router.put('/:id', validation(Model, scenarios.update), component.update);

router.post('/generate/:count', component.generate);

module.exports = router;
