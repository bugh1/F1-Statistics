import React from 'react'
import { connect } from 'react-redux'

class DriverStandings extends React.Component {
    renderTable = (results) => {
        let standings = {}
        let drivers = {}

        for (let i = 0; i < results.length; i++) {
            let race = results[i]
            for (let j = 0; j < race.Results.length; j++) {
                let driver = race.Results[j].Driver.driverId

                if (!(driver in drivers)) {
                    drivers[driver] = {
                        constructor: race.Results[j].Constructor.name,
                        familyName: race.Results[j].Driver.familyName,
                        givenName: race.Results[j].Driver.givenName,
                        nationality: race.Results[j].Driver.nationality
                    }
                }

                if (!(driver in standings)) {
                    standings[driver] = parseInt(race.Results[j].points)
                } else {
                    standings[driver] += parseInt(race.Results[j].points)
                }
            }
        }

        let sortable = []
        for (const s in standings) {
            sortable.push([s, standings[s]])
        }
        sortable.sort((a, b) => b[1] - a[1])

        let position = 0
        return sortable.map(obj => {
            let driver = drivers[obj[0]]
            position += 1
            return (
                <tr key={position}>
                    <th scope="row">{position}</th>
                    <td>{`${driver.givenName} ${driver.familyName}`}</td>
                    <td>{driver.constructor}</td>
                    <td>{obj[1]}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="card">
                <h5 className="card-header">{`${this.props.season} Driver Standings`}</h5>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered table-sm">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Driver</th>
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

export default connect(mapStateToProps)(DriverStandings)