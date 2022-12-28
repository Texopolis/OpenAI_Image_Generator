import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import apiRoutes from "./routes/openAIRoutes";
import cors from "cors";

console.log("dotenv: ", process.env.OPEN_AI_API);

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/openai", apiRoutes);

app.listen(port, () => console.log(`Server running on port ${port}...`));
