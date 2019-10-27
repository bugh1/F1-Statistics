import React from 'react'
import { connect } from 'react-redux'
import Colors from '../../util/Colors'
import Constructors from '../../util/Constructors'
import HorizontalBarChart from './HorizontalBarChart'

class ConstructorStats extends React.Component {
    computeConstructorWins() {
        if (!this.props.results) {
            return []
        }

        const results = this.props.results
        let wins = {}

        for (let i = 0; i < results.length; i++) {
            const race = results[i]

            if (race['Results'].length >= 1) {
                const winner = race['Results'][0]['Constructor']['constructorId']

                if (winner in wins) {
                    wins[winner] += 1
                } else {
                    wins[winner] = 1
                }
            }
        }

        let sortable = []
        for (const key in wins) {
            sortable.push({
                x: key,
                y: wins[key]
            })
        }
        sortable.sort((a, b) => a['y'] - b['y'])
        return sortable
    }

    computeConstructorPodiums() {
        if (!this.props.results) {
            return
        }

        const results = this.props.results
        const podiums = {}

        for (let i = 0; i < results.length; i++) {
            const race = results[i]

            const maxVal = race['Results'].length >= 3 ? 3 : race['Results'].length

            for (let j = 0; j < maxVal; j++) {
                const constructor = race['Results'][j]['Constructor']['constructorId']

                if (constructor in podiums) {
                    podiums[constructor] += 1
                } else {
                    podiums[constructor] = 1
                }
            }
        }

        let sortable = []
        for (const key in podiums) {
            sortable.push({
                x: key,
                y: podiums[key]
            })
        }
        sortable.sort((a, b) => a['y'] - b['y'])
        return sortable
    }

    computeDriverPolePositions() {
        const qualifying = this.props.qualifying
        console.log(qualifying)
    }

    getColor(constructorId) {
        return Colors[constructorId]
    }

    getTick(constructorId) {
        return Constructors[constructorId]
    }

    render() {


        return (
            <div className="card-deck pt-3">
                <div className="card">
                    <h5 className="card-header">Constructor Wins</h5>
                    <div className="card-body">
                        <HorizontalBarChart
                            data={this.computeConstructorWins()}
                            getColor={this.getColor}
                            getTick={this.getTick}
                        />
                    </div>
                </div>
                <div className="card">
                    <h5 className="card-header">Constructor Podiums</h5>
                    <div className="card-body">
                        <HorizontalBarChart
                            data={this.computeConstructorPodiums()}
                            getColor={this.getColor}
                            getTick={this.getTick}
                        />
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        results: state.results.currentResults,
        qualifying: state.results.qualifyingResults
    }
}

export default connect(mapStateToProps)(ConstructorStats)