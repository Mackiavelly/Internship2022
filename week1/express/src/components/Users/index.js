const UsersService = require('./service');

async function userFindAll(req, res) {
    try {
        const users = await UsersService.findAllUsers();

        return res.status(200).json({
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function userCreate(req, res) {
    try {
        const users = await UsersService.createUser(req.body);

        return res.status(201).json({
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function userFind(req, res) {
    try {
        // TODO: Some test
        // const { id, test, test2 } = req.params;
        const users = await UsersService.findUser(req.params);

        return res.status(201).json({
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function userDelete(req, res) {
    try {
        const users = await UsersService.deleteUser(req.params);

        return res.status(201).json({
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function userUpdate(req, res) {
    try {
        const id = parseInt(req.body.id, 10);

        if (typeof id !== 'number' || Number.isNaN(id)) {
            return res.status(400).json({
                error: 'Error#100: Wrong input params.',
                details: 'Id is not a number',
            });
        }

        const users = await UsersService.updateUser(req.body);

        return res.status(201).json({
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

module.exports = {
    userFindAll,
    userCreate,
    userDelete,
    userUpdate,
    userFind,
};
