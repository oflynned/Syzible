const fetch = require("node-fetch");

export const ALL_STATIONS_ENDPOINT = "https://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML";
export const STATION_DATA_ENDPOINT = "https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=";

export const getResource = async endpoint => {
	const response = await fetch(endpoint, { method: "GET" });
	return response.text();
};
