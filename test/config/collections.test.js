const environments = require("../../config/environments");
const collections = require("../../config/collections");
const config = require("../../config/db");
const db = require("monk")(config.mongoUrl);

describe("collection categorisation", () => {
  beforeEach((done) => {
    dropDb().then(() => done());
  });

  function dropDb () {
    return db.get(collections.getEnvironment()).drop();
  }

  describe("#getEnvironment", () => {
    environments.forEach((env) => {
      test(`should return ${env} as legal environment`, () => {
        process.env.ENVIRONMENT = env;
        expect(collections.getEnvironment()).toBe(env);
      });
    });

    test("should default to development for illegal environment", () => {
      [undefined, null, "not an environment"].forEach((env) => {
        process.env.ENVIRONMENT = env;
        expect(collections.getEnvironment()).toBe("development");
      });
    });
  });

  describe("#getCollection", () => {
    environments.forEach((env) => {
      test(`should classify ${env} as a legal environment`, () => {
        process.env.ENVIRONMENT = env;
        let col = collections.getCollection();
        expect(typeof col).toBe("object");
        expect(col).toHaveProperty("dbName");
        expect(col).toHaveProperty("collections");
        expect(col.dbName).toBe(env === "production" ? "tearma" : `tearma_${env}`);
      });
    });
  });
});
