import { ALL_STATIONS_ENDPOINT, getResource, STATION_DATA_ENDPOINT } from "./helpers/http";
import { mapStations, mapStationTimes, parseXmlToJson } from "./helpers/xmlParser";

const express = require("express");
let router = express.Router();

router.get("/stations", async (req, res) => {
	const xmlResponse = await getResource(ALL_STATIONS_ENDPOINT);
	const jsonResponse = await parseXmlToJson(xmlResponse);
	const mappedStations = await mapStations(jsonResponse);
	res.status(200).json(mappedStations);
});

router.get("/stations/:stationCode", async (req, res) => {
	const xmlResponse = await getResource(STATION_DATA_ENDPOINT + req.params.stationCode);
	const jsonResponse = await parseXmlToJson(xmlResponse);
	const mappedStations = await mapStationTimes(jsonResponse);
	res.status(200).json(mappedStations);
});

module.exports = router;
