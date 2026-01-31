import { Router } from "express";
import path from "path";
import fs from "fs";

import { PdfModel } from "../models/pdf.model";
import { uploadPdfMiddleware } from "../middlewares/uploadPdf.middleware";
import {
  uploadPdfController,
  downloadPdfController,
} from "../controllers/pdf.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: PDF management and download
 */

/**
 * @swagger
 * /api/pdf/upload:
 *   post:
 *     summary: Upload a new PDF
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: PDF uploaded successfully
 */
router.post(
  "/upload",
  uploadPdfMiddleware.single("file"),
  uploadPdfController
);

/**
 * @swagger
 * /api/pdf/download/{uuid}:
 *   get:
 *     summary: Download a PDF file via UUID
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: The UUID of the PDF
 *     responses:
 *       200:
 *         description: File downloaded successfully
 *       404:
 *         description: File not found
 */
router.get("/download/:uuid", downloadPdfController);

/**
 * @swagger
 * /api/pdf/view/{filename}:
 *   get:
 *     summary: Stream/View a PDF file
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF streamed successfully
 *       206:
 *         description: Partial content (Range request)
 */
router.get("/view/:filename", async (req, res) => {
  try {
    const fileName = decodeURIComponent(req.params.filename);

    let filePath = path.join(
      process.cwd(),
      "src",
      "utils",
      "uploads",
      "pdfs",
      fileName
    );

    if (!fs.existsSync(filePath)) {
      const pdfRecord = await PdfModel.findOne({ originalName: fileName });

      if (pdfRecord) {
        filePath = path.join(
          process.cwd(),
          "src",
          "utils",
          "uploads",
          "pdfs",
          pdfRecord.filename
        );
      }
    }

    if (!fs.existsSync(filePath)) {
      return res.sendStatus(404);
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Accept-Ranges", "bytes");

    // Full file stream
    if (!range) {
      res.setHeader("Content-Length", fileSize);
      return fs.createReadStream(filePath).pipe(res);
    }

    // Partial content (Range)
    const parts = range.replace("bytes=", "").split("-");
    const start = Number(parts[0]);
    const end = parts[1] ? Number(parts[1]) : fileSize - 1;

    if (start >= fileSize) {
      return res.status(416).send("Requested range not satisfiable");
    }

    const chunkSize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Content-Length": chunkSize,
    });

    file.pipe(res);
  } catch (error) {
    console.error("Streaming error:", error);
    res.status(500).send("Streaming error");
  }
});

export default router;
