const convert = require("xml-js");

export const parseXmlToJson = async xml => {
	const parsedJson = convert.xml2json(xml, { compact: true, spaces: 4 });
	return JSON.parse(parsedJson);
};

export const mapStations = async json => {
	const data = json["ArrayOfObjStation"]["objStation"];
	return data.map(e => {
		return {
			title: e["StationDesc"]["_text"],
			code: e["StationCode"]["_text"],
			id: Number(e["StationId"]["_text"]),
			geolocation: {
				lat: Number(e["StationLatitude"]["_text"]),
				lng: Number(e["StationLongitude"]["_text"])
			}
		};
	});
};

export const mapStationTimes = async json => {
	const data = json["ArrayOfObjStationData"]["objStationData"];
	if (Array.isArray(data)) {
		return data.map(e => mapStationElementToTime(e));
	} else {
		return [mapStationElementToTime(data)];
	}
};

const mapStationElementToTime = e => {
	return {
		origin: e["Origin"]["_text"],
		destination: e["Destination"]["_text"],
		departureTime: e["Origintime"]["_text"],
		arrivalTime: e["Destinationtime"]["_text"],
		minsLate: Number(e["Late"]["_text"]),
		minsEstimatedArrival: Number(e["Duein"]["_text"]),
		carriageType: (e["Traintype"]["_text"]).toUpperCase(),
		direction: (e["Direction"]["_text"]),
		lastLocationStatus: e["Lastlocation"]["_text"],
		status: e["Status"]["_text"]
	};
};
