import express from "express";
import { employeesController } from "../controllers/employeesController.js";

export const router = express.Router();

router.get("/", employeesController);
