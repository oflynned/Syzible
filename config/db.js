const collections = require("./collections");
const dbName = collections.getCollection()["dbName"];

module.exports = {
    get dbName() {
        return dbName;
    },

    get mongoUrl() {
        let developmentUrl = `mongodb://localhost:27017/${dbName}`;
        let productionUrl = process.env.MONGODB_URL;
        return collections.getEnvironment() === "production" ? productionUrl : developmentUrl;
    }
};