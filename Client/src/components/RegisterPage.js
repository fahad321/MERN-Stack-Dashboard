import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import './Login.css'
import Head from './Head'
import axios from 'axios'

export default class RegisterPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: false,
            email: '',
            password: '',
            authentication: 'register',
        }
        const classes = this.useStyles
    }

    validateForm = () => {
        return this.state.email.length > 0 && this.state.password.length > 0
    }
    handok = (event) => {
        event.preventDefault()
        const payload = {
            name: this.state.email,
            password: this.state.password,
        }
        axios({
            url: '/api/save',
            method: 'POST',
            data: payload,
        })
            .then(() => {
                console.log('Data has been sent to the server')
                this.resetUserInputs()
                this.getBlogPost()
            })
            .catch(() => {
                console.log('Internal server error')
            })
        this.props.onAdd3()
    }

    render() {
        return (
            <div>
                <Head authentications={this.state.authentication} />
                <div className="Login">
                    <form onSubmit={this.handok}>
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel>Email Address</ControlLabel>
                            <FormControl
                                autoFocus
                                className="Textfields"
                                placeholder="Email"
                                type="email"
                                value={this.state.email}
                                onChange={(e) =>
                                    this.setState({ email: e.target.value })
                                }
                            />
                        </FormGroup>
                        <br />
                        <FormGroup controlId="password" bsSize="large">
                            <ControlLabel>Enter New Password</ControlLabel>
                            <FormControl
                                className="Textfields"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={(e) =>
                                    this.setState({ password: e.target.value })
                                }
                                type="password"
                            />
                        </FormGroup>
                        <br />
                        <Button
                            className="buttonW"
                            block
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}
