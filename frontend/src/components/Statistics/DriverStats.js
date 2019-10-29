import React from 'react'
import { connect } from 'react-redux'
import Colors from '../../util/Colors'
import Teams from '../../util/Teams'
import DriverLastname from '../../util/DriverLastname'
import HorizontalBarChart from './HorizontalBarChart'

class DriverStats extends React.Component {
    computeDriverWins() {
        if (!this.props.results) {
            return []
        }

        const results = this.props.results
        let wins = {}

        for (let i = 0; i < results.length; i++) {
            const race = results[i]

            if (race['Results'].length >= 1) {
                const winner = race['Results'][0]['Driver']['driverId']

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

    computeDriverPodiums() {
        if (!this.props.results) {
            return
        }

        const results = this.props.results
        const podiums = {}

        for (let i = 0; i < results.length; i++) {
            const race = results[i]

            const maxVal = race['Results'].length >= 3 ? 3 : race['Results'].length

            for (let j = 0; j < maxVal; j++) {
                const driver = race['Results'][j]['Driver']['driverId']

                if (driver in podiums) {
                    podiums[driver] += 1
                } else {
                    podiums[driver] = 1
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
        if (!this.props.qualifying) {
            return
        }

        const qualifying = this.props.qualifying
        const pp = {}


    }

    computeDriverDNFs() {
        if (!this.props.results) {
            return
        }

        const results = this.props.results
        const dnfs = {}

        for (let i = 0; i < results.length; i++) {
            const race = results[i]

            for (let j = 0; j < race['Results'].length; j++) {
                if (race['Results'][j]['status'] !== "R") {
                    continue
                }

                const driver = race['Results'][j]['Driver']['driverId']

                if (driver in dnfs) {
                    dnfs[driver] += 1
                } else {
                    dnfs[driver] = 1
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

    getColor(driverId) {
        return Colors[Teams[driverId]]
    }

    getTick(driverId) {
        return DriverLastname[driverId]
    }

    render() {
        return (
            <div>
                <div className="card-deck pt-3">
                    <div className="card">
                        <h5 className="card-header">Driver Wins</h5>
                        <div className="card-body">
                            <HorizontalBarChart
                                data={this.computeDriverWins()}
                                getColor={this.getColor}
                                getTick={this.getTick}
                            />
                        </div>
                    </div>
                    <div className="card">
                        <h5 className="card-header">Driver Podiums</h5>
                        <div className="card-body">
                            <HorizontalBarChart
                                data={this.computeDriverPodiums()}
                                getColor={this.getColor}
                                getTick={this.getTick}
                            />
                        </div>
                    </div>
                </div>
                <div className="card-deck pt-3">
                    <div className="card">
                        <h5 className="card-header">Driver Pole Positions</h5>
                        <div className="card-body">
                            <HorizontalBarChart
                                data={this.computeDriverPolePositions()}
                                getColor={this.getColor}
                                getTick={this.getTick}
                            />
                        </div>
                    </div>
                    <div className="card">
                        <h5 className="card-header">Driver DNFs</h5>
                        <div className="card-body">
                            <HorizontalBarChart
                                data={this.computeDriverDNFs()}
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

export default connect(mapStateToProps)(DriverStats)