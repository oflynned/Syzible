import React, { Component } from 'react';

import TermCard from "./termCard";

export default class TermCardList extends Component {
    constructor(props) {
        super(props);
        this.state = { results: props["results"] }
    }
    
    render() {
        const { results } = this.state;
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
