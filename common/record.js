let config = require("../config/db");
let ObjectId = require("mongodb").ObjectId;
let db = require("monk")(config.mongoUrl);

module.exports = {
	createRecord: (collection, data) => {
		return new Promise((resolve, reject) => {
			if (!collection) reject(new Error("empty_collection"));
			if (!data) reject(new Error("empty_data"));

			db.get(collection)
				.insert(data)
				.then((record) => resolve(record))
				.catch((err) => reject(err));
		});
	},

	getRecords: (collection, filter = {}, limit = 10, offset = 0) => {
		return new Promise((resolve, reject) => {
			db.get(collection)
				.find(filter, { limit: parseInt(limit), skip: parseInt(offset), sort: { name: 1 } })
				.then((records) => resolve(records))
				.catch((err) => reject(err));
		});
	},

	modifyRecord: (collection, data, id) => {
		return new Promise((resolve, reject) => {
			db.get(collection)
				.update({ _id: ObjectId(id) }, { "$set": data })
				.then(() => resolve(data))
				.catch((err) => reject(err));
		});
	},

	deleteRecord: (collection, id) => {
		return new Promise((resolve, reject) => {
			db.get(collection)
				.remove({ _id: ObjectId(id) })
				.then((record) => resolve(record))
				.catch((err) => reject(err));
		});
	},

	dropCollection: (collection) => {
		return new Promise((resolve, reject) => {
			db.get(collection)
				.drop()
				.then(() => resolve())
				.catch((err) => reject(err));
		});
	}
};
