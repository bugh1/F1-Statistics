import React from 'react'
import { connect } from 'react-redux'
import Flags from '../../util/Flags'

class Result extends React.Component {
    renderResultsTable(results) {
        return results.map(obj => {
            const status = obj.status === "Finished" ? obj.Time.time : obj.status
            return (
                <tr key={obj.position}>
                    <th scope="row">{obj.positionText}</th>
                    <td>{obj.Driver.permanentNumber}</td>
                    <td>{Flags[obj.Driver.nationality]} {obj.Driver.givenName} {obj.Driver.familyName}</td>
                    <td>{Flags[obj.Constructor.nationality]} {obj.Constructor.name}</td>
                    <td>{obj.laps}</td>
                    <td>{status}</td>
                    <td>{obj.points}</td>
                </tr>
            )
        })
    }

    renderQualifyingTable(qualifying) {
        return qualifying.map(obj => {
            return (
                <tr key={obj.position}>
                    <th scope="row">{obj.position}</th>
                    <td>{obj.Driver.permanentNumber}</td>
                    <td>{Flags[obj.Driver.nationality]} {obj.Driver.givenName} {obj.Driver.familyName}</td>
                    <td>{Flags[obj.Constructor.nationality]} {obj.Constructor.name}</td>
                    <td>{obj.Q1}</td>
                    <td>{obj.Q2}</td>
                    <td>{obj.Q3}</td>
                </tr>
            )
        })
    }

    render() {
        if (!this.props.results || !this.props.qualifying) {
            return <div>Select a race above</div>
        }

        return (
            <div>
                <h4>{this.props.results.season} {this.props.results.raceName}</h4>
                <div className="table-responsive">
                    <table className="table  table-hover table-bordered table-sm">
                        <caption style={{ captionSide: 'top' }}>Race Results</caption>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Pos</th>
                                <th scope="col">No</th>
                                <th scope="col">Driver</th>
                                <th scope="col">Constructor</th>
                                <th scope="col">Laps</th>
                                <th scope="col">Time/Status</th>
                                <th scope="col">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderResultsTable(this.props.results.Results)}
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                        <caption style={{ captionSide: 'top' }}>Qualifying Results</caption>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Pos</th>
                                <th scope="col">No</th>
                                <th scope="col">Driver</th>
                                <th scope="col">Constructor</th>
                                <th scope="col">Q1</th>
                                <th scope="col">Q2</th>
                                <th scope="col">Q3</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderQualifyingTable(this.props.qualifying.QualifyingResults)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        results: state.results.singleResult,
        qualifying: state.results.singleQualifyingResult
    }
}

export default connect(mapStateToProps)(Result)