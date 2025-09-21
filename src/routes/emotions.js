import { Router } from "express";
import { getAllEmotionsController } from "../controllers/emotions.js";

export const emotionsRouter = Router();

emotionsRouter.get("/", getAllEmotionsController);
