let express = require('express');
let router = express.Router();

const {save, findAll} = require("./controllers/nounsController");
const {parseTbxFile} = require("./controllers/datastoreController");

module.exports = ({dbName}) => {
    router.get('/', (req, res) => {
        return parseTbxFile("noun")
            .then(() => res.send("parsed"));
    });

    router.get('/find', (req, res) => {
        return findAll().then((data) => res.json(data));
    });

    return router;
};
