const chai = require('chai'), expect = chai.expect;
const assert = require("assert");

process.env.ENVIRONMENT = "test";
const config = require('../../../../../config/db');
const db = require('monk')(config.mongoUrl);

const {oneToOneFixture} = require("./nounParserExamples");
const nounModel = require("../../../../../routes/tearma/v2/models/noun");
const nounParser = require("../../../../../routes/tearma/v2/helpers/nounParser");

// 1-1 en ga
// 3-1 en ga
// 1-3 en ga
// 2-3 en ga (should return {})

describe("noun parsing", () => {
    beforeEach((done) => {
        dropDb().then(() => done());
    });

    function dropDb() {
        return db._db.dropDatabase();
    }

    it('should parse 1-1 terms', () => {
        return nounParser.parseNounsFromData(oneToOneFixture)
            .then(() => nounModel.findAll())
            .then((nouns) => {
                expect(nouns).to.be.an("array");
                expect(nouns.length).to.equal(1);
                return nouns[0];
            })
            .then((noun) => {
                expect(noun).to.be.an("object");
                expect(noun.en.term).to.equal("occupier");
                expect(noun.ga.term).to.equal("áititheoir");
                expect(noun.ga.mutations.nominativeSingular).to.equal("áititheoir");
                expect(noun.ga.mutations.genitiveSingular).to.equal("áititheora");
                expect(noun.ga.mutations.nominativePlural).to.equal("áititheoirí");
                expect(noun.ga.mutations.genitivePlural).to.equal("áititheoirí");
                expect(noun.ga.declension).to.equal(3);
                expect(noun.ga.gender).to.equal("masculine");
            })
    });
});
