process.env.ENVIRONMENT = "test";
const config = require("../../../../../config/db");
const db = require("monk")(config.mongoUrl);

const fixtures = require("./nounParserExamples");
const nounParser = require("../../../../../routes/tearma/v2/helpers/nounParser");

describe("noun parsing", () => {
	describe("#parseNounsFromData", () => {
		beforeEach((done) => {
			dropDb()
				.then(() => done())
				.catch((err) => done(err));
		});

		function dropDb () {
			return Promise.all([db.get("nouns").drop()]);
		}

		function loadFixture (fixture, length = 1) {
			return new Promise((resolve) => {
				nounParser.parseNounsFromData(fixture)
					.then((nouns) => nouns.sort((a, b) => a.ga.term - b.ga.term))
					.then((nouns) => {
						expect(Array.isArray(nouns)).toBe(true);
						expect(nouns.length).toBe(length);
						resolve(nouns);
					});
			});
		}

		test("with separate plurals", (done) => {
			loadFixture(fixtures.separatePlurals)
				.then((nouns) => {
					expect(typeof nouns[0]).toBe("object");
					expect(nouns[0].en.term).toBe("adductor muscle");
					expect(nouns[0].ga.term).toBe("matán aduchtach");
					expect(nouns[0].ga.mutations.nominativeSingular).toBe("matán aduchtach");
					expect(nouns[0].ga.mutations.genitiveSingular).toBe("matáin aduchtaigh");
					expect(nouns[0].ga.mutations.nominativePlural).toBe("matáin aduchtacha");
					expect(nouns[0].ga.mutations.genitivePlural).toBe("matán aduchtach");
					expect(nouns[0].ga.declension).toBe(1);
					expect(nouns[0].ga.gender).toBe("masculine");
					done();
				})
				.catch((err) => done(err));
		});

		test("with combined plurals", (done) => {
			loadFixture(fixtures.combinedPlural)
				.then((nouns) => {
					expect(typeof nouns[0]).toBe("object");
					expect(nouns[0].en.term).toBe("occupier");
					expect(nouns[0].ga.term).toBe("áititheoir");
					expect(nouns[0].ga.mutations.nominativeSingular).toBe("áititheoir");
					expect(nouns[0].ga.mutations.genitiveSingular).toBe("áititheora");
					expect(nouns[0].ga.mutations.nominativePlural).toBe("áititheoirí");
					expect(nouns[0].ga.mutations.genitivePlural).toBe("áititheoirí");
					expect(nouns[0].ga.declension).toBe(3);
					expect(nouns[0].ga.gender).toBe("masculine");
					done();
				})
				.catch((err) => done(err));
		});

		test("with only nominative singular", (done) => {
			loadFixture(fixtures.onlyNominativeSingularForm)
				.then((nouns) => {
					expect(typeof nouns[0]).toBe("object");
					expect(nouns[0].en.term).toBe("contingent charge");
					expect(nouns[0].ga.term).toBe("muirear teagmhasach");
					expect(nouns[0].ga.mutations.nominativeSingular).toBe("muirear teagmhasach");
					expect(nouns[0].ga.mutations.genitiveSingular).toBeNull();
					expect(nouns[0].ga.mutations.nominativePlural).toBeNull();
					expect(nouns[0].ga.mutations.genitivePlural).toBeNull();
					expect(nouns[0].ga.declension).toBe(1);
					expect(nouns[0].ga.gender).toBe("masculine");
					done();
				})
				.catch((err) => done(err));
		});

		test("with no declension", (done) => {
			loadFixture(fixtures.noDeclension)
				.then((nouns) => {
					expect(typeof nouns[0]).toBe("object");
					expect(nouns[0].en.term).toBe("customs");
					expect(nouns[0].ga.term).toBe("custaim");
					expect(nouns[0].ga.mutations.nominativeSingular).toBe("custaim");
					expect(nouns[0].ga.mutations.genitiveSingular).toBeNull();
					expect(nouns[0].ga.mutations.nominativePlural).toBeNull();
					expect(nouns[0].ga.mutations.genitivePlural).toBe("custam");
					expect(nouns[0].ga.declension).toBe(-1);
					expect(nouns[0].ga.gender).toBe("masculine");
					done();
				})
				.catch((err) => done(err));
		});

		test("with multiple English terms to one Irish term", (done) => {
			loadFixture(fixtures.multipleEnglishToOneIrish, 2)
				.then((nouns) => {
					expect(typeof nouns[0]).toBe("object");
					expect(nouns[0].en.term).toBe("heir-at-law");
					expect(nouns[0].ga.term).toBe("oidhre ginearálta");
					expect(nouns[0].ga.mutations.nominativeSingular).toBe("oidhre ginearálta");
					expect(nouns[0].ga.mutations.genitiveSingular).toBeNull();
					expect(nouns[0].ga.mutations.nominativePlural).toBeNull();
					expect(nouns[0].ga.mutations.genitivePlural).toBeNull();
					expect(nouns[0].ga.declension).toBe(4);
					expect(nouns[0].ga.gender).toBe("masculine");

					expect(typeof nouns[1]).toBe("object");
					expect(nouns[1].en.term).toBe("heir at law");
					expect(nouns[1].ga.term).toBe("oidhre ginearálta");
					expect(nouns[1].ga.mutations.nominativeSingular).toBe("oidhre ginearálta");
					expect(nouns[1].ga.mutations.genitiveSingular).toBeNull();
					expect(nouns[1].ga.mutations.nominativePlural).toBeNull();
					expect(nouns[1].ga.mutations.genitivePlural).toBeNull();
					expect(nouns[1].ga.declension).toBe(4);
					expect(nouns[1].ga.gender).toBe("masculine");

					done();
				})
				.catch((err) => done(err));
		});

		test("with multiple Irish terms to one English term", (done) => {
			loadFixture(fixtures.multipleIrishToOneEnglish, 2)
				.then((nouns) => {
					expect(typeof nouns[0]).toBe("object");
					expect(nouns[0].en.term).toBe("customs clearance");
					expect(nouns[0].ga.term).toBe("imréiteach custam");
					expect(nouns[0].ga.mutations.nominativeSingular).toBe("imréiteach custam");
					expect(nouns[0].ga.mutations.genitiveSingular).toBeNull();
					expect(nouns[0].ga.mutations.nominativePlural).toBeNull();
					expect(nouns[0].ga.mutations.genitivePlural).toBeNull();
					expect(nouns[0].ga.declension).toBe(1);
					expect(nouns[0].ga.gender).toBe("masculine");

					expect(typeof nouns[1]).toBe("object");
					expect(nouns[1].en.term).toBe("customs clearance");
					expect(nouns[1].ga.term).toBe("imréiteach custaim");
					expect(nouns[1].ga.mutations.nominativeSingular).toBe("imréiteach custaim");
					expect(nouns[1].ga.mutations.genitiveSingular).toBeNull();
					expect(nouns[1].ga.mutations.nominativePlural).toBeNull();
					expect(nouns[1].ga.mutations.genitivePlural).toBeNull();
					expect(nouns[1].ga.declension).toBe(1);
					expect(nouns[1].ga.gender).toBe("masculine");

					done();
				})
				.catch((err) => done(err));
		});
	});
});
