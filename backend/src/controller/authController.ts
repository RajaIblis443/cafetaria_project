import { Request, Response } from "express";
import supabase from "../config/supabase";
import { error } from "console";

export class AuthController {
  static async createUser(req: Request, res: Response) {
    const { email, name, telephone, password } = req.body;

    if (!email || !name || !telephone || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError || !authData?.user) {
        return res.status(400).json({
          success: false,
          error: authError?.message || "Failed to register user",
        });
      }

      const userId = authData.user.id;

      // 2. Simpan data tambahan di tabel `users`
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: userId, // penting: pakai id dari Supabase Auth
          name,
          email,
          telephone,
          role: "mitra",
        },
      ]);

      if (insertError) {
        return res.status(500).json({
          success: false,
          message: `Failed to create user profile. Error: ${insertError.message}`,
        });
      }

      const { error: mitraError } = await supabase.from("mitra").insert([
        {
          id_user: userId,
          is_open: true,
        },
      ]);

      if (mitraError) {
        return res.status(500).json({
          success: false,
          message: `Failed to create mitra profile. Error: ${mitraError.message}`,
        });
      }
      // 3. Sukses
      return res.status(201).json({
        success: true,
        message: "User registered successfully. Please verify your email.",
        data: {
          user: {
            id: userId,
            email,
            role: authData.user.role,
          },
          session: authData.session,
        },
      });
    } catch (error) {
      console.error("Register error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    try {
      const { data: authData, error: authEror } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authEror || !authData?.user) {
        return res.status(401).json({
          success: false,
          error: authEror?.message || "Invalid email or password",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: authData.user.id,
            email: authData.user.email,
            role: authData.user.role,
          },
          session: authData.session,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
