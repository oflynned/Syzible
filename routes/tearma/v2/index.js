let express = require('express');
let router = express.Router();

module.exports = ({dbName}) => {
    router.get('/', (req, res) => res.json({db: dbName}));

    return router;
};