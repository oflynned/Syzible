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
            return nounParser.parseNouns()
    }
};
