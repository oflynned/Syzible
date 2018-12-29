import React from "react";
import renderer from "react-test-renderer";

import TermCard from "../../components/termCard";

describe("<TermCard />", () => {
	it("should render correctly", () => {
		const result = {
			en: {
				term: "en term",
				domains: ["domain1", "domain2"]
			},
			ga: {
				term: "ga term",
				gender: "masculine",
				declension: 1,
				mutations: {
					nominativeSingular: "nom sing",
					nominativePlural: "nom plu",
					genitiveSingular: "gen sing",
					genitivePlural: "gen plu"
				},
				domains: ["domain1", "domain2"]
			}
		};

		const component = renderer.create(<TermCard result={result} />).toJSON();
		expect(component).toMatchSnapshot();
	});
});
