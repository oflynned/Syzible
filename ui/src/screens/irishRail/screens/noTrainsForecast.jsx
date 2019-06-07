import React, { Component } from "react";

class NoTrainsForecast extends Component {
  render () {
    return (
      <div>No trains forecast for {this.props.station}!</div>
    );
  }
}

export default NoTrainsForecast;
