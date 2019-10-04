import React from 'react'
import ResultsForm from './ResultsForm'

class Results extends React.Component {
    onSubmit = (formValues) => {
        console.log(formValues)
    }
    render() {
        return (
            <div>
                <ResultsForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}

export default Results