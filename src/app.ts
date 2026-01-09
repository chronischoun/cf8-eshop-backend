import express from "express";
import authRoutes from "./routes/auth.routes";
import orderRoutes from "./routes/order.routes";
import productRoutes from "./routes/products.routes";
import userRoutes from "./routes/users.routes";

const app = express();


app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (_req, res) => {
  res.send("Eshop Server is running!");
});

export default app;