import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import axios from 'axios'

class ResultsForm extends React.Component {
    state = {
        races: []
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues)
    }

    getSeasons = () => {
        const currentYear = new Date().getFullYear()
        let seasons = []
        for (let i = currentYear; i > currentYear - 10; i--) {
            seasons.push(i)
        }

        return seasons.map(season => {
            return (
                <option key={season} value={season}>{season}</option>
            )
        })
    }

    getRounds = (season) => {
        return this.state.races.map(race => {
            return (
                <option key={`${season}${race.round}`} value={race.round}>{race.raceName}</option>
            )
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="form-row">
                        <div className="col">
                            <Field
                                name="season"
                                component="select"
                                onChange={(event, newValue, previousValue, name) => {
                                    axios.get(`/api/calendar/${newValue}`)
                                        .then((response) => {
                                            this.setState({
                                                races: response.data.Races
                                            })
                                        })
                                }}
                                className="custom-select"
                            >
                                {this.getSeasons()}
                            </Field>
                        </div>
                        <div className="col">
                            <Field name="round" component="select" className="custom-select">
                                {this.getRounds(this.props.racesForm.values.season)}
                            </Field>
                        </div>
                        <button type="submit" className="btn btn-primary">Go</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        racesForm: state.form.racesForm
    }
}

ResultsForm = connect(mapStateToProps)(ResultsForm)

export default reduxForm({
    form: 'racesForm'
})(ResultsForm)