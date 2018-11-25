import React, { Component } from 'react';

import Card from "./card";

export default class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = { results: props["results"] }
    }
    
    render() {
        const { results } = this.state;
        return( 
            <ul>
                { results.map((result) => <li key={result["_id"]}><Card result={result} /></li>) }
            </ul>
        );
    }
}
