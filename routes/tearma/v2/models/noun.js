const { createRecord, getRecords } = require('../../../../common/record');
const Joi = require('joi');

const collection = 'nouns';
const schema = Joi.object().keys({
	ga: {
		term: Joi.string(),
		mutations: {
			nominativeSingular: Joi.string().required(),
			genitiveSingular: Joi.string().allow(null),
			nominativePlural: Joi.string().allow(null),
			genitivePlural: Joi.string().allow(null)
		},
		gender: Joi.string().valid('masculine', 'feminine', 'verbal noun').required(),
		declension: Joi.number().valid(-1, 1, 2, 3, 4, 5).required()
	},
	en: {
		term: Joi.string().required()
	}
});

function validate (data) {
	return new Promise((resolve, reject) => {
		let result = Joi.validate(data, schema, { allowUnknown: false });
		result['error'] === null ? resolve() : reject(result['error']);
	});
}

module.exports.create = (data) => {
	return validate(data)
		.then(() => createRecord(collection, data))
		.catch((err) => {
			throw new Error(err);
		});
};

module.exports.findAll = (query, limit, offset) => {
	let queryExpression = new RegExp(query);
	return getRecords(collection, {
		'$or': [{
			'en.term': queryExpression
		}, {
			'ga.term': queryExpression
		}]
	}, limit, offset);
};

module.exports.findByIrishTerm = (query, limit, offset) => {
	let queryExpression = new RegExp(query);
	return getRecords(collection, { 'ga.term': queryExpression }, limit, offset);
};

module.exports.findByEnglishTerm = (query, limit, offset) => {
	let queryExpression = new RegExp(query);
	return getRecords(collection, { 'en.term': queryExpression }, limit, offset);
};
