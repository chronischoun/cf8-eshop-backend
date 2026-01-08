import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/db";

import authRoutes from "./routes/auth.routes";
// 1. Κάνε import τα υπόλοιπα routes
import orderRoutes from "./routes/order.routes"; 
import productRoutes from "./routes/products.routes";
import userRoutes from "./routes/users.routes";

dotenv.config();

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);    
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (_req, res) => {
  res.send("Eshop Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});