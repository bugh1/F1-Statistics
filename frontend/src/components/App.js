import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Statistics from './Statistics/Statistics'
import HomePage from './Home/HomePage'
import Drivers from './Drivers/Drivers'
import Results from './Results/Results'
import './App.css'

const App = () => {
    return (
        <div>
            <Router>
                <Header />
                <div className="container pt-3">
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/statistics" exact component={Statistics} />
                        <Route path="/results/:season?/:round?" exact component={Results} />
                        <Route path="/drivers" exact component={Drivers} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App