const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

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
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});