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

        const inputFilePath = "input.json";
        fs.writeFileSync(inputFilePath, JSON.stringify(inputData));

        const pythonProcess = spawn("python3", [
            "ModelAndNotebook/predict.py",
            inputFilePath,
        ]);

        let predictions = "";
        const outputFilePath = "./output.json";

        pythonProcess.stdout.on("data", (data) => {
            predictions += data.toString();
        });

        pythonProcess.on("close", (code) => {
            if (code === 0) {
                fs.readFile(outputFilePath, "utf8", (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    try {
                        const predictionData = JSON.parse(data);
                        console.log(predictionData);

                        // Send predictions as a response
                        res.json(predictionData);

                        // Clean up temporary input file
                        fs.unlinkSync(inputFilePath);
                    } catch (parseError) {
                        console.error("Error parsing Python output:", parseError);
                        res.status(500).json({ error: "An error occurred" });
                    }
                    //clean up temporary output file
                    fs.unlinkSync(outputFilePath);
                });
            } else {
                console.error("Python process exited with code:", code);
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