import React from 'react'
import { connect } from 'react-redux';
import HorizontalBarChart from './HorizontalBarChart'

class DriverPodiums extends React.Component {
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

    render() {
        return (
            <div className="card">
                <h5 className="card-header">Driver Podiums</h5>
                <div className="card-body">
                    <HorizontalBarChart data={this.computeDriverPodiums()} />
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

export default connect(mapStateToProps)(DriverPodiums)