import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Championship from './Championship'
import Records from './Records'
import HomePage from './Home/HomePage'
import Drivers from './Drivers/Drivers'
import SingleResult from './SingleResult'

const App = () => {
    return (
        <div>
            <Router>
                <Header />
                <div className="container pt-3">
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/championship" exact component={Championship} />
                        <Route path="/drivers" exact component={Drivers} />
                        <Route path="/records" component={Records} />
                        <Route path="/results/:season/:round" component={SingleResult} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App