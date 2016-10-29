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

// maps
var genderMap = {
    fir: 'masculine',
    bain: 'feminine'
};

var typeMap = {
    s: 'noun',
    br: 'verb',
    a: 'adjective'
};

router.get('/', function (req, res) {
    // common
    var searchTerm, searchType;
    var root, synonyms, examples;
    var domain, signpost;
    var declension, rootDeclension;
    var type, rootType;
    var metaData;

    // if noun
    var nomPlu, genSing, genPlu, gender;

    // if verb
    var gerund, participle, preposition;

    var term = req.query['term'];
    var lang;
    if (req.query['lang'] != undefined)
        lang = req.query['lang'] === "en" ? EN_PARAM : GA_PARAM;
    var url = lang === undefined ? BASE_URL + term : BASE_URL + term + lang;

    request(url, function (error, response, html) {
        var data = [];
        var $ = cheerio.load(html);

        //first dArticle is definitions, subsequent are related terms
        $('.dArticle').first().filter(function () {
            searchType = $(this).find('.dHeadTerm > .dTerm > .dTermHeadline > span > a > > span > span').text();
            $(this).find('.dHeadTerm > .dTerm > .dTermHeadline > span > a > span > span > .dAnnotPOS').empty();
            searchTerm = $(this).find('.dHeadTerm > .dTerm > .dTermHeadline > span > a > span > span').text().trim();

            //determine details about the word from each bullet point
            $(this).find('.dSense').each(function () {
                var domains = [];
                $(this).find('.dDomains > .dDomain > span').each(function () {
                    if ($(this).is('.dIrish'))
                        domains.push({domain_ga: $(this).text()});
                    else if ($(this).is('.dEnglish'))
                        domains.push({domain_en: $(this).text()});
                });

                $(this).find('.dTargetTerms > .dTerm').each(function () {
                    var mutations = [];

                    $(this).find('.dTermHeadline > span > a > .dWording > .dStretch').each(function () {
                        metaData = $(this).find('.dAnnotPOS').text();
                        declension = metaData.match(/\d+/)[0];
                        gender = metaData.replace(/[0-9]/g, '');

                        $(this).find('.dAnnotPOS').empty();
                        mutations.push({root: $(this).text().trim()});
                    });

                    $(this).find('.dTermSubline > .dInflect').each(function () {
                        var label = $(this).find('.dLabel').text().replace(/[^a-zA-Z]+/g, '');
                        var mutation = $(this).find('.dValue').text();

                        //nouns
                        if (label === "gu")
                            mutations.push({genSing: mutation});
                        else if (label === "gi")
                            mutations.push({genPlu: mutation});
                        else if (label === "ai")
                            mutations.push({nomPlu: mutation});
                        else if (label === "iol") {
                            mutations.push({genPlu: mutation});
                            mutations.push({nomPlu: mutation});
                        }

                        //verbs
                    });

                    data.push({
                        searchTerm: searchTerm,
                        searchType: typeMap[searchType],
                        root: root,
                        gender: genderMap[gender],
                        declension: declension,
                        mutations: mutations,
                        domains: domains
                    });
                });

            });
        });
        res.json(data);
    });
});

module.exports = router;