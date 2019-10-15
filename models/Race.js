const mongoose = require('mongoose')

const raceSchema = mongoose.Schema({
    season: Number,
    round: Number,
    raceName: String
})

module.exports = mongoose.model('Race', raceSchema)