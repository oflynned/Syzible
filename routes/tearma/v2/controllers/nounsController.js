const { create, find } = require("../models/noun");

module.exports.save = async (noun) => {
  return create(noun);
};

module.exports.find = async (query, limit, offset) => {
  return find(query, limit, offset);
};
