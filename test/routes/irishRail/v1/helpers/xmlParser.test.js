import { mapStations, mapStationTimes } from "../../../../../routes/irishRail/v1/helpers/xmlParser";
import { NO_STATIONS_XML, ONE_STATION_XML, TWO_STATIONS_XML } from "./stationTestCases";
import { NO_TRAINS_XML, ONE_TRAIN_XML, TWO_TRAINS_XML } from "./trainTestCases";

describe("xml parsing", () => {
  describe("#mapStations", () => {
    test("should return blank array for empty xml list", async done => {
      const result = await mapStations(NO_STATIONS_XML);
      expect(result).toEqual([]);
      done();
    });

    test("should map single xml station element to json schema", async done => {
      const result = await mapStations(ONE_STATION_XML);
      expect(result).toEqual(
        [
          {
            "title": "Belfast",
            "code": "BFSTC",
            "id": 228,
            "geolocation": {
              "lat": 54.6123,
              "lng": -5.91744
            }
          }
        ]
      );
      done();
    });

    test("should map multiple station elements to json schema", async done => {
      const result = await mapStations(TWO_STATIONS_XML);
      expect(result).toEqual(
        [
          {
            "title": "Belfast",
            "code": "BFSTC",
            "id": 228,
            "geolocation": {
              "lat": 54.6123,
              "lng": -5.91744
            }
          },
          {
            "title": "Lisburn",
            "code": "LBURN",
            "id": 238,
            "geolocation": {
              "lat": 54.514,
              "lng": -6.04327
            }
          }
        ]
      );
      done();
    });
  });

  describe("#mapStationTimes", () => {
    test("should map empty xml to empty json array", async done => {
      const result = await mapStationTimes(NO_TRAINS_XML);
      expect(result).toEqual([]);
      done();
    });

    test("should map single train arrival times to json schema", async done => {
      const result = await mapStationTimes(ONE_TRAIN_XML);
      expect(result).toEqual([
        {
          "origin": "Cork",
          "destination": "Dublin Heuston",
          "departureTime": "12:25",
          "arrivalTime": "14:55",
          "minsLate": 0,
          "minsEstimatedArrival": 66,
          "carriageType": "MK4",
          "direction": "To Dublin Heuston",
          "status": "No Information"
        }
      ]);
      done();
    });

    test("should map multiple train arrival times to json schema", async done => {
      const result = await mapStationTimes(TWO_TRAINS_XML);
      expect(result).toEqual([
        {
          "origin": "Dublin Heuston",
          "destination": "Cork",
          "departureTime": "10:00",
          "arrivalTime": "12:30",
          "minsLate": 4,
          "minsEstimatedArrival": 14,
          "carriageType": "MK4",
          "direction": "To Cork",
          "status": "En Route"
        },
        {
          "origin": "Mallow",
          "destination": "Cork",
          "departureTime": "13:25",
          "arrivalTime": "13:52",
          "minsLate": 0,
          "minsEstimatedArrival": 88,
          "carriageType": "ARROW",
          "direction": "To Cork",
          "status": "No Information"
        }
      ]);
      done();
    });
  });
});
