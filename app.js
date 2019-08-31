module.exports = (env) => {
  const express = require("express");
  const path = require("path");
  const logger = require("morgan");
  const cookieParser = require("cookie-parser");
  const bodyParser = require("body-parser");
  const cors = require("cors");

  let app = express();
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "hbs");

  app.use(cors());
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  let root = require("./routes/index");
  let tearmaV1 = require("./routes/tearma/v1/index");
  let tearmaV2 = require("./routes/tearma/v2/index")(env);
  let irishRailApi = require("./routes/irishRail/v1/index");

  // routes
  // /
  app.use("/", root);

  // /tearma
  app.use("/tearma/backend", tearmaV1);
  app.use("/tearma/api/v1", tearmaV1);
  app.use("/tearma/api/v2", tearmaV2);
  app.use("/irish-rail/api/v1", irishRailApi);

  // app.use(express.static(path.join(__dirname, "ui/build")));
  // app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "/ui/build/index.html")));

  return app;
};
