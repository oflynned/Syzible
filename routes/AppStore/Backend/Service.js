/**
 * Created by ed on 05/12/2016.
 */
"use strict";
let path = require('path');
let formidable = require('formidable');
let fs = require('fs');

function greet(callback) {
    callback(Date.now());
}

function uploadFile(file, callback) {
    let form = formidable.IncomingForm();
    form.multiples = true;

    let directory = __dirname.split('/').pop();
    directory = directory.join('/');
    directory += "/Uploads/" + file.name;
    form.uploadDir = directory;

    console.log(form.uploadDir);

    callback();
}

module.exports = {
    greet: greet
};
