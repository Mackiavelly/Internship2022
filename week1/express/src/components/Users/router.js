const { Router } = require('express');
const UserComponent = require('./index');

const router = Router();

router.get('/', UserComponent.userFindAll);

router.get('/:id(\\d+)', UserComponent.userFind);

router.post('/', UserComponent.userCreate);

router.delete('/:id(\\d+)', UserComponent.userDelete);

router.patch('/:id(\\d+)', UserComponent.userUpdate);

router.put('/:id(\\d+)', UserComponent.userUpdate);

module.exports = router;
