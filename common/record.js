let config = require("../config/db");
let db = require('monk')(config.mongoUrl);
let ObjectId = require("mongodb").ObjectId;

module.exports = {
    createRecord: function (collection, data) {
        return new Promise((res, rej) => {
            db.get(collection)
                .insert(data)
                .then((record) => res(record))
                .catch((err) => rej(err))
        })
    },

    getRecords: function (collection, filter = {}) {
        return new Promise((res, rej) => {
            db.get(collection)
                .find(filter)
                .then((records) => res(records))
                .catch((err) => rej(err))
        })
    },

    modifyRecord: function (collection, data, id) {
        return new Promise((res, rej) => {
            db.get(collection)
                .update({_id: ObjectId(id)}, {"$set": data})
                .then(() => res(data))
                .catch((err) => rej(err));
        })
    },

    deleteRecord: function (collection, id) {
        return new Promise((res, rej) => {
            db.get(collection)
                .remove({_id: ObjectId(id)})
                .then((record) => res(record))
                .catch((err) => rej(err))
        })
    },

    dropCollection: function (collection) {
        return new Promise((res, rej) => {
            db.get(collection)
                .drop()
                .then(() => res())
                .catch((err) => rej(err))
        })
    }
};
