import express from "express";
import apptsController from "../controllers/appointmentsController.js";
import { apptsByDateController } from "../controllers/apptsByDateController.js";
export const router = express.Router();

router.get("/", apptsController);
router.post("/date", apptsByDateController);
