const { Router } = require('express');
const component = require('./index');
const validation = require('./validation');
const model = require('./model');

const router = Router();

router.get('/', component.findAll);

router.get('/:id', component.find);

router.post('/', validation(model), component.create);

router.delete('/:id', component.remove);

router.patch('/:id', component.update);

router.put('/:id', component.update);

module.exports = router;
