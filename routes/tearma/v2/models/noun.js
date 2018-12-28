const { getQueryMetaData, createRecord, getRecords } = require("../../../../common/record");
const Joi = require("joi");

const collection = "nouns";
const schema = Joi.object().keys({
	ga: {
		term: Joi.string(),
		mutations: {
			nominativeSingular: Joi.string().required(),
			genitiveSingular: Joi.string().allow(null),
			nominativePlural: Joi.string().allow(null),
			genitivePlural: Joi.string().allow(null)
		},
		gender: Joi.string().valid("masculine", "feminine", "verbal noun").required(),
		declension: Joi.number().valid(-1, 1, 2, 3, 4, 5).required(),
		domains: Joi.array().items(Joi.string()).required()
	},
	en: {
		term: Joi.string().required(),
		domains: Joi.array().items(Joi.string()).required()
	}
});

function validate (data) {
	return new Promise((resolve, reject) => {
		let result = Joi.validate(data, schema, { allowUnknown: false });
		result["error"] === null ? resolve() : reject(result["error"]);
	});
}

module.exports.create = async (data) => {
	return validate(data)
		.then(() => createRecord(collection, data))
		.catch((err) => {
			throw new Error(err);
		});
};

module.exports.find = async (query, limit, offset) => {
	let queryExpression = new RegExp(query);
	let gaResults = await module.exports.findByIrishTerm(queryExpression, limit, offset);
	let enResults = await module.exports.findByEnglishTerm(queryExpression, limit, offset);
	return Object.assign({}, gaResults, enResults);
};

module.exports.findByIrishTerm = async (query, limit, offset) => {
	let queryExpression = new RegExp(query);
	let metaData = await getQueryMetaData(collection, { "ga.term": queryExpression }, limit, offset);
	let result = await getRecords(collection, { "ga.term": queryExpression }, limit, offset);
	return {
		ga: {
			meta: metaData,
			results: result
		}
	};
};

module.exports.findByEnglishTerm = async (query, limit, offset) => {
	let queryExpression = new RegExp(query);
	let metaData = await getQueryMetaData(collection, { "en.term": queryExpression }, limit, offset);
	let result = await getRecords(collection, { "en.term": queryExpression }, limit, offset);
	return {
		en: {
			meta: metaData,
			results: result
		}
	};
};
