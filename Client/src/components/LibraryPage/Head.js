import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Grid } from '@material-ui/core'
import ReactPlayer from 'react-player'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { connect } from 'react-redux'
import { insertIntoItems } from '../../actions/library/insertIntoItems'
import { insertIntoInFocusItem } from '../../actions/library/insertIntoInFocusItem'
import { insertIntoFilteredItems } from '../../actions/library/insertIntoFilteredItems'

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    table: {
        minWidth: 650,
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
    wrapper: {
        position: 'relative',
        paddingTop: '56.25%',
    },
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
})

class Head extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            response: [],
            showInARow: 4,
            filteredResponse: [],
            model: '',
            modelButtonDisabled: true,
        }
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue })
        this.applyFilter(newValue)
        console.log(this.state.response)
    }

    handleModelChange = (event) => {
        this.setState({ model: event.target.value })
        this.applyModelFilter(event.target.value)
    }

    applyFilter(value) {
        switch (value) {
            case 0:
                this.setState({ modelButtonDisabled: true })
                this.props.insertIntoFilteredItems(this.props.state.items)
                this.props.insertIntoInFocusItem([])
                break
            case 1:
                this.setState({ modelButtonDisabled: true })
                this.props.insertIntoFilteredItems(
                    this.props.state.items.filter((o) => o.type === 'video')
                )
                this.props.insertIntoInFocusItem([])
                break
            case 2:
                this.setState({ modelButtonDisabled: false })
                this.props.insertIntoFilteredItems(
                    this.props.state.items.filter((o) => o.type === 'image')
                )
                this.props.insertIntoInFocusItem([])
                break
            case 3:
                this.setState({ modelButtonDisabled: false })
                this.props.insertIntoFilteredItems(
                    this.props.state.items.filter(
                        (o) => o.type === 'video' && o.subType === 'clip'
                    )
                )
                this.props.insertIntoInFocusItem([])
                break
            default:
                break
        }
    }

    applyModelFilter(value) {
        console.log(this.state.value)
        this.applyFilter(this.state.value)
        switch (value) {
            case 5:
                this.props.insertIntoFilteredItems(
                    this.props.state.filteredItems.filter(
                        (o) => o.byModel === 'model5'
                    )
                )

                break
            case 4:
                this.props.insertIntoFilteredItems(
                    this.props.state.filteredItems.filter(
                        (o) => o.byModel === 'model4'
                    )
                )
                break
            case 3:
                this.props.insertIntoFilteredItems(
                    this.props.state.filteredItems.filter(
                        (o) => o.byModel === 'model3'
                    )
                )
                break
            case 2:
                this.props.insertIntoFilteredItems(
                    this.props.state.filteredItems.filter(
                        (o) => o.byModel === 'model2'
                    )
                )
                break
            case 1:
                this.props.insertIntoFilteredItems(
                    this.props.state.filteredItems.filter(
                        (o) => o.byModel === 'model1'
                    )
                )
                break
            default:
                break
        }
    }

    render() {
        const { classes } = this.props
        return (
            <Paper>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="All Media" />
                    <Tab label="Videos" />
                    <Tab label="Photos" />
                    <Tab label="Detected clips" />
                    <FormControl
                        disabled={this.state.modelButtonDisabled}
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel id="demo-simple-select-outlined-label">
                            Model
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.model}
                            defaultValue={0}
                            onChange={this.handleModelChange}
                            label="Age"
                        >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={1}>Model 1</MenuItem>
                            <MenuItem value={2}>Model 2</MenuItem>
                            <MenuItem value={3}>Model 3</MenuItem>
                            <MenuItem value={4}>Model 4</MenuItem>
                            <MenuItem value={5}>Model 5</MenuItem>
                        </Select>
                    </FormControl>
                </Tabs>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.library,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        insertIntoItems: (data) => {
            return dispatch(insertIntoItems(data))
        },
        insertIntoInFocusItem: (data) => {
            return dispatch(insertIntoInFocusItem(data))
        },
        insertIntoFilteredItems: (data) => {
            return dispatch(insertIntoFilteredItems(data))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Head))
