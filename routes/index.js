"use strict";
let express = require('express');
let router = express.Router();

function generatePlaySticker(url) {
    return "<a href='" + url + "&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' target='_blank'>" +
        "<img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/></a>";
}

const apps = [
    {
        name: "Irish Dictionary",
        image: "/images/tearma_logo.png",
        badge: generatePlaySticker("https://play.google.com/store/apps/details?id=com.syzible.tearma")
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
    res.render('developers', {
        title: "Developers",
        results: 10
    })
});

module.exports = router;
