import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import Navbar from "./navbar";

import "typeface-roboto";
import "./App.css";

class App extends Component {
	constructor() {
		super();
		this.state = { results: [] };
	}

	componentDidMount() {
		this.getDefinitions();
	}

	getDefinitions() {
		fetch("/tearma/api/v2/find?query=government&queryLanguage=en&limit=10&offset=0")
			.then((res) => res.json())
			.then((terms) => this.setState({ results: terms }));
	}

	render() {
		const { results } = this.state;

		return(
			<div className="App">
				<Navbar />

				<ul className="results">
					{}
					{
						results.map((result) =>
							<li key={result._id}>
								{result.ga.mutations.nominativeSingular} / {result.ga.mutations.genitiveSingular} / {result.ga.mutations.nominativePlural} / {result.ga.mutations.genitivePlural}
							</li>
						)}
				</ul>
			</div>
		);
	}
}

export default App;
