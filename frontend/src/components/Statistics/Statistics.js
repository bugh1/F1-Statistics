import React from 'react'
import { connect } from 'react-redux'
import { fetchCurrentResults } from '../../actions'
import DriversChampionship from './DriversChampionship'
import ConstructorsChampionship from './ConstructorsChampionship'

class Statistics extends React.Component {
    componentDidMount() {
        this.props.fetchCurrentResults()
    }

    render() {
        return (
            <div>
                <div className="card-deck">
                    <DriversChampionship />
                    <ConstructorsChampionship />
                </div>
            </div>
        )
    }
}

export default connect(null, { fetchCurrentResults })(Statistics)