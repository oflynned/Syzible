let express = require('express');
let router = express.Router();

const datastoreController = require("./controllers/datastoreController");

module.exports = ({dbName}) => {
    router.get('/', (req, res) => {
        return datastoreController.fetchTbxFile()
            .then((data) => res.send(""))
            .catch((err) => res.send(err))
    });

    return router;
};
