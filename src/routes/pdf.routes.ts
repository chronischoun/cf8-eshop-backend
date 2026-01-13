import { Router } from "express";
import path from "path";
import { uploadPdfMiddleware } from "../middlewares/uploadPdf.middleware";
import { uploadPdfController } from "../controllers/pdf.controller";

const router = Router();

/**
 * @swagger
 * /pdf/upload:
 *   post:
 *     summary: Upload PDF
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
 * /pdf/download/{filename}:
 *   get:
 *     summary: Download PDF
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF downloaded successfully
 *       404:
 *         description: File not found
 */
router.get("/download/:filename", (req, res) => {
  const fileName = req.params.filename;
  const directoryPath = path.join(
    process.cwd(),
    "src/utils/uploads/pdfs/"
  );
  const filePath = path.join(directoryPath, fileName);

  res.download(filePath, fileName, (err) => {
    if (err) {
      res.status(404).send({ message: "File not found." });
    }
  });
});

export default router;
