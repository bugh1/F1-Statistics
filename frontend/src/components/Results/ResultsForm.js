import React from 'react'
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
                            <Field name="year" component="select" className="custom-select">
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
                        <button type="submit" className="btn btn-primary">Go</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'racesForm'
})(ResultsForm)