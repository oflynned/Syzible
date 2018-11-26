import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Search } from '@material-ui/icons';

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
                    </Toolbar>

                    <Card className="card margin-content" style={{ padding: '16px' }}>
                        <Search style={{ fontSize: '32', color: '#999999', margin: 'auto' }} />
                        <FormControl style={{ width: '488px' }}>
                            <InputLabel htmlFor="component-simple">Search term...</InputLabel>
                            <Input id="component-simple" />
                        </FormControl>
                    </Card>

                    <div className="margin-content" style={{ 'padding-top': '16px' }}>
                        <Chip style={{ fontSize: '14px', padding: '0 8px' }} label="rialta" className="chip"/>
                        <Chip style={{ fontSize: '14px', padding: '0 8px' }} label="rialtán" className="chip"/>
                        <Chip style={{ fontSize: '14px', padding: '0 8px' }} label="rialtais" className="chip"/>
                        <Chip style={{ fontSize: '14px', padding: '0 8px' }} label="atlas" className="chip"/>
                    </div>

                    <div className="margin-content">
                        <Tabs value={selected} onChange={this.handleChange} centered>
                            <Tab label="Gaeilge (1)" />
                            <Tab label="English (0)" />
                        </Tabs>
                    </div>
                </AppBar>
            </div>
        );
    }
}
