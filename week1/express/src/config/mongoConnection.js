const mongo = require('mongodb');

const dbName = 'internship';
const client = new mongo.MongoClient(process.env.MONGO_URI_LOCAL);
const connection = client.db(dbName);

client
	.on('serverOpening', (event) => {
		console.log(`serverOpening: ${JSON.stringify(event, null, 1)}`);
	})
	.on('serverHeartbeatFailed', (event) => {
		console.log(`serverHeartbeatFailed: ${JSON.stringify(event, null, 1)}`);
	})
	.on('serverClosed', (event) => {
		console.log(`serverClosed: ${JSON.stringify(event, null, 1)}`);
	});

async function run() {
	try {
		await connection.command({ ping: 1 });
		console.log('Successfully connected to mongodb server!');
	} catch (error) {
		console.log('Wrong connection to mongodb server!');
	}
}
run().catch(console.log('Try connect to mongodb server...'));

module.exports = {
	mongo,
	connection,
};
