const { Router } = require('express');
const UserComponent = require('./index');
const SchemaScenarios = require('./schema');
const validationJoi = require('../../config/validation');
const validation = require('./validation');
const ValidationToken = require('../../config/validationToken');
const userModel = require('./model');

const router = Router();

router.get('/', validationJoi(SchemaScenarios.find), UserComponent.userFindAll);

router.get('/:id', validationJoi(SchemaScenarios.find), UserComponent.userFind);

router.post('/sing-in', validationJoi(SchemaScenarios.singIn), UserComponent.userSingIn);

router.post('/account', ValidationToken, UserComponent.userAccount);

router.post('/', validation(userModel), UserComponent.userCreate);

router.delete('/:id', UserComponent.userDelete); // controller validate

router.patch('/:id', validation(userModel), UserComponent.userUpdate);

router.put('/:id', validationJoi(SchemaScenarios.update), UserComponent.userUpdate);

module.exports = router;
