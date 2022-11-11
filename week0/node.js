/**
 * 1. call https://jsonplaceholder.typicode.com/users and write it to file users.json
 * todo: install module to call this API, and use node FS module
 */
const fs = require('fs');
const axios = require('axios');

function saveFile(url, fileName) {
    axios
        .get(url)
        .then((axiosRes) => {
            const data = JSON.stringify(axiosRes.data);

            fs.writeFile(`week0/${fileName}`, data, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`File "${fileName}" written successfully.`);
                }
            });
        })
        .catch((error) => {
            console.log(`${error.response.status} ${error.response.statusText}`);
        });
}

function fileRead(fileName = 'db.json') {
    fs.readFile(`week0/${fileName}`, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            console(data.toString());
        }
    });
}

console.log(fileRead());

saveFile('https://jsonplaceholder.typicode.com/users', 'users.json');

/**
 * 2. Let's work with running node script with some environment variables
 * todo: Pass parameter ENV when you run this script.
 * If param is PRODUCTION  get data from https://jsonplaceholder.typicode.com/f and write it to file todos.json
 * If param is DEV get data from https://jsonplaceholder.typicode.com/albums and write if to file albums.json
 */

require('dotenv').config({ path: './week0/.env' });

switch (process.env.ENV) {
case 'PRODUCTION':
    saveFile('https://jsonplaceholder.typicode.com/todos', 'todos.json');
    break;
case 'DEV':
    saveFile('https://jsonplaceholder.typicode.com/albums', 'albums.json');
    break;
default:
    console.log(`Error: ENV="${process.env.ENV}" don't support.`);
}

/**
 * node week0/node.js
 */
