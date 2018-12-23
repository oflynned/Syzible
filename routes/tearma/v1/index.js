/**
 * Created by ed on 27/10/2016.
 */
"use strict";

let express = require('express');
let router = express.Router();
let ScrapeData = require('./helpers.js');
let WordOfTheDay = require('./wordOfTheDay');

// API interface
router.get('/', function (req, res) {
    ScrapeData.scrapeData(req.query, function (data) {
        res.json(data);
    });
});

router.get('/tod', function (req, res) {
    WordOfTheDay.getWordOfDay(function (data) {
       res.json(data);
		});
});

module.exports = router;
