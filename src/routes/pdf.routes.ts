import { Router } from "express";
import { uploadPdfMiddleware } from "../middlewares/uploadPdf.middleware";
import { uploadPdfController } from "../controllers/pdf.controller";

const router = Router();

router.post(
  "/upload",
  uploadPdfMiddleware.single("file"),
  uploadPdfController
);

export default router;
