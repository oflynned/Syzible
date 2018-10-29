const {create, findAll} = require("../models/noun");

module.exports.save = (noun) => {
    return create(noun)
};

module.exports.findAll = () => {
    return findAll()
};
