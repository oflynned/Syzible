/**
 * Created by ed on 15/11/2016.
 */
var express = require('express');
var router = express.Router();

var ScrapeData = require('../Backend/Helpers');

router.get('/', function (req, res) {
    res.render('tearma_search');
});

router.get('/results', function (req, res) {
    console.log(req.query);
    ScrapeData.scrapeData(req.query, function (data) {
        var lang = data[0]["searchLang"];
        var searchQuery = req.query["term"];

        console.log(data.length + " records returned");
        res.render('tearma_results', {
            searchQuery: searchQuery,
            lang_en: lang === "en" ? lang : undefined,
            data: data.splice(1, data.length)
        });
    });
});

module.exports = router;

