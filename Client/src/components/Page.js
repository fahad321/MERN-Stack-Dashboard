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
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import NotFound from './NotFound'
import StreamsPage from './StreamsPage/StreamsPage'
import AnalyticsPage from './AnalyticsPage/AnalyticsPage'
import ModelsPage from './ModelsPage/ModelsPage'
import DevicesPage from './DevicesPage/DevicesPage'
import ManageUsersPage from './ManageUsersPage/ManageUsersPage'
import ManageOrganizationsPage from './ManageUsersPage/ManageOrganizationsPage'
import LibraryPage from './LibraryPage/LibraryPage'
import VisualizePage from './VisualizePage/VisualizePage'

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
    },
}))

export default function Page() {
    const classes = useStyles()
    return (
        <main className={classes.content}>
            <Toolbar />
            <Switch>
                <Route exact path="/" component={HomePage}></Route>
                <Route exact path="/streams" component={StreamsPage}></Route>
                <Route
                    exact
                    path="/Visualize"
                    component={VisualizePage}
                ></Route>
                <Route
                    exact
                    path="/analytics"
                    component={AnalyticsPage}
                ></Route>
                <Route exact path="/models" component={ModelsPage}></Route>
                <Route exact path="/library" component={LibraryPage}></Route>
                <Route exact path="/devices" component={DevicesPage}></Route>
                <Route exact path="/library" component={LibraryPage}></Route>
                <Route
                    exact
                    path="/manageusers"
                    component={ManageUsersPage}
                ></Route>
                <Route
                    exact
                    path="/manageorganizations"
                    component={ManageOrganizationsPage}
                ></Route>
            </Switch>
        </main>
    )
}

// class Subjects extends Component{
//     render(){
//         return(

//         )
//     }
// }
