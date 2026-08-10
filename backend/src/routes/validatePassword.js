import express from "express";
import { validatePasswordController } from "../controllers/validatePasswordController.js";

export const router = express.Router();

router.post("/", validatePasswordController);
