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

    const pdf = await PdfModel.create({
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });

    res.status(201).json({
      message: "PDF uploaded successfully",
      pdf,
    });
  } catch (error) {
    res.status(500).json({ message: "PDF upload failed" });
  }
};
