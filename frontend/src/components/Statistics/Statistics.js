import React from 'react'
import { connect } from 'react-redux'
import { fetchCurrentResults, fetchQualifyingResults } from '../../actions'
import DriversChampionship from './DriversChampionship'
import ConstructorsChampionship from './ConstructorsChampionship'
import DriverStats from './DriverStats'
import ConstructorStats from './ConstructorStats'

class Statistics extends React.Component {
    componentDidMount() {
        this.props.fetchCurrentResults()
        this.props.fetchQualifyingResults(new Date().getFullYear())
    }

    render() {
        return (
            <div>
                <DriversChampionship />
                <DriverStats />
                <div className="pt-3">
                    <ConstructorsChampionship />
                </div>
                <ConstructorStats />
            </div >
        )
    }
}

export default connect(null, { fetchCurrentResults, fetchQualifyingResults })(Statistics)