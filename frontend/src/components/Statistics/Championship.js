import React from 'react'
import {
    VictoryChart, VictoryLine,
    VictoryVoronoiContainer, VictoryAxis
} from 'victory'

class Championship extends React.Component {
    getLines() {
        const { computed, entities } = this.props
        const styles = this.getChartStyles()

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

    getChartStyles() {
        return {
            parent: {
                fontFamily: "apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
            },
            title: {
                fontFamily: "inherit"
            },
            labels: {
                fontFamily: "inherit",
                fontSize: 8
            },
            tickLabels: {
                fontFamily: "inherit"
            },
            axisLabel: {
                fontFamily: "inherit",
                padding: 40
            }
        }
    }

    render() {
        console.log(this.props)
        const styles = this.getChartStyles()
        return (
            <VictoryChart
                containerComponent={
                    <VictoryVoronoiContainer
                        labels={({ datum }) => {
                            console.log("datum: %o", datum)
                            return `${datum.style.data.entity}: ${datum.points}`
                        }}
                    />
                }
                padding={{ top: 30, bottom: 25, left: 55, right: 10 }}
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
                />
                {this.getLines()}
            </VictoryChart>
        )
    }
}

export default Championship