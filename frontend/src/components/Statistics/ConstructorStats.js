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

    computeConstructorPolePositions() {
        if (!this.props.qualifying) {
            return
        }

        const qualifying = this.props.qualifying
        const pp = {}

        for (let i = 0; i < qualifying.length; i++) {
            const race = qualifying[i]

            if (race['QualifyingResults'].length >= 1) {
                const constructor = race['QualifyingResults'][0]['Constructor']['constructorId']

                if (constructor in pp) {
                    pp[constructor] += 1
                } else {
                    pp[constructor] = 1
                }
            }
        }

        let sortable = []
        for (const key in pp) {
            sortable.push({
                x: key,
                y: pp[key]
            })
        }
        sortable.sort((a, b) => a['y'] - b['y'])
        return sortable
    }

    computeConstructorDNFs() {
        if (!this.props.results) {
            return
        }

        const results = this.props.results
        const dnfs = {}

        for (let i = 0; i < results.length; i++) {
            const race = results[i]

            for (let j = 0; j < race['Results'].length; j++) {
                if (race['Results'][j]['positionText'] !== "R") {
                    continue
                }

                const constructor = race['Results'][j]['Constructor']['constructorId']

                if (constructor in dnfs) {
                    dnfs[constructor] += 1
                } else {
                    dnfs[constructor] = 1
                }
            }
        }

        let sortable = []
        for (const key in dnfs) {
            sortable.push({
                x: key,
                y: dnfs[key]
            })
        }
        sortable.sort((a, b) => a['y'] - b['y'])
        return sortable
    }

    getColor(constructorId) {
        return Colors[constructorId]
    }

    getTick(constructorId) {
        return Constructors[constructorId]
    }

    render() {
        return (
            <div>
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
                <div className="card-deck pt-3">
                    <div className="card">
                        <h5 className="card-header">Constructor Pole Positions</h5>
                        <div className="card-body">
                            <HorizontalBarChart
                                data={this.computeConstructorPolePositions()}
                                getColor={this.getColor}
                                getTick={this.getTick}
                            />
                        </div>
                    </div>
                    <div className="card">
                        <h5 className="card-header">Constructor DNFs</h5>
                        <div className="card-body">
                            <HorizontalBarChart
                                data={this.computeConstructorDNFs()}
                                getColor={this.getColor}
                                getTick={this.getTick}
                            />
                        </div>
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