import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ReactPlayer from 'react-player'
import { filterData, SearchType } from 'filter-data';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import TextField from '@material-ui/core/TextField';
import { blue } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl'
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from '@material-ui/icons/Settings';
import { createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';





const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        spacing: [0, 4, 8, 16, 32, 64],
    },
});
const useStyles = makeStyles({
    root: {
        flexGrow: 5,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    table: {
        minWidth: 650,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 1,
    },
    height: {
        height: '70vh',

        padding: 20,
    },
});


export default class AppBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
         value:0,  
        }
        const classes = this.useStyles;
       
    }
    changeFunc=(event, newValue)=>{
        this.setState({value: newValue});
        this.props.action(event,newValue);
 }

    render() {
        return (
            <Paper>
                <Tabs
                    value={this.state.value}
                    onChange={this.changeFunc}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="All Media" />
                    <Tab label="Online" />
                    <Tab label="Offline" />
                    <Tab label="Favourities" />
                    <FormControl
                        disabled='disabled'
                        variant="outlined"
                        className={this.state.formControl}
                    >
                        <TextField id="standard-basic"
                            float='right'
                            placeholder={('Search')}
                            value={this.state.values}
                            onChange={this.props.action2}
                            onKeyDown={this.handleKeyDown}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment onClick={this.handleClickChanges}>
                                        <IconButton >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                </Tabs>
            </Paper>


        )
    }
}