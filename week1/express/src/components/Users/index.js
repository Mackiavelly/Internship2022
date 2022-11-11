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
        const users = await UsersService.findUser(req.body);

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
        const users = await UsersService.deleteUser(req.body);

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
