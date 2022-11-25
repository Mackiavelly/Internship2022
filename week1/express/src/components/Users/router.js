const { Router } = require('express');
const UserComponent = require('./index');
const SchemaScenarios = require('./schema');
const Validation = require('../../config/validation');
const ValidationToken = require('../../config/validationToken');

const router = Router();

router.get('/', Validation(SchemaScenarios.find), UserComponent.userFindAll);

router.get('/:id', Validation(SchemaScenarios.find), UserComponent.userFind);

router.post('/sing-in', Validation(SchemaScenarios.singIn), UserComponent.userSingIn);

router.post('/account', ValidationToken, UserComponent.userAccount);

router.post('/', Validation(SchemaScenarios.create), UserComponent.userCreate);

router.delete('/:id', UserComponent.userDelete); // controller validate

router.patch('/:id', Validation(SchemaScenarios.update), UserComponent.userUpdate);

router.put('/:id', Validation(SchemaScenarios.update), UserComponent.userUpdate);

module.exports = router;
