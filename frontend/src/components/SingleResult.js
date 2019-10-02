import React from 'react'
import { connect } from 'react-redux'
import { fetchResult } from '../actions'
import Flags from './Flags'

class SingleResult extends React.Component {
    componentDidMount() {
        const { season, round } = this.props.match.params
        this.props.fetchResult(season, round)
    }

    renderResultsTable(results) {
        return results.map(obj => {
            const status = obj.status === "Finished" ? obj.Time.time : obj.status
            return (
                <tr key={obj.position}>
                    <th scope="row">{obj.positionText}</th>
                    <td>{obj.Driver.permanentNumber}</td>
                    <td>{Flags[obj.Driver.nationality]} {obj.Driver.givenName} {obj.Driver.familyName}</td>
                    <td>{obj.Constructor.name}</td>
                    <td>{obj.laps}</td>
                    <td>{status}</td>
                    <td>{obj.points}</td>
                </tr>
            )
        })
    }

    render() {
        if (!this.props.results) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h4>{this.props.results.season} {this.props.results.raceName}</h4>
                <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                        <caption style={{ captionSide: 'top' }}>Race Results</caption>
                        <thead>
                            <tr>
                                <th scope="col">Pos</th>
                                <th scope="col">No</th>
                                <th scope="col">Driver</th>
                                <th scope="col">Constructor</th>
                                <th scope="col">Laps</th>
                                <th scope="col">Time</th>
                                <th scope="col">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderResultsTable(this.props.results.Results)}
                        </tbody>
                    </table>
                </div>

            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        season: ownProps.match.params.season,
        round: ownProps.match.params.round,
        results: state.results.singleResult
    }
}

export default connect(mapStateToProps, { fetchResult })(SingleResult)