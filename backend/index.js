const express = require('express');
const { python } = require('python-shell');
const fs = require('fs');

const app = express();

app.post('/predict', async(req, res) => {


    data = req.body.systemIndices;
    const symptomNo = 375;
    //1 if present in data, 0 if not present
    for (var i = 0; i < symptomNo; i++) {
        if (data[i] == undefined) {
            data[i] = 0;
        } else {
            data[i] = 1;
        }
    }
    //write data to file
    fs.writeFile('../model/input.json', JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('Saved!');
    });

    //execute python script expect no result
    python.run('../model/model.py', null, function(err) {
        if (err) throw err;
        console.log('finished');
    });

    //read result from file
    var result = fs.readFileSync('../model/output.json', 'utf8');


    //send result to frontend
    res.send(result.toString());





});


app.listen(3000, () => console.log('Server running on port 3000'));