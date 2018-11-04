const fs = require('fs');
const elementTree = require('elementtree');
const xmldom = require('xmldom');
const xpath = require('xpath');
const parser = new xmldom.DOMParser;

const {create} = require("../models/noun");

const nounsQuery = '//termEntry[./langSet/tig/termNote[@type="partOfSpeech" and text()="s"]]';

function classifyGender(gender) {
    switch (gender.toString().toLowerCase()) {
        case "fir":
            return "masculine";
        case "bain":
            return "feminine";
        default:
            return "verbal noun";
    }
}

function classifyDeclension(declension) {
    return (declension.length > 0) ? parseInt(declension) : -1;
}

function splitMultipleForms(groupForm) {
    return groupForm.split(",").map((form) => form.trim())
}

function saveNoun(noun) {
    // TODO iterate over domains

    let maxCountEn = xpath.select('count(//langSet[@lang="en"]/tig)', noun).toString();
    let maxCountGa = xpath.select('count(//langSet[@lang="ga"]/tig)', noun).toString();

    if (maxCountEn === maxCountGa) {
        for (let i = 1; i <= maxCountEn; i++) {
            let enNominativeSingular = xpath.select(`//termEntry/langSet[@lang="en"]/tig/term[${i}]/text()`, noun).toString();

            let rawGenderDeclension = xpath.select(`//termEntry/langSet[2]/tig/termNote[@type="partOfSpeech"][${i}]/text()`, noun).toString();
            let declension = rawGenderDeclension.replace(/\D/g, '');
            let gender = rawGenderDeclension.replace(/[0-9]/g, '');

            let gaNominativeSingular = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/term[${i}]/text()`, noun).toString();
            let gaGenitiveSingular = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gu"][${i}]/text()`, noun).toString();
            let gaNominativePlural = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gi" or @type="iol"][${i}]/text()`, noun).toString();
            let gaGenitivePlural = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="ni" or @type="iol"][${i}]/text()`, noun).toString();

            let item = {
                ga: {
                    term: gaNominativeSingular,
                    mutations: {
                        nominativeSingular: gaNominativeSingular,
                        genitiveSingular: gaGenitiveSingular,
                        nominativePlural: gaNominativePlural,
                        genitivePlural: gaGenitivePlural
                    },
                    gender: classifyGender(gender),
                    declension: classifyDeclension(declension)
                },
                en: {
                    term: enNominativeSingular
                }
            };

            if (item) create(item).catch((err) => console.log(err, item))
        }
    } else if (maxCountEn > maxCountGa && maxCountGa === 1) {
        for (let i = 1; i <= maxCountEn; i++) {
            let enNominativeSingular = xpath.select(`//termEntry/langSet[@lang="en"]/tig/term[${i}]/text()`, noun).toString();

            let rawGenderDeclension = xpath.select(`//termEntry/langSet[2]/tig/termNote[@type="partOfSpeech"][1]/text()`, noun).toString();
            let declension = rawGenderDeclension.replace(/\D/g, '');
            let gender = rawGenderDeclension.replace(/[0-9]/g, '');

            let gaNominativeSingular = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/term[1]/text()`, noun).toString();
            let gaGenitiveSingular = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gu"][1]/text()`, noun).toString();
            let gaNominativePlural = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gi" or @type="iol"][1]/text()`, noun).toString();
            let gaGenitivePlural = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="ni" or @type="iol"][1]/text()`, noun).toString();

            let item = {
                ga: {
                    term: gaNominativeSingular,
                    mutations: {
                        nominativeSingular: gaNominativeSingular,
                        genitiveSingular: gaGenitiveSingular,
                        nominativePlural: gaNominativePlural,
                        genitivePlural: gaGenitivePlural
                    },
                    gender: classifyGender(gender),
                    declension: classifyDeclension(declension)
                },
                en: {
                    term: enNominativeSingular
                }
            };

            if (item) create(item).catch((err) => console.log(err, item))
        }
    } else if (maxCountGa > maxCountEn && maxCountEn === 1) {
        for (let i = 1; i <= maxCountGa; i++) {
            let enNominativeSingular = xpath.select(`//termEntry/langSet[@lang="en"]/tig/term[1]/text()`, noun).toString();

            let rawGenderDeclension = xpath.select(`//termEntry/langSet[2]/tig/termNote[@type="partOfSpeech"][${i}]/text()`, noun).toString();
            let declension = rawGenderDeclension.replace(/\D/g, '');
            let gender = rawGenderDeclension.replace(/[0-9]/g, '');

            let gaNominativeSingular = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/term[${i}]/text()`, noun).toString();
            let gaGenitiveSingular = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gu"][${i}]/text()`, noun).toString();
            let gaNominativePlural = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gi" or @type="iol"][${i}]/text()`, noun).toString();
            let gaGenitivePlural = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="ni" or @type="iol"][${i}]/text()`, noun).toString();

            let item = {
                ga: {
                    term: gaNominativeSingular,
                    mutations: {
                        nominativeSingular: gaNominativeSingular,
                        genitiveSingular: gaGenitiveSingular,
                        nominativePlural: gaNominativePlural,
                        genitivePlural: gaGenitivePlural
                    },
                    gender: classifyGender(gender),
                    declension: classifyDeclension(declension)
                },
                en: {
                    term: enNominativeSingular
                }
            };

            if (item) create(item).catch((err) => console.log(err, item))
        }
    }
}

module.exports.parseNounsFromPath = (path) => {
    const shouldWriteNounsXml = false;

    return new Promise((res) => {
        let xml = fs.readFileSync(path, "utf8");
        let modifiedXml = xml.replace(/xml:lang/g, 'lang');
        const tree = elementTree.parse(modifiedXml.toString());
        const root = tree.getroot();

        let stream;
        if (shouldWriteNounsXml) {
            stream = fs.createWriteStream('nouns.xml', {'flags': 'a'});
            stream.write("<nouns>\n");
        }

        root.iter('termEntry', (data) => {
            let root = elementTree.tostring(data, {encoding: 'utf8', method: 'xml'});
            let noun = parser.parseFromString(root, 'text/xml');
            let termEntry = xpath.select(nounsQuery, noun).toString();

            if (termEntry) {
                if (shouldWriteNounsXml) stream.write(termEntry + "\n");
                saveNoun(noun)
            }
        });

        if (shouldWriteNounsXml) {
            stream.write("</nouns>");
            stream.end();
        }

        res();
    });
};

module.exports.parseNounsFromData = (xml) => {
    return new Promise((res) => {
        let modifiedXml = xml.replace(/xml:lang/g, 'lang');
        const tree = elementTree.parse(modifiedXml.toString());
        const root = tree.getroot();
        root.iter('termEntry', (data) => {
            let root = elementTree.tostring(data, {encoding: 'utf8', method: 'xml'});
            let noun = parser.parseFromString(root, 'text/xml');
            let termEntry = xpath.select(nounsQuery, noun).toString();
            if (termEntry) {
                saveNoun(noun)
            }
        });

        res();
    });
};
