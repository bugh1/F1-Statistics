import React from 'react'
import { Field, reduxForm } from 'redux-form'

class Results extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <div className="form-row">
                        <div className="col">
                            <select className="custom-select">
                                <option selected value="2019">2019</option>
                                <option value="2018">2018</option>
                            </select>
                        </div>
                        <div className="col">
                            <select className="custom-select">
                                <option selected value="15">Round 15: Singapore Grand Prix</option>
                                <option selected value="16">Round 16: Russian Grand Prix</option>
                            </select>
                        </div>
                        <button className="btn btn-primary">Go</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'racesForm'
})(Results)