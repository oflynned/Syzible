/**
 * Created by ed on 15/11/2016.
 */
"use strict";
let express = require('express');
let router = express.Router();

let ScrapeData = require('../Backend/Helpers');
let WordOfTheDay = require('../Backend/WordOfTheDay');

router.get('/', function (req, res) {
    WordOfTheDay.getWordOfDay(function (wotd) {
        ScrapeData.scrapeData({term: wotd, lang: "ga"}, function (data) {
            res.render('tearma_search', {
                title: "Tearma.ie Web App",
                data: data.splice(1, data.length)
            });
        })
    });
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

router.get('/tod', function (req, res) {
    WordOfTheDay.getWordOfDay(function (term) {
        res.json({term: term});
    });
});

module.exports = router;

