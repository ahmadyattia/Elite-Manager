import express from "express";
import { resetPasswordController } from "../controllers/resetPasswordController.js";

export const router = express.Router();

router.post("/", resetPasswordController);
