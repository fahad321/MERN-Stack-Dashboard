import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import Head from './Head'
import SideDrawer from './SideDrawer'
import Page from './Page'
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))

export default function ClippedDrawer() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Router>
                <CssBaseline />
                <Head />
                <SideDrawer />
                <Page />
            </Router>
        </div>
    )
}
