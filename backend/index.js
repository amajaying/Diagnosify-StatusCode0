const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/predict', (req, res) => {
    const pythonScriptPath = '../model/predict.py';
    const indices = req.body.indices;
    const symptoms = 375;
    //convert it to binary array
    const data = [];
    for (let i = 0; i < 375; i++) {
        if (indices.includes(i)) {
            data.push(1);
        } else {
            data.push(0);
        }
    }

    const data2 = [data];

    //pass the data to python script and execute it 
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python', ["../model/predict.py", JSON.stringify(data2)]);
    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString());
        res.json(data.toString());
    });







});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});