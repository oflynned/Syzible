let express = require("express");
let router = express.Router();

const { find } = require("./controllers/nounsController");
const { parseTbxFile } = require("./controllers/datastoreController");

module.exports = () => {
  router.get("/", (_req, res) => {
    return parseTbxFile("noun").then(() => res.send("parsed"));
  });

  router.get("/find", (req, res) => {
    let { query, limit, offset } = req.query;
    return find(query, limit, offset).then((results) => res.json(results));
  });

  return router;
};
