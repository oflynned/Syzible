let express = require('express');
let router = express.Router();

const datastoreController = require("./controllers/datastoreController");

module.exports = ({dbName}) => {
    router.get('/', (req, res) => res.json({db: dbName}));

    return router;
};
