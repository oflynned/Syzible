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

    let enIterable = 0;
    let gaIterable = 0;
    for (let i = 1; i <= Math.max(maxCountGa, maxCountEn); i++) {
        if (maxCountEn === maxCountGa) {
            enIterable = gaIterable = i;
        } else if (maxCountEn > maxCountGa) {
            enIterable = i;
            gaIterable = 1;
        } else if (maxCountGa > maxCountEn) {
            enIterable = 1;
            gaIterable = i;
        }

        let enNominativeSingular = xpath.select(`//termEntry/langSet[@lang="en"]/tig/term[${enIterable}]/text()`, noun).toString();

        let rawGenderDeclension = xpath.select(`//termEntry/langSet[2]/tig/termNote[@type="partOfSpeech"][${gaIterable}]/text()`, noun).toString();
        let declension = rawGenderDeclension.replace(/\D/g, '');
        let gender = rawGenderDeclension.replace(/[0-9]/g, '');

        let gaNominativeSingular = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/term[${gaIterable}]/text()`, noun).toString();
        let gaGenitiveSingular = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gu"][${gaIterable}]/text()`, noun).toString();
        let gaNominativePlural = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="ai" or @type="iol"][${gaIterable}]/text()`, noun).toString();
        let gaGenitivePlural = xpath.select(`//termEntry/langSet[@lang="ga"]/tig/termNote[@type="gi" or @type="iol"][${gaIterable}]/text()`, noun).toString();

        let item = {
            ga: {
                term: gaNominativeSingular,
                mutations: {
                    nominativeSingular: gaNominativeSingular,
                    genitiveSingular: gaGenitiveSingular.length === 0 ? null : gaGenitiveSingular,
                    nominativePlural: gaNominativePlural.length === 0 ? null : gaNominativePlural,
                    genitivePlural: gaGenitivePlural.length === 0 ? null : gaGenitivePlural
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

    return definitions;
}

module.exports.parseNouns = (path) => {
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
                let nounSet = groomNounFromDefinition(noun);
                let nouns = [].concat(nounSet);
                let saveOperations = nouns.map((noun) => create(noun));
                Promise.all(saveOperations);
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
