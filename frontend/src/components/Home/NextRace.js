import React from 'react'
import axios from 'axios'

class NextRace extends React.Component {
    state = {
        circuit: {
            circuitName: ""
        }
    }

    componentDidMount() {
        axios.get('/api/current/next')
            .then((response) => {
                this.setState({
                    raceName: response.data.raceName,
                    circuit: response.data.Circuit,
                    date: response.data.date,
                    time: response.data.time
                })
            })
    }

    render() {
        return (
            <div className="card">
                <h5 className="card-header">Next Race</h5>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{this.state.raceName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {this.state.circuit.circuitName}
                    </h6>
                    <p className="card-text mt-auto">Date: {this.state.date}</p>
                    <p className="card-text">Time: {this.state.time}</p>
                </div>
            </div>
        )
    }
}

export default NextRace