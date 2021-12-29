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
import { Multiselect } from 'multiselect-react-dropdown';
import { render } from '@testing-library/react'
import axios from 'axios'

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
const options= [{name: 'Model1', id: 1},{name: 'Model2', id: 2},{name: 'Model3', id: 3},{name: 'Model4', id: 4}]

export default class ManageUsersPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { title: 'Id', field: 'id', type: 'numeric' },
                {
                    title: 'Avatar',
                    filed: 'avatar',
                    render: (rowData) => (
                        <div
                            style={{
                                fontSize: 100,
                                textAlign: 'center',
                                color: 'white',
                                backgroundColor: '#E53935',
                            }}
                        ></div>
                    ),
                },
                { title: 'OrganizationName', field: 'organizationName', type: 'string' },
                { title: 'Device', field: 'device', type: 'string' },
                {
                    title: 'Models',
                    field: 'models',
                    render: (rowData) => (
                        <Multiselect
options={options} // Options to display in the dropdown
 // Function will trigger on select event
displayValue="name" // Property name to display in the dropdown options
/>
                    ),
                },
                { title: 'userLogInId', field: 'userLogInId', type: 'string' },
                { title: 'email', field: 'email', type: 'string' },
                { title: 'Password', field: 'password', type: 'string' },
            ],
            data: [
                {
                    id: 1,
                    organizationName: 'Kmart',
                    device: 'CAM11',
                    models: '3,4,5',
                    userLogInId: 'lunarshankar102',
                    email: 'shankar.demo@email.com',
                    password: 'password',
                },
            ],
        }
    }

    render() {
        return (
            <MaterialTable
                title="Users"
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
