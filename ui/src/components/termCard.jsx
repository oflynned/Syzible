import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import './termCard.css'

export default class TermCard extends Component {    
    style = {
        height: 48,
    };

    lenite = (noun) => {

    }

    mutate = (noun) => {

    }

    declineDefiniteNoun = (mutation, func, count) => {
        if(func === "nominative" && count === "singular") {
            return "an " + mutation.nominativeSingular;
        } else if(func === "nominative" && count === "plural") {
            return "na " + mutation.nominativePlural;
        } else if(func === "genitive" && count === "singular") {
            return "an " + mutation.genitiveSingular;
        } else if(func === "genitive" && count === "plural") {
            return "na " + mutation.genitivePlural;
        }
    }

    capitalise = (word) => word.charAt(0).toUpperCase() + word.slice(1);

    ordinate = (declension) => {
        switch(declension) {
            case 1:
                return "1st declension";
            case 2:
                return "2nd declension";
            case 3:
                return "3rd declension";
            case 4:
                return "4th declension";
            case 5:
                return "5th declension";
            default:
                return "no declension";
        }
    }

    render() {
        const { ga, en } = this.props.result;
        return  <Card className="card">
                    <div className="contents">
                        <div>
                            <Typography style={{ fontSize: '18px' }} variant="h5" className="header">{this.capitalise(ga.term)} / {this.capitalise(en.term)}</Typography>
                        </div>
                        <div className="margin-content">
                            <Chip style={{ fontSize: '14px' }} label="noun" className="chip"/>
                            <Chip style={{ fontSize: '14px' }} label={ga.gender} className="chip"/>
                            <Chip style={{ fontSize: '14px' }} label={this.ordinate(ga.declension)} className="chip"/>
                            <Chip style={{ fontSize: '14px' }} label="politics" className="chip"/>
                            <Chip style={{ fontSize: '14px' }} label="history" className="chip"/>
                        </div>
                        <div className="margin-content">
                            <Grid container spacing={16}>
                                <Grid item xs={6}>
                                    <Typography style={{ fontSize: '16px' }} variant="h5">{this.declineDefiniteNoun(ga.mutations, "nominative", "singular")}</Typography>
                                    <Typography style={{ fontSize: '14px' }} variant="subtitle1" color="textSecondary">Nominative Singular</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography style={{ fontSize: '16px' }} variant="h5">{this.declineDefiniteNoun(ga.mutations, "nominative", "plural")}</Typography>
                                    <Typography style={{ fontSize: '14px' }} variant="subtitle1" color="textSecondary">Nominative Plural</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={16}>
                                <Grid item xs={6}>                                    
                                    <Typography style={{ fontSize: '16px' }} variant="h5">{this.declineDefiniteNoun(ga.mutations, "genitive", "singular")}</Typography>
                                    <Typography style={{ fontSize: '14px' }} variant="subtitle1" color="textSecondary">Genitive Singular</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography style={{ fontSize: '16px' }} variant="h5">{this.declineDefiniteNoun(ga.mutations, "genitive", "plural")}</Typography>
                                    <Typography style={{ fontSize: '14px' }} variant="subtitle1" color="textSecondary">Genitive Plural</Typography>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="margin-content">
                            <Typography style={{ fontSize: '14px' }} color="textSecondary">Related terms: administration</Typography>
                        </div>
                    </div>
                </Card>
    }
}
