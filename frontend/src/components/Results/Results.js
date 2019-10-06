import React from 'react'
import ResultsForm from './ResultsForm'
import { connect } from 'react-redux'
import { fetchResult } from '../../actions'
import Result from './Result'

class Results extends React.Component {
    componentDidMount() {
        this.props.fetchResult(this.props.match.params.season, this.props.match.params.round)
    }

    onSubmit = ({ season, round }) => {
        this.props.fetchResult(season, round)
    }

    render() {
        return (
            <div>
                <ResultsForm
                    initialValues={{
                        season: "2019",
                        round: "16"
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