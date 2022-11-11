const { Router } = require('express');
const UserComponent = require('./index');

const router = Router();

router.get('/index', UserComponent.userFindAll);

router.get('/user', UserComponent.userFind);

router.post('/create', UserComponent.userCreate);

router.post('/delete', UserComponent.userDelete);

router.post('/update', UserComponent.userUpdate);

module.exports = router;
