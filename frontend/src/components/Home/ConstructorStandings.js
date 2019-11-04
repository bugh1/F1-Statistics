import React from 'react'
import { connect } from 'react-redux'

class ConstructorStandings extends React.Component {
    renderTable(results) {
        let standings = {}

        for (let i = 0; i < results.length; i++) {
            let race = results[i]
            for (let j = 0; j < race.Results.length; j++) {
                let constructor = race.Results[j].Constructor.name

                if (!(constructor in standings)) {
                    standings[constructor] = parseInt(race.Results[j].points)
                } else {
                    standings[constructor] += parseInt(race.Results[j].points)
                }
            }
        }

        let sortable = []
        for (const s in standings) {
            sortable.push([s, standings[s]])
        }
        sortable.sort((a, b) => b[1] - a[1])

        let position = 0
        return sortable.map(elem => {
            position += 1
            return (
                <tr key={position}>
                    <th scope="row">{position}</th>
                    <td>{elem[0]}</td>
                    <td>{elem[1]}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="card">
                <h5 className="card-header">{`${this.props.season} Constructor Standings`}</h5>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered table-sm">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Constructor</th>
                                    <th scope="col">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTable(this.props.results)}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    if (!state.results.currentResults) {
        return {
            results: []
        }
    }

    return {
        season: state.results.currentSeason,
        results: state.results.currentResults
    }
}

export default connect(mapStateToProps)(ConstructorStandings)