let record = require("../../common/record");

let chai = require('chai'), expect = chai.expect, should = chai.should();
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe("db operations", () => {
    describe("create", () => {
        [undefined, null, ""].forEach((fixture) => {
            it(`should not allow ${fixture} as a collection name`, (done) => {
                record.createRecord(fixture, {test: 123})
                    .then(() => done("should have failed"))
                    .catch((err) => {
                        expect(err.message).to.equal("empty_collection");
                        done();
                    });
            });
        });

        [undefined, null, ""].forEach((fixture) => {
            it(`should not allow ${fixture} as data`, (done) => {
                record.createRecord("collection_name", fixture)
                    .then(() => done("should have failed"))
                    .catch((err) => {
                        expect(err.message).to.equal("empty_data");
                        done()
                    });
            })
        });

        it('should create a new record', (done) => {
            record.createRecord("collection_name", {test: 123})
                .then((data) => {
                    expect(data).to.be.an("object");
                    expect(data).to.have.property("_id");
                    expect(data).to.have.property("test");
                    expect(data.test).to.equal(123);
                    done()
                })
                .catch((err) => done(err));
        });
    });
});