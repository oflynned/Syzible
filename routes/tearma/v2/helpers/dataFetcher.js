const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
let AdmZip = require('adm-zip');

fetch.Promise = global.Promise;

const baseEndpoint = 'http://www.tearma.ie/Liostai.aspx';

module.exports.fetchEndpointName = () => {
	return fetch(baseEndpoint)
		.then((response) => response.text())
		.then((html) => {
			let $ = cheerio.load(html);
			let filename = $('#download-TBX-list').attr('href');
			return {
				filename: filename.replace('Liostai/', ''),
				endpoint: baseEndpoint.replace('Liostai.aspx', '') + filename
			};
		});
};

module.exports.fetchTbxFile = (filename, endpoint) => {
	return Promise.all([fetch(endpoint), filename])
		.then((promises) => {
			let response = promises[0];
			let filename = promises[1];
			return new Promise((resolve, reject) => {
				const destinationName = fs.createWriteStream(`./routes/tearma/v2/datasets/${filename}`);
				response.body.pipe(destinationName);
				response.body.on('error', err => reject(err));
				destinationName.on('finish', () => resolve(filename));
				destinationName.on('error', err => reject(err));
			});
		});
};

module.exports.unzipFile = (filename) => {
	return new Promise((resolve) => {
		const folder = `./routes/tearma/v2/datasets/`;
		const path = `./routes/tearma/v2/datasets/${filename}`;
		let zip = new AdmZip(path);
		return zip.extractAllToAsync(folder, folder, false, true)
			.then(() => resolve());
	});
};
