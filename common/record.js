let config = require("../config/db");
let ObjectId = require("mongodb").ObjectId;
let db = require("monk")(config.mongoUrl);

module.exports.createRecord = (collection, data) => {
  return new Promise((resolve, reject) => {
    if (!collection) reject(new Error("empty_collection"));
    if (!data) reject(new Error("empty_data"));

    db.get(collection)
      .insert(data)
      .then((record) => resolve(record))
      .catch((err) => reject(err));
  });
};

module.exports.getQueryMetaData = (collection, filter = {}, limit = 10, offset = 0) => {
  return new Promise((resolve, reject) => {
    db.get(collection)
      .find(filter)
      .then((records) => {
        const count = records.length;
        return resolve({
          count: count,
          pagination: Math.ceil(count / limit),
          limit: parseInt(limit),
          offset: parseInt(offset)
        });
      })
      .catch((err) => reject(err));
  });
};

module.exports.getRecords = (collection, filter = {}, limit = 10, offset = 0) => {
  return new Promise((resolve, reject) => {
    db.get(collection)
      .find(filter, { limit: parseInt(limit), skip: parseInt(offset), sort: { name: 1 } })
      .then((records) => resolve(records))
      .catch((err) => reject(err));
  });
};

module.exports.modifyRecord = (collection, data, id) => {
  return new Promise((resolve, reject) => {
    db.get(collection)
      .update({ _id: ObjectId(id) }, { "$set": data })
      .then(() => resolve(data))
      .catch((err) => reject(err));
  });
};

module.exports.deleteRecord = (collection, id) => {
  return new Promise((resolve, reject) => {
    db.get(collection)
      .remove({ _id: ObjectId(id) })
      .then((record) => resolve(record))
      .catch((err) => reject(err));
  });
};

module.exports.dropCollection = (collection) => {
  return new Promise((resolve, reject) => {
    db.get(collection)
      .drop()
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};
