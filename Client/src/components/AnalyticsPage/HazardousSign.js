import React, { Component } from 'react'
import ContainerHealth from './ContainerNumber'
import { Pie, line, Scatter } from 'react-chartjs-2'
import { green } from '@material-ui/core/colors'

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
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/hazardous_sign')
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
        } else {
            var count = 0
            for (var i = 0; i < items.length; ++i) {
                if (items[i]['all'] >= 0.5) count++
            }
            let Sign = (count / items.length) * 100
            let Nosign = ((items.length - count) / items.length) * 100
            const data = {
                labels: ['Hazardous', 'Normal'],
                datasets: [
                    {
                        data: [Sign.toFixed(1), Nosign.toFixed(1)],
                        backgroundColor: ['#FF0000', '#228B22'],
                        hoverBackgroundColor: ['#FF6384', '#3CB371'],
                    },
                ],
            }
            return (
                <div>
                    <div id="Analytics-Page">
                        <div>
                            <div id="Analytics-container">
                                <h1 style={{ color: '#676767' }}>
                                    Hazardous Sign Dashboard
                                </h1>
                                <div class="Analytics-PageHeader">
                                    # of containers detected :{items.length}
                                </div>
                                <div>
                                    <Pie
                                        data={data}
                                        options={{
                                            maintainAspectRatio: true,
                                            title: {
                                                display: true,
                                                text: 'Container type',
                                                fontSize: 30,
                                            },
                                            tooltips: {
                                                mode: 'label',
                                                intersect: true,
                                                bodyFontSize: 16,
                                                caretSize: 20,
                                                callbacks: {
                                                    label: function (
                                                        tooltipItem,
                                                        data
                                                    ) {
                                                        return (
                                                            data['datasets'][0][
                                                                'data'
                                                            ][
                                                                tooltipItem[
                                                                    'index'
                                                                ]
                                                            ] + '%'
                                                        )
                                                    },
                                                },
                                            },
                                            legend: {
                                                display: true,
                                                position: 'bottom',
                                                fullWidth: true,
                                                label: {
                                                    fontSize: 40,
                                                    boxWidth: 60,
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                            <div id="Analytics-table">
                                <h1 style={{ color: '#676767' }}>
                                    Consolidated Data
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
                                    <option>All</option>
                                    <option>Hazardous</option>
                                    <option>Normal</option>
                                </select>

                                <table>
                                    <tr>
                                        <th>Container Id</th>
                                        <th>Container Type</th>
                                    </tr>
                                    {this.state.filter === 'All'
                                        ? this.state.tabledata.map((m) => {
                                              return (
                                                  <tr>
                                                      <td>{m._id}</td>

                                                      {m.all > 0.5 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.all > 0.5
                                                                  ? 'Hazardous'
                                                                  : 'Normal'}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.all > 0.5
                                                                  ? 'Hazardous'
                                                                  : 'Normal'}
                                                          </td>
                                                      )}
                                                  </tr>
                                              )
                                          })
                                        : this.state.filter === 'Normal'
                                        ? this.state.tabledata
                                              .filter((m) => m.all < 0.5)
                                              .map((m) => {
                                                  return (
                                                      <tr>
                                                          <td>{m._id}</td>

                                                          {m.all > 0.5 ? (
                                                              <td
                                                                  style={{
                                                                      color:
                                                                          'green',
                                                                  }}
                                                              >
                                                                  {m.all > 0.5
                                                                      ? 'Hazardous'
                                                                      : 'Normal'}
                                                              </td>
                                                          ) : (
                                                              <td
                                                                  style={{
                                                                      color:
                                                                          'red',
                                                                  }}
                                                              >
                                                                  {m.all > 0.5
                                                                      ? 'Hazardous'
                                                                      : 'Normal'}
                                                              </td>
                                                          )}
                                                      </tr>
                                                  )
                                              })
                                        : this.state.tabledata
                                              .filter((m) => m.all > 0.5)
                                              .map((m) => {
                                                  return (
                                                      <tr>
                                                          <td>{m._id}</td>

                                                          {m.all > 0.5 ? (
                                                              <td
                                                                  style={{
                                                                      color:
                                                                          'red',
                                                                  }}
                                                              >
                                                                  {m.all > 0.5
                                                                      ? 'Hazardous'
                                                                      : 'Normal'}
                                                              </td>
                                                          ) : (
                                                              <td
                                                                  style={{
                                                                      color:
                                                                          'green',
                                                                  }}
                                                              >
                                                                  {m.all > 0.5
                                                                      ? 'Hazardous'
                                                                      : 'Normal'}
                                                              </td>
                                                          )}
                                                      </tr>
                                                  )
                                              })}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
