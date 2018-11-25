import React, { Component } from 'react';

export default class Card extends Component {    
    constructor(props) {
        super(props);
        this.state = props
    }

    render() {
        const { ga, en } = this.state.result;
        return <h1>{ga.term} / {en.term}</h1>
    }
}
