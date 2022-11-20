// const fs = require('fs').promises;

require('dotenv').config({ path: '.env' });
const mongo = require('mongodb');

const clientDB = new mongo.MongoClient(process.env.MONGO_URI);
const db = clientDB.db('nodejs');
const table = db.collection('users');

const jwt = require('jsonwebtoken');

// function cl(...params) {
//     console.log(params);
// }

// function fileSave(data, fileName = 'db.json') {
//     fs.writeFile(`${fileName}`, JSON.stringify(data), (error) => {
//         if (error) {
//             cl(error);
//         } else {
//             cl(`File "${fileName}" written successfully.`);
//         }
//     });
// }

// async function fileRead(fileName = 'db.json') {
//     let result = [];

//     try {
//         const dbFile = await fs.readFile(`${fileName}`, (error, data) => {
//             if (error) {
//                 cl(`Error#001: File "${fileName}" open error.`);
//             } else {
//                 result = JSON.parse(data.toString());
//             }
//         });

//         result = JSON.parse(dbFile.toString());
//     } catch (error) {
//         cl(`Error#002: File "${fileName}" open error.`);
//     }

//     return result;
// }

function generateAccessToken(data) {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function buildMongoId(id) {
    return { _id: new mongo.ObjectId(id) };
}

async function findAllUsers(data) {
    const users = await table.find(data).toArray();

    return users;
}

async function findUser(params, data) {
    const users = await table.find({ ...buildMongoId(params.id), ...data }).toArray();

    return users;
}

async function createUser(body) {
    const userId = (await table.insertOne(body)).insertedId;

    return {
        message: 'Created',
        id: userId,
    };
}

async function updateUser(params, body) {
    const user = await table.updateOne(
        buildMongoId(params.id),
        { $set: body },
    );

    return {
        message: 'Updated',
        detail: user,
    };
}

async function deleteUser(params) {
    const user = await table.deleteOne(buildMongoId(params.id));

    return {
        message: 'Deleted',
        detail: user,
    };
}

async function singInUser(body) {
    const userFind = await table.findOne(body);

    if (userFind === null) {
        return {
            message: 'SingIn: name or pass are wrong!',
        };
    }

    const { _id: userId } = userFind;
    const token = generateAccessToken({ id: userId });
    const userUpdate = await table.updateOne(
        userFind,
        { $set: { ...userFind, access_token: token } },
    );

    return {
        message: 'Sing In - Success',
        access_token: token,
        detail: userUpdate,
    };
}

async function accountUser(params) {
    const userFind = await table.findOne(buildMongoId(params.id));

    if (userFind === null) {
        return {
            message: 'Account: user not found!',
        };
    }

    return {
        message: 'Account - Success',
        user: userFind,
    };
}

module.exports = {
    createUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteUser,
    singInUser,
    accountUser,
};
