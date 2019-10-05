import React from 'react'
import axios from 'axios'

class RaceCalendar extends React.Component {
    state = {
        season: "",
        races: []
    }

    componentDidMount() {
        axios.get('/api/current')
            .then((response) => {
                this.setState({
                    season: response.data.season,
                    races: response.data.Races
                })
            })
    }

    renderTable = (races) => {
        return races.map(obj => {
            return (
                <tr key={obj.round}>
                    <th scope="row">{obj.round}</th>
                    <td>{obj.raceName}</td>
                    <td>{obj.date}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="card">
                <h5 className="card-header">{this.state.season} Race Calendar</h5>
                <div className="card-body">
                    <table className="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Round</th>
                                <th scope="col">Race</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTable(this.state.races)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default RaceCalendar