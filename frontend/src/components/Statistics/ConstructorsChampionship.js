import React from 'react'
import { connect } from 'react-redux'
import Championship from './Championship'
import Colors from '../../util/Colors'

class ConstructorsChampionship extends React.Component {
    computeChampionship = (results) => {
        if (!results) {
            return [{}, {}]
        }

        let final = {}
        let constructors = {}

        for (let i = 0; i < results.length; i++) {
            let race = results[i]

            let constructorScore = {}

            for (let j = 0; j < race.Results.length; j++) {
                const constructor = race.Results[j].Constructor.constructorId

                if (!(constructor in final)) {
                    final[constructor] = []
                    constructors[constructor] = {
                        key: race.Results[j].Constructor.name,
                        color: Colors[constructor]
                    }
                }

                if (!(constructor in constructorScore)) {
                    constructorScore[constructor] = {
                        round: parseInt(race['round']),
                        points: parseInt(race.Results[j]['points'])
                    }
                } else {
                    constructorScore[constructor]['points'] += parseInt(race.Results[j]['points'])
                }
            }

            for (let c in constructorScore) {
                if (final[c].length !== 0) {
                    constructorScore[c]['points'] += final[c][final[c].length - 1]['points']
                }
                final[c].push(constructorScore[c])
            }
        }

        return [final, constructors]
    }

    render() {
        const [computed, constructors] = this.computeChampionship(this.props.results.currentResults)

        return (
            <div className="card">
                <h5 className="card-header">Constructor's Championship</h5>
                <div className="card-body">
                    <Championship computed={computed} entities={constructors} />
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

export default connect(mapStateToProps)(ConstructorsChampionship)