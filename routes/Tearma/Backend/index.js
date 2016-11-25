/**
 * Created by ed on 27/10/2016.
 */
var express = require('express');
var router = express.Router();

var ScrapeData = require('./Helpers.js');

router.get('/', function (req, res) {
    ScrapeData.scrapeData(req.query, function (data) {
        console.log(data.length + " records returned");
        res.json(data);
    });
});

module.exports = router;