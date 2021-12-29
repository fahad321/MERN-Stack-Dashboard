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
import Head from './Head'
import Body from './Body'
import { insertIntoFilteredItems } from '../../actions/library/insertIntoFilteredItems'

const fakeAPIData = [
    {
        url: 'https://www.youtube.com/watch?v=K4it0F8NVD4',
        type: 'video',
        subType: 'video',
        byModel: 'model1',
    },
    {
        url:
            'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fkimsoonlee.com%2Fwp-content%2Fuploads%2F2014%2F08%2Fcontainer-trucking1.jpg&f=1&nofb=1',
        type: 'image',
        byModel: 'model1',
    },
    {
        url: 'https://www.youtube.com/watch?v=K4it0F8NVD4',
        type: 'video',
        subType: 'video',
        byModel: 'model3',
    },
    {
        url: 'https://www.youtube.com/watch?v=K4it0F8NVD4',
        type: 'video',
        subType: 'video',
    },
    {
        url: 'https://www.youtube.com/watch?v=K4it0F8NVD4',
        type: 'video',
        subType: 'video',
    },
    {
        url: 'https://www.youtube.com/watch?v=K4it0F8NVD4',
        type: 'video',
        subType: 'video',
    },
    {
        url: 'https://www.youtube.com/watch?v=K4it0F8NVD4',
        type: 'video',
        subType: 'video',
    },
    {
        url: 'https://www.youtube.com/watch?v=K4it0F8NVD4',
        type: 'video',
        subType: 'clip',
        byModel: 'model1',
    },
    {
        url: 'https://www.youtube.com/watch?v=K4it0F8NVD4',
        type: 'video',
        subType: 'video',
    },
    {
        url:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FmtMJf_s82SM%2Fmaxresdefault.jpg&f=1&nofb=1',
        type: 'image',
        byModel: 'model2',
    },
    {
        url: 'https://www.youtube.com/watch?v=K4it0F8NVD4',
        type: 'video',
        subType: 'video',
    },
    {
        url: 'https://www.youtube.com/watch?v=K4it0F8NVD4',
        type: 'video',
        subType: 'video',
    },
    {
        url:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.qwG_1RXH4TGgYOTLRXWLSAHaE1%26pid%3DApi&f=1',
        type: 'image',
        byModel: 'model3',
    },
]

class LibraryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            response: [],
            showInARow: 4,
            filteredResponse: [],
            model: '',
            disabled: true,
        }
        //binding this
        this.makeRequestToApi = this.makeRequestToApi.bind(this)
    }

    //creating delay for fake api
    delay = async (ms) => {
        return await new Promise((resolve) => setTimeout(resolve, ms))
    }

    // fake api call
    makeRequestToApi = async () => {
        await this.delay(500)
        return fakeAPIData
    }

    componentDidMount() {
        this.makeRequestToApi().then((res) => {
            console.log(res)
            this.props.insertIntoItems(res)
            this.props.insertIntoFilteredItems(res)
        })
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Paper>
                    <Head />
                    <Body />
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
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

export default connect(mapStateToProps, mapDispatchToProps)(LibraryPage)
