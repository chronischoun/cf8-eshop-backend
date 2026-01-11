import { Request, Response } from "express";
import { PdfModel } from "../models/pdf.model";

export const uploadPdfController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No PDF uploaded" });
    }

   
    const publicUrl = `/uploads/${req.file.filename}`;

    const pdf = await PdfModel.create({
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: publicUrl, 
      size: req.file.size,
      mimetype: req.file.mimetype,
    });

    res.status(201).json({
      message: "PDF uploaded successfully",
      pdf: {
        ...pdf.toObject(),
        url: `http://localhost:3000${publicUrl}` // Προσθήκη πλήρους link για ευκολία
      },
    });
  } catch (error) {
    console.error("Upload Error:", error); // Πάντα log το error για να ξέρεις τι φταίει
    res.status(500).json({ message: "PDF upload failed" });
  }
};