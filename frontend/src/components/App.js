import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Championship from './Championship'
import Records from './Records'
import HomePage from './Home/HomePage'
import Drivers from './Drivers/Drivers'
import Results from './Results/Results'

//<Route path="/results/:season/:round" exact component={Results} />

const App = () => {
    return (
        <div>
            <Router>
                <Header />
                <div className="container pt-3">
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/championship" exact component={Championship} />
                        <Route path="/results/:season?/:round?" exact component={Results} />
                        <Route path="/drivers" exact component={Drivers} />
                        <Route path="/records" component={Records} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App