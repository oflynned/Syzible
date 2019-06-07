import React, { Component } from "react";

import "./search.css";

class Search extends Component {
  constructor () {
    super();
    this.state = {
      station: null
    };
  }

  onChange = e => {
    e.preventDefault();
    this.setState({ station: e.target.value });
  };

  registerProps = e => {
    e.preventDefault();
    const { station } = this.state;
    if (station !== null && station.length > 0) {
      this.props.search(station);
    }
  };

  render () {
    return (
      <form className={"search"} onSubmit={this.registerProps}>
        <input className={"search-box"}
               placeholder={"Enter a station"}
               onChange={this.onChange}/>
      </form>
    );
  }
}

export default Search;
