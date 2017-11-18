"use strict";
let express = require('express');
let router = express.Router();

let fs = require("fs");

let ScrapeData = require('./Tearma/Backend/Helpers.js');
let WordOfTheDay = require('./Tearma/Backend/WordOfTheDay');

router.get('/', function (req, res) {
    res.render('index', {
        year: new Date().getFullYear()
    });
});

router.get('/apps', function (req, res) {
    res.render('apps', {
        year: new Date().getFullYear()
    });
});


router.get('/enquiries', function (req, res) {
    res.render('enquiries', {
        year: new Date().getFullYear()
    });
});

router.get('/developers', function (req, res) {
    res.render("developers", {
        year: new Date().getFullYear()
    });

    /*
    let query = {term: "term", lang: "en", limit: 3};
    WordOfTheDay.getWordOfDay(function (wotd) {
        ScrapeData.scrapeData(query, function (data) {
            res.render('developers', {
                title: "Developers",
                term: query.term,
                query_json_0: JSON.stringify(data[0], null, 2),
                query_json_1: JSON.stringify(data[1], null, 2),
                query_json_2: JSON.stringify(data[2], null, 2),
                query_json_3: JSON.stringify(data[3], null, 2),
                tod: JSON.stringify(wotd, null, 2),
                data: data.splice(1, data.length)
            })
        })
    })*/
});

router.get("/thesis", function (req, res) {
    const filePath = __dirname + "/../public/media/Thesis.pdf";
    fs.readFile(filePath, function (err, data) {
        res.contentType("application/pdf");
        res.send(data);
    });
});

module.exports = router;