import { Request, Response } from "express";
import Product from "../models/products";
import { PdfModel } from "../models/pdf.model";

// GET all products
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find().lean();

    const productsWithPdf = await Promise.all(
      products.map(async (product: any) => {
        let pdfUrl = null;
        let pdfDatabaseId = null; 

        if (product.pdfUuid) {
          // Αναζήτηση στο PdfModel χρησιμοποιώντας το uuid του προϊόντος
          const pdfData = await PdfModel.findOne({ uuid: product.pdfUuid });
          if (pdfData) {
            pdfUrl = `http://localhost:3000/uploads/${pdfData.filename}`;
            // Εδώ παίρνουμε το ID που τελειώνει σε ...5 για να το στείλουμε στην Angular
            pdfDatabaseId = pdfData._id; 
          }
        }

        return { 
          ...product, 
          pdfUrl, 
          pdfId: pdfDatabaseId 
        };
      })
    );

    res.json(productsWithPdf);
  } catch (error) {
    console.error("GetProducts Error:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// GET product by id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ message: "Product not found" });

    let pdfUrl = null;
    let pdfDatabaseId = null;

    if ((product as any).pdfUuid) {
      const pdfData = await PdfModel.findOne({ uuid: (product as any).pdfUuid });
      if (pdfData) {
        pdfUrl = `http://localhost:3000/uploads/${pdfData.filename}`;
        pdfDatabaseId = pdfData._id;
      }
    }

    res.json({ ...product, pdfUrl, pdfId: pdfDatabaseId });
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID" });
  }
};


// CREATE product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Failed to create product" });
  }
};

// UPDATE product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Failed to update product" });
  }
};

// DELETE product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete product" });
  }
};