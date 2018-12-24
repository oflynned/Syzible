import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { lenite, eclipse } from '../helpers/mutation';
import './termCard.css'

export default class TermCard extends Component {    
    style = {
        height: 48,
    };

    mutate = (noun, gender, func, count) => {
        if(noun === null) return noun;
        if(noun.split(" ").length !== 1) return noun;
        
        if(func === "nominative" && count === "singular" && gender === "feminine")
            return lenite(noun);
        
        if(func === "genitive") {
            if(count === "singular" && gender === "masculine")
                return lenite(noun);
            else if(count === "plural")
                return eclipse(noun)
        }

        return noun;
    }

    declineDefiniteNoun = (ga, func, count) => {
        let showArticle = ga.term.split(" ").length === 1;
        if(func === "nominative" && count === "singular") {
            return (showArticle ? "an " : "") + this.mutate(ga.mutations.nominativeSingular, ga.gender, func, count);
        } else if(func === "nominative" && count === "plural") {
            return (showArticle ? "na " : "") + this.mutate(ga.mutations.nominativePlural, ga.gender, func, count);
        } else if(func === "genitive" && count === "singular") {
            return (showArticle ? "an " : "") + this.mutate(ga.mutations.genitiveSingular, ga.gender, func, count);
        } else if(func === "genitive" && count === "plural") {
            return (showArticle ? "na " : "") + this.mutate(ga.mutations.genitivePlural, ga.gender, func, count);
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
                                    <Typography style={{ fontSize: '16px' }} variant="h5">{this.declineDefiniteNoun(ga, "nominative", "singular")}</Typography>
                                    <Typography style={{ fontSize: '14px' }} variant="subtitle1" color="textSecondary">nominative singular</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography style={{ fontSize: '16px' }} variant="h5">{this.declineDefiniteNoun(ga, "nominative", "plural")}</Typography>
                                    <Typography style={{ fontSize: '14px' }} variant="subtitle1" color="textSecondary">nominative plural</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={16}>
                                <Grid item xs={6}>                                    
                                    <Typography style={{ fontSize: '16px' }} variant="h5">{this.declineDefiniteNoun(ga, "genitive", "singular")}</Typography>
                                    <Typography style={{ fontSize: '14px' }} variant="subtitle1" color="textSecondary">genitive singular</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography style={{ fontSize: '16px' }} variant="h5">{this.declineDefiniteNoun(ga, "genitive", "plural")}</Typography>
                                    <Typography style={{ fontSize: '14px' }} variant="subtitle1" color="textSecondary">genitive plural</Typography>
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
