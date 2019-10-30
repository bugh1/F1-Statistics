const mongoose = require('mongoose')

const circuitSchema = mongoose.Schema({
    circuitId: String,
    url: String,
    circuitName: String,
    Location: {
        lat: Number,
        long: Number,
        locality: String,
        country: String
    }
})

module.exports = mongoose.model('Circuit', circuitSchema)