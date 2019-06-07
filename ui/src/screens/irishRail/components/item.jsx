import React, { Component } from "react";

import "./item.css";

class Item extends Component {
  render () {
    const { item, station } = this.props;
    const {
      origin,
      destination,
      departureTime,
      arrivalTime,
      minsLate,
      minsEstimatedArrival,
      carriageType,
      direction,
      status
    } = item;
    return (
      <li>
        {origin} > {destination}:
        Arriving at {station} in {minsEstimatedArrival} mins
      </li>
    );
  }
}

export default Item;
