import React from 'react'
import { connect } from 'react-redux'
import { fetchDrivers } from '../../actions'

class Drivers extends React.Component {
    componentDidMount() {
        this.props.fetchDrivers(new Date().getFullYear())
    }
    renderTable(drivers) {
        return drivers.map(driver => {
            return (
                <tr key={driver.permanentNumber}>
                    <th scope="row">{driver.permanentNumber}</th>
                    <td>{driver.givenName} {driver.familyName}</td>
                    <td>{driver.nationality}</td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div>
                <table className="table table-bordered table-sm">
                    <caption style={{ captionSide: 'top' }}>Current Drivers</caption>
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Driver</th>
                            <th scope="col">Nationality</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable(this.props.drivers)}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    if (!state.drivers.currentDrivers) {
        return {
            drivers: []
        }
    }

    return {
        drivers: state.drivers.currentDrivers
    }
}

export default connect(mapStateToProps, { fetchDrivers })(Drivers)