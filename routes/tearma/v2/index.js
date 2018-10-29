let express = require('express');
let router = express.Router();

const {save, findAll} = require("./controllers/nounsController");
const {parseTbxFile} = require("./controllers/datastoreController");

module.exports = ({dbName}) => {
    router.get('/', (req, res) => {
        return parseTbxFile("noun")
            .then((nouns) => nouns.forEach((noun) => save(noun)))
            .then(() => findAll())
            .then((data) => res.json(data));
    });

    return router;
};
