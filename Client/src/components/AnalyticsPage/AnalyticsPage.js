import React, { Component } from 'react'
import ContainerHealth from './ContainerHealth'
import { Pie, line, Scatter } from 'react-chartjs-2'
import { green } from '@material-ui/core/colors'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ContainerNumber from './ContainerNumber'
import HazardousSign from './HazardousSign'
import NumberPlate from './NumberPlate'

export default class AnalyticsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: 'All',
            CurrentPage: 'ContainerHealth',
            tabledata: null,
            error: null,
            isLoaded: false,
            items: [],
            value: 0,
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/')
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
    handleChange = (event, newValue) => {
        this.setState({ value: newValue })
        if (newValue == 1) {
            this.setState({ CurrentPage: 'AnalyticsPage' })
        } else if (newValue == 2) {
            this.setState({ CurrentPage: 'ContainerNumber' })
        } else if (newValue == 3) {
            this.setState({ CurrentPage: 'HazardousSign' })
        } else {
            this.setState({ CurrentPage: 'ContainerHealth' })
        }
    }

    render() {
        const { error, isLoaded, items } = this.state
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            var count = 0
            for (var i = 0; i < items.length; ++i) {
                if (items[i]['all'] >= 0.5) count++
            }
            let Intact = (count / items.length) * 100
            let Broken = ((items.length - count) / items.length) * 100
            const data = {
                labels: ['Intact', 'Broken'],
                datasets: [
                    {
                        data: [Intact.toFixed(1), Broken.toFixed(1)],
                        backgroundColor: ['#228B22', '#FF0000'],
                        hoverBackgroundColor: ['#3CB371', '#FF6384'],
                    },
                ],
            }
            return (
                <div>
                    <Paper>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Container Health" />
                            <Tab label="Seal Intactness" />
                            <Tab label="Number Detection" />
                            <Tab label="Hazardous Sign" />
                        </Tabs>
                    </Paper>
                    <div id="Analytics-Page">
                        {this.state.CurrentPage === 'ContainerHealth' ? (
                            <ContainerHealth></ContainerHealth>
                        ) : this.state.CurrentPage === 'ContainerNumber' ? (
                            <ContainerNumber></ContainerNumber>
                        ) : this.state.CurrentPage === 'HazardousSign' ? (
                            <HazardousSign></HazardousSign>
                        ) : (
                            <div>
                                <div id="Analytics-container">
                                    <h1 style={{ color: '#676767' }}>
                                        Seal Intactness Dashboard
                                    </h1>
                                    <div class="Analytics-PageHeader">
                                        # of containers detected :{items.length}
                                    </div>
                                    <div>
                                        <table>
                                            <tr>
                                                <td>
                                                    <Pie
                                                        data={data}
                                                        options={{
                                                            maintainAspectRatio: true,
                                                            title: {
                                                                display: true,
                                                                text:
                                                                    'Container type',
                                                                fontSize: 30,
                                                            },
                                                            tooltips: {
                                                                mode: 'label',
                                                                intersect: true,
                                                                bodyFontSize: 20,
                                                                caretSize: 20,
                                                                callbacks: {
                                                                    label: function (
                                                                        tooltipItem,
                                                                        data
                                                                    ) {
                                                                        return (
                                                                            data[
                                                                                'datasets'
                                                                            ][0][
                                                                                'data'
                                                                            ][
                                                                                tooltipItem[
                                                                                    'index'
                                                                                ]
                                                                            ] +
                                                                            '%'
                                                                        )
                                                                    },
                                                                },
                                                            },
                                                            legend: {
                                                                display: true,
                                                                position:
                                                                    'bottom',
                                                                fullWidth: true,
                                                                label: {
                                                                    fontSize: 40,
                                                                    boxWidth: 60,
                                                                },
                                                            },
                                                        }}
                                                    />
                                                    <div id="Analytics-table">
                                                        <h1
                                                            style={{
                                                                color:
                                                                    '#676767',
                                                            }}
                                                        >
                                                            Consolidated Data
                                                        </h1>
                                                        <p>
                                                            <b>
                                                                Broken &#60; 0.5
                                                                &nbsp; Intact
                                                                &#62; 0.5
                                                            </b>
                                                            <br />
                                                            <select
                                                                id="filter"
                                                                onChange={(e) =>
                                                                    this.setState(
                                                                        {
                                                                            filter:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        }
                                                                    )
                                                                }
                                                                value={
                                                                    this.state
                                                                        .filter
                                                                }
                                                            >
                                                                <option>
                                                                    All
                                                                </option>
                                                                <option>
                                                                    Intact
                                                                </option>
                                                                <option>
                                                                    Broken
                                                                </option>
                                                            </select>
                                                        </p>

                                                        <table>
                                                            <tr>
                                                                <th>
                                                                    Container Id
                                                                </th>
                                                                <th>
                                                                    Confidence
                                                                </th>
                                                                <th>
                                                                    Intactness
                                                                </th>
                                                            </tr>
                                                            {this.state
                                                                .filter ===
                                                            'All'
                                                                ? this.state.tabledata.map(
                                                                      (m) => {
                                                                          //   {
                                                                          //       console.log(
                                                                          //           'testing2',
                                                                          //           this.state.filter
                                                                          //       )
                                                                          // //   }
                                                                          return (
                                                                              <tr>
                                                                                  <td>
                                                                                      {
                                                                                          m._id
                                                                                      }
                                                                                  </td>

                                                                                  {m.all >
                                                                                  0.5 ? (
                                                                                      <td
                                                                                          style={{
                                                                                              backgroundColor:
                                                                                                  'green',
                                                                                          }}
                                                                                      >
                                                                                          {m.all >
                                                                                          0.5
                                                                                              ? 'Intact'
                                                                                              : 'Broken'}
                                                                                      </td>
                                                                                  ) : (
                                                                                      <td
                                                                                          style={{
                                                                                              backgroundColor:
                                                                                                  'red',
                                                                                          }}
                                                                                      >
                                                                                          {m.all >
                                                                                          0.5
                                                                                              ? 'Intact'
                                                                                              : 'Broken'}
                                                                                      </td>
                                                                                  )}
                                                                              </tr>
                                                                          )
                                                                      }
                                                                  )
                                                                : this.state
                                                                      .filter ===
                                                                  'Broken'
                                                                ? this.state.tabledata
                                                                      .filter(
                                                                          (m) =>
                                                                              m.all <
                                                                              0.5
                                                                      )
                                                                      .map(
                                                                          (
                                                                              m
                                                                          ) => {
                                                                              //   {
                                                                              //   console.log(
                                                                              //       'testing2',
                                                                              //       this.state.filter
                                                                              //   )
                                                                              //   }
                                                                              return (
                                                                                  <tr>
                                                                                      <td>
                                                                                          {
                                                                                              m._id
                                                                                          }
                                                                                      </td>
                                                                                      {m.all >
                                                                                      0.5 ? (
                                                                                          <td
                                                                                              style={{
                                                                                                  color:
                                                                                                      'green',
                                                                                              }}
                                                                                          >
                                                                                              {m.all >
                                                                                              0.5
                                                                                                  ? 'Intact'
                                                                                                  : 'Broken'}
                                                                                          </td>
                                                                                      ) : (
                                                                                          <td
                                                                                              style={{
                                                                                                  color:
                                                                                                      'red',
                                                                                              }}
                                                                                          >
                                                                                              {m.all >
                                                                                              0.5
                                                                                                  ? 'Intact'
                                                                                                  : 'Broken'}
                                                                                          </td>
                                                                                      )}
                                                                                  </tr>
                                                                              )
                                                                          }
                                                                      )
                                                                : this.state.tabledata
                                                                      .filter(
                                                                          (m) =>
                                                                              m.all >
                                                                              0.5
                                                                      )
                                                                      .map(
                                                                          (
                                                                              m
                                                                          ) => {
                                                                              return (
                                                                                  <tr>
                                                                                      <td>
                                                                                          {
                                                                                              m._id
                                                                                          }
                                                                                      </td>
                                                                                      {m.all >
                                                                                      0.5 ? (
                                                                                          <td
                                                                                              style={{
                                                                                                  color:
                                                                                                      'green',
                                                                                              }}
                                                                                          >
                                                                                              {m.all >
                                                                                              0.5
                                                                                                  ? 'Intact'
                                                                                                  : 'Broken'}
                                                                                          </td>
                                                                                      ) : (
                                                                                          <td
                                                                                              style={{
                                                                                                  color:
                                                                                                      'red',
                                                                                              }}
                                                                                          >
                                                                                              {m.all >
                                                                                              0.5
                                                                                                  ? 'Intact'
                                                                                                  : 'Broken'}
                                                                                          </td>
                                                                                      )}
                                                                                  </tr>
                                                                              )
                                                                          }
                                                                      )}
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
        }
    }
}
