import express from "express";
import path from "path";

import authRoutes from "./routes/auth.routes";
import orderRoutes from "./routes/order.routes";
import productRoutes from "./routes/products.routes";
import userRoutes from "./routes/users.routes";
import pdfRoutes from "./routes/pdf.routes";

const app = express();

app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src/utils/uploads"))
);

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pdfs", pdfRoutes);

app.get("/", (_req, res) => {
  res.send("Eshop Server is running!");
});

export default app;
