const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config.js');
const mongoose = require('mongoose');
const Report = require('./models/report')
mongoose.Promise = global.Promise;
const PORT = process.env.PORT || 5000;
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/api/reports', async(req, res) => {
    var reports = await Report.find().limit(5)
    console.log(reports)
    return res.json({
        success: true,
        message: 'reports available are.',
        reports
    })
});

app.post('/api/reports', async(req,res) => {
    console.log(req.body)

    var { animalType, speciesName, area, numberOfAnimals } = req.body
    if(req.body){
        var report = new Report()

        report.animalType = animalType
        report.speciesName = speciesName
        report.area =area 
        report.numberOfAnimals = numberOfAnimals
        
        try{
    
            await report.save()
        }catch(err){
            console.log(err.message);
            return res.json({
                success: false,
                message: 'report not saved ',
            })
        }
        return res.json({
            success: true,
            message: 'Report Sucessfully saved ',
        })
    }
    return res.json({
        success: false,
        message: 'report not saved ',
    })
});

// listen for requests
app.listen(PORT, () => {
    console.log("Server is listening on port "+PORT);
});