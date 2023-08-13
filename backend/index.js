const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(express.json());

<<<<<<< HEAD
app.post("/predict", async(req, res) => {
    try {
        const symptomIndices = req.body.symptomIndices;
        const totalSymptoms = 375;
        const inputDat = Array.from({ length: totalSymptoms }, (_, i) =>
            symptomIndices.includes(i) ? 1 : 0
        );
        const inputData = [inputDat];

        // Define the correct outputFilePath
        const outputFilePath = "../backend/output.json";

        fs.readFile(outputFilePath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "An error occurred" });
                return;
            }

            try {
                const predictionData = JSON.parse(data);
                res.json(predictionData);
            } catch (parseError) {
                console.error("Error parsing JSON:", parseError);
                res.status(500).json({ error: "An error occurred" });
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
=======
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
>>>>>>> parent of 11778be (Backend Optimized)
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