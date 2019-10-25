import React from 'react'
import { connect } from 'react-redux'
import HorizontalBarChart from './HorizontalBarChart'
import Colors from '../../util/Colors'

class ConstructorWins extends React.Component {
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
        sortable.sort((a, b) => a['y'] = b['y'])
        return sortable
    }

    getColor(constructorId) {
        return Colors[constructorId]
    }

    render() {
        <div className="card">
            <h5 className="card-header">ConstructorWins</h5>
            <div className="card-body">
                <HorizontalBarChart data={this.computeConstructorWins()} getColor={this.getColor} />
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        results: state.results.currentResults
    }
}

export default (mapStateToProps)(ConstructorWins)