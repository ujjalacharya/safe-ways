const { Schema, model } = require('mongoose')

const ReportSchema = new Schema({
    animalType: String,
    speciesName: String,
    area: String,
    numberOfAnimals: Number,
    createdAt: { type: Date, default: new Date() },
});

var Report = model('Report', ReportSchema)
module.exports = Report