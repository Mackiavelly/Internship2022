module.exports = {
	async up(db, client) {
		const collection = db.collection('tasks');
		const estimatedTimeInt = 10;

		await collection.updateMany({ estimatedTime: { $lt: estimatedTimeInt } }, { $set: { status: 'in progress' } });
		await collection.updateMany({ estimatedTime: { $gte: estimatedTimeInt } }, { $set: { status: 'done' } });
	},

	async down(db, client) {
		await db.collection('tasks').updateMany({}, { $unset: { status: '' } });
	},
};
