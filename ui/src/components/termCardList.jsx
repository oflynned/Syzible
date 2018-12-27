import React, { Component } from 'react';
import TermCard from "./termCard";

import "./termCardList.css"

export default class TermCardList extends Component {
    render() {
        const { results, meta } = this.props;
        const selectedTab = this.props.selectedTab === 0 ? "en" : "ga"; 
        return ( 
            <ul>
                { results[selectedTab].results.map((result) => {
                    return <li key={result["_id"]}>
                                <TermCard meta={meta} result={result} />
                            </li>
                })}
            </ul>
        );
    }
}
