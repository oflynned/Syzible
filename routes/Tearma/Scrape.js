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
    "s": 'noun',
    "br": 'verb',
    "a": 'adjective',
    "réimír": 'prefix',
    "v": "verb",
    "phr.": "phrase",
    "frása" : "phrase"
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

    var searchDeclension = 0, searchGender= "";

    var term = req.query['term'];
    term = decodeURIComponent(term);
    var lang;
    if (req.query['lang'] != undefined)
        lang = req.query['lang'] === "en" ? EN_PARAM : GA_PARAM;
    var url = lang === undefined ? BASE_URL + term : BASE_URL + term + lang;

    request(url, function (error, response, html) {
        var data = [];
        var $ = cheerio.load(html);

        //first dArticle is definitions, subsequent are related terms
        $('.dArticle').filter(function () {
            var searchMutations = [];

            $(this).find('.dHeadTerm > .dTerm > .dTermHeadline > span > a > span').each(function () {
                searchType = $(this).find('.dAnnotPOS').text();
                searchDeclension = parseInt(searchType.match(/\d+/));
                searchGender = searchType.replace(/[0-9]/g, '');

                $(this).find('.dAnnotPOS').empty();
                searchTerm = $(this).text().trim();
                searchMutations.push({root: searchTerm});
            });

            $(this).find('.dHeadTerm > .dTerm > .dTermSubline > .dInflect').each(function () {
                var label = $(this).find('.dLabel').text().replace(/[^a-zA-Z]+/g, '');
                var mutation = $(this).find('.dValue').text();

                // nouns
                if (label === "gu")
                    searchMutations.push({genSing: mutation});
                else if (label === "gi")
                    searchMutations.push({genPlu: mutation});
                else if (label === "ai")
                    searchMutations.push({nomPlu: mutation});
                else if (label === "iol") {
                    searchMutations.push({genPlu: mutation});
                    searchMutations.push({nomPlu: mutation});
                }

                // verbs
                else if (label === "abr")
                    searchMutations.push({gerund: mutation});
                else if (label === "aidbhr")
                    searchMutations.push({participle: mutation});
            });

            //determine details about the word from each bullet point
            $(this).find('.dSense').each(function () {
                var domains = [];
                $(this).find('.dDomains > .dDomain').each(function () {
                    domains.push({
                        ga: $(this).find('.dIrish').text(),
                        en: $(this).find('.dEnglish').text()
                    });
                });

                var synonyms = [];
                // synonyms area below the search word
                $(this).find('.dSynonyms > .dTerm').each(function () {
                    $(this).find('span > a > span > span').each(function () {
                        var metaData = $(this).find('.dAnnotPOS').text();
                        var type = metaData.replace(/[0-9]/g, '');
                        var syn_declension = parseInt(metaData.match(/\d+/g, ''));

                        $(this).find('.dAnnotPOS').empty();
                        var term = $(this).parent().text().trim();

                        synonyms.push({
                            synonym: term,
                            type: typeMap[type],
                            declension: syn_declension
                        });
                    });
                });

                var examples = [];
                $(this).find('.dExamples > .dExample').each(function () {
                    var source = $(this).find('.dSource').text();
                    var target = $(this).find('.dTarget').text();

                    examples.push({
                        source: source,
                        target: target
                    });
                });

                $(this).find('.dTargetTerms > .dTerm').each(function () {
                    var mutations = [];

                    $(this).find('.dTermHeadline > span > a > .dWording > .dStretch').each(function () {
                        metaData = $(this).find('.dAnnotPOS').text();
                        declension = parseInt(metaData.match(/\d+/));
                        gender = metaData.replace(/[0-9]/g, '');

                        $(this).find('.dAnnotPOS').empty();
                        mutations.push({root: $(this).parent().text().trim().replace("  ", " ")});
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
                        else if (label === "abr")
                            mutations.push({gerund: mutation});
                        else if (label === "aidbhr")
                            mutations.push({participle: mutation});
                    });

                    data.push({
                        searchTerm: searchTerm,
                        searchType: typeMap[searchType],
                        searchDeclension: searchDeclension,
                        searchGender: genderMap[searchGender],
                        searchMutations: searchMutations,
                        synonyms: synonyms,
                        gender: genderMap[gender],
                        mutations: mutations,
                        domains: domains,
                        examples: examples
                    });
                });

            });
        });
        res.json(data);
    });
});

module.exports = router;