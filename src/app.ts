import express from "express";
import path from "path";
import swaggerUi from 'swagger-ui-express';
import { specs } from './utils/swagger';
import authRoutes from "./routes/auth.routes";
import orderRoutes from "./routes/order.routes";
import productRoutes from "./routes/products.routes";
import userRoutes from "./routes/users.routes";
import pdfRoutes from "./routes/pdf.routes";

const app = express();

// JSON Middleware 
app.use(express.json());

//  Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//  Static files
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src/utils/uploads"))
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pdf", pdfRoutes);

app.get("/", (_req, res) => {
  res.send("Eshop Server is running!");
});

export default app;