import React from 'react'
import { connect } from 'react-redux'
import {
    VictoryChart, VictoryLine,
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
            return {}
        }

        let final = {}

        for (let i = 0; i < results.length; i++) {
            let race = results[i]
            for (let j = 0; j < race.Results.length; j++) {
                let driver = race.Results[j].Driver.driverId

                if (!(driver in final)) {
                    final[driver] = []
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

        return final
    }

    getLines() {
        const computed = this.computeChampionship(this.props.results.currentResults)
        return Object.keys(computed).map(driver => {
            return (
                <VictoryLine
                    key={driver}
                    data={computed[driver]}
                    x="round"
                    y="points"
                    style={{
                        data: { stroke: Colors[Teams[driver]], driver: driver }
                    }}
                />
            )
        })
    }
    /*
                    style={{ parent: { maxWidth: "50%" } }}
    */

    getChart() {
        return (
            <VictoryChart
                containerComponent={
                    <VictoryVoronoiContainer
                        labels={({ datum }) => {

                            return `${datum.style.data.driver}: ${datum.points}`
                        }}
                    />
                }
            >
                <VictoryAxis
                    tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
                    tickFormat={['🇦🇺', '🇧🇭', '🇨🇳', '🇦🇿', '🇪🇸', '🇲🇨', '🇨🇦', '🇫🇷', '🇦🇹', '🇬🇧', '🇩🇪', '🇭🇺', '🇧🇪', '🇮🇹']}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`${x}`)}
                />
                {this.getLines()}
            </VictoryChart>
        )
    }

    render() {
        return (
            <div className="vh-50">
                {this.getChart()}
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