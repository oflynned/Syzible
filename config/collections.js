require("dotenv").load();

const environments = require("./environments");

function classifyEnvironment (env) {
	let dbName = env === "production" ? "tearma" : `tearma_${env}`;
	return {
		"dbName": dbName,
		"collections": [
			"nouns", "verbs", "adjectives", "phrases", "abbreviations"
		]
	};
}

function getEnvironment () {
	const providedEnvironment = process.env.ENVIRONMENT.toLowerCase();
	return environments.includes(providedEnvironment) ? providedEnvironment : "development";
}

function getCollection () {
	let env = getEnvironment();
	return classifyEnvironment(env);
}

module.exports = {
	getCollection: getCollection,
	getEnvironment: getEnvironment
};
