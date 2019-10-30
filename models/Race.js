const mongoose = require('mongoose')

const raceSchema = mongoose.Schema({
    season: Number,
    round: Number,
    url: String,
    raceName: String,
    date: String,
    time: String,
    circuitId: String
}, {
    toObject: { virtuals: true }
})

//raceSchema.set('toObject', { virtuals: true })
//raceSchema.set('toJSON', { virtuals: true })

raceSchema.virtual('Circuit', {
    ref: 'Circuit',
    localField: 'circuitId',
    foreignField: 'circuitId',
    justOne: true
})


module.exports = mongoose.model('Race', raceSchema)