import React, { Component } from 'react';
import TermCard from "./termCard";

import "./termCardList.css"

export default class TermCardList extends Component {

    render() {
        const { results } = this.props;
        return ( 
            <ul>
                { results.map((result) => {
                    return  <li key={result["_id"]}>
                                <TermCard result={result} />
                            </li>
                }) }
            </ul>
        );
    }
}
