import express from "express";
import apptsController from "../controllers/appointmentsController.js";
import { apptsByDateController } from "../controllers/apptsByDateController.js";
import { postApptController } from "../controllers/postApptController.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const router = express.Router();

router.post("/", postApptController);
router.get("/", verifyToken, apptsController);
router.post("/date", verifyToken, apptsByDateController);
