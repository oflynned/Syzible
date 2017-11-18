"use strict";
let express = require('express');
let router = express.Router();

const axios = require("axios");
let fs = require("fs");

let ScrapeData = require('./Tearma/Backend/Helpers.js');
let WordOfTheDay = require('./Tearma/Backend/WordOfTheDay');

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


router.get('/enquiries', function (req, res) {
    let ip = req.ip.split(":").pop();

    res.render('enquiries', {
        year: new Date().getFullYear(),
        user_ip: String(ip)
    });
});

router.post("/submit-enquiry", function (req, res) {
    let userIP = req["user_ip"];
    let gCaptchaRes = req["g-captcha-response"];
    let secretKey = process.env["SECRET_KEY"];

    axios.post("https://www.google.com/recaptcha/api/siteverify", {
        secret: secretKey,
        response: gCaptchaRes,
        remoteip: userIP
    }).then(response => {
        console.log(response);
        res.json(response);
    })
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

module.exports = router;