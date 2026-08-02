import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // allow the server to read JSON comming from the frontend

app.get("/api/health", (req, res) => {
  res.send("The server works!");
});

app.listen(PORT, () => console.log("Server is running on port", PORT));
