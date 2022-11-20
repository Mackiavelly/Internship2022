const UsersService = require('./service');
const Model = require('./schema');

async function userFindAll(req, res) {
    try {
        const users = await UsersService.findAllUsers({ ...req.query, ...req.body });

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
        const users = await UsersService.findUser(req.params, { ...req.query, ...req.body });

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
        const { error } = Model.delete.validate(req.params);

        if (error) {
            return res.status(400).json({
                error: 'Wrong params#',
                details: error.message,
                // debug: error.details
            });
        }

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
        const users = await UsersService.updateUser(req.params, req.body);

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

async function userSingIn(req, res) {
    try {
        const users = await UsersService.singInUser(req.body);

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

async function userAccount(req, res) {
    try {
        const users = await UsersService.accountUser(req.params);

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
    userSingIn,
    userAccount,
};
