import React from 'react'
import {
    VictoryChart, VictoryBar, VictoryAxis
} from 'victory'
import ChartStyles from '../../util/ChartStyles'
import Colors from '../../util/Colors'
import Teams from '../../util/Teams'

class HorizontalBarChart extends React.Component {
    render() {
        return (
            <VictoryChart
                padding={{ top: 30, bottom: 25, left: 105, right: 30 }}
                domainPadding={8}
                style={ChartStyles}
            >
                <VictoryAxis
                    style={ChartStyles}
                />
                <VictoryAxis
                    style={ChartStyles}
                    dependentAxis
                />
                <VictoryBar
                    horizontal
                    style={{
                        ...ChartStyles,
                        data: {
                            fill: ({ datum }) => Colors[Teams[datum['x']]]
                        }
                    }}
                    data={this.props.data}
                    labels={({ datum }) => datum['y']}
                />
            </VictoryChart>
        )
    }
}

export default HorizontalBarChart