process.env.ENVIRONMENT = "test";
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
			declension: 1,
			domains: ["domain1", "domain2"]
		},
		en: {
			term: "term",
			domains: ["domain1", "domain2"]
		}
	};

	function deepClone (original) {
		return JSON.parse(JSON.stringify(original));
	}

	describe("#create", () => {
		test("should follow schema successfully", (done) => {
			let fixture = deepClone(noun);
			nounModel.create(fixture)
				.then((noun) => {
					expect(typeof noun).toBe("object");
					expect(noun).toHaveProperty("_id");
					expect(noun).toHaveProperty("ga");

					expect(typeof noun.ga).toBe("object");
					expect(noun.ga).toHaveProperty("term");
					expect(noun.ga).toHaveProperty("mutations");

					expect(typeof noun.ga.mutations).toBe("object");
					expect(noun.ga.mutations).toHaveProperty("nominativeSingular");
					expect(noun.ga.mutations.nominativeSingular).toBe("ns");
					expect(noun.ga.mutations).toHaveProperty("genitiveSingular");
					expect(noun.ga.mutations.genitiveSingular).toBe("gs");
					expect(noun.ga.mutations).toHaveProperty("nominativePlural");
					expect(noun.ga.mutations.nominativePlural).toBe("np");
					expect(noun.ga.mutations).toHaveProperty("genitivePlural");
					expect(noun.ga.mutations.genitivePlural).toBe("gp");
					expect(noun.ga).toHaveProperty("gender");
					expect(noun.ga.gender).toBe("masculine");
					expect(noun.ga).toHaveProperty("declension");
					expect(noun.ga.declension).toBe(1);
					expect(noun).toHaveProperty("en");

					expect(typeof noun.en).toBe("object");
					expect(noun.en).toHaveProperty("term");
					expect(noun.en.term).toBe("term");

					expect(noun.ga).toHaveProperty("domains");
					expect(Array.isArray(noun.ga.domains)).toEqual(true);
					expect(noun.ga.domains).toEqual(["domain1", "domain2"]);

					expect(noun.en).toHaveProperty("domains");
					expect(Array.isArray(noun.en.domains)).toEqual(true);
					expect(noun.en.domains).toEqual(["domain1", "domain2"]);

					done();
				});
		});

		describe(".ga", () => {
			test("should require term", () => {
				let fixture = deepClone(noun);
				delete fixture["ga"]["term"];

				nounModel.create(fixture)
					.then(() => assert.fail("should not have succeeded"))
					.catch((err) => expect(err).not.toBeNull());
			});

			describe(".mutations", () => {
				test("should require nominative singular", () => {
					let fixture = deepClone(noun);
					delete fixture.ga.mutations.nominativeSingular;

					nounModel.create(fixture)
						.then(() => assert.fail("should not have succeeded")
							.catch((err) => expect(err).not.toBeNull())
						);

					test("should not require genitive singular", () => {
						let fixture = deepClone(noun);
						delete fixture.ga.mutations.genitiveSingular;

						nounModel.create(fixture)
							.then((data) => expect(data.ga.mutations).not.toHaveProperty("genitiveSingular"))
							.catch((err) => assert.fail(err));
					});

					test("should not require nominative plural", () => {
						let fixture = deepClone(noun);
						delete fixture.ga.mutations.nominativePlural;

						nounModel.create(fixture)
							.then((data) => expect(data.ga.mutations).not.toHaveProperty("nominativePlural"))
							.catch((err) => assert.fail(err));
					});

					test("should not require genitive plural", () => {
						let fixture = deepClone(noun);
						delete fixture.ga.mutations.genitivePlural;

						nounModel.create(fixture)
							.then((data) => expect(data.ga.mutations).not.toHaveProperty("genitivePlural"))
							.catch((err) => assert.fail(err));
					});
				});

				test("should require gender", () => {
					let fixture = deepClone(noun);
					delete fixture.ga.gender;

					nounModel.create(fixture)
						.then(() => assert.fail("should not have succeeded"))
						.catch((err) => expect(err).not.toBeNull());
				});

				test("should require declension", () => {
					let fixture = deepClone(noun);
					delete fixture.ga.declension;

					nounModel.create(fixture)
						.then(() => assert.fail("should not have succeeded"))
						.catch((err) => expect(err).not.toBeNull());
				});

				test("should require domains", () => {
					let fixture = deepClone(noun);
					delete fixture.ga.domains;

					nounModel.create(fixture)
						.then(() => assert.fail("should not have succeeded"))
						.catch((err) => expect(err).not.toBeNull());
				});
			});

			describe(".en", () => {
				test("should require term", () => {
					let fixture = deepClone(noun);
					delete fixture["en"]["term"];

					nounModel.create(fixture)
						.then(() => assert.fail("should not have succeeded"))
						.catch((err) => expect(err).not.toBeNull());
				});

				test("should require domains", () => {
					let fixture = deepClone(noun);
					delete fixture.en.domains;

					nounModel.create(fixture)
						.then(() => assert.fail("should not have succeeded"))
						.catch((err) => expect(err).not.toBeNull());
				});
			});
		});
	});
});
