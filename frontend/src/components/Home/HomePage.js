import React from 'react'
import { connect } from 'react-redux'
import { fetchCurrentResults } from '../../actions'
import LastRace from './LastRace'
import NextRace from './NextRace'
import DriverStandings from './DriverStandings'
import ConstructorStandings from './ConstructorStandings'
import RaceCalendar from './RaceCalendar'

class HomePage extends React.Component {
    componentDidMount() {
        this.props.fetchCurrentResults()
    }

    render() {
        return (
            <div>
                <div className="card-deck">
                    <LastRace />
                    <NextRace />
                </div>
                <div className="card-deck pt-3">
                    <DriverStandings />
                    <ConstructorStandings />
                </div>
                <div className="card-deck pt-3">
                    <RaceCalendar />
                </div>
            </div>
        )
    }
}

export default connect(null, { fetchCurrentResults })(HomePage)