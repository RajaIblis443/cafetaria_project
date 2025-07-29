import { Request, Response } from "express";
import supabase from "../config/supabase";
import path from "path";
import fs from "fs";
import { error } from "console";

export class ProductController {
  static async postProduct(req: Request, res: Response) {
    const { name, price, description } = req.body;
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized User NotFound" });
    }

    const image = req.file?.filename;

    if (!name || !image || !price || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const { data: mitraData, error: mitraEror } = await supabase
      .from("mitra")
      .select("*")
      .eq("id_user", user.id)
      .single();

    if (mitraEror) {
      return res.status(500).json("error mitra");
    }

    const { data: productData, error: productError } = await supabase
      .from("product")
      .insert([
        {
          name,
          price: Number(price),
          description,
          image: "uploads/" + image,
          mitra_id: mitraData.id,
          is_aproved: false,
          is_available: true,
        },
      ])
      .select("*");

    if (productError) {
      return res
        .status(500)
        .json({ error: productError.message || "Insert error" });
    }

    return res.status(201).json({
      message: "Product created successfully",
      product: productData,
    });
  }

  static async getProducts(req: Request, res: Response) {
    const { mitra_id, is_available, name } = req.query;

    let query = supabase.from("product").select("*");

    if (mitra_id) {
      query = query.eq("mitra_id", mitra_id as string);
    }

    if (is_available !== undefined) {
      query = query.eq("is_available", is_available === "true");
    }

    if (name) {
      query = query.ilike("name", `%${name}%`);
    }

    const { data: products, error: errorProduct } = await query;

    if (errorProduct) {
      return res.status(500).json({ error: errorProduct.message });
    }

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    const BASE_IMAGE_URL =
      process.env.BASE_IMAGE_URL || "http://localhost:3000/";

    const updateProducts = products.map((product) => ({
      ...product,
      image: product.image ? `${BASE_IMAGE_URL}${product.image}` : null,
    }));

    return res.status(200).json(updateProducts);
  }

  static async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    const user = (req as any).user;

    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const { data: productData, error: productError } = await supabase
      .from("product")
      .select("*")
      .eq("id", id)
      .single();
    if (productError) {
      return res.status(500).json({ error: productError });
    }

    if (productData.image) {
      const imagePath = path.join(__dirname, "..", "..", productData.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete image:", err);
        } else {
          console.log("Image deleted successfully");
        }
      });
    }

    const { error: deleteError } = await supabase
      .from("product")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return res.status(500).json({ error: deleteError });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  }

  static async approveProduct(req: Request, res: Response) {
    const { id } = req.body;

    if (id === undefined || id === null || id === "") {
      return res.status(400).json({ error: "Product ID is required" });
    }
    try {
      const { data: productData, error: productError } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .single();
      if (productError) {
        return res.status(500).json({ error: productError.message });
      }

      if (!productData) {
        return res.status(404).json({ error: "Product not found" });
      }

      const { error: updateError } = await supabase
        .from("product")
        .update({ is_aproved: true })
        .eq("id", id);

      if (updateError) {
        return res.status(500).json({ error: updateError.message });
      }

      return res.status(200).json({ message: "Product approved successfully" });
    } catch (error) {
      console.error("Error approving product:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
