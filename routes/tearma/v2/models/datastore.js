const {createRecord, getRecords} = require("../../../../common/record");
const Joi = require("joi");

const collection = "datastoreUpdates";

const schema = Joi.object().keys({
    collectionDate: Joi.date().required(),
    completed: Joi.date().required()
});

function validate(data) {
    return new Promise((res, rej) => {
        let result = Joi.validate(data, schema, {allowUnknown: false});
        result["error"] === null ? res() : rej(result["error"])
    });
}

module.exports.create = (data) => {
    return validate(data)
        .then(() => createRecord(collection, data))
        .catch((err) => {
            throw new Error(err)
        });
};

module.exports.findAll = () => {
    return getRecords(collection);
};
