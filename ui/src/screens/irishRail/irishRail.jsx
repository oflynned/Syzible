import React, { Component } from "react";

import LoadingScreen from "react-loading-screen";
import Search from "./screens/search";
import Results from "./screens/results";

import "./content.css";
import NoTrainsForecast from "./screens/noTrainsForecast";

import _ from "lodash";

class IrishRail extends Component {
  constructor () {
    super();
    this.state = {
      loading: true,
      station: "Howth Junction",
      results: [
        {
          "origin": "Greystones",
          "destination": "Howth",
          "departureTime": "10:04",
          "arrivalTime": "11:28",
          "minsLate": 3,
          "minsEstimatedArrival": 2,
          "carriageType": "DART",
          "direction": "Northbound",
          "status": "En Route"
        },
        {
          "origin": "Bray",
          "destination": "Malahide",
          "departureTime": "10:25",
          "arrivalTime": "11:42",
          "minsLate": 1,
          "minsEstimatedArrival": 10,
          "carriageType": "DART",
          "direction": "Northbound",
          "status": "En Route"
        },
        {
          "origin": "Bray",
          "destination": "Howth",
          "departureTime": "10:35",
          "arrivalTime": "11:49",
          "minsLate": 2,
          "minsEstimatedArrival": 22,
          "carriageType": "DART",
          "direction": "Northbound",
          "status": "En Route"
        },
        {
          "origin": "Bray",
          "destination": "Howth",
          "departureTime": "10:55",
          "arrivalTime": "12:09",
          "minsLate": 0,
          "minsEstimatedArrival": 40,
          "carriageType": "DART",
          "direction": "Northbound",
          "status": "En Route"
        },
        {
          "origin": "Bray",
          "destination": "Malahide",
          "departureTime": "11:05",
          "arrivalTime": "12:20",
          "minsLate": 0,
          "minsEstimatedArrival": 50,
          "carriageType": "DART",
          "direction": "Northbound",
          "status": "En Route"
        },
        {
          "origin": "Greystones",
          "destination": "Howth",
          "departureTime": "11:04",
          "arrivalTime": "12:28",
          "minsLate": 1,
          "minsEstimatedArrival": 60,
          "carriageType": "DART",
          "direction": "Northbound",
          "status": "En Route"
        },
        {
          "origin": "Bray",
          "destination": "Malahide",
          "departureTime": "11:25",
          "arrivalTime": "12:40",
          "minsLate": 0,
          "minsEstimatedArrival": 70,
          "carriageType": "DART",
          "direction": "Northbound",
          "status": "No Information"
        },
        {
          "origin": "Bray",
          "destination": "Howth",
          "departureTime": "11:35",
          "arrivalTime": "12:49",
          "minsLate": 0,
          "minsEstimatedArrival": 80,
          "carriageType": "DART",
          "direction": "Northbound",
          "status": "No Information"
        },
        {
          "origin": "Malahide",
          "destination": "Bray",
          "departureTime": "11:10",
          "arrivalTime": "12:25",
          "minsLate": 1,
          "minsEstimatedArrival": 2,
          "carriageType": "DART",
          "direction": "Southbound",
          "status": "En Route"
        },
        {
          "origin": "Howth",
          "destination": "Bray",
          "departureTime": "11:20",
          "arrivalTime": "12:35",
          "minsLate": 0,
          "minsEstimatedArrival": 11,
          "carriageType": "DART",
          "direction": "Southbound",
          "status": "No Information"
        },
        {
          "origin": "Malahide",
          "destination": "Greystones",
          "departureTime": "11:30",
          "arrivalTime": "12:56",
          "minsLate": 0,
          "minsEstimatedArrival": 22,
          "carriageType": "DART",
          "direction": "Southbound",
          "status": "No Information"
        },
        {
          "origin": "Howth",
          "destination": "Bray",
          "departureTime": "11:40",
          "arrivalTime": "12:55",
          "minsLate": 0,
          "minsEstimatedArrival": 31,
          "carriageType": "DART",
          "direction": "Southbound",
          "status": "No Information"
        },
        {
          "origin": "Malahide",
          "destination": "Bray",
          "departureTime": "11:52",
          "arrivalTime": "13:06",
          "minsLate": 0,
          "minsEstimatedArrival": 43,
          "carriageType": "DART",
          "direction": "Southbound",
          "status": "No Information"
        },
        {
          "origin": "Howth",
          "destination": "Greystones",
          "departureTime": "12:00",
          "arrivalTime": "13:26",
          "minsLate": 0,
          "minsEstimatedArrival": 51,
          "carriageType": "DART",
          "direction": "Southbound",
          "status": "No Information"
        },
        {
          "origin": "Malahide",
          "destination": "Bray",
          "departureTime": "12:10",
          "arrivalTime": "13:25",
          "minsLate": 0,
          "minsEstimatedArrival": 61,
          "carriageType": "DART",
          "direction": "Southbound",
          "status": "No Information"
        },
        {
          "origin": "Howth",
          "destination": "Bray",
          "departureTime": "12:23",
          "arrivalTime": "13:39",
          "minsLate": 0,
          "minsEstimatedArrival": 76,
          "carriageType": "DART",
          "direction": "Southbound",
          "status": "No Information"
        },
        {
          "origin": "Malahide",
          "destination": "Greystones",
          "departureTime": "12:33",
          "arrivalTime": "13:58",
          "minsLate": 0,
          "minsEstimatedArrival": 84,
          "carriageType": "DART",
          "direction": "Southbound",
          "status": "No Information"
        }
      ]
    };

    setTimeout(() => {
      this.setState({ loading: false });
    }, 100);
  }

  search = async station => {
    this.setState({ station });
  };

  render () {
    const { loading, results, station } = this.state;

    return (
      <LoadingScreen
        loading={loading}
        bgColor="#FFFFFF"
        spinnerColor="#f44336"
        textColor="#f44336"
        logoSrc={require("../../assets/favicon.png")}>
        <div className={"content"}>
          <Search search={this.search}/>
          {
            _.isEmpty(results) ?
              <NoTrainsForecast station={station}/> :
              <Results station={station} results={results}/>
          }
        </div>
      </LoadingScreen>
    );
  }
}

export default IrishRail;
