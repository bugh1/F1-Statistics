import React from 'react'
import { connect } from 'react-redux';
import HorizontalBarChart from './HorizontalBarChart'

class DriverWins extends React.Component {
    computeDriverWins() {
        if (!this.props.results) {
            return
        }

        const results = this.props.results
        const wins = {}

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

    render() {
        return (
            <div className="card">
                <h5 className="card-header">Driver Wins</h5>
                <div className="card-body">
                    <HorizontalBarChart data={this.computeDriverWins()} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        results: state.results.currentResults
    }
}

export default connect(mapStateToProps)(DriverWins)