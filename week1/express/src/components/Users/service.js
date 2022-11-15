const fs = require('fs').promises;

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

async function fileRead(fileName = 'db.json') {
    let result = [];

    try {
        const dbFile = await fs.readFile(`${fileName}`, (error, data) => {
            if (error) {
                cl(`Error#001: File "${fileName}" open error.`);
            } else {
                result = JSON.parse(data.toString());
            }
        });

        result = JSON.parse(dbFile.toString());
    } catch (error) {
        cl(`Error#002: File "${fileName}" open error.`);
    }

    return result;
}

async function findAllUsers() {
    const users = await fileRead();

    return users;
}

async function findUser(request) {
    const data = await fileRead();
    const user = data[request.id];

    return user === undefined ? [] : user;
}

async function createUser(request) {
    const data = await fileRead();

    // TODO: ESLint ??? for {}
    data.push({ ...userObjectDefault, name: 'test-name', login: 'test-login', ...request });
    fileSave(data);

    return { message: 'Created' };
}

async function updateUser(request, body) {
    const user = await findUser(request.id);
    const dataBase = await fileRead();

    dataBase[request.id] = { ...userObjectDefault, ...user, ...body };
    fileSave(dataBase);

    return { message: 'Updated' };
}

async function deleteUser(request) {
    const data = await fileRead();

    data.splice(request.id, 1); // TODO: JOKE)))
    fileSave(data);

    return { message: 'Deleted' };
}

module.exports = {
    createUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteUser,
};
