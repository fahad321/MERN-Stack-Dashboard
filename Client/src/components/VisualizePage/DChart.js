import React, { Component } from 'react'
import Chart from 'react-apexcharts'
export default class DChart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            i: 0,
            time: 19,
            series: [
                {
                    name: 'Detected',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                },
                {
                    name: 'Undetected',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                },
            ],
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded',
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent'],
                },
                xaxis: {
                    categories: [
                        `10`,
                        `11`,
                        `12`,
                        `13`,
                        `14`,
                        `15`,
                        `16`,
                        `17`,
                        `18`,
                    ],
                },
                yaxis: {
                    title: {
                        text: 'No. of vehicles',
                    },
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return `${val} vehicles`
                        },
                    },
                },
            },
        }

        this.updateData = this.updateData.bind(this)
        this.isOffNow = this.isOffNow.bind(this)
    }

    componentDidMount() {
        this.timer = setInterval(() => this.updateData(), 1500)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    isOffNow = () => {
        clearInterval(this.timer)
    }

    updateData = () => {
        let temp_array_0 = [...this.state.series[0].data]
        let temp_array_1 = [...this.state.series[1].data]
        let temp_categogy_array = [...this.state.options.xaxis.categories]
        let temp_data_0 = Math.floor(Math.random() * 110) + 1
        let temp_data_1 = Math.floor(Math.random() * 110) + 1
        temp_array_0[this.state.i] = temp_data_0
        temp_array_1[this.state.i] = temp_data_1
        //now update the value of the i for next round
        if (this.state.series[0].data.length >= 9) {
            temp_array_0.shift()
            temp_array_1.shift()
            temp_categogy_array.shift()
            //cheaking if time is correct, if not then correct it by updating the state
            let temp_time = this.state.time
            if (temp_time > 24) {
                temp_time = 0
                this.setState({ time: 1 })
            } else {
                this.setState({ time: this.state.time + 1 })
            }

            temp_categogy_array.push(`${temp_time}`)
            this.setState({
                options: Object.assign({}, this.state.options, {
                    xaxis: { categories: temp_categogy_array },
                }),
            })
        } else {
            this.setState({ i: this.state.i + 1 })
        }

        let newSeries = [
            {
                name: 'Detected',
                data: temp_array_0,
            },
            {
                name: 'Undetected',
                data: temp_array_1,
            },
        ]
        this.setState({ series: newSeries })
    }

    render() {
        const { turnedOn } = this.props
        console.log(turnedOn)
        if (!turnedOn) {
            this.isOffNow()
        }
        return (
            <div id="chart">
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="bar"
                    height={350}
                />
            </div>
        )
    }
}

// const domContainer = document.querySelector('#app')
// ReactDOM.render(React.createElement(ApexChart), domContainer)
