"use strict"
const fs = require('fs')
const { Client } = require('pg')
const { postgresURL } = require('../config/keys')
const dbStrings = require('./dbStrings')

const argv = require('yargs')
    .option('create', {
        describe: 'dbstring to use',
        type: 'string'
    })
    .option('insert', {
        describe: 'table to insert',
        type: 'string'
    })
    .argv

async function createTable(client, name) {
    try {
        console.log(dbStrings[name])
        const res = await client.query(dbStrings[name])
        console.log(res.command)
    } catch (err) {
        console.log("Caught error: " + err)
    }
}

async function dropTable(client, name) {
    try {
        console.log(dbStrings[name])
        const res = await client.query(dbStrings[name])
        console.log(res.command)
    } catch (err) {
        console.log("Caught error: " + err)
    }
}

async function insertInto(client, name) {
    if (name === "insertRaces") {
        const { Races } = JSON.parse(fs.readFileSync("../cache/current.json"))

        for (let i = 1; i < 2; i++) {
            const race = Races[i]

            const values = [
                race.season, race.round, race.Circuit.circuitId,
                race.raceName, race.date, race.time, race.url
            ]

            try {
                console.log(dbStrings[name])
                const res = await client.query(dbStrings[name], values)
                console.log(res.command)
            } catch (err) {
                console.log("Caught error: " + err)
            }
        }
    } else if (name === "insertCircuits") {
        const { Races } = JSON.parse(fs.readFileSync("../cache/current.json"))

        for (let i = 1; i < 2; i++) {
            const c = Races[i]['Circuit']
            const l = c['Location']

            const values = [
                c.circuitId, c.circuitName, l.locality, l.country,
                l.lat, l.long, c.url
            ]

            console.log(values)

            try {
                console.log(dbStrings[name])
                const res = await client.query(dbStrings[name], values)
                console.log(res.command)
            } catch (err) {
                console.log("Caught error: " + err)
            }
        }
    }
}

async function selectTable(client, name) {
    try {
        console.log(dbStrings[name])
        const res = await client.query(dbStrings[name])
        console.log(res.rows)
    } catch (err) {
        console.log("Caught error: " + err)
        console.log(err)
    }
}

async function main() {
    console.log(argv)

    const client = new Client({
        connectionString: postgresURL,
        ssl: true
    })

    await client.connect()

    try {
        if (argv.create) {
            await createTable(client, argv.create)
        } else if (argv.insert) {
            await insertInto(client, argv.insert)
        } else if (argv.drop) {
            await dropTable(client, argv.drop)
        } else if (argv.select) {
            await selectTable(client, argv.select)
        }
    } catch (err) {
        console.log("Main error: " + err)
    }


    await client.end()
}

main()