/**
 * Created by ed on 21/11/2016.
 */
"use strict";

let chai = require('chai');
let expect = chai.expect;
let Scraper = require('../../routes/Tearma/Backend/Helpers.js');
let queries = {
    lang: 'en',
    term: 'test'
};

describe('Check Term Searched', function () {
    it('scrapeData() should return back data if is valid query', function(done) {
        Scraper.scrapeData(queries, function (data) {
            expect(data[0]["searchTerm"]).to.equal("test");
            done();
        })
    })
});

describe('Check Return Type', function () {
    it('scrapeData() should return back json array', function(done) {
        Scraper.scrapeData(queries, function (data) {
            expect(typeof (data)).to.equal('object');
            done();
        })
    })
});

