import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { insertIntoItems } from '../../actions/library/insertIntoItems'
import { insertIntoInFocusItem } from '../../actions/library/insertIntoInFocusItem'
import { insertIntoFilteredItems } from '../../actions/library/insertIntoFilteredItems'
import { Card } from '@material-ui/core'

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
    card: {
        width: '70%',
        height: '25vh',
        margin: 'auto',
    },
    heading: {},
    amount: {
        fontSize: '2rem',
    },
})

class HomeCard extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Card className={classes.card} elevation={3}>
                    <h2 className={classes.heading}>{this.props.heading}</h2>
                    <br />
                    <p className={classes.amount}>{this.props.amount}</p>
                </Card>
            </div>
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
)(withStyles(styles, { withTheme: true })(HomeCard))
