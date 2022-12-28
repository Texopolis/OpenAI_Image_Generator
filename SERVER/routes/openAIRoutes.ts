import express from "express";
import { generateImage } from "../controllers/openAIControllers";

const router = express.Router();

router.post("/generateImage", generateImage);

export default router;
