import React, { Component } from "react";
import fetch from "isomorphic-fetch";

import "./App.css";
import TermCardList from "./components/termCardList";
import WebsiteHeader from "./components/websiteHeader";

export default class App extends Component {
	constructor() {
		super();
		const defaultMeta = {
			count: 0,
			limit: 0,
			offset: 0
		};
		this.state = { 
			query: "", 
			results: { 
				ga: { meta: defaultMeta, results: [] }, 
				en: { meta: defaultMeta, results: [] } 
			}
		};
		this.handleSubmission = this.handleSubmission.bind(this);
	}

	handleSubmission(e) {
		e.preventDefault();
		this.setState({ query: e.target.elements[0].value });
	}

	componentDidUpdate(_nextProps, nextState) {
		if(nextState.query !== this.state.query)
			this.getDefinitions();
	}

	getDefinitions() {
		fetch(`/tearma/api/v2/find?query=${this.state.query}&queryLanguage=en&limit=10&offset=0`)
			.then((res) => res.json())
			.then((terms) => this.setState({ results: terms }));
	}

	render() {
		return(
			<div className="App">
				<WebsiteHeader results={this.state.results} handleSubmission={this.handleSubmission} />
				<TermCardList results={this.state.results} />
			</div>
		);
	}
}
