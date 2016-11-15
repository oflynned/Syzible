/**
 * Created by ed on 15/11/2016.
 */
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var Promise = require('promise')

const BASE_URL = "http://www.tearma.ie/Search.aspx?term=";
const GA_PARAM = "&lang=3116659";
const EN_PARAM = "&lang=3116649";

// maps
var genderMap = {
    fir: 'masculine',
    bain: 'feminine'
};

var decTypeMap = {
    "fir": "noun",
    "fir1": "noun",
    "fir2": "noun",
    "fir3": "noun",
    "fir4": "noun",
    "fir5": "noun",
    "bain": "noun",
    "bain1": "noun",
    "bain2": "noun",
    "bain3": "noun",
    "bain4": "noun",
    "bain5": "noun",
    "s": 'noun',
    "br": 'verb',
    "a": 'adjective',
    "réimír": 'prefix',
    "v": "verb",
    "phr.": "phrase",
    "frása": "phrase",
    "abbr": "abbreviation"
};

function scrapeData(queries, callback) {
    var searchTerm, searchType;
    var signpost;
    var declension;
    var metaData;

    // if noun
    var gender;
    var searchDeclension = 0, searchGender = null;

    var term = encodeURIComponent(queries['term']);
    var lang;
    var limit = queries["limit"] = undefined ? -1 : queries["limit"];
    var showExamples = queries["examples"] === "true";

    if (queries['lang'] != undefined)
        lang = queries['lang'] === "en" ? EN_PARAM : GA_PARAM;
    var url = lang === undefined ? BASE_URL + term : BASE_URL + term + lang;

    request(url, function (error, response, html) {
        var data = [];
        var $ = cheerio.load(html);

        //first dArticle set is definitions, subsequent are related terms after result section div
        $('.dArticle').each(function () {
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

                if (label === "gu")
                    searchMutations[0]["genSing"] = mutation;
                else if (label === "gi")
                    searchMutations[0]["genPlu"] = mutation;
                else if (label === "ai")
                    searchMutations[0]["nomPlu"] = mutation;
                else if (label === "iol") {
                    searchMutations[0]["genPlu"] = mutation;
                    searchMutations[0]["nomPlu"] = mutation;
                }

                //verbs
                else if (label === "abr")
                    searchMutations[0]["gerund"] = mutation;
                else if (label === "aidbhr")
                    searchMutations[0]["participle"] = mutation;
            });

            //determine details about the word from each bullet point
            $(this).find('.dSense').each(function () {
                signpost = $(this).find('.dSignpost > .dIntro').text();

                var domains = [];
                $(this).find('.dDomains > .dDomain').each(function () {
                    var rawIrishDomain = $(this).find('.dIrish').text();
                    var rawEnglishDomain = $(this).find('.dEnglish').text();

                    var irishDomain = rawIrishDomain.split(" › ")[0];
                    var englishDomain = rawEnglishDomain.split(" › ")[0];

                    domains.push({
                        ga: irishDomain,
                        en: englishDomain
                    });
                });

                /*var synonyms = [];
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
                 type: genderMap[type],
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
                 */

                $(this).find('.dTargetTerms > .dTerm').each(function () {
                    var mutations = [];

                    $(this).find('.dTermHeadline > span > a > .dWording > .dStretch').each(function () {
                        metaData = $(this).find('.dAnnotPOS').text();
                        declension = parseInt(metaData.match(/\d+/));
                        gender = metaData.replace(/[0-9]/g, '');

                        $(this).find('.dAnnotPOS').empty();
                        mutations.push({root: $(this).parent().text().trim().replace(/\s\s+/g, ' ')});
                    });

                    $(this).find('.dTermSubline > .dInflect').each(function () {
                        var label = $(this).find('.dLabel').text().replace(/[^a-zA-Z]+/g, '');
                        var mutation = $(this).find('.dValue').text();

                        if (label === "gu")
                            mutations[0]["genSing"] = mutation;
                        else if (label === "gi")
                            mutations[0]["genPlu"] = mutation;
                        else if (label === "ai")
                            mutations[0]["nomPlu"] = mutation;
                        else if (label === "iol") {
                            mutations[0]["genPlu"] = mutation;
                            mutations[0]["nomPlu"] = mutation;
                        }

                        //verbs
                        else if (label === "abr")
                            mutations[0]["gerund"] = mutation;
                        else if (label === "aidbhr")
                            mutations[0]["participle"] = mutation;
                    });

                    data.push({
                        lang: lang === undefined ? -1 : lang,
                        searchTerm: String(searchTerm).replace(/\s\s+/g, " "),
                        searchType: String(decTypeMap[searchType]),
                        searchDeclension: isNaN(searchDeclension) ? -1 : parseInt(searchDeclension),
                        searchGender: searchGender === 's' ? -1 : genderMap[searchGender],
                        searchMutations: searchMutations,
                        signpost: signpost === "" ? -1 : signpost,
                        //synonyms: synonyms === [] ? -1 : synonyms,
                        gender: genderMap[gender],
                        mutations: mutations,
                        domains: domains
                        //examples: examples
                    });
                });
            });
        });

        callback((limit <= 0 || limit == undefined) ? data : data.splice(0, limit));
    });
}

module.exports = scrapeData;