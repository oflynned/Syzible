import React, { Component } from 'react';
import TermCard from "./termCard";

import "./termCardList.css"

export default class TermCardList extends Component {

    render() {
        const { results, meta } = this.props; 
        return ( 
            <ul>
                { results.en.results.map((result) => {
                    return <li key={result["_id"]}>
                                <TermCard meta={meta} result={result} />
                            </li>
                })}
            </ul>
        );
    }
}
