import React, { Component } from 'react'
import { forwardRef } from 'react'
import MaterialTable from 'material-table'
import Button from '@material-ui/core/Button'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import { render } from '@testing-library/react'
import axios from 'axios'
import ViewStreamIcon from '@material-ui/icons/ViewStream'
import { Link } from 'react-router-dom'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

export default class DevicesPage extends Component {
    constructor(props) {
        super(props)
        console.log(props)

        this.state = {
            columns: [
                { title: 'Id', field: 'id', type: 'numeric' },
                { title: 'IP', field: 'ip', type: 'string' },
                { title: 'Port', field: 'port', type: 'numeric' },
                { title: 'Path', field: 'pathString', type: 'string' },
                { title: 'username', field: 'username', type: 'string' },
                { title: 'Password', field: 'password', type: 'string' },
                {
                    title: 'Location',
                    field: 'location',
                    lookup: { lane1: 'lane1', lane2: 'lane2' },
                },
                { title: 'Device', field: 'device', type: 'string' },
                { title: 'URL', field: 'url', type: 'url' },
                {
                    title: 'Other Actions',
                    filed: 'otherActions',
                    render: (rowData) =>
                        rowData ? (
                            <Link
                                to={{
                                    pathname: '/streams',
                                    deviceRow: rowData.url,
                                    deviceName: rowData.device,
                                }}
                            >
                                <ViewStreamIcon></ViewStreamIcon>
                            </Link>
                        ) : (
                            <ViewStreamIcon></ViewStreamIcon>
                        ),
                },
            ],
            data: [
                {
                    id: 1,
                    ip: '123.123.123.123',
                    port: 1892,
                    pathString: '',
                    username: 'lunar',
                    password: 63,
                    device: 'Cam7',
                    url: 'https://www.youtube.com/watch?v=7v6QXZWylpI',
                    location: 'lane1',
                },
                {
                    id: 2,
                    ip: '123.123.123.129',
                    port: 2220,
                    pathString: '/live',
                    username: 'apo',
                    password: 34,
                    device: 'Cam8',
                    url: 'https://www.youtube.com/watch?v=f7hbWvHKns0',
                    location: 'lane2',
                },
                {
                    id: 3,
                    ip: '172.16.0.2',
                    port: 8080,
                    pathString: '/h264_ulaw.sdp',
                    device: 'Cam9',
                    url: 'https://www.youtube.com/watch?v=BHACKCNDMW8&t=396s',
                    location: 'lane2',
                },
            ],
        }
    }

    render() {
        const handleClick = (event, rowData, togglePanel) => {
            // ensuring that button is pressed in table Row
            let address = `rtsp://${rowData.ip}:${rowData.port}${rowData.pathString}`
            if (event.target.tagName === 'BUTTON' || 'SPAN') {
                console.log(
                    event.target.tagName,
                    address,
                    process.env.REACT_APP_STREAM_DEVICE
                )
                axios
                    .post(process.env.REACT_APP_STREAM_DEVICE, {
                        address: address,
                    })
                    .then((e) => {
                        console.log(e)
                    })
            }
            console.log('here is none error')
        }

        return (
            <MaterialTable
                onRowClick={handleClick}
                title="All Devices"
                columns={this.state.columns}
                data={this.state.data}
                icons={tableIcons}
                editable={{
                    isEditable: (rowTitle) => rowTitle.ip,
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve()
                                this.setState((prevState) => {
                                    const data = [...prevState.data]
                                    data.push(newData)
                                    return { ...prevState, data }
                                })
                            }, 600)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve()
                                if (oldData) {
                                    this.setState((prevState) => {
                                        const data = [...prevState.data]
                                        data[data.indexOf(oldData)] = newData
                                        return { ...prevState, data }
                                    })
                                }
                            }, 600)
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve()
                                this.setState((prevState) => {
                                    const data = [...prevState.data]
                                    data.splice(data.indexOf(oldData), 1)
                                    return { ...prevState, data }
                                })
                                console.log(this.state)
                            }, 600)
                        }),
                }}
            />
        )
    }
}
