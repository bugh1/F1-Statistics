const fs = require('fs')
const path = require('path')
const express = require('express')
const request = require('request')
const mongoose = require('mongoose')
const keys = require('./config/keys')

mongoose.connect(keys.mongoURL, { useNewUrlParser: true })

const app = express()

app.get('/api/current', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        const url = 'https://ergast.com/api/f1/current.json'
        request({ url, json: true }, (error, response, body) => {
            if (error) {
                console.log("Error fetching: " + error)
            }
            res.send(body.MRData.RaceTable)
        })
    } else {
        fs.readFile("./cache/current.json", (err, data) => {
            if (err) {
                console.log("unable to read race calendar")
            }
            res.send(JSON.parse(data))
        })
    }
})

app.get('/api/current/results', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        const url = 'https://ergast.com/api/f1/current/results.json?limit=1000'
        request({ url, json: true }, (error, response, body) => {
            if (error) {
                console.log("Error fetching: " + error)
            }
            res.send(body.MRData.RaceTable)
        })
    } else {
        fs.readFile("./cache/current.results.json", (err, data) => {
            if (err) {
                console.log("unable to read next")
            }
            res.send(JSON.parse(data))
        })
    }
})

app.get('/api/qualifying/:season', (req, res) => {
    if (process.env.NODE_ENV !== 'production' && req.params.season === '2019') {
        fs.readFile("./cache/current.qualifying.json", (err, data) => {
            if (err) {
                console.log("Unable to read current qualifying results")
            }
            res.send(JSON.parse(data))
        })
    } else {
        const url = 'https://ergast.com/api/f1/current/qualifying.json?limit=1000'
        request({ url, json: true }, (error, response, body) => {
            if (error) {
                console.log("Error fetching: " + error)
            }
            res.send(body.MRData.RaceTable.Races)
        })
    }
})

app.get('/api/results/:season/:round', (req, res) => {
    const url = `https://ergast.com/api/f1/${req.params.season}/${req.params.round}/results.json`
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            console.log("Error fetching: " + error)
        }
        res.send(body.MRData.RaceTable.Races[0])
    })
})

app.get('/api/qualifying/:season/:round', (req, res) => {
    const url = `https://ergast.com/api/f1/${req.params.season}/${req.params.round}/qualifying.json`
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            console.log("Error fetching: " + error)
        }
        res.send(body.MRData.RaceTable.Races[0])
    })
})

app.get('/api/calendar/:season', (req, res) => {
    const url = `https://ergast.com/api/f1/${req.params.season}.json`
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            console.log("Error fetching: " + error)
        }
        res.send(body.MRData.RaceTable)
    })
})

app.get('/api/current/last/results', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        const url = 'https://ergast.com/api/f1/current/last/results.json'
        request({ url, json: true }, (error, response, body) => {
            if (error) {
                console.log("Error fetching: " + error)
            }
            res.send(body.MRData.RaceTable.Races[0])
        })
    } else {
        fs.readFile("./cache/current.last.results.json", (err, data) => {
            if (err) {
                console.log("unable to read next")
            }
            res.send(JSON.parse(data))
        })
    }
})

app.get('/api/current/next', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        const url = 'https://ergast.com/api/f1/current/next.json'
        request({ url, json: true }, (error, response, body) => {
            if (error) {
                console.log("Error fetching: " + error)
            }
            res.send(body.MRData.RaceTable.Races[0])
        })
    } else {
        fs.readFile("./cache/current.next.json", (err, data) => {
            if (err) {
                console.log("unable to read next")
            }
            res.send(JSON.parse(data))
        })
    }
})

app.get('/api/drivers/:season', (req, res) => {
    const url = `https://ergast.com/api/f1/${req.params.season}/drivers.json`
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            console.log("Error fetching: " + error)
        }
        res.send(body.MRData.DriverTable)
    })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port)