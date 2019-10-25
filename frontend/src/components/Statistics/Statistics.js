import React from 'react'
import { connect } from 'react-redux'
import { fetchCurrentResults } from '../../actions'
import DriversChampionship from './DriversChampionship'
import ConstructorsChampionship from './ConstructorsChampionship'
import DriverStats from './DriverStats'

class Statistics extends React.Component {
    componentDidMount() {
        this.props.fetchCurrentResults()
    }

    render() {
        return (
            <div>
                <DriversChampionship />
                <DriverStats />
                <div className="pt-3">
                    <ConstructorsChampionship />
                </div>
            </div >
        )
    }
}

export default connect(null, { fetchCurrentResults })(Statistics)