import express from "express";
import { loginController } from "../controllers/loginController.js";
import { verifyLoginCredentials } from "../services/verifyCredentialsUtils.js";
import bcrypt from "bcrypt";

export const router = express.Router();

router.post("/", verifyLoginCredentials, loginController);
