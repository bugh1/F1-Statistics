import React from 'react'
import axios from 'axios'

class NextRace extends React.Component {
    state = {
        circuit: {
            circuitName: ""
        },
        raceName: ""
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
        if (this.state.raceName === "") {
            return (
                <div>Loading...</div>
            )
        }

        const ogTime = new Date(`${this.state.date} ${this.state.time}`).toString()

        return (
            <div className="card">
                <h5 className="card-header">Next Race</h5>
                <div className="card-body">
                    <h5 className="card-title">{this.state.raceName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {this.state.circuit.circuitName}
                    </h6>
                    <table className="table table-bordered table-sm">
                        <caption style={{ captionSide: 'top' }}>Schedule</caption>
                        <tbody>
                            <tr>
                                <th scope="row">Date/Time</th>
                                <td>{ogTime}</td>
                            </tr>
                            <tr>
                                <th scope="row">Location</th>
                                <td>{this.state.circuit.Location.locality}, {this.state.circuit.Location.country}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

/*

*/

export default NextRace