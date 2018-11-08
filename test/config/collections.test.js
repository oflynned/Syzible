let chai = require('chai'), expect = chai.expect;

const environments = require("../../config/environments");
const collections = require("../../config/collections");
const config = require('../../config/db');
const db = require('monk')(config.mongoUrl);

describe("collection categorisation", () => {
    beforeEach((done) => {
        dropDb().then(() => done());
    });

    function dropDb() {
        return db.get(collections.getEnvironment()).drop();
    }

    describe("#getEnvironment", () => {
        environments.forEach((env) => {
            it(`should return ${env} as legal environment`, () => {
                process.env.ENVIRONMENT = env;
                expect(collections.getEnvironment()).to.equal(env);
            });
        });

        it('should default to development for illegal environment', () => {
            [undefined, null, "not an environment"].forEach((env) => {
                process.env.ENVIRONMENT = env;
                expect(collections.getEnvironment()).to.equal("development");
            })
        });
    });

    describe("#getCollection", () => {
        environments.forEach((env) => {
            it(`should classify ${env} as a legal environment`, () => {
                process.env.ENVIRONMENT = env;
                let col = collections.getCollection();
                expect(col).to.be.an("object");
                expect(col).to.have.property("dbName");
                expect(col).to.have.property("collections");
                expect(col.dbName).to.equal(env === "production" ? "tearma" : `tearma_${env}`);
            });
        });
    })
});
