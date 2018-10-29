const {createRecord, getRecords} = require("../../../../common/record");
const Joi = require("joi");

const collection = "nouns";
const exampleSchema = Joi.object().keys(
    {
        ga: Joi.string(),
        en: Joi.string()
    }
);
const schema = Joi.object().keys({
    ga: {
        term: Joi.string().required(),
        mutations: {
            nominativeSingular: Joi.string().required(),
            genitiveSingular: Joi.string().required(),
            nominativePlural: Joi.string(),
            genitivePlural: Joi.string(),
        },
        gender: Joi.string().valid("masculine", "feminine", "verbal noun").required(),
        declension: Joi.number().valid(-1, 1, 2, 3, 4, 5).required()
    },
    en: {
        term: Joi.string().required()
    },
    domains: Joi.array().items(exampleSchema).required(),
    examples: Joi.array().items(exampleSchema).required()
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

module.exports.findByEnglishTerm = (queryTerm) => {

};

module.exports.findByIrishTerm = (queryTerm) => {

};
