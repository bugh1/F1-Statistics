const mongoose = require('mongoose')

const driverSchema = mongoose.Schema({
    driverId: String,
    permanentNumber: String,
    code: String,
    givenName: String,
    familyName: String,
    dateOfBirth: Date,
    nationality: String,
    url: String
})