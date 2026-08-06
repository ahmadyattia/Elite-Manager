import express from "express";
import { logoutController } from "../controllers/logoutController.js";

export const router = express.Router();

router.get("/", logoutController);
