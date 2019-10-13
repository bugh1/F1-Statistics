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

        const utcTime = this.state.time
        const timeRe = /(\d+):(\d+):(\d+)Z/
        const timeMatch = timeRe.exec(utcTime)

        const utcDate = this.state.date
        const dateRe = /(\d+)-(\d+)-(\d+)/
        const dateMatch = dateRe.exec(utcDate)

        const localTime = new Date(`${dateMatch[2]}/${dateMatch[3]}/${dateMatch[1]} ${timeMatch[1]}:${timeMatch[2]}:${timeMatch[3]} UTC`).toString()
        return (
            <div className="card">
                <h5 className="card-header">Next Race</h5>
                <div className="card-body">
                    <h5 className="card-title">{this.state.raceName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {this.state.circuit.circuitName}
                    </h6>
                    <p className="card-text mt-auto">Date: {this.state.date}</p>
                    <p className="card-text">Time: {this.state.time}</p>
                    <p className="card-text">LocalTime: {localTime}</p>
                </div>
            </div>
        )
    }
}

export default NextRace