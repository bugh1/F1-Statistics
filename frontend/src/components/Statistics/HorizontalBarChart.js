import React from 'react'
import {
    VictoryChart, VictoryBar, VictoryAxis
} from 'victory'
import ChartStyles from '../../util/ChartStyles'

class HorizontalBarChart extends React.Component {
    render() {
        return (
            <VictoryChart
                padding={{ top: 10, bottom: 25, left: 100, right: 30 }}
                domainPadding={20}
                style={ChartStyles}
            >
                <VictoryBar
                    horizontal
                    style={{
                        ...ChartStyles,
                        data: {
                            fill: ({ datum }) => this.props.getColor(datum['x'])
                        }
                    }}
                    data={this.props.data}
                    labels={({ datum }) => datum['y']}
                />
                <VictoryAxis
                    style={ChartStyles}
                    tickFormat={(t) => this.props.getTick(t)}
                />
                <VictoryAxis
                    style={ChartStyles}
                    dependentAxis
                />
            </VictoryChart>
        )
    }
}

export default HorizontalBarChart