import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
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
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone'
import VideoLibraryTwoToneIcon from '@material-ui/icons/VideoLibraryTwoTone'
import TimelineTwoToneIcon from '@material-ui/icons/TimelineTwoTone'
import BubbleChartTwoToneIcon from '@material-ui/icons/BubbleChartTwoTone'
import VideogameAssetTwoToneIcon from '@material-ui/icons/VideogameAssetTwoTone'
import SupervisorAccountTwoToneIcon from '@material-ui/icons/SupervisorAccountTwoTone'
import { Link } from 'react-router-dom'
import ViewStreamIcon from '@material-ui/icons/ViewStream'
import DevicesIcon from '@material-ui/icons/Devices'
import AssessmentIcon from '@material-ui/icons/Assessment'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}))

export default function SideDrawer() {
    const classes = useStyles()

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {[
                        'Home',
                        'Streams',
                        'Visualize',
                        'Analytics',
                        'Models',
                        'Library',
                        'Devices',
                    ].map((text, index) => (
                        <Link
                            style={{
                                'text-decoration': 'none',
                                color: '#404040',
                            }}
                            to={
                                text === 'Home' ? `/` : `/${text.toLowerCase()}`
                            }
                            key={index}
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    {text === 'Home' ? (
                                        <HomeTwoToneIcon />
                                    ) : text === 'Streams' ? (
                                        <ViewStreamIcon />
                                    ) : text === 'Visualize' ? (
                                        <TimelineTwoToneIcon
                                            fontSize="small"
                                            style={{
                                                fill: 'white',
                                                background: 'grey',
                                            }}
                                        />
                                    ) : text === 'Analytics' ? (
                                        <AssessmentIcon />
                                    ) : text === 'Models' ? (
                                        <BubbleChartTwoToneIcon />
                                    ) : text === 'Library' ? (
                                        <VideoLibraryTwoToneIcon />
                                    ) : (
                                        <DevicesIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Manage Users'].map((text, index) => (
                        <Link
                            style={{
                                'text-decoration': 'none',
                                color: '#404040',
                            }}
                            to={`/${text.replace(/\s/g, '').toLowerCase()}`}
                            key={index}
                        >
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {text === 'Manage Users' ? (
                                        <SupervisorAccountTwoToneIcon />
                                    ) : null}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    ))}
                    {['Manage Organizations'].map((text, index) => (
                        <Link
                            style={{
                                'text-decoration': 'none',
                                color: '#404040',
                            }}
                            to={`/${text.replace(/\s/g, '').toLowerCase()}`}
                            key={index}
                        >
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {text === 'Manage Organizations' ? (
                                        <SupervisedUserCircleIcon />
                                    ) : null}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </div>
        </Drawer>
    )
}
