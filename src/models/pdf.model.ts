import { Schema, model } from "mongoose";

const pdfSchema = new Schema(
  {
    originalName: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    mimetype: { type: String, required: true },
  },
  { timestamps: true }
);

export const PdfModel = model("Pdf", pdfSchema);
