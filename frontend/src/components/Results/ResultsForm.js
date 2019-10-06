import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

class ResultsForm extends React.Component {
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="form-row">
                        <div className="col">
                            <Field name="season" component="select" className="custom-select">
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                            </Field>
                        </div>
                        <div className="col">
                            <Field name="round" component="select" className="custom-select">
                                <option value="15">Round 15: Singapore Grand Prix</option>
                                <option value="16">Round 16: Russian Grand Prix</option>
                            </Field>
                        </div>
                        <Link to={`/results/${this.props.racesForm.values.season}/${this.props.racesForm.values.round}`} className="btn btn-primary">
                            Go
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}
// <button type="submit" className="btn btn-primary">Go</button>
const mapStateToProps = (state) => {
    return {
        racesForm: state.form.racesForm
    }
}

ResultsForm = connect(mapStateToProps)(ResultsForm)

export default reduxForm({
    form: 'racesForm'
})(ResultsForm)