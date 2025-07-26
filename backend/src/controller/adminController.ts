import { Request, Response } from "express";
import supabase from "../config/supabaseAdmin";
import { error } from "console";

export class AdminController {
  static async createAdmin(req: Request, res: Response) {
    const { email, password, telephone, name } = req.body;

    if (!email || !password || !telephone || !name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
          email,
          password,
        });
      if (authError || !authData?.user) {
        return res.status(400).json({
          error: authError?.message || "Failed to create admin user",
        });
      }

      const userId = authData.user.id;

      const { error: insertError } = await supabase.from("users").insert([
        {
          id: userId,
          email,
          name,
          telephone,
          role: "admin",
        },
      ]);

      if (insertError) {
        return res.status(500).json({
          success: false,
          message: `Failed to insert user data: ${insertError.message}`,
        });
      }
      return res.status(201).json({
        success: true,
        message: "Admin user created successfully",
        data: {
          id: userId,
          email,
          name,
          telephone,
        },
      });
    } catch (error) {
      console.error("Create admin error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
