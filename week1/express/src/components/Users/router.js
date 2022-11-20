const { Router } = require('express');
const UserComponent = require('./index');
const Model = require('./schema');
const Validation = require('../../config/validation');
const ValidationToken = require('../../config/validationToken');

const router = Router();

router.get('/', Validation(Model.find), UserComponent.userFindAll);

router.get('/:id', Validation(Model.find), UserComponent.userFind);

router.post('/sing-in', Validation(Model.singIn), UserComponent.userSingIn);

router.post('/account', ValidationToken, UserComponent.userAccount);

router.post('/', Validation(Model.create), UserComponent.userCreate);

router.delete('/:id', UserComponent.userDelete); // controller validate

router.patch('/:id', Validation(Model.update), UserComponent.userUpdate);

router.put('/:id', Validation(Model.update), UserComponent.userUpdate);

module.exports = router;
