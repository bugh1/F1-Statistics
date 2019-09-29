import React from 'react'
import { connect } from 'react-redux'
import {
    VictoryChart, VictoryLine, VictoryLabel,
    VictoryVoronoiContainer, VictoryAxis
} from 'victory'
import { fetchCurrentResults } from '../actions'
import Colors from './Colors'
import Teams from './Teams'

class Championship extends React.Component {
    componentDidMount() {
        this.props.fetchCurrentResults()
    }

    computeChampionship = (results) => {
        if (!results) {
            return [{}, {}]
        }

        let final = {}
        let drivers = {}

        for (let i = 0; i < results.length; i++) {
            let race = results[i]
            for (let j = 0; j < race.Results.length; j++) {
                let driver = race.Results[j].Driver.driverId

                if (!(driver in final)) {
                    final[driver] = []
                    drivers[driver] = {
                        code: race.Results[j].Driver.code
                    }
                }

                let obj = {}
                obj.round = parseInt(race.round)
                if (final[driver].length === 0) {
                    obj.points = parseInt(race.Results[j].points)
                } else {
                    obj.points = final[driver][final[driver].length - 1].points + parseInt(race.Results[j].points)
                }

                final[driver].push(obj)
            }
        }

        return [final, drivers]
    }

    getLines() {
        const [computed, drivers] = this.computeChampionship(this.props.results.currentResults)
        const styles = this.getChartStyles()
        return Object.keys(computed).map(driver => {
            return (
                <VictoryLine
                    key={driver}
                    data={computed[driver]}
                    x="round"
                    y="points"
                    style={{
                        ...styles,
                        data: { stroke: Colors[Teams[driver]], driver: drivers[driver]['code'] }
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
                padding: 37
            }
        }
    }

    getChart() {
        const styles = this.getChartStyles()
        return (
            <VictoryChart
                containerComponent={
                    <VictoryVoronoiContainer
                        labels={({ datum }) => {
                            return `${datum.style.data.driver}: ${datum.points}`
                        }}
                    />
                }
                style={styles}
            >
                <VictoryLabel
                    text="Driver's Championship"
                    x={225}
                    y={30}
                    textAnchor="middle"
                    style={styles.title}
                />
                <VictoryAxis

                    style={styles}
                    tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                    tickFormat={['🇦🇺', '🇧🇭', '🇨🇳', '🇦🇿', '🇪🇸', '🇲🇨', '🇨🇦', '🇫🇷', '🇦🇹', '🇬🇧', '🇩🇪', '🇭🇺', '🇧🇪', '🇮🇹', '🇸🇬']}
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

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div>
                            {this.getChart()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        results: state.results
    }
}

export default connect(mapStateToProps, { fetchCurrentResults })(Championship)