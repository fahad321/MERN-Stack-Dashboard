import React, { Component, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ReactPlayer from 'react-player'
import { filterData, SearchType } from 'filter-data'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import TextField from '@material-ui/core/TextField'
import { blue } from '@material-ui/core/colors'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'
import { createTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import Brightness1Icon from '@material-ui/icons/Brightness1'
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined'
import axios from 'axios'

const theme = createTheme({
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
})

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
})

function createData(videos, status, model, manage, device, favourite) {
    return { videos, status, model, manage, device, favourite }
}

const rows = [
    createData(
        'https://www.youtube.com/watch?v=_7_ErH0VZj4',
        'Online',
        2,
        24,
        'Cam1',
        true
    ),
    createData(
        'https://www.youtube.com/watch?v=K4it0F8NVD4',
        'Offline',
        2,
        37,
        'Am2',
        true
    ),
    createData(
        'https://www.youtube.com/watch?v=_7_ErH0VZj4',
        'Online',
        2,
        24,
        'Zam3',
        false
    ),
    createData(
        'https://www.youtube.com/watch?v=K4it0F8NVD4',
        'Offline',
        2,
        67,
        'Dam4',
        false
    ),
    createData(
        'https://www.youtube.com/watch?v=_7_ErH0VZj4',
        'Online',
        2,
        49,
        'Lam5',
        false
    ),
]

const options = [
    { value: 0, label: 'select' },
    { value: 1, label: 'one' },
    { value: 2, label: 'two' },
    { value: 3, label: 'three' },
    { value: 4, label: 'four' },
]
const defaultOption = options[0]
var visModel = 0
const ENTER_KEY = 13

