"use strict";
let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
        title: "Syzible"
    });
});

router.get('/work-experience', function (req, res) {
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

    res.render('work-experience', {
        jobs: jobs,
        title: "Work Experience"
    });
});

module.exports = router;
