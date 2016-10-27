/**
 * Created by ed on 27/10/2016.
 */
var express = require('express');
var router = express.Router();

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

const BASE_URL = "http://www.tearma.ie/Search.aspx?term=";
const GA_PARAM = "&lang=3116659";
const EN_PARAM = "&lang=3116649";

// common
var term, synonyms, examples;
var domain, signpost, declension;

// if noun
var nomSing, nomPlu, genSing, genPlu, gender;

// if verb
var gerund, participle, preposition;

router.get('/', function (req, res) {
    var term = req.query['term'];
    var lang = req.query['lang'] === "en" ? EN_PARAM : GA_PARAM;
    var url = BASE_URL + term + lang;

    request(url, function (error, response, html) {
        var data = [];
        var $ = cheerio.load(html);

        //first dArticle is definitions, subsequent are related terms
        $('.dArticle').first().each(function () {
            $(this).find('.dSense .dTermHeadline .dWording').children().each(function () {
                data.push({term: $(this).text()});
            });
        });
        res.json(data);
    });
});

function parse(rawInput) {
    return new Promise();
}

module.exports = router;