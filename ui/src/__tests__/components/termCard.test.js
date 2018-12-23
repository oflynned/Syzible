import React from "react";
import TermCard from "../../components/termCard";
import renderer from "react-test-renderer";

describe("<TermCard />", () => {
	it("renders correctly", () => {
		const result = {
			en: {
				term: "en term"
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
				}
			}
		};

		const component = renderer.create(<TermCard result={result} />).toJSON();
		expect(component).toMatchSnapshot();
	});
});
