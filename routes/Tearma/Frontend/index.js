/**
 * Created by ed on 15/11/2016.
 */
var express = require('express');
var router = express.Router();

var ScrapeData = require('../Backend/Helpers');

router.get('/', function (req, res) {
    res.render('tearma_search', {title: "Tearma.ie Web App"});
});

router.get('/results', function (req, res) {
    req.query["limit"] = req.query["limit"] == undefined ? -1 : req.query["limit"];
    ScrapeData.scrapeData(req.query, function (data) {
        var lang = data[0]["lang"];
        var searchQuery = req.query["term"];

        console.log(data.length + " records returned");
        res.render('tearma_results', {
            title: "Results for " + searchQuery,
            searchQuery: searchQuery,
            lang_en: lang === "en",
            data: data.splice(1, data.length)
        });
    });
});

module.exports = router;

