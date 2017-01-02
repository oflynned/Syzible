"use strict";
let express = require('express');
let router = express.Router();
let ScrapeData = require('./Tearma/Backend/Helpers.js');

const apps = [
    {
        name: "English-Irish Dictionary",
        description: "Parser app and backend service for Téarma.ie",
        image: "/images/tearma_logo.png",
        url: "https://play.google.com/store/apps/details?id=com.syzible.tearma"
    }
];

const jobs = [
    {
        employer: "GlassByte Ltd",
        location: "Ballsbridge, Dublin, Ireland",
        title: "CTO/Developer",
        period: "April 2015 - Present",
        url: "http://www.glassbyte.com",
        image: "/images/glassbyte.png"
    },
    {
        employer: "Accenture PLC",
        location: "Grand Canal Dock, Dublin, Ireland",
        title: "Machine Learning Analyst Intern",
        period: "June - September 2016",
        url: "http://www.accenture.com",
        image: "/images/accenture.png"
    },
    {
        employer: "Huawei Technologies Ltd",
        location: "Shenzhen, Guangdong, China",
        title: "Seeds for the Future Intern",
        period: "August 2015",
        url: "http://www.huawei.com",
        image: "/images/huawei.png"
    },
    {
        employer: "TIC Summer Camp",
        location: "Bethesda, Maryland, USA",
        title: "Programming/Robotics Camp Counsellor",
        period: "June - September 2014",
        url: "http://www.ticcamp.com",
        image: "/images/tic.jpg"
    }
];

router.get('/', function (req, res) {
    res.render('index', {
        title: "Syzible",
        apps: apps
    });
});

router.get('/work-experience', function (req, res) {
    res.render('work-experience', {
        jobs: jobs,
        title: "Work Experience"
    });
});

router.get('/developers', function (req, res) {
    let query = {term: "term", lang: "en", limit: 3};
    ScrapeData.scrapeData(query, function (data) {
        res.render('developers', {
            title: "Developers",
            term: query.term,
            json_title: JSON.stringify({API: "Access"}),
            query_json_0: JSON.stringify(data[0], null, 2),
            query_json_1: JSON.stringify(data[1], null, 2),
            query_json_2: JSON.stringify(data[2], null, 2),
            query_json_3: JSON.stringify(data[3], null, 2),
            data: data.splice(1, data.length)
        })
    })
});

module.exports = router;
