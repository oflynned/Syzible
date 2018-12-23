import React, { Component } from "react";
import fetch from "isomorphic-fetch";

import "./App.css";
import TermCardList from "./components/termCardList";
import WebsiteHeader from "./components/websiteHeader";

export default class App extends Component {
	constructor() {
		super();
		this.state = { results: [], meta: [] };
	}

	componentDidMount() {
		this.getDefinitions();
	}

	getDefinitions() {
		fetch("/tearma/api/v2/find?query=plenary&queryLanguage=en&limit=10&offset=0")
			.then((res) => res.json())
			.then((terms) => this.setState({ results: terms }));
	}

	render() {
		return(
			<div className="App">
				<WebsiteHeader meta={this.state.results.length} />
				<TermCardList results={this.state.results} />
			</div>
		);
	}
}
