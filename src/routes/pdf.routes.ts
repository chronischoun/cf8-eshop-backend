import { Router } from "express";
import { uploadPdfMiddleware } from "../middlewares/uploadPdf.middleware";
import { uploadPdfController } from "../controllers/pdf.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File upload endpoints
 */

/**
/**
 * @swagger
 * /api/pdf/upload:
 *   post:
 *     summary: Upload a PDF file
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: PDF uploaded successfully
 *       400:
 *         description: Invalid file or missing file
 */
router.post(
  "/upload",
  uploadPdfMiddleware.single("file"),
  uploadPdfController
);

export default router;
