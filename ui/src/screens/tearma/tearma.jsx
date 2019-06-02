import React, { Component } from "react";

import fetch from "node-fetch";

import TermCardList from "../../components/termCardList";
import WebsiteHeader from "../../components/websiteHeader";

import "./tearma.css";

class Tearma extends Component {
  constructor () {
    super();
    const defaultMeta = { count: 0, limit: 10, offset: 0 };
    this.state = {
      query: "",
      selectedTab: 0,
      results: {
        ga: { meta: defaultMeta, results: [] },
        en: { meta: defaultMeta, results: [] }
      }
    };
  }

  handleSubmission (e) {
    e.preventDefault();
    this.setState({ query: e.target.elements[0].value });
  }

  handleTabChange (e, selected) {
    e.preventDefault();
    this.setState({ selectedTab: selected });
  }

  componentDidUpdate (_nextProps, nextState) {
    if (nextState.query !== this.state.query) {
      this.getDefinitions();
    }
  }

  getDefinitions () {
    fetch(`/tearma/api/v2/find?query=${this.state.query}&limit=10&offset=0`)
      .then((res) => res.json())
      .then((terms) => this.setState({ results: terms }));
  }

  render () {
    return (
      <div className="App">
        <WebsiteHeader
          results={this.state.results}
          selectedTab={this.state.selectedTab}
          handleSubmission={this.handleSubmission}
          handleTabChange={this.handleTabChange}/>
        <TermCardList
          results={this.state.results}
          selectedTab={this.state.selectedTab}/>
      </div>
    );
  }
}

export default Tearma;
