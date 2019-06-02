import { getResource, ALL_STATIONS_ENDPOINT, STATION_DATA_ENDPOINT } from "./helpers/http";
import { mapStations, mapStationTimes } from "./helpers/xmlParser";

const express = require("express");
let router = express.Router();

router.get("/stations", async (req, res) => {
	const xmlResponse = await getResource(ALL_STATIONS_ENDPOINT);
	const mappedStations = await mapStations(xmlResponse);
	res.status(200).json(mappedStations);
});

router.get("/stations/:stationCode", async (req, res) => {
	const xmlResponse = await getResource(STATION_DATA_ENDPOINT + req.params.stationCode);
	const mappedStations = await mapStationTimes(xmlResponse);
	res.status(200).json(mappedStations);
});

module.exports = router;
