process.env.ENVIRONMENT = "test";
const config = require("../../../../../config/db");
const db = require("monk")(config.mongoUrl);

const fixtures = require("./nounParserExamples");
const nounParser = require("../../../../../routes/tearma/v2/helpers/nounParser");

describe("noun parsing", () => {
	function dropDb () {
		return Promise.all([db.get("nouns").drop()]);
	}

	function loadFixture (fixture, length = 1) {
		return new Promise((resolve) => {
			nounParser.parseNounsFromData(fixture)
				.then((nouns) => nouns.sort((a, b) => a.ga.term - b.ga.term))
				.then((nouns) => {
					expect(Array.isArray(nouns)).toBe(true);
					expect(nouns.length).toEqual(length);
					resolve(nouns.length === 1 ? nouns[0] : nouns);
				});
		});
	}

	describe("#loadFixture", () => {
		test("should return object given single definition fixture length", (done) => {
			loadFixture(fixtures.singleItemDefinition)
				.then((result) => {
					expect(typeof result).toBe("object");
					expect(Array.isArray(result)).toEqual(false);
					done();
				});
		});

		test("should return array given multiple definition fixture length", (done) => {
			loadFixture(fixtures.multipleItemDomain, 2)
				.then((result) => {
					expect(Array.isArray(result)).toEqual(true);
					expect(result.length > 1).toBe(true);
					expect(typeof result[0]).toBe("object");
					expect(typeof result[1]).toBe("object");
					done();
				});
		});
	});

	describe("#parseNounsFromData", () => {
		beforeEach((done) => {
			dropDb()
				.then(() => done())
				.catch((err) => done(err));
		});

		describe("domain parsing", () => {
			test("with one domain", (done) => {
				loadFixture(fixtures.singleDomain)
					.then((noun) => {
						expect(noun.en.domains).toEqual(["Law › Property Law"]);
						expect(noun.ga.domains).toEqual(["Dlí › Dlí Réadmhaoine"]);
						done();
					});
			});

			test("with multiple domains", (done) => {
				loadFixture(fixtures.multipleDomains)
					.then((noun) => {
						expect(noun.en.domains).toEqual(["Biology", "Medicine, Medical › Physiology"]);
						expect(noun.ga.domains).toEqual(["Bitheolaíocht", "Leigheas › Fiseolaíocht"]);
						done();
					});
			});
		});

		describe("mutation parsing", () => {
			test("with separate plurals", (done) => {
				loadFixture(fixtures.separatePlurals)
					.then((noun) => {
						expect(noun.en.term).toEqual("adductor muscle");
						expect(noun.ga.term).toEqual("matán aduchtach");
						expect(noun.ga.mutations.nominativeSingular).toEqual("matán aduchtach");
						expect(noun.ga.mutations.genitiveSingular).toEqual("matáin aduchtaigh");
						expect(noun.ga.mutations.nominativePlural).toEqual("matáin aduchtacha");
						expect(noun.ga.mutations.genitivePlural).toEqual("matán aduchtach");
						expect(noun.ga.declension).toEqual(1);
						expect(noun.ga.gender).toEqual("masculine");
						done();
					});
			});

			test("with combined plurals", (done) => {
				loadFixture(fixtures.combinedPlural)
					.then((noun) => {
						expect(noun.en.term).toEqual("occupier");
						expect(noun.ga.term).toEqual("áititheoir");
						expect(noun.ga.mutations.nominativeSingular).toEqual("áititheoir");
						expect(noun.ga.mutations.genitiveSingular).toEqual("áititheora");
						expect(noun.ga.mutations.nominativePlural).toEqual("áititheoirí");
						expect(noun.ga.mutations.genitivePlural).toEqual("áititheoirí");
						expect(noun.ga.declension).toEqual(3);
						expect(noun.ga.gender).toEqual("masculine");
						done();
					});
			});

			test("with only nominative singular", (done) => {
				loadFixture(fixtures.onlyNominativeSingularForm)
					.then((noun) => {
						expect(noun.en.term).toEqual("contingent charge");
						expect(noun.ga.term).toEqual("muirear teagmhasach");
						expect(noun.ga.mutations.nominativeSingular).toEqual("muirear teagmhasach");
						expect(noun.ga.mutations.genitiveSingular).toBeNull();
						expect(noun.ga.mutations.nominativePlural).toBeNull();
						expect(noun.ga.mutations.genitivePlural).toBeNull();
						expect(noun.ga.declension).toEqual(1);
						expect(noun.ga.gender).toEqual("masculine");
						done();
					});
			});

			test("with no declension", (done) => {
				loadFixture(fixtures.noDeclension)
					.then((noun) => {
						expect(noun.en.term).toEqual("customs");
						expect(noun.ga.term).toEqual("custaim");
						expect(noun.ga.mutations.nominativeSingular).toEqual("custaim");
						expect(noun.ga.mutations.genitiveSingular).toBeNull();
						expect(noun.ga.mutations.nominativePlural).toBeNull();
						expect(noun.ga.mutations.genitivePlural).toEqual("custam");
						expect(noun.ga.declension).toEqual(-1);
						expect(noun.ga.gender).toEqual("masculine");
						done();
					});
			});

			test("with multiple English terms to one Irish term", () => {
				loadFixture(fixtures.multipleEnglishToOneIrish, 2)
					.then((nouns) => {
						expect(nouns[0].en.term).toEqual("heir-at-law");
						expect(nouns[0].ga.term).toEqual("oidhre ginearálta");
						expect(nouns[0].ga.mutations.nominativeSingular).toEqual("oidhre ginearálta");
						expect(nouns[0].ga.mutations.genitiveSingular).toBeNull();
						expect(nouns[0].ga.mutations.nominativePlural).toBeNull();
						expect(nouns[0].ga.mutations.genitivePlural).toBeNull();
						expect(nouns[0].ga.declension).toEqual(4);
						expect(nouns[0].ga.gender).toEqual("masculine");

						expect(nouns[1].en.term).toEqual("heir at law");
						expect(nouns[1].ga.term).toEqual("oidhre ginearálta");
						expect(nouns[1].ga.mutations.nominativeSingular).toEqual("oidhre ginearálta");
						expect(nouns[1].ga.mutations.genitiveSingular).toBeNull();
						expect(nouns[1].ga.mutations.nominativePlural).toBeNull();
						expect(nouns[1].ga.mutations.genitivePlural).toBeNull();
						expect(nouns[1].ga.declension).toEqual(4);
						expect(nouns[1].ga.gender).toEqual("masculine");
					});
			});

			test("with multiple Irish terms to one English term", () => {
				loadFixture(fixtures.multipleIrishToOneEnglish, 2)
					.then((nouns) => {
						expect(nouns[0].en.term).toEqual("customs clearance");
						expect(nouns[0].ga.term).toEqual("imréiteach custam");
						expect(nouns[0].ga.mutations.nominativeSingular).toEqual("imréiteach custam");
						expect(nouns[0].ga.mutations.genitiveSingular).toBeNull();
						expect(nouns[0].ga.mutations.nominativePlural).toBeNull();
						expect(nouns[0].ga.mutations.genitivePlural).toBeNull();
						expect(nouns[0].ga.declension).toEqual(1);
						expect(nouns[0].ga.gender).toEqual("masculine");

						expect(nouns[1].en.term).toEqual("customs clearance");
						expect(nouns[1].ga.term).toEqual("imréiteach custaim");
						expect(nouns[1].ga.mutations.nominativeSingular).toEqual("imréiteach custaim");
						expect(nouns[1].ga.mutations.genitiveSingular).toBeNull();
						expect(nouns[1].ga.mutations.nominativePlural).toBeNull();
						expect(nouns[1].ga.mutations.genitivePlural).toBeNull();
						expect(nouns[1].ga.declension).toEqual(1);
						expect(nouns[1].ga.gender).toEqual("masculine");
					});
			});
		});
	});
});
