/**
 * Created by ed on 05/12/2016.
 */
"use strict";

let express = require('express');
let router = express.Router();

let Service = require('../Backend/Service');

router.get('/', function (req, res) {
    Service.greet(function (data) {
        res.render('AppStore/store_index', {
            title: "App Store",
            greeting: data
        });
    });
});

router.get('/get-listings', function (req, res) {
    const publishers = [
        {
            id: "id",
            email: "email@email.com",
            organisation_name: "Test Ltd."
        }
    ];

    const reviews = [
        {
            id: "id",
            rating: 10,
            review: "ayyyy lmao dis gud",
            date: Date.now()
        }
    ];

    const resources = [
        {
            resource_id: "resource id",
            app_id: "app id",
            icon: "icon1.png",
            file: "com.example.test.apk",
            screenshots: [
                {
                    screenshot: "screenshot1.png"
                }, {
                    screenshot: "screenshot2.png"
                }
            ]
        }
    ];

    const apps = [
        {
            app_id: "app id 1",
            publisher_id: "publisher id 2",
            publisher_name: "Syzible",
            title: "app 1",
            rating: 0,
            app_package: "com.syzible.tearma",
            description: "ayyyy lmao1",
            category: "education",
            icon_url: "http://10.0.2.2:3000/images/tearma_logo.png",
            apk_url: "http://10.0.2.2:3000/apk/app-debug.apk",
            resources: "resource id1"
        },
        {
            app_id: "app id 2",
            publisher_id: "publisher id 2",
            publisher_name: "GlassByte",
            title: "app 2",
            rating: 0,
            app_package: "com.glassbyte.drinktracker",
            description: "ayyyy lmao2",
            category: "education",
            icon_url: "http://10.0.2.2:3000/images/glassbyte.png",
            apk_url: "http://10.0.2.2:3000/apk/app-debug.apk",
            resources: "resource id2"
        }
    ];

    res.json(apps);
});

module.exports = router;

