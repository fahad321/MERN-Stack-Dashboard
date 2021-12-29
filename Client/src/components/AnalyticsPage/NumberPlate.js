import React, { Component } from 'react'
import ContainerHealth from './ContainerNumber'

export default class AnalyticsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: 'Reset',
            CurrentPage: 'AnalyticsPage',
            tabledata: null,
            error: null,
            isLoaded: false,
            items: [],
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/number_plate/')
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                        tabledata: result,
                    })
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    })
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <div id="Analytics-Page">
                    {this.state.CurrentPage === 'ContainerHealth' ? (
                        <ContainerHealth></ContainerHealth>
                    ) : (
                        <div>
                            <div id="Analytics-container">
                                <h1 style={{ color: '#676767' }}>
                                    Vehicle Number Detection
                                </h1>
                                <div class="Analytics-PageHeader">
                                    # of vehicles detected :{items.length}
                                </div>
                            </div>
                            <div id="Analytics-table">
                                <h1 style={{ color: '#676767' }}>
                                    Vehicle Number
                                </h1>
                                <select
                                    id="filter"
                                    onChange={(e) =>
                                        this.setState({
                                            filter: e.target.value,
                                        })
                                    }
                                    value={this.state.filter}
                                >
                                    <option>Reset</option>
                                    <option>Latest</option>
                                </select>

                                <table>
                                    <tr>
                                        <th>Container Id</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Vehicle Number</th>
                                    </tr>

                                    {this.state.filter == 'Reset'
                                        ? this.state.tabledata.map((m) => {
                                              console.log(m)
                                              var curdate = new Date(null)
                                              curdate.setTime(m.timestamp.$date)

                                              return (
                                                  <tr>
                                                      <td>{m._id}</td>
                                                      <td>
                                                          {curdate.toLocaleDateString()}
                                                      </td>
                                                      <td>
                                                          {curdate.toLocaleTimeString()}
                                                      </td>
                                                      <td>{m.number}</td>
                                                  </tr>
                                              )
                                          })
                                        : this.state.tabledata
                                              .slice(0)
                                              .reverse()
                                              .map((m) => {
                                                  console.log(m)
                                                  var curdate = new Date(null)
                                                  curdate.setTime(
                                                      m.timestamp.$date
                                                  )

                                                  return (
                                                      <tr>
                                                          <td>{m._id}</td>
                                                          <td>
                                                              {curdate.toLocaleDateString()}
                                                          </td>
                                                          <td>
                                                              {curdate.toLocaleTimeString()}
                                                          </td>
                                                          <td>{m.number}</td>
                                                      </tr>
                                                  )
                                              })}
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
