import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Grid, TextareaAutosize } from '@material-ui/core'
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
    height: {
        height: '70vh',
        overflowY: 'scroll',
        overflowX: 'visible',
        padding: 20,
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    subPage: {
        height: '100%',
        width: '100%',
    },
    grid: {
        margin: 'auto',
        height: '40vh',
        width: '40vw',
    },
})

class InFocusElementGrid extends Component {
    constructor(props) {
        super(props)
        this.handleGoBack = this.handleGoBack.bind(this)
    }

    handleGoBack = () => {
        this.props.insertIntoInFocusItem([])
    }
    render() {
        const { classes } = this.props
        return (
            <Paper className={classes.height}>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={this.handleGoBack}
                >
                    Go Back
                </Button>

                <div className={classes.subPage}>
                    <Grid item xs={12} sm={12} className={classes.grid}>
                        <Paper
                            className={classes.paper}
                            elevation={3}
                            boxShadow={1}
                        >
                            <div class={classes.wrapper}>
                                {this.props.state.inFocusItem[0].type ===
                                'video' ? (
                                    <ReactPlayer
                                        url={
                                            this.props.state.inFocusItem[0].url
                                        }
                                        className={classes.video}
                                        width="100%"
                                        height="100%"
                                        volume="0"
                                        playing={true}
                                    ></ReactPlayer>
                                ) : (
                                    <img
                                        src={
                                            this.props.state.inFocusItem[0].url
                                        }
                                        alt="truck"
                                        className={classes.video}
                                        width="100%"
                                        height="100%"
                                    ></img>
                                )}
                            </div>
                        </Paper>
                    </Grid>
                </div>
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
)(withStyles(styles, { withTheme: true })(InFocusElementGrid))
