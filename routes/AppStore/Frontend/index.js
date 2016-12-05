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

module.exports = router;

