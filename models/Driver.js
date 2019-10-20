const mongoose = require('mongoose')

const driverSchema = mongoose.Schema({
    driverId: String,
    permanentNumber: Number,
    code: String,
    givenName: String,
    familyName: String,
    dateOfBirth: String,
    nationality: String,
    url: String
})

module.exports = mongoose.model('Driver', driverSchema)