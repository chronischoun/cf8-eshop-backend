import express from "express";
import { connectDB } from "./utils/db"; // 
import dotenv from 'dotenv';

const app = express();
const PORT = 3000;


connectDB();

app.get("/", (req, res) => {
    res.send("Eshop Server is running!");
});

app.listen(PORT, () => {
    console.log (` Server is running on http://localhost:${PORT}`);
});