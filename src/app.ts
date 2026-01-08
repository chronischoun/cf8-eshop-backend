import authRoutes from "./routes/auth.routes";
import express from "express";

const app = express();

app.use("/api/auth", authRoutes);
