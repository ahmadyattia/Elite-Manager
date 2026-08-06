import express from "express";
import apptsController from "../controllers/appointmentsController.js";

export const router = express.Router();

router.get("/", apptsController);
