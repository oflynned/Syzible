let record = require("../../common/record");
let chai = require("chai");
let expect = chai.expect;

const config = require("../../config/db");
const db = require("monk")(config.mongoUrl);
const collection = "collection";

describe("db operations", () => {
	beforeEach((done) => {
		dropDb().then(() => done());
	});

	function dropDb () {
		return db.get(collection).drop();
	}

	describe("#createRecord", () => {
		[undefined, null, ""].forEach((fixture) => {
			it(`should not allow ${fixture} as a collection name`, (done) => {
				record.createRecord(fixture, { test: 123 })
					.then(() => done("should have failed"))
					.catch((err) => {
						expect(err.message).to.equal("empty_collection");
						done();
					});
			});
		});

		[undefined, null, ""].forEach((fixture) => {
			it(`should not allow ${fixture} as data`, (done) => {
				record.createRecord(collection, fixture)
					.then(() => done("should have failed"))
					.catch((err) => {
						expect(err.message).to.equal("empty_data");
						done();
					});
			});
		});

		it("should create a new record", (done) => {
			record.createRecord(collection, { test: 123 })
				.then((data) => {
					expect(data).to.be.an("object");
					expect(data).to.have.property("_id");
					expect(data).to.have.property("test");
					expect(data.test).to.equal(123);
					done();
				})
				.catch((err) => done(err));
		});
	});

	describe("#getRecords", () => {
		beforeEach((done) => {
			record.createRecord(collection, { test: 123 })
				.then(() => done());
		});

		it("should retrieve with filter", (done) => {
			record.getRecords(collection, { test: 123 })
				.then((data) => {
					expect(data).to.be.an("array");
					expect(data.length).to.equal(1);
					expect(data[0]).to.have.property("_id");
					expect(data[0]).to.have.property("test");
					done();
				})
				.catch((err) => done(err));
		});

		it("should retrieve without filter", (done) => {
			record.getRecords(collection, {})
				.then((data) => {
					expect(data).to.be.an("array");
					expect(data.length).to.equal(1);
					expect(data[0]).to.have.property("_id");
					expect(data[0]).to.have.property("test");
					done();
				})
				.catch((err) => done(err));
		});
	});

	describe("#modifyRecord", () => {
		let data;

		beforeEach((done) => {
			record.createRecord(collection, { test: 123 })
				.then((_data) => {
					data = _data;
				})
				.then(() => done());
		});

		it("should modify record", (done) => {
			let modified = Object.assign({}, data, { test: 321 });
			record.modifyRecord(collection, modified, modified["_id"])
				.then((data) => {
					expect(data).to.be.an("object");
					expect(data).to.have.property("_id");
					expect(data).to.have.property("test");
					expect(data.test).to.equal(321);
					done();
				})
				.catch((err) => done(err));
		});
	});

	describe("#deleteRecord", () => {
		let id;

		beforeEach((done) => {
			record.createRecord(collection, { test: 123 })
				.then(({ _id }) => {
					id = _id;
				})
				.then(() => done());
		});

		it("should delete record", (done) => {
			record.deleteRecord(collection, id)
				.then(() => record.getRecords(collection, {}))
				.then((data) => {
					expect(data.length).to.equal(0);
					done();
				})
				.catch((err) => done(err));
		});
	});
});
