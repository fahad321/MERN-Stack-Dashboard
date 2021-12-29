import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import grey from '@material-ui/core/colors/grey'
import { blue, blueGrey } from '@material-ui/core/colors'
import RegisterPage from './RegisterPage'
import { Link } from 'react-router-dom'
import Logo from './1.png'

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: '#404040',
        zIndex: theme.zIndex.drawer + 1,
        // height: '7vh',
    },
    logouts: {
        height: '40px !important',
        background: '#404040',
        color: 'white',
        border: 'none!important',
    },
}))
var signOut
var register = 'register'
var login = 'login'
export default function Header(props) {
    const classes = useStyles()
    if (props.authentications == 'false') {
        signOut = 'false'
    } else if (props.authentications == 'land') {
        signOut = 'land'
    } else if (props.authentications == 'register') {
        signOut = 'register'
    } else {
        signOut = 'true'
    }
    function logouts() {
        window.location.reload(false)
    }
    function handok(action, event) {
        if (props.onAdd) {
            props.onAdd(action)
        }
        return true
    }
    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <div style={{ display: 'flex' }}>
                    <Toolbar>
                        <img src={Logo} style={{ height: '25px' }} />
                    </Toolbar>
                    {signOut == 'true' ? (
                        <div style={{ marginLeft: 'auto', paddingTop: '20px' }}>
                            <Button
                                className={classes.logouts}
                                onClick={() => {
                                    window.location.reload(false)
                                }}
                                variant="contained"
                            >
                                Log Out
                            </Button>
                        </div>
                    ) : signOut == 'land' ? (
                        <div style={{ marginLeft: 'auto', paddingTop: '20px' }}>
                            <Button
                                className={classes.logouts}
                                onClick={() => {
                                    handok(register)
                                }}
                                variant="contained"
                            >
                                Register
                            </Button>

                            <Button
                                className={classes.logouts}
                                onClick={() => {
                                    handok(login)
                                }}
                                variant="contained"
                            >
                                Login
                            </Button>
                        </div>
                    ) : signOut === 'false' ? (
                        <div style={{ marginLeft: 'auto', paddingTop: '20px' }}>
                            <Button
                                className={classes.logouts}
                                onClick={() => {
                                    props.onAdd()
                                }}
                                variant="contained"
                            >
                                Register
                            </Button>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </AppBar>
        </div>
    )
}
