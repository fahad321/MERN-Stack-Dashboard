import React, { Component } from 'react'
import { Bar, Line, Pie, Bubble } from 'react-chartjs-2'

export default class ContainerHealth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: 'All',
            tabledata: null,
            error: null,
            isLoaded: false,
            items: [],
        }
    }
    componentDidMount() {
        fetch('http://localhost:5000/health/')
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
            var count = 0,
                count1 = 0,
                count2 = 0
            for (var i = 0; i < items.length; ++i) {
                if (items[i]['ratio'] >= 51) count++
                else if (items[i]['ratio'] <= 49) count1++
                else count2++
            }
            let Good = (count / items.length) * 100
            let Bad = (count1 / items.length) * 100
            let Average = (count2 / items.length) * 100
            const data = {
                labels: ['Good', 'Average', 'Bad'],
                datasets: [
                    {
                        data: [
                            Good.toFixed(2),
                            Average.toFixed(2),
                            Bad.toFixed(2),
                        ],
                        backgroundColor: ['#228B22', '#fdde6c', '#FF0000'],
                        hoverBackgroundColor: ['#3CB371', '#ededa6', '#FF6384'],
                    },
                ],
            }
            var count3 = 0,
                count4 = 0,
                count5 = 0,
                count6 = 0,
                count7 = 0,
                count8 = 0
            for (var i = 0; i < items.length; ++i) {
                if (items[i]['ContainerCrack'] >= 50) count3++
                else count4++
            }
            for (var i = 0; i < items.length; ++i) {
                if (items[i]['ContainerRust'] >= 50) count5++
                else count6++
            }
            for (var i = 0; i < items.length; ++i) {
                if (items[i]['ContainerDent'] >= 50) count7++
                else count8++
            }

            let Crack = count3 / items.length
            let Rust = count5 / items.length
            let Dent = count7 / items.length
            const data1 = {
                labels: ['Crack', 'Rust', 'Dent'],
                datasets: [
                    {
                        data: [
                            Crack.toFixed(2),
                            Rust.toFixed(2),
                            Dent.toFixed(2),
                        ],
                        backgroundColor: ['#544C4A', '#CB6347', '#828282'],
                        hoverBackgroundColor: ['#AAAAAA', '#FDB2B1', '#CBCBCF'],
                    },
                ],
            }
            return (
                <div id="Analytics-Page">
                    <div id="Analytics-container">
                        <h1 style={{ color: '#676767' }}>
                            Container Health Dashboard
                        </h1>
                        <div class="Analytics-PageHeader">
                            # of containers detected :{items.length}
                        </div>
                        <div>
                            <Bar
                                data={data1}
                                options={{
                                    maintainAspectRatio: true,
                                    title: {
                                        display: true,
                                        text: 'Defect Ratio',
                                        fontSize: 30,
                                    },
                                    scales: {
                                        yAxes: [
                                            {
                                                ticks: {
                                                    beginAtZero: true,
                                                },
                                            },
                                        ],
                                    },
                                    tooltips: {
                                        mode: 'nearest',
                                        intersect: false,
                                        bodyFontSize: 20,
                                        caretSize: 20,
                                        callbacks: {
                                            label: function (
                                                tooltipItem,
                                                data
                                            ) {
                                                return (
                                                    data['datasets'][0]['data'][
                                                        tooltipItem['index']
                                                    ] + '%'
                                                )
                                            },
                                        },
                                    },
                                    legend: {
                                        labels: ['Crack', 'Rust', 'Dent'],
                                        display: true,
                                        position: 'bottom',
                                        fontSize: 12,
                                        fullWidth: true,
                                        boxWidth: 40,
                                    },
                                    titleFontSize: 16,
                                }}
                            />
                        </div>
                        <div>
                            <Pie
                                data={data}
                                options={{
                                    maintainAspectRatio: true,
                                    title: {
                                        display: true,
                                        text: 'Health category',
                                        fontSize: 30,
                                    },
                                    tooltips: {
                                        mode: 'nearest',
                                        intersect: false,
                                        bodyFontSize: 20,
                                        caretSize: 20,
                                        callbacks: {
                                            label: function (
                                                tooltipItem,
                                                data
                                            ) {
                                                return (
                                                    data['datasets'][0]['data'][
                                                        tooltipItem['index']
                                                    ] + '%'
                                                )
                                            },
                                        },
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom',
                                        fontSize: 12,
                                        fullWidth: true,
                                        boxWidth: 40,
                                    },
                                    titleFontSize: 16,
                                }}
                            />
                        </div>

                        <div id="Analytics-table">
                            <h1 style={{ color: '#676767' }}>
                                Container Scorecard
                            </h1>
                            <select
                                id="filter"
                                onChange={(e) =>
                                    this.setState({ filter: e.target.value })
                                }
                                value={this.state.filter}
                            >
                                <option>All</option>
                                <option>Good</option>
                                <option>Average</option>
                                <option>Bad</option>
                            </select>

                            <table>
                                <tr>
                                    <th>Container Id</th>
                                    <th>Ratio</th>
                                    <th>Confidence</th>
                                    <th>Crack</th>
                                    <th>Rust</th>
                                    <th>Dent</th>
                                    <th>Health</th>
                                </tr>
                                {this.state.filter === 'All'
                                    ? this.state.tabledata.map((m) => {
                                          return (
                                              <tr>
                                                  <td>{m._id}</td>
                                                  {m.ratio > 50 ? (
                                                      <td
                                                          style={{
                                                              backgroundColor:
                                                                  'red',
                                                          }}
                                                      >
                                                          {m.ratio.toFixed(3)}
                                                      </td>
                                                  ) : (
                                                      <td
                                                          style={{
                                                              backgroundColor:
                                                                  'green',
                                                          }}
                                                      >
                                                          {m.ratio.toFixed(3)}
                                                      </td>
                                                  )}
                                                  {m.ContainerConfidence >
                                                  50 ? (
                                                      <td
                                                          style={{
                                                              backgroundColor:
                                                                  'green',
                                                          }}
                                                      >
                                                          {m.ContainerConfidence.toFixed(
                                                              3
                                                          )}
                                                      </td>
                                                  ) : (
                                                      <td
                                                          style={{
                                                              backgroundColor:
                                                                  'red',
                                                          }}
                                                      >
                                                          {m.ContainerConfidence.toFixed(
                                                              3
                                                          )}
                                                      </td>
                                                  )}
                                                  {m.ContainerCrack > 50 ? (
                                                      <td
                                                          style={{
                                                              backgroundColor:
                                                                  'red',
                                                          }}
                                                      >
                                                          {m.ContainerCrack.toFixed(
                                                              3
                                                          )}
                                                      </td>
                                                  ) : (
                                                      <td
                                                          style={{
                                                              backgroundColor:
                                                                  'green',
                                                          }}
                                                      >
                                                          {m.ContainerCrack.toFixed(
                                                              3
                                                          )}
                                                      </td>
                                                  )}
                                                  {m.ContainerRust > 50 ? (
                                                      <td
                                                          style={{
                                                              backgroundColor:
                                                                  'red',
                                                          }}
                                                      >
                                                          {m.ContainerRust.toFixed(
                                                              3
                                                          )}
                                                      </td>
                                                  ) : (
                                                      <td
                                                          style={{
                                                              backgroundColor:
                                                                  'green',
                                                          }}
                                                      >
                                                          {m.ContainerRust.toFixed(
                                                              3
                                                          )}
                                                      </td>
                                                  )}
                                                  {m.ContainerDent > 50 ? (
                                                      <td
                                                          style={{
                                                              backgroundColor:
                                                                  'red',
                                                          }}
                                                      >
                                                          {m.ContainerDent.toFixed(
                                                              3
                                                          )}
                                                      </td>
                                                  ) : (
                                                      <td
                                                          style={{
                                                              backgroundColor:
                                                                  'green',
                                                          }}
                                                      >
                                                          {m.ContainerDent.toFixed(
                                                              3
                                                          )}
                                                      </td>
                                                  )}
                                                  {m.ratio >= 51 ? (
                                                      <td
                                                          style={{
                                                              backgroundColor:
                                                                  'red',
                                                          }}
                                                      >
                                                          Bad
                                                      </td>
                                                  ) : m.ratio < 51 &&
                                                    m.ratio > 49 ? (
                                                      <td
                                                          style={{
                                                              backgroundColor:
                                                                  '#fdde6c',
                                                          }}
                                                      >
                                                          Average
                                                      </td>
                                                  ) : (
                                                      <td
                                                          style={{
                                                              backgroundColor:
                                                                  'green',
                                                          }}
                                                      >
                                                          Good
                                                      </td>
                                                  )}
                                              </tr>
                                          )
                                      })
                                    : this.state.filter === 'Good'
                                    ? this.state.tabledata
                                          .filter((f) => f.ratio <= 49)
                                          .map((m) => {
                                              return (
                                                  <tr>
                                                      <td>{m._id}</td>
                                                      {m.ratio > 50 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.ratio.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.ratio.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      )}
                                                      {m.ContainerConfidence >
                                                      50 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.ContainerConfidence.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.ContainerConfidence.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      )}
                                                      {m.ContainerCrack > 50 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.ContainerCrack.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.ContainerCrack.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      )}
                                                      {m.ContainerRust > 50 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.ContainerRust.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.ContainerRust.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      )}
                                                      {m.ContainerDent > 50 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.ContainerDent.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.ContainerDent.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      )}
                                                      {m.ratio >= 51 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              Bad
                                                          </td>
                                                      ) : m.ratio < 51 &&
                                                        m.ratio > 49 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      '#fdde6c',
                                                              }}
                                                          >
                                                              Average
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              Good
                                                          </td>
                                                      )}
                                                  </tr>
                                              )
                                          })
                                    : this.state.filter === 'Bad'
                                    ? this.state.tabledata
                                          .filter((f) => f.ratio >= 51)
                                          .map((m) => {
                                              return (
                                                  <tr>
                                                      <td>{m._id}</td>
                                                      {m.ratio > 50 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.ratio.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.ratio.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      )}
                                                      {m.ContainerConfidence >
                                                      50 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.ContainerConfidence.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.ContainerConfidence.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      )}
                                                      {m.ContainerCrack > 50 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.ContainerCrack.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.ContainerCrack.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      )}
                                                      {m.ContainerRust > 50 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.ContainerRust.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.ContainerRust.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      )}
                                                      {m.ContainerDent > 50 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.ContainerDent.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.ContainerDent.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      )}
                                                      {m.ratio >= 51 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              Bad
                                                          </td>
                                                      ) : m.ratio < 51 &&
                                                        m.ratio > 49 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      '#fdde6c',
                                                              }}
                                                          >
                                                              Average
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              Good
                                                          </td>
                                                      )}
                                                      )
                                                  </tr>
                                              )
                                          })
                                    : this.state.tabledata
                                          .filter(
                                              (f) =>
                                                  f.ratio > 49 && f.ratio < 51
                                          )
                                          .map((m) => {
                                              return (
                                                  <tr>
                                                      <td>{m._id}</td>
                                                      {m.ratio > 50 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.ratio.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.ratio.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      )}
                                                      {m.ContainerConfidence >
                                                      50 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.ContainerConfidence.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.ContainerConfidence.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      )}
                                                      {m.ContainerCrack > 50 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.ContainerCrack.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.ContainerCrack.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      )}
                                                      {m.ContainerRust > 50 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.ContainerRust.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.ContainerRust.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      )}
                                                      {m.ContainerDent > 50 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              {m.ContainerDent.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              {m.ContainerDent.toFixed(
                                                                  3
                                                              )}
                                                          </td>
                                                      )}
                                                      {m.ratio >= 51 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'red',
                                                              }}
                                                          >
                                                              Bad
                                                          </td>
                                                      ) : m.ratio < 51 &&
                                                        m.ratio > 49 ? (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      '#fdde6c',
                                                              }}
                                                          >
                                                              Average
                                                          </td>
                                                      ) : (
                                                          <td
                                                              style={{
                                                                  backgroundColor:
                                                                      'green',
                                                              }}
                                                          >
                                                              Good
                                                          </td>
                                                      )}
                                                  </tr>
                                              )
                                          })}
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
