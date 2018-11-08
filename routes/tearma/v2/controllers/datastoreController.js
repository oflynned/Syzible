const {fetchTbxFile, fetchEndpointName, unzipFile} = require("../helpers/dataFetcher");
const nounParser = require("../helpers/nounParser");

module.exports.fetchTbxFile = () => {
    return fetchEndpointName()
        .then(({filename, endpoint}) => fetchTbxFile(filename, endpoint))
        .then((filename) => unzipFile(filename));
};

module.exports.parseTbxFile = (model) => {
    switch (model.toLowerCase()) {
        case "noun":
            // const path = __dirname + "/../datasets/18.10.01-tearma.ie-concepts.tbx";
            const path = __dirname + "/../datasets/nouns.xml";
            return nounParser.parseNouns(path);
    }
};
