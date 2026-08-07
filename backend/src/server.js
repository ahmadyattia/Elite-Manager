import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as apptsRouter } from "./routes/appointments.js";
import { router as loginRouter } from "./routes/login.js";
import { router as signupRouter } from "./routes/signup.js";
import { router as logoutRouter } from "./routes/logout.js";
import { router as employeesRouter } from "./routes/employees.js";
import { verifyToken } from "./middleware/verifyToken.js";

const app = express();

const PORT = 5000;

// console.log("CORS Origin Target:", `"${process.env.FRONTEND_URL}"`);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json()); // allow the server to read JSON comming from the frontend
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);

app.use(verifyToken);

app.use("/api/appointments", apptsRouter);
app.use("/api/employees", employeesRouter);

app.listen(PORT, () => console.log("Server is running on port", PORT));
