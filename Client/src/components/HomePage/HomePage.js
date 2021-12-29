import React, { Component } from 'react'
import HomeCard from './HomeCard'
import MultilineChartIcon from '@material-ui/icons/MultilineChart'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(6),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '600px',
        overflowX: 'visible',
    },
}))

export default function ModelsPage() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} variant="outlined">
                <Grid container spacing={3}>
                    <Grid item xs>
                        <HomeCard
                            heading="Container Detected All Time"
                            amount="146"
                            status="n"
                        />
                    </Grid>
                    <Grid item xs>
                        <HomeCard
                            heading="Container Detected in last 24 Hour"
                            amount="29"
                            status="u"
                        />
                    </Grid>
                </Grid>
                <br />
                <br />
                <br />
                <Grid container spacing={3}>
                    <Grid item xs>
                        <HomeCard
                            heading="Healthy Container"
                            amount="19"
                            status="u"
                        />
                    </Grid>
                    <Grid item xs>
                        <HomeCard
                            heading="Unhealthy container"
                            amount="10"
                            status="u"
                        />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
