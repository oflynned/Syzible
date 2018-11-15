const chai = require('chai'); const expect = chai.expect;

process.env.ENVIRONMENT = 'test';
const config = require('../../../../../config/db');
const db = require('monk')(config.mongoUrl);

const fixtures = require('./nounParserExamples');
const nounModel = require('../../../../../routes/tearma/v2/models/noun');
const nounParser = require('../../../../../routes/tearma/v2/helpers/nounParser');

describe('noun parsing', () => {
	describe('#parseNounsFromData', () => {
		beforeEach((done) => {
			dropDb()
				.then(() => done())
				.catch((err) => done(err));
		});

		function dropDb () {
			return Promise.all([db.get('nouns').drop()]);
		}

		it('with separate plurals', (done) => {
			nounParser.parseNounsFromData(fixtures.separatePlurals)
				.then(() => nounModel.findAll())
				.then((nouns) => {
					expect(nouns).to.be.an('array');
					expect(nouns.length).to.equal(1);
					return nouns[0];
				})
				.then((noun) => {
					expect(noun).to.be.an('object');
					expect(noun.en.term).to.equal('adductor muscle');
					expect(noun.ga.term).to.equal('matán aduchtach');
					expect(noun.ga.mutations.nominativeSingular).to.equal('matán aduchtach');
					expect(noun.ga.mutations.genitiveSingular).to.equal('matáin aduchtaigh');
					expect(noun.ga.mutations.nominativePlural).to.equal('matáin aduchtacha');
					expect(noun.ga.mutations.genitivePlural).to.equal('matán aduchtach');
					expect(noun.ga.declension).to.equal(1);
					expect(noun.ga.gender).to.equal('masculine');
					done();
				})
				.catch((err) => done(err));
		});

		it('with combined plurals', (done) => {
			nounParser.parseNounsFromData(fixtures.combinedPlural)
				.then(() => nounModel.findAll())
				.then((nouns) => {
					expect(nouns).to.be.an('array');
					expect(nouns.length).to.equal(1);
					return nouns[0];
				})
				.then((noun) => {
					expect(noun).to.be.an('object');
					expect(noun.en.term).to.equal('occupier');
					expect(noun.ga.term).to.equal('áititheoir');
					expect(noun.ga.mutations.nominativeSingular).to.equal('áititheoir');
					expect(noun.ga.mutations.genitiveSingular).to.equal('áititheora');
					expect(noun.ga.mutations.nominativePlural).to.equal('áititheoirí');
					expect(noun.ga.mutations.genitivePlural).to.equal('áititheoirí');
					expect(noun.ga.declension).to.equal(3);
					expect(noun.ga.gender).to.equal('masculine');
					done();
				})
				.catch((err) => done(err));
		});

		it('with only nominative singular', (done) => {
			nounParser.parseNounsFromData(fixtures.onlyNominativeSingularForm)
				.then(() => nounModel.findAll())
				.then((nouns) => {
					expect(nouns).to.be.an('array');
					expect(nouns.length).to.equal(1);
					return nouns[0];
				})
				.then((noun) => {
					expect(noun).to.be.an('object');
					expect(noun.en.term).to.equal('contingent charge');
					expect(noun.ga.term).to.equal('muirear teagmhasach');
					expect(noun.ga.mutations.nominativeSingular).to.equal('muirear teagmhasach');
					expect(noun.ga.mutations.genitiveSingular).to.equal(null);
					expect(noun.ga.mutations.nominativePlural).to.equal(null);
					expect(noun.ga.mutations.genitivePlural).to.equal(null);
					expect(noun.ga.declension).to.equal(1);
					expect(noun.ga.gender).to.equal('masculine');
					done();
				})
				.catch((err) => done(err));
		});

		it('with no declension', (done) => {
			nounParser.parseNounsFromData(fixtures.noDeclension)
				.then(() => nounModel.findAll())
				.then((nouns) => {
					expect(nouns).to.be.an('array');
					expect(nouns.length).to.equal(1);
					return nouns[0];
				})
				.then((noun) => {
					expect(noun).to.be.an('object');
					expect(noun.en.term).to.equal('customs');
					expect(noun.ga.term).to.equal('custaim');
					expect(noun.ga.mutations.nominativeSingular).to.equal('custaim');
					expect(noun.ga.mutations.genitiveSingular).to.equal(null);
					expect(noun.ga.mutations.nominativePlural).to.equal(null);
					expect(noun.ga.mutations.genitivePlural).to.equal('custam');
					expect(noun.ga.declension).to.equal(-1);
					expect(noun.ga.gender).to.equal('masculine');
					done();
				})
				.catch((err) => done(err));
		});

		it('with multiple English terms to one Irish term', (done) => {
			nounParser.parseNounsFromData(fixtures.multipleEnglishToOneIrish)
				.then(() => nounModel.findAll())
				.then((nouns) => {
					expect(nouns).to.be.an('array');
					expect(nouns.length).to.equal(2);
					return nouns;
				})
				.then((nouns) => {
					expect(nouns[0]).to.be.an('object');
					expect(nouns[0].en.term).to.equal('heir-at-law');
					expect(nouns[0].ga.term).to.equal('oidhre ginearálta');
					expect(nouns[0].ga.mutations.nominativeSingular).to.equal('oidhre ginearálta');
					expect(nouns[0].ga.mutations.genitiveSingular).to.equal(null);
					expect(nouns[0].ga.mutations.nominativePlural).to.equal(null);
					expect(nouns[0].ga.mutations.genitivePlural).to.equal(null);
					expect(nouns[0].ga.declension).to.equal(4);
					expect(nouns[0].ga.gender).to.equal('masculine');

					expect(nouns[1]).to.be.an('object');
					expect(nouns[1].en.term).to.equal('heir at law');
					expect(nouns[1].ga.term).to.equal('oidhre ginearálta');
					expect(nouns[1].ga.mutations.nominativeSingular).to.equal('oidhre ginearálta');
					expect(nouns[1].ga.mutations.genitiveSingular).to.equal(null);
					expect(nouns[1].ga.mutations.nominativePlural).to.equal(null);
					expect(nouns[1].ga.mutations.genitivePlural).to.equal(null);
					expect(nouns[1].ga.declension).to.equal(4);
					expect(nouns[1].ga.gender).to.equal('masculine');

					done();
				})
				.catch((err) => done(err));
		});

		it('with multiple Irish terms to one English term', (done) => {
			nounParser.parseNounsFromData(fixtures.multipleIrishToOneEnglish)
				.then(() => nounModel.findAll())
				.then((nouns) => {
					expect(nouns).to.be.an('array');
					expect(nouns.length).to.equal(2);
					return nouns;
				})
				.then((nouns) => {
					expect(nouns[0]).to.be.an('object');
					expect(nouns[0].en.term).to.equal('customs clearance');
					expect(nouns[0].ga.term).to.equal('imréiteach custam');
					expect(nouns[0].ga.mutations.nominativeSingular).to.equal('imréiteach custam');
					expect(nouns[0].ga.mutations.genitiveSingular).to.equal(null);
					expect(nouns[0].ga.mutations.nominativePlural).to.equal(null);
					expect(nouns[0].ga.mutations.genitivePlural).to.equal(null);
					expect(nouns[0].ga.declension).to.equal(1);
					expect(nouns[0].ga.gender).to.equal('masculine');

					expect(nouns[1]).to.be.an('object');
					expect(nouns[1].en.term).to.equal('customs clearance');
					expect(nouns[1].ga.term).to.equal('imréiteach custaim');
					expect(nouns[1].ga.mutations.nominativeSingular).to.equal('imréiteach custaim');
					expect(nouns[1].ga.mutations.genitiveSingular).to.equal(null);
					expect(nouns[1].ga.mutations.nominativePlural).to.equal(null);
					expect(nouns[1].ga.mutations.genitivePlural).to.equal(null);
					expect(nouns[1].ga.declension).to.equal(1);
					expect(nouns[1].ga.gender).to.equal('masculine');

					done();
				})
				.catch((err) => done(err));
		});
	});
});
