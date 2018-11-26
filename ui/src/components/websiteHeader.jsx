import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import "typeface-poiret-one"
import './websiteHeader.css'

export default class WebsiteHeader extends Component { 
    state = {
        selected: 0
    }

    handleChange = (_event, selected) => {
        this.setState({selected});
    }

    render() {
        const { selected } = this.state

        return(
            <div>
                <AppBar position="static" style={{ backgroundColor: "#673AB7" }}>
                    <Toolbar>
                        <span className="primary-font px-40">. syzıble</span>
                        <div className="">
                            <a className="link-margin">home</a>
                            <a className="link-margin">hire</a>
                            <a className="link-margin">projects</a>
                        </div>
                    </Toolbar>

                    <Tabs value={selected} onChange={this.handleChange}>
                        <Tab label="Gaeilge (1)" />
                        <Tab label="English (0)" />
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}
