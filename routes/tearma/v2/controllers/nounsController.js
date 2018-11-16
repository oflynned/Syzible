const { create, findAll, findByIrishTerm, findByEnglishTerm } = require("../models/noun");

module.exports.save = (noun) => {
	return create(noun);
};

module.exports.findAll = (query, limit, offset) => {
	return findAll(query, limit, offset);
};

module.exports.findByGaTerm = (query, limit, offset) => {
	return findByIrishTerm(query, limit, offset);
};

module.exports.findByEnTerm = (query, limit, offset) => {
	return findByEnglishTerm(query, limit, offset);
};
