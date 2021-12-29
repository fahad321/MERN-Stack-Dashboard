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
import Bchart from './Bchart'

const styles = (theme) => ({
    root: {
        flexGrow: 1,
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
    height: {
        height: '600px',
        overflowX: 'visible',
        padding: 20,
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
})

class Body extends Component {
    constructor(props) {
        super(props)

        const abc = this.props.location.videoURL
        const cv = this.props.location.myModel
        this.state = {
            url: 'https://www.youtube.com/watch?v=_7_ErH0VZj4',
            analyzing: true,
            device: 1,
            model: 3,
        }
        if (
            this.props.location.videoURL != '' &&
            this.props.location.videoURL != null
        ) {
            //this.setState({url: abc});
            this.state.url = this.props.location.videoURL
            this.state.model = this.props.location.myModel
        }
    }

    handleModelChange = (event) => {
        this.setState({ model: event.target.value })
    }

    handleDeviceChange = (event) => {
        this.setState({ device: event.target.value })
    }

    updateData = () => {}
    render() {
        const { classes } = this.props
        return (
            <Paper className={classes.height}>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Grid container spacing={3}>
                            <Grid item xs>
                                <Button
                                    variant="outlined"
                                    onClick={() =>
                                        this.setState({
                                            analyzing: !this.state.analyzing,
                                        })
                                    }
                                >
                                    {this.state.analyzing
                                        ? 'Stop Analyzing'
                                        : 'Start Analyzing'}
                                </Button>
                                <br />
                                <br />
                                <div class={classes.wrapper}>
                                    <ReactPlayer
                                        url={this.state.url}
                                        className={classes.video}
                                        width="100%"
                                        height="100%"
                                        volume="0"
                                        playing={this.state.analyzing}
                                    ></ReactPlayer>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs>
                                        <FormControl
                                            className={classes.formControl}
                                        >
                                            <InputLabel id="demo-simple-select-label">
                                                Device
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={this.state.device}
                                                onChange={
                                                    this.handleDeviceChange
                                                }
                                            >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl
                                            className={classes.formControl}
                                        >
                                            <InputLabel id="demo-simple-select-label">
                                                Model
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={this.state.model}
                                                onChange={
                                                    this.handleModelChange
                                                }
                                            >
                                                <MenuItem value={1}>
                                                    Model 1
                                                </MenuItem>
                                                <MenuItem value={2}>
                                                    Model 2
                                                </MenuItem>
                                                <MenuItem value={3}>
                                                    Model 3
                                                </MenuItem>
                                                <MenuItem value={4}>
                                                    Model 4
                                                </MenuItem>
                                                <MenuItem value={5}>
                                                    Model 5
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Bchart />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    {/* TODO */}
                </Grid>
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
)(withStyles(styles, { withTheme: true })(Body))
