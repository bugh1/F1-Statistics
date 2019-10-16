const mongoose = require('mongoose')

const constructorSchema = mongoose.Schema({
    constructorId: String,
    name: String,
    nationality: String,
    url: String
})

module.exports = mongoose.model('Constructor', constructorSchema)