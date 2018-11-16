let express = require("express");
let router = express.Router();

const { findAll, findByGaTerm, findByEnTerm } = require("./controllers/nounsController");
const { parseTbxFile } = require("./controllers/datastoreController");

module.exports = ({ dbName }) => {
	router.get("/", (req, res) => {
		return parseTbxFile("noun")
			.then(() => res.send("parsed"));
	});

	router.get("/find", (req, res) => {
		let { query, queryLanguage, limit, offset } = req.query;
		let operation;

		if (queryLanguage === "ga") {
			operation = findByGaTerm(query, limit, offset);
		} else if (queryLanguage === "en") {
			operation = findByEnTerm(query, limit, offset);
		} else {
			operation = findAll(query, limit, offset);
		}

		return operation.then((results) => res.json(results));
	});

	return router;
};