export default class StreamsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            Results: rows,
            models: options,
            values: '',
            sortDirection: 'ASC',
            sortType: 'device',
            chosenModel: 0,
        }
        const classes = this.useStyles
    }

    componentDidMount() {
        let youtubeURL = this.props.location.deviceRow
        let deviceName = this.props.location.deviceName
        if (youtubeURL != null && youtubeURL != '') {
            const newRows = [...rows]
            const newData = createData(
                youtubeURL,
                'Online',
                4,
                49,
                deviceName,
                false
            )
            this.state.Results.push(newData)
            this.setState({ Results: this.state.Results })
        }

        const types = {
            device: 'device',
        }
        let type = 'device'
        const sortProperty = types[type]
        if (this.state.sortDirection === 'ASC') {
            const sorted = [...rows].sort((a, b) =>
                a[sortProperty].localeCompare(b[sortProperty])
            )
            this.setState({ Results: sorted })
            this.setState({ sortDirection: 'DESC' })
        } else {
            const sorted = [...rows].sort((a, b) =>
                b[sortProperty].localeCompare(a[sortProperty])
            )
            this.setState.Results = sorted
            this.setState.sortDirection = 'ASC'
        }
    }

    handleChanges = (event) => {
        this.setState({ values: event.target.value })
    }

    handleClickChanges = () => {
        let searchConditions = [
            {
                key: 'device',
                value: this.state.values,
                type: SearchType.LK,
            },
        ]
        var result = filterData(rows, searchConditions)
        this.setState({ Results: result })
    }

    handleKeyDown = (e) => {
        if (e.keyCode === ENTER_KEY) {
            let searchConditions = [
                {
                    key: 'device',
                    value: this.state.values,
                    type: SearchType.LK,
                },
            ]
            var result = filterData(rows, searchConditions)
            this.setState({ Results: result })
        }
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue })
        if (newValue == 1) {
            var searchConditions = [
                {
                    key: 'status',
                    value: 'Online',
                    type: SearchType.LK,
                },
            ]
            var result = filterData(rows, searchConditions)
            this.setState({ Results: result })
        } else if (newValue == 2) {
            var searchConditions = [
                {
                    key: 'status',
                    value: 'Offline',
                    type: SearchType.LK,
                },
            ]
            var result = filterData(rows, searchConditions)
            this.setState({ Results: result })
        } else if (newValue == 3) {
            var searchConditions = [
                {
                    key: 'favourite',
                    value: 'true',
                    type: SearchType.LK,
                },
            ]
            var result = filterData(rows, searchConditions)
            this.setState({ Results: result })
        } else {
            this.setState({ Results: rows })
        }
    }
    selectedModel = (event) => {
        visModel = event.value
        this.setState({ chosenModel: event.value })
    }

    starHandleChange = (id, event) => {
        let rowId = id
        const tempResult = [...this.state.Results]
        tempResult[rowId].favourite = !tempResult[rowId].favourite
        this.setState({ Results: tempResult })
    }

    visualization = (e, url) => {
        if (visModel == 0) {
            alert('Please select a model')
            e.preventDefault()
        } else {
            visModel = 0
            axios
                .post(process.env.REACT_APP_EXTRACTOR_API, { url: url })
                .then((e) => {
                    console.log(e)
                })
            return true
        }
    }

    changeSortDirection = (e) => {
        const types = {
            device: 'device',
        }
        let type = 'device'
        const sortProperty = types[type]
        if (this.state.sortDirection === 'ASC') {
            const sorted = [...rows].sort((a, b) =>
                a[sortProperty].localeCompare(b[sortProperty])
            )
            this.setState({ Results: sorted })
            this.setState({ sortDirection: 'DESC' })
        } else {
            const sorted = [...rows].sort((a, b) =>
                b[sortProperty].localeCompare(a[sortProperty])
            )
            this.setState({ Results: sorted })
            this.setState({ sortDirection: 'ASC' })
        }
    }

    render() {
        return (
            <div id="1">
                <Paper>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="All Media" />
                        <Tab label="Online" />
                        <Tab label="Offline" />
                        <Tab label="Favourities" />
                        <FormControl
                            disabled="disabled"
                            variant="outlined"
                            className={this.state.formControl}
                        >
                            <TextField
                                id="standard-basic"
                                float="right"
                                placeholder={'Search'}
                                value={this.state.values}
                                onChange={this.handleChanges}
                                onKeyDown={this.handleKeyDown}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment
                                            onClick={this.handleClickChanges}
                                        >
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                    </Tabs>
                </Paper>
                <Paper component={Paper}>
                    <Table
                        className={this.state.table}
                        aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow className={this.state.paper}>
                                <TableCell>Video</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Model</TableCell>
                                <TableCell>
                                    <span>Device</span>
                                    <div
                                        onClick={this.changeSortDirection}
                                        className="div"
                                    >
                                        <div class="info">
                                            {this.state.sortDirection ===
                                            'ASC' ? (
                                                <KeyboardArrowUpIcon fontSize="small" />
                                            ) : (
                                                <KeyboardArrowDownIcon fontSize="small" />
                                            )}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>Manage</TableCell>
                                <TableCell>Favourite</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.Results.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell
                                        width="150px"
                                        component="th"
                                        scope="row"
                                    >
                                        <div className="player-wrapper">
                                            <ReactPlayer
                                                className="react-player"
                                                url={row.videos}
                                                width="100%"
                                                height="100%"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell width="90px">
                                        {row.status === 'Online' ? (
                                            <Brightness1Icon
                                                fontSize="small"
                                                style={{ fill: 'yellow' }}
                                            />
                                        ) : (
                                            <Brightness1Icon
                                                fontSize="small"
                                                style={{ fill: 'red' }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell width="150px">
                                        <Dropdown
                                            className="div"
                                            id={i + 'd'}
                                            options={this.state.models}
                                            value={defaultOption}
                                            onChange={this.selectedModel}
                                        />
                                        <Link
                                            onClick={(e) =>
                                                this.visualization(
                                                    e,
                                                    row.videos
                                                )
                                            }
                                            to={{
                                                pathname: '/visualize',
                                                videoURL: row.videos,
                                                myModel: this.state.chosenModel,
                                            }}
                                        >
                                            <TimelineOutlinedIcon
                                                className="div"
                                                fontSize="large"
                                                style={{
                                                    fill: 'white',
                                                    background: 'grey',
                                                }}
                                            ></TimelineOutlinedIcon>
                                        </Link>
                                    </TableCell>
                                    <TableCell width="50px">
                                        {row.device}
                                    </TableCell>
                                    <TableCell width="40px">
                                        <Link
                                            to={{
                                                pathname: '/devices',
                                                deviceRow: i,
                                            }}
                                        >
                                            <SettingsIcon></SettingsIcon>
                                        </Link>
                                    </TableCell>
                                    <TableCell width="15px">
                                        <div
                                            id={i}
                                            onClick={(e) =>
                                                this.starHandleChange(i, e)
                                            }
                                        >
                                            {row.favourite === true ? (
                                                <StarIcon
                                                    fontSize="small"
                                                    style={{ fill: 'yellow' }}
                                                />
                                            ) : (
                                                <StarBorderIcon fontSize="small" />
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}
