import React from 'react'
import {
    VictoryChart, VictoryLine, VictoryLabel,
    VictoryVoronoiContainer, VictoryAxis
} from 'victory'
import ChartStyles from '../../util/ChartStyles'

class Championship extends React.Component {
    getLines() {
        const { computed, entities } = this.props
        const styles = ChartStyles

        return Object.keys(computed).map(name => {
            return (
                <VictoryLine
                    key={name}
                    data={computed[name]}
                    x="round"
                    y="points"
                    style={{
                        ...styles,
                        data: { stroke: entities[name]['color'], entity: entities[name]['key'] }
                    }}
                />
            )
        })
    }

    render() {
        const styles = {
            ...ChartStyles,
            ticks: {
                padding: -3
            },
            tickLabels: {
                fontFamily: ChartStyles.tickLabels.fontFamily,
                fontSize: 12
            },
            grid: {
                fill: "none",
                stroke: "#ECEFF1",
                strokeDasharray: "10, 5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            },
        }

        return (
            <VictoryChart
                containerComponent={
                    <VictoryVoronoiContainer
                        labels={({ datum }) => {
                            return `${datum.style.data.entity}: ${datum.points}`
                        }}
                    />
                }
                padding={{ top: 30, bottom: 25, left: 45, right: 10 }}
                height={200}
                style={styles}
            >
                <VictoryAxis
                    style={styles}
                    tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
                    tickFormat={['🇦🇺', '🇧🇭', '🇨🇳', '🇦🇿', '🇪🇸', '🇲🇨', '🇨🇦', '🇫🇷', '🇦🇹', '🇬🇧', '🇩🇪', '🇭🇺', '🇧🇪', '🇮🇹', '🇸🇬', '🇷🇺', '🇯🇵']}
                />
                <VictoryAxis
                    label="Points"
                    dependentAxis
                    tickFormat={(x) => (`${x}`)}
                    style={styles}
                    axisLabelComponent={
                        <VictoryLabel x={35} y={25} angle={0} />
                    }
                />
                {this.getLines()}
            </VictoryChart>
        )
    }
}

export default Championship