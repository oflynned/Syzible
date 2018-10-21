/**
 * Created by ed on 15/11/2016.
 */
"use strict";
let express = require('express');
let router = express.Router();

import scrapeData from '../Backend/helpers';
import getWordOfDay from '../Backend/wordOfTheDay';

router.get('/', function (req, res) {
    getWordOfDay(function (wotd) {
        scrapeData({term: wotd, lang: "ga"}, function (data) {
            res.render('tearma_search', {
                title: "Tearma.ie Web App",
                data: data.splice(1, data.length)
            });
        })
    });
});

router.get('/results', function (req, res) {
    req.query["limit"] = req.query["limit"] === undefined ? -1 : req.query["limit"];
    scrapeData(req.query, function (data) {
        let lang = data[0]["lang"];
        let searchQuery = req.query["term"];

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
    getWordOfDay(function (term) {
        res.json({term: term});
    });
});

module.exports = router;

