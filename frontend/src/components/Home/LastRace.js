import React from 'react'
import { connect } from 'react-redux'

class LastRace extends React.Component {
    renderResults() {
        return this.props.results.map(obj => {
            return (
                <tr key={obj.position}>
                    <th scope="row">{obj.position}</th>
                    <th>{`${obj.Driver.givenName} ${obj.Driver.familyName}`}</th>
                    <th>{obj.Time.time}</th>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="card">
                <h5 className="card-header">Last Race</h5>
                <div className="card-body">
                    <h5 className="card-title">{this.props.raceName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {this.props.circuitName}
                    </h6>
                    <table className="table table-bordered table-sm">
                        <caption style={{ captionSide: 'top' }}>Results</caption>
                        <tbody>
                            {this.renderResults()}
                        </tbody>
                    </table>
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

    const lastResult = state.results.currentResults[state.results.currentResults.length - 1]
    return {
        raceName: lastResult.raceName,
        circuitName: lastResult.Circuit.circuitName,
        results: lastResult.Results.slice(0, 3)
    }
}

export default connect(mapStateToProps)(LastRace)