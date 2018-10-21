/**
 * Created by ed on 03/12/2016.
 */
"use strict";

let request = require('request');
let cheerio = require('cheerio');
const url = "http://www.tearma.ie/TOD.aspx";

export default function getWordOfDay(callback) {
    request(url, function (error, response, html) {
        if (error) throw error;

        let $ = cheerio.load(html);
        let terms = [];

        $('.dWording').each(function () {
            $(this).find('.dAnnotPOS').empty();
            $(this).find('.dAnnotInflect').empty();
            terms.push(replaceCarriages($(this).text()));
        });
        callback(terms[0]);
    })
}

function replaceCarriages(input) {
    return input.replace(/[\n\t\r]/g, "").replace(/\s\s+/g, " ").replace("¶", "").trim();
}
