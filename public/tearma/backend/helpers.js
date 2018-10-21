/**
 * Created by ed on 15/11/2016.
 */
"use strict";

let request = require('request');
let cheerio = require('cheerio');
let identifiers = require('./identifiers');

function scrapeData(queries, callback) {
    // general
    let searchTerm, searchType, signpost, declension, metaData;
    let langID;

    // if noun
    let gender, searchDeclension, searchGender;

    const term = encodeURIComponent(queries['term']);

    if (queries["lang"] === "on")
        langID = "en";
    else if (queries["lang"] === undefined)
        langID = "ga";
    else
        langID = queries["lang"];

    const lang = langID === "en" ? identifiers.EN_PARAM : identifiers.GA_PARAM;
    const limit = queries["limit"] = undefined ? -1 : queries["limit"];
    const url = lang === undefined ? identifiers.BASE_URL + term : identifiers.BASE_URL + term + lang;

    try {
        request(url, function (error, response, html) {
            let data = [];
            data.push({
                lang: langID
            });

            let $ = cheerio.load(html);

            //first dArticle set is definitions, subsequent are related terms after result section div
            $('.dArticle').each(function () {
                let searchMutations = [];

                $(this).find('.dHeadTerm > .dTerm > .dTermHeadline > span > a > span').each(function () {
                    searchType = $(this).find('.dAnnotPOS').text();
                    searchDeclension = parseInt(searchType.match(/\d+/));
                    searchGender = searchType.replace(/[0-9]/g, '');

                    $(this).find('.dAnnotPOS').empty();
                    searchTerm = cleanFormatting($(this).text().trim());
                    searchMutations.push({root: searchTerm.replace("¶", "")});
                });

                $(this).find('.dHeadTerm > .dTerm > .dTermSubline > .dInflect').each(function () {
                    let label = getLetters($(this).find('.dLabel').text());
                    let mutation = $(this).find('.dValue').text();

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

                    let domains = [];
                    $(this).find('.dDomains > .dDomain').each(function () {
                        let rawIrishDomain = $(this).find('.dIrish').text();
                        let rawEnglishDomain = $(this).find('.dEnglish').text();

                        let irishDomain = rawIrishDomain.split(" › ")[0];
                        let englishDomain = rawEnglishDomain.split(" › ")[0];

                        domains.push({
                            ga: irishDomain,
                            en: englishDomain
                        });
                    });

                    let synonyms = [];
                    // synonyms area below the search word
                    $(this).find('.dSynonyms > .dTerm').each(function () {
                        $(this).find('span > a > span > span').each(function () {
                            let metaData = $(this).find('.dAnnotPOS').text();
                            let type = metaData.replace(/[0-9]/g, '');
                            let syn_declension = parseInt(metaData.match(/\d+/g, ''));

                            $(this).find('.dAnnotPOS').empty();
                            let term = $(this).parent().text().trim();

                            synonyms.push({
                                synonym: term,
                                type: identifiers.genderMap[type],
                                declension: syn_declension
                            });
                        });
                    });

                    $(this).find('.dTargetTerms > .dTerm').each(function () {
                        let mutations = [];

                        $(this).find('.dTermHeadline > span > a > .dWording > .dStretch').each(function () {
                            metaData = $(this).find('.dAnnotPOS').text();
                            declension = parseInt(metaData.match(/\d+/));
                            gender = metaData.replace(/[0-9]/g, '');

                            $(this).find('.dAnnotPOS').empty();
                            let mutationRoot = $(this).parent().text();
                            mutations.push({root: cleanFormatting(mutationRoot)});
                        });

                        $(this).find('.dTermSubline > .dInflect').each(function () {
                            let label = $(this).find('.dLabel').text().replace(/[^a-zA-Z]+/g, '');
                            let mutation = $(this).find('.dValue').text();

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

                        if (langID === "en") {
                            data.push({
                                searchTerm: String(searchTerm),
                                searchType: String(identifiers.decTypeMap[searchType]),
                                searchMutations: searchMutations,
                                declension: isNaN(declension) ? -1 : parseInt(declension),
                                gender: identifiers.genderMap[gender],
                                mutations: mutations,
                                signpost: signpost === "" ? -1 : signpost,
                                domains: cleanArrayDuplicates(domains)
                            });
                        } else if (langID === "ga") {
                            data.push({
                                searchTerm: String(searchTerm),
                                searchType: String(identifiers.decTypeMap[searchType]),
                                declension: isNaN(searchDeclension) ? -1 : parseInt(searchDeclension),
                                gender: searchGender === 's' ? -1 : identifiers.genderMap[searchGender],
                                searchMutations: searchMutations,
                                mutations: mutations,
                                signpost: String(signpost) === "" ? -1 : signpost,
                                domains: cleanArrayDuplicates(domains)
                            });
                        }
                    });
                });
            });
            callback((limit < 1 || limit === undefined) ? data : data.splice(0, parseInt(limit) + 1));
        })
    } catch (error) {
        callback([{error: "error thrown"}]);
    }
}

function removeNumbers(input) {
    return parseInt(input.replace(/[0-9]/g, ''));
}

function getLetters(input) {
    return String(input).replace(/[^a-zA-Z]+/g, '');
}

function cleanFormatting(input) {
    return String(input).trim().replace(/\s\s+/g, " ").replace("¶", "").replace(" pl", "").replace(" iol", "");
}

function cleanArrayDuplicates(input) {
    let cleaned = [];

    input.forEach(function (itm) {
        let unique = true;
        cleaned.forEach(function (itm2) {
            if (JSON.stringify(itm) === JSON.stringify(itm2)) unique = false;
        });
        if (unique) cleaned.push(itm);
    });
    return cleaned;
}

module.exports = {
    scrapeData: scrapeData
};