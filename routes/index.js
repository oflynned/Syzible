'use strict';

const express = require('express');
let router = express.Router();
const fs = require('fs');
const path = require('path');

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
	res.render('developers', {
		year: new Date().getFullYear()
	});
});

router.get('/thesis', function (req, res) {
	const filePath = path.join(__dirname, '/../public/media/Thesis.pdf');
	fs.readFile(filePath, function (err, data) {
		if (err) return res.status(500).send();

		res.contentType('application/pdf');
		res.send(data);
	});
});

router.get('/snapchat-filter', (req, res) => {
	const filePath = path.join(__dirname, '/../public/media/Snapchat-Filters-Project.pdf');
	fs.readFile(filePath, (err, data) => {
		if (err) return res.status(500).send();

		res.contentType('application/pdf');
		res.send(data);
	});
});

module.exports = router;
