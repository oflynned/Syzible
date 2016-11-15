/**
 * Created by ed on 15/11/2016.
 */
var express = require('express');
var router = express.Router();

var scrapeData = require('../Backend/Helpers');

router.get('/', function (req, res) {
    res.render('tearma_search');
});

router.post('/results', function (req, res) {
    scrapeData(req.body, function (data) {
        console.log(data.length + " records returned");
        res.render('tearma_results', data);
    });
});

module.exports = router;

