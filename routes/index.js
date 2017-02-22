"use strict";
let express = require('express');
let router = express.Router();
let ScrapeData = require('./Tearma/Backend/Helpers.js');
let WordOfTheDay = require('./Tearma/Backend/WordOfTheDay');

const badge_resource = "&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1";

const apps = [
    {
        name: "Real Time Dublin",
        description: "Better and quicker real time bus information for Dublin Bus.",
        image: "/images/real_time_dublin_logo.png",
        badge_res: badge_resource
    },
    {
        name: "English-Irish Dictionary",
        description: "Find and discover a wealth of new vocabulary through a parser app.",
        image: "/images/tearma_logo.png",
        badge_res: badge_resource,
        url: "https://play.google.com/store/apps/details?id=com.syzible.tearma"
    }
];

const jobs = [
    {
        employer: "Syzible",
        location: "@ MacBook",
        title: "Freelancer",
        period: "August 2016 - Present",
        url: "http://www.syzible.com",
        image: "/images/syzible_logo.png"
    },
    {
        employer: "GlassByte",
        location: "Ballsbridge, Dublin, Ireland",
        title: "Director/Developer",
        period: "April 2015 - Present",
        url: "http://www.glassbyte.com",
        image: "/images/glassbyte.png"
    },
    {
        employer: "Accenture",
        location: "Grand Canal Dock, Dublin, Ireland",
        title: "Machine Learning Analyst",
        period: "June - September 2016",
        url: "http://www.accenture.com",
        image: "/images/accenture.png"
    },
    {
        employer: "Huawei Technologies",
        location: "Shenzhen, Guangdong, China",
        title: "Seeds for the Future Scholarship",
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
    },
    {
        employer: "Columbus Club",
        location: "Leeson Street Lower, Dublin",
        title: "Irish/Maths Tutor",
        period: "September 2013 - March 2015",
        url: "http://www.columbusclub.ie",
        image: "/images/columbus_club.png"
    }
];

router.get('/', function (req, res) {
    res.render('index', {
        title: "Syzible",
        year: new Date().getFullYear(),
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
    WordOfTheDay.getWordOfDay(function (wotd) {
        ScrapeData.scrapeData(query, function (data) {
            res.render('developers', {
                title: "Developers",
                term: query.term,
                query_json_0: JSON.stringify(data[0], null, 2),
                query_json_1: JSON.stringify(data[1], null, 2),
                query_json_2: JSON.stringify(data[2], null, 2),
                query_json_3: JSON.stringify(data[3], null, 2),
                tod: JSON.stringify(wotd, null, 2),
                data: data.splice(1, data.length)
            })
        })
    })
});

module.exports = router;
