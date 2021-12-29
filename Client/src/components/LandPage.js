import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import Head from './Head'
import Background from './LandBackground.png'
export default class LandPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authentication: 'land',
        }
    }
    addCard = (action) => {
        this.props.onAdd4(action)
    }

    render() {
        return (
            <div>
                <div>
                    <Head
                        authentications={this.state.authentication}
                        onAdd={(action) => this.addCard(action)}
                    />
                </div>
                <div>
                    <img
                        src={Background}
                        style={{
                            height: '100vh',
                            width: '100vw',
                            margin: '0px',
                        }}
                    />
                </div>
            </div>
        )
    }
}
