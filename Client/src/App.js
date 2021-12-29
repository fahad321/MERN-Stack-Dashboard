import React, { Component, useState } from 'react'
import Dashboard from './components/Dashboard'
import LoginPage from './components/LoginPage'
import LandPage from './components/LandPage'
import RegisterPage from './components/RegisterPage'
import styles from './components/Login.css'
import axios from 'axios'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            land: 'true',
            authentication: 'true',
            sigout: 'false',
            posts: [],
        }
        const classes = this.useStyles
    }
    componentDidMount = () => {}
    getBlogPost = (email, password) => {
        const payload = {
            name: email,
            password: password,
        }
        axios({
            url: '/api/saves',
            method: 'POST',
            data: payload,
        })
            .then((response) => {
                const data = response.data
                this.setState({ posts: data })
                console.log('Data has been received!!')
                if (this.state.posts[0].name) {
                    this.setState({ authentication: 'true' })
                } else {
                    alert('Incorrect Username or Password !')
                    this.setState({ authentication: 'false' })
                }
            })
            .catch(() => {
                alert('Incorrect Username or Password !')
                this.setState({ authentication: 'false' })
            })
        /*
        
        axios
            .get('/api')
            .then((response) => {
                const data = response.data
                this.setState({ posts: data })
                console.log('Data has been received!!')
                if (this.state.posts[0].name) {
                    this.setState({ authentication: 'true' })
                } else {
                    alert('Incorrect Username or Password !')
                    this.setState({ authentication: 'false' })
                }
            })
            .catch(() => {
                alert('Incorrect Username or Password !')
                this.setState({ authentication: 'false' })
                //alert('Error retrieving data!!!')
            })
            */
    }
    addCard = (email, password) => {
        this.getBlogPost(email, password)
    }
    addCard2 = () => {
        this.setState({ authentication: 'register' })
    }
    addCard4 = (action) => {
        if (action == 'register') {
            this.setState({ authentication: 'register' })
        } else {
            this.setState({ authentication: 'false' })
        }
    }
    addCard3 = () => {
        this.setState({ authentication: 'false' })
    }
    render() {
        return (
            <div>
                {this.state.authentication === 'land' ? (
                    <LandPage onAdd4={(action) => this.addCard4(action)} />
                ) : this.state.authentication === 'false' ? (
                    <LoginPage
                        onAdd={(text, text2) => this.addCard(text, text2)}
                        onAdd2={() => this.addCard2()}
                    />
                ) : this.state.authentication === 'register' ? (
                    <RegisterPage onAdd3={() => this.addCard3()} />
                ) : (
                    <div>
                        <Dashboard />
                    </div>
                )}
            </div>
        )
    }
}
