let assert = require("assert");

const collections = require("../../../../../config/collections");
const config = require("../../../../../config/db");
const db = require("monk")(config.mongoUrl);

const nounModel = require("../../../../../routes/tearma/v2/models/noun");

describe("noun model", () => {
	beforeEach((done) => {
		dropDb().then(() => done());
	});

	function dropDb () {
		return db.get(collections.getEnvironment()).drop();
	}

	let noun = {
		ga: {
			term: "term",
			mutations: {
				nominativeSingular: "ns",
				genitiveSingular: "gs",
				nominativePlural: "np",
				genitivePlural: "gp"
			},
			gender: "masculine",
			declension: 1
		},
		en: {
			term: "term"
		}
	};

	function deepClone (original) {
		return JSON.parse(JSON.stringify(original));
	}

	describe("#create", () => {
		test("should follow noun schema successfully", () => {
			let fixture = deepClone(noun);
			return nounModel.create(fixture)
				.then((data) => {
					expect(typeof data).toBe("object");
					expect(data).toHaveProperty("_id");

					expect(data).toHaveProperty("ga");
					expect(typeof data.ga).toBe("object");
					expect(data.ga).toHaveProperty("term");
					expect(data.ga).toHaveProperty("mutations");
					expect(typeof data.ga.mutations).toBe("object");
					expect(data.ga.mutations).toHaveProperty("nominativeSingular");
					expect(data.ga.mutations.nominativeSingular).toBe("ns");
					expect(data.ga.mutations).toHaveProperty("genitiveSingular");
					expect(data.ga.mutations.genitiveSingular).toBe("gs");
					expect(data.ga.mutations).toHaveProperty("nominativePlural");
					expect(data.ga.mutations.nominativePlural).toBe("np");
					expect(data.ga.mutations).toHaveProperty("genitivePlural");
					expect(data.ga.mutations.genitivePlural).toBe("gp");

					expect(data.ga).toHaveProperty("gender");
					expect(data.ga.gender).toBe("masculine");
					expect(data.ga).toHaveProperty("declension");
					expect(data.ga.declension).toBe(1);

					expect(data).toHaveProperty("en");
					expect(typeof data.en).toBe("object");
					expect(data.en).toHaveProperty("term");
					expect(data.en.term).toBe("term");
				});
		});

		describe(".ga", () => {
			test("should require term", () => {
				let fixture = deepClone(noun);
				delete fixture["ga"]["term"];

				return nounModel.create(fixture)
					.then(() => assert.fail("should not have succeeded"))
					.catch((err) => expect(err).not.toBeNull());
			});

			describe(".mutations", () => {
				test("should require nominative singular", () => {
					let fixture = deepClone(noun);
					delete fixture["ga"]["mutations"]["nominativeSingular"];

					return nounModel.create(fixture)
						.then(() => assert.fail("should not have succeeded"))
						.catch((err) => expect(err).not.toBeNull());
				});

				test("should require genitive singular", () => {
					let fixture = deepClone(noun);
					delete fixture["ga"]["mutations"]["genitiveSingular"];

					return nounModel.create(fixture)
						.then(() => assert.fail("should not have succeeded"))
						.catch((err) => expect(err).not.toBeNull());
				});

				test("should not require nominative plural", () => {
					let fixture = deepClone(noun);
					delete fixture["ga"]["mutations"]["nominativePlural"];

					return nounModel.create(fixture)
						.then((data) => expect(data.ga.mutations).not.toHaveProperty("nominativePlural"))
						.catch((err) => assert.fail(err));
				});

				test("should not require genitive plural", () => {
					let fixture = deepClone(noun);
					delete fixture["ga"]["mutations"]["genitivePlural"];

					return nounModel.create(fixture)
						.then((data) => expect(data.ga.mutations).not.toHaveProperty("genitivePlural"))
						.catch((err) => assert.fail(err));
				});
			});

			test("should require gender", () => {
				let fixture = deepClone(noun);
				delete fixture["ga"]["gender"];

				return nounModel.create(fixture)
					.then(() => assert.fail("should not have succeeded"))
					.catch((err) => expect(err).not.toBeNull());
			});

			test("should require declension", () => {
				let fixture = deepClone(noun);
				delete fixture["ga"]["declension"];

				return nounModel.create(fixture)
					.then(() => assert.fail("should not have succeeded"))
					.catch((err) => expect(err).not.toBeNull());
			});
		});

		describe(".en", () => {
			test("should require term", () => {
				let fixture = deepClone(noun);
				delete fixture["en"]["term"];

				return nounModel.create(fixture)
					.then(() => assert.fail("should not have succeeded"))
					.catch((err) => expect(err).not.toBeNull());
			});
		});
	});
});
