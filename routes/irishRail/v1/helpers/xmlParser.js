const convert = require("xml-js");

const parseXmlToJson = async xml => {
	const parsedJson = convert.xml2json(xml, { compact: true, spaces: 4 });
	return JSON.parse(parsedJson);
};

const stationElementSchema = e => {
	return {
		title: e["StationDesc"]["_text"],
		code: e["StationCode"]["_text"],
		id: Number(e["StationId"]["_text"]),
		geolocation: {
			lat: Number(e["StationLatitude"]["_text"]),
			lng: Number(e["StationLongitude"]["_text"])
		}
	};
};

const trainElementSchema = e => {
	return {
		origin: e["Origin"]["_text"],
		destination: e["Destination"]["_text"],
		departureTime: e["Origintime"]["_text"],
		arrivalTime: e["Destinationtime"]["_text"],
		minsLate: Number(e["Late"]["_text"]),
		minsEstimatedArrival: Number(e["Duein"]["_text"]),
		carriageType: (e["Traintype"]["_text"]).toUpperCase(),
		direction: (e["Direction"]["_text"]),
		status: e["Status"]["_text"]
	};
};

const mapElementSchema = (data, schemaMap) => {
	if (data === undefined) {
		return [];
	} else if (Array.isArray(data)) {
		return data.map(e => schemaMap(e));
	}

	return [schemaMap(data)];
};

export const mapStations = async xml => {
	const json = await parseXmlToJson(xml);
	const data = json["ArrayOfObjStation"]["objStation"];
	return mapElementSchema(data, stationElementSchema);
};

export const mapStationTimes = async xml => {
	const json = await parseXmlToJson(xml);
	const data = json["ArrayOfObjStationData"]["objStationData"];
	return mapElementSchema(data, trainElementSchema);
};
