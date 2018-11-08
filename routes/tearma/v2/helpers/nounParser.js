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

function groomNounFromDefinition(noun) {
    // TODO iterate over domains

    let maxCountEn = parseInt(xpath.select('count(//langSet[@lang="en"]/tig)', noun));
    let maxCountGa = parseInt(xpath.select('count(//langSet[@lang="ga"]/tig)', noun));
    let definitions = [];

    // TODO refactor to use just one for loop and reduce duplicated logic
    if (maxCountEn === maxCountGa) {
        for (let i = 1; i <= maxCountEn; i++) {
            let enNominativeSingular = xpath.select(`//termEntry/langSet[@lang="en"]/tig/term[${i}]/text()`, noun).toString();

            let rawGenderDeclension = xpath.select(`//termEntry/langSet[2]/tig/termNote[@type="partOfSpeech"][${i}]/text()`, noun).toString();
            let declension = rawGenderDeclension.replace(/\D/g, '');
            let gender = rawGenderDeclension.replace(/[0-9]/g, '');

            let gaNominativeSingular = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/term[${i}]/text()`, noun).toString();
            let gaGenitiveSingular = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gu"][${i}]/text()`, noun).toString();
            let gaNominativePlural = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="ai" or @type="iol"][${i}]/text()`, noun).toString();
            let gaGenitivePlural = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gi" or @type="iol"][${i}]/text()`, noun).toString();

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

            definitions.push(item);
        }
    } else if (maxCountEn > maxCountGa && maxCountGa === 1) {
        for (let i = 1; i <= maxCountEn; i++) {
            let enNominativeSingular = xpath.select(`//termEntry/langSet[@lang="en"]/tig/term[${i}]/text()`, noun).toString();

            let rawGenderDeclension = xpath.select(`//termEntry/langSet[2]/tig/termNote[@type="partOfSpeech"][1]/text()`, noun).toString();
            let declension = rawGenderDeclension.replace(/\D/g, '');
            let gender = rawGenderDeclension.replace(/[0-9]/g, '');

            let gaNominativeSingular = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/term[1]/text()`, noun).toString();
            let gaGenitiveSingular = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gu"][1]/text()`, noun).toString();
            let gaNominativePlural = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="ai" or @type="iol"][1]/text()`, noun).toString();
            let gaGenitivePlural = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gi" or @type="iol"][1]/text()`, noun).toString();

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

            definitions.push(item);
        }
    } else if (maxCountGa > maxCountEn && maxCountEn === 1) {
        for (let i = 1; i <= maxCountGa; i++) {
            let enNominativeSingular = xpath.select(`//termEntry/langSet[@lang="en"]/tig/term[1]/text()`, noun).toString();

            let rawGenderDeclension = xpath.select(`//termEntry/langSet[2]/tig/termNote[@type="partOfSpeech"][${i}]/text()`, noun).toString();
            let declension = rawGenderDeclension.replace(/\D/g, '');
            let gender = rawGenderDeclension.replace(/[0-9]/g, '');

            let gaNominativeSingular = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/term[${i}]/text()`, noun).toString();
            let gaGenitiveSingular = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gu"][${i}]/text()`, noun).toString();
            let gaNominativePlural = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="ai" or @type="iol"][${i}]/text()`, noun).toString();
            let gaGenitivePlural = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gi" or @type="iol"][${i}]/text()`, noun).toString();

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

            definitions.push(item);
        }
    }

    return definitions;
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
                groomNounFromDefinition(noun)
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
        let nouns = [];

        root.iter('termEntry', (data) => {
            let root = elementTree.tostring(data, {encoding: 'utf8', method: 'xml'});
            let noun = parser.parseFromString(root, 'text/xml');
            let termEntry = xpath.select(nounsQuery, noun).toString();
            if (termEntry) {
                let nounSet = groomNounFromDefinition(noun);
                nouns = nouns.concat(nounSet)
            }
        });

        let saveOperations = nouns.map((noun) => create(noun));
        Promise.all(saveOperations).then(() => res());
    });
};
