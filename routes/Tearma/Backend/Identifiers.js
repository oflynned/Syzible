/**
 * Created by ed on 13/12/2016.
 */

const BASE_URL = "http://www.tearma.ie/Search.aspx?term=";
const GA_PARAM = "&lang=3116659";
const EN_PARAM = "&lang=3116649";

// maps
const genderMap = {
    fir: 'masculine',
    bain: 'feminine'
};

const decTypeMap = {
    "fir": "noun",
    "fir1": "noun",
    "fir2": "noun",
    "fir3": "noun",
    "fir4": "noun",
    "fir5": "noun",
    "fir iol": "noun",

    "bain": "noun",
    "bain2": "noun",
    "bain3": "noun",
    "bain4": "noun",
    "bain5": "noun",
    "bain iol": "noun",

    "a": 'adjective',
    "a1": 'adjective',
    "a2": 'adjective',
    "a3": 'adjective',

    "br" : "verb",
    "dob": "adverb",
    "abr": "gerund",
    "aid.bhr.": "participle",

    "coll.": "noun",
    "cón": "conjunction",
    "f.ch.": "compound",

    "for": "pronoun",
    "for.r.": "pronoun",

    "frása": "phrase",
    "gi mar a": "adjective",
    "gior": "abbreviation",
    "gu mar a": "adjective",
    "iarmh": "suffix",
    "intr": "interjection",
    "réimír": 'prefix',
    "rfh": "preposition",
    "rfh.comh.": "compound preposition",
    "s": 'noun',
    "s pl": "noun",
    "str.cop.": "copula",
    "teasc": "truncated",

    "br": 'verb',
    "v": "verb",
    "phr.": "phrase",
    "abbr": "abbreviation",
    "gior": "abbreviation",
    "ginf": "phrase",
    "phr": "phrase"
};

module.exports = {
    BASE_URL: BASE_URL,
    GA_PARAM: GA_PARAM,
    EN_PARAM: EN_PARAM,
    genderMap: genderMap,
    decTypeMap: decTypeMap
};