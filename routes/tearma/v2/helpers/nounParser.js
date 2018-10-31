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
    return declension ? parseInt(declension) : -1;
}

module.exports.parseNouns = (path) => {
    return new Promise((res) => {
        let xml = fs.readFileSync(path, "utf8");
        let modifiedXml = xml.replace(/xml:lang/g, 'lang');
        const tree = elementTree.parse(modifiedXml.toString());
        const root = tree.getroot();

        console.log("starting iteration");

        root.iter('termEntry', (data) => {
            let root = elementTree.tostring(data, {encoding: 'utf8', method: 'xml'});
            let noun = parser.parseFromString(root, 'text/xml');

            if (xpath.select(nounsQuery, noun).toString()) {
                let rawGenderDeclension = xpath.select('//termEntry/langSet[2]/tig/termNote[@type="partOfSpeech"]/text()', noun).toString();
                let declension = rawGenderDeclension.replace(/\D/g, '');
                let gender = rawGenderDeclension.replace(/[0-9]/g, '');

                let enNominativeSingular = xpath.select('//termEntry/langSet[@lang="en"]/tig/term/text()', noun).toString();

                let gaNominativeSingular = xpath.select('//termEntry/langSet[@lang="ga"]/tig/term/text()', noun).toString();
                let gaGenitiveSingular = xpath.select('//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gu"]/text()', noun).toString();
                let gaNominativePlural = xpath.select('//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gi" or @type="iol"]/text()', noun).toString();
                let gaGenitivePlural = xpath.select('//termEntry/langSet[@lang="ga"]/tig/termNote[@type="ni" or @type="iol"]/text()', noun).toString();

                return create({
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
                    },
                    domains: [],
                    examples: []
                })
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err))
            }
        });

        res();
    });
};