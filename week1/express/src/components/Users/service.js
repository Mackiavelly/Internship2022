const fs = require('fs');

const userObjectDefault = {
    name: '',
    login: '',
    pass: '',
    'e-mail': '',
};

function cl(...params) {
    console.log(params);
}

function fileSave(data, fileName = 'db.json') {
    fs.writeFile(`${fileName}`, JSON.stringify(data), (error) => {
        if (error) {
            cl(error);
        } else {
            cl(`File "${fileName}" written successfully.`);
        }
    });
}

function fileRead(fileName = 'db.json') {
    fs.readFile(`${fileName}`, (error, data) => {
        let result = [];

        if (error) {
            /**
             * on a crutch through the knee
             */
            cl(`Error#001: File "${fileName}" open error.`);
        } else {
            result = JSON.parse(data.toString());
        }

        return result;
    });
}

function findAllUsers() {
    return fileRead();
}

function findUser(id) {
    if (typeof id === 'number') {
        const data = fileRead();
        const user = data.at(id);

        return user === undefined ? [] : user;
    }
    cl('Id is not a number.');

    return [];
}

function createUser(req) {
    cl(req.params);
    const data = fileRead();

    data.push({ ...userObjectDefault, name: 'test-name', login: 'test-login' });
    cl(data);
    fileSave(data);

    return {
        message: 'Created',
    };
}

function updateUser(id, data) {
    let result = {};

    if (typeof id === 'number') {
        const user = findUser(id);
        const dataBase = fileRead();

        dataBase[id] = { ...userObjectDefault, user, data };
        fileSave(dataBase);
        result = { message: 'Updated' };
    } else {
        result = { message: 'Update error!' };
    }

    return result;
}

function deleteUser(id) {
    let result = {};

    if (typeof id === 'number') {
        const data = fileRead();

        data.splice(id, 1); // TODO: JOKE)))
        fileSave(data);
        result = { message: 'Deleted' };
    } else {
        result = { message: 'Delete error!' };
    }

    return result;
}

module.exports = {
    createUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteUser,
};
