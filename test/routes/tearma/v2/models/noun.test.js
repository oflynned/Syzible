let chai = require('chai'); let expect = chai.expect;
let assert = require('assert');

const collections = require('../../../../../config/collections');
const config = require('../../../../../config/db');
const db = require('monk')(config.mongoUrl);

const nounModel = require('../../../../../routes/tearma/v2/models/noun');

describe('noun model', () => {
	beforeEach((done) => {
		dropDb().then(() => done());
	});

	function dropDb () {
		return db.get(collections.getEnvironment()).drop();
	}

	let noun = {
		ga: {
			term: 'term',
			mutations: {
				nominativeSingular: 'ns',
				genitiveSingular: 'gs',
				nominativePlural: 'np',
				genitivePlural: 'gp'
			},
			gender: 'masculine',
			declension: 1
		},
		en: {
			term: 'term'
		}
	};

	function deepClone (original) {
		return JSON.parse(JSON.stringify(original));
	}

	describe('#create', () => {
		it('should follow noun schema successfully', () => {
			let fixture = deepClone(noun);
			return nounModel.create(fixture)
				.then((data) => {
					expect(data).to.be.an('object');
					expect(data).to.contain.property('_id');

					expect(data).to.contain.property('ga');
					expect(data.ga).to.be.an('object');
					expect(data.ga).to.have.property('term');
					expect(data.ga).to.have.property('mutations');
					expect(data.ga.mutations).to.be.an('object');
					expect(data.ga.mutations).to.have.property('nominativeSingular');
					expect(data.ga.mutations.nominativeSingular).to.equal('ns');
					expect(data.ga.mutations).to.have.property('genitiveSingular');
					expect(data.ga.mutations.genitiveSingular).to.equal('gs');
					expect(data.ga.mutations).to.have.property('nominativePlural');
					expect(data.ga.mutations.nominativePlural).to.equal('np');
					expect(data.ga.mutations).to.have.property('genitivePlural');
					expect(data.ga.mutations.genitivePlural).to.equal('gp');

					expect(data.ga).to.have.property('gender');
					expect(data.ga.gender).to.equal('masculine');
					expect(data.ga).to.have.property('declension');
					expect(data.ga.declension).to.equal(1);

					expect(data).to.have.property('en');
					expect(data.en).to.be.an('object');
					expect(data.en).to.have.property('term');
					expect(data.en.term).to.equal('term');
				});
		});

		describe('.ga', () => {
			it('should require term', () => {
				let fixture = deepClone(noun);
				delete fixture['ga']['term'];

				return nounModel.create(fixture)
					.then(() => assert.fail('should not have succeeded'))
					.catch((err) => expect(err).to.not.equal(null));
			});

			describe('.mutations', () => {
				it('should require nominative singular', () => {
					let fixture = deepClone(noun);
					delete fixture['ga']['mutations']['nominativeSingular'];

					return nounModel.create(fixture)
						.then(() => assert.fail('should not have succeeded'))
						.catch((err) => expect(err).to.not.equal(null));
				});

				it('should require genitive singular', () => {
					let fixture = deepClone(noun);
					delete fixture['ga']['mutations']['genitiveSingular'];

					return nounModel.create(fixture)
						.then(() => assert.fail('should not have succeeded'))
						.catch((err) => expect(err).to.not.equal(null));
				});

				it('should not require nominative plural', () => {
					let fixture = deepClone(noun);
					delete fixture['ga']['mutations']['nominativePlural'];

					return nounModel.create(fixture)
						.then((data) => expect(data.ga.mutations).to.not.have.property('nominativePlural'))
						.catch((err) => assert.fail(err));
				});

				it('should not require genitive plural', () => {
					let fixture = deepClone(noun);
					delete fixture['ga']['mutations']['genitivePlural'];

					return nounModel.create(fixture)
						.then((data) => expect(data.ga.mutations).to.not.have.property('genitivePlural'))
						.catch((err) => assert.fail(err));
				});
			});

			it('should require gender', () => {
				let fixture = deepClone(noun);
				delete fixture['ga']['gender'];

				return nounModel.create(fixture)
					.then(() => assert.fail('should not have succeeded'))
					.catch((err) => expect(err).to.not.equal(null));
			});

			it('should require declension', () => {
				let fixture = deepClone(noun);
				delete fixture['ga']['declension'];

				return nounModel.create(fixture)
					.then(() => assert.fail('should not have succeeded'))
					.catch((err) => expect(err).to.not.equal(null));
			});
		});

		describe('.en', () => {
			it('should require term', () => {
				let fixture = deepClone(noun);
				delete fixture['en']['term'];

				return nounModel.create(fixture)
					.then(() => assert.fail('should not have succeeded'))
					.catch((err) => expect(err).to.not.equal(null));
			});
		});
	});
});
