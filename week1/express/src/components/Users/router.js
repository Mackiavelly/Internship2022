const { Router } = require('express');
const UserComponent = require('./index');

const router = Router();

router.get('/index', UserComponent.userFindAll);

// TODO: Interesting idea
router.get('/user/:id(\\d+):test([a-z]{0,}):test2(\\d{0,})', UserComponent.userFind);

router.post('/create', UserComponent.userCreate);

router.post('/delete/:id(\\d+)', UserComponent.userDelete);

router.post('/update', UserComponent.userUpdate);

module.exports = router;
