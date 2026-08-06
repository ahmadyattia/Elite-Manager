import express from "express";
import { signupController } from "../controllers/signupController.js";
import { verifySignupCredentials } from "../services/verifyCredentialsUtils.js";

export const router = express.Router();

router.post("/", verifySignupCredentials, signupController);
