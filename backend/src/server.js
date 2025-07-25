import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log("server is running on port 5001");
});
