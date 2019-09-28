const fs = require('fs')
const path = require('path')
const express = require('express')
const request = require('request')

const app = express()

app.get('/api/current/driverStandings', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        const url = 'https://ergast.com/api/f1/current/driverStandings.json'
        request({ url, json: true }, (error, response, body) => {
            if (error) {
                console.log("Error fetching: " + error)
            }
            res.send(body.MRData.StandingsTable.StandingsLists)
        })
    } else {
        fs.readFile("./cache/current.driverStandings.json", (err, data) => {
            if (err) {
                console.log("unable to read next")
            }
            res.send(JSON.parse(data))
        })
    }
})

app.get('/api/current/constructorStandings', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        const url = 'https://ergast.com/api/f1/current/constructorStandings.json'
        request({ url, json: true }, (error, response, body) => {
            if (error) {
                console.log("Error fetching: " + error)
            }
            res.send(body.MRData.StandingsTable.StandingsLists)
        })
    } else {
        fs.readFile("./cache/current.constructorStandings.json", (err, data) => {
            if (err) {
                console.log("unable to read next")
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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port)