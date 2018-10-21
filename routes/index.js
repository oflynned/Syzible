"use strict";

let express = require('express');
let router = express.Router();
let fs = require("fs");

router.get('/', function (req, res) {
    res.render('index', {
        year: new Date().getFullYear()
    });
});

router.get('/apps', function (req, res) {
    res.render('apps', {
        year: new Date().getFullYear()
    });
});

router.get('/developers', function (req, res) {
    res.render("developers", {
        year: new Date().getFullYear()
    });
});

router.get("/thesis", function (req, res) {
    const filePath = __dirname + "/../public/media/Thesis.pdf";
    fs.readFile(filePath, function (err, data) {
        res.contentType("application/pdf");
        res.send(data);
    });
});

router.get("/snapchat-filter", (req, res) => {
    const filePath = __dirname + "/../public/media/Snapchat-Filters-Project.pdf";
    fs.readFile(filePath, (err, data) => {
        res.contentType("application/pdf");
        res.send(data);
    })
});

module.exports = router;