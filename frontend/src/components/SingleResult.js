import React from 'react'
import { connect } from 'react-redux'
import { fetchResult } from '../actions'

class SingleResult extends React.Component {
    componentDidMount() {
        const { season, round } = this.props.match.params
        this.props.fetchResult(season, round)
    }

    render() {
        if (!this.props.results) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h4>{this.props.results.season} {this.props.results.raceName}</h4>
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