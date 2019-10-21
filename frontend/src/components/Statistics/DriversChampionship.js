import React from 'react'
import { connect } from 'react-redux'
import Championship from './Championship'
import Colors from '../../util/Colors'

class DriversChampionship extends React.Component {
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
                        key: race.Results[j].Driver.code,
                        color: Colors[race.Results[j].Constructor.constructorId]
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

    render() {
        const [computed, drivers] = this.computeChampionship(this.props.results.currentResults)
        return (
            <div className="card">
                <h5 className="card-header">Driver's Championship</h5>
                <div className="card-body">
                    <Championship computed={computed} entities={drivers} />
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

export default connect(mapStateToProps)(DriversChampionship)