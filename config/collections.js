function classifyEnvironment(env) {
    let dbName = env === "production" ? "tearma" : `tearma_${env}`;
    return {
        "dbName": dbName,
        "collections": [
            "nouns", "verbs", "adjectives", "phrases", "abbreviations"
        ]
    };
}

module.exports = (env) => classifyEnvironment(env);