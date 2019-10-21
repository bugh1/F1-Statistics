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
            for (let j = 0; j < race.Results.length; j++) {
                let constructor = race.Results[j].Constructor.constructorId

                if (!(constructor in final)) {
                    final[constructor] = []
                    constructors[constructor] = {
                        key: race.Results[j].Constructor.name,
                        color: Colors[constructor]
                    }
                }

                let obj = {}
                obj.round = parseInt(race.round)
                if (final[constructor].length === 0) {
                    obj.points = parseInt(race.Results[j].points)
                } else {
                    obj.points = final[constructor][final[constructor].length - 1].points + parseInt(race.Results[j].points)
                }

                final[constructor].push(obj)
            }
        }

        return [final, constructors]
    }

    render() {
        const [computed, constructors] = this.computeChampionship(this.props.results.currentResults)
        console.log("computed: %o", computed)
        console.log("constructors: %o, constructors")
        return (
            <div className="card">
                <h5 className="card-header">Driver's Championship</h5>
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