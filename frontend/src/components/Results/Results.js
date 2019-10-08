import React from 'react'
import ResultsForm from './ResultsForm'
import { connect } from 'react-redux'
import { fetchResult } from '../../actions'
import Result from './Result'

class Results extends React.Component {
    state = {
        season: "",
        round: ""
    }

    componentDidMount() {
        if (this.props.match.params.season && this.props.match.params.round) {
            this.props.fetchResult(this.props.match.params.season, this.props.match.params.round)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.season !== prevProps.match.params.$season
            && this.props.match.params.round !== prevProps.match.params.round) {
            this.props.fetchResult(this.props.match.params.season, this.props.match.params.round)
        }
    }

    onSubmit = ({ season, round }) => {
        this.props.history.push(`/results/${season}/${round}`)
    }

    render() {
        return (
            <div>
                <ResultsForm
                    initialValues={{
                        season: "2019"
                    }}
                    onSubmit={this.onSubmit}
                />
                <div className="pt-3">
                    <Result />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        season: state.results.season,
        round: state.results.round
    }
}

export default connect(mapStateToProps, { fetchResult })(Results)