import React, { Component } from "react";
import Item from "../components/item";

import "./results.css";

class Results extends Component {
  render () {
    return (
      <div className={"results"}>
        <ul>
          {
            this.props.results.map(item =>
              <Item station={this.props.station} item={item}/>)
          }
        </ul>
      </div>
    );
  }
}

export default Results;
