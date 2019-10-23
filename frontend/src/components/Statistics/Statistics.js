import React from 'react'
import { connect } from 'react-redux'
import { fetchCurrentResults } from '../../actions'
import DriversChampionship from './DriversChampionship'
import ConstructorsChampionship from './ConstructorsChampionship'
import DriverWins from './DriverWins'
import DriverPodiums from './DriverPodiums'

class Statistics extends React.Component {
    componentDidMount() {
        this.props.fetchCurrentResults()
    }

    render() {
        return (
            <div>
                <div className="card-deck">
                    <DriversChampionship />
                </div>
                <div className="card-deck pt-3">
                    <DriverWins />
                    <DriverPodiums />
                </div>
                <div className="card-deck pt-3">
                    <ConstructorsChampionship />
                </div>
            </div >
        )
    }
}

export default connect(null, { fetchCurrentResults })(Statistics)