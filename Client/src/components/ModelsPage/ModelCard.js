import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { green } from '@material-ui/core/colors'
import TimelineTwoToneIcon from '@material-ui/icons/TimelineTwoTone'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    media: {
        height: 140,
        width: '25%',
    },

    status: {
        height: 15,
        width: 15,
        background: 'pink',
        borderRadius: '50%',
        display: 'inline-block',
    },
})

export default function ModelCard(props) {
    const classes = useStyles()

    return (
        <Card className={classes.root} elevation={3}>
            <CardActionArea>
                <TimelineTwoToneIcon className={classes.media} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.heading}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <p>In Use</p>
                <span
                    className={classes.status}
                    style={{
                        background:
                            props.status === 'u' ? '#aeea00' : '#b71c1c',
                    }}
                ></span>
            </CardActions>
        </Card>
    )
}
