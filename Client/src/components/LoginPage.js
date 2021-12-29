import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import './Login.css'
import Head from './Head'

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: false,
            email: '',
            password: '',
            authentication: 'false',
        }
        const classes = this.useStyles
    }

    validateForm = () => {
        return this.state.email.length > 0 && this.state.password.length > 0
    }

    handok = (event) => {
        event.preventDefault()
        if (this.props.onAdd) {
            this.props.onAdd(this.state.email, this.state.password)
        }
        return true
    }

    addCard = () => {
        this.props.onAdd2()
    }

    render() {
        return (
            <div>
                <Head
                    authentications={this.state.authentication}
                    onAdd={() => this.addCard()}
                />
                <div className="Login">
                    <form onSubmit={this.handok}>
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel>Email</ControlLabel>
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
                            <ControlLabel>Password</ControlLabel>
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
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}
