const fs = require('fs');

module.exports.parseNouns = (path) => {
    let nouns = [];

    return fs.readFile(path)
        .then((data) => {
            console.log(data);
        })
};
