import { Request, Response } from "express";
import supabase from "../config/supabase";

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
          role: "guest",
        },
      ]);

      if (insertError) {
        return res.status(500).json({
          success: false,
          message: `Failed to create user profile. Error: ${insertError.message}`,
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
            role: "guest",
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
            role: "guest", // Default role, adjust as needed
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

  static async approveMitra(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    try {
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("id, email")
        .eq("email", email)
        .single();

      if (userError || !user) {
        throw new Error(
          "Gagal mendapatkan user ID, error" + userError?.message
        );
      }

      const { data, error } = await supabase.from("mitra").insert([
        {
          id_user: user.id,
          is_open: false,
        },
      ]);

      if (error) {
        return res.status(500).json({
          success: false,
          message: `Failed to approve mitra. Error: ${error.message}`,
        });
      }

      const { error: updateError } = await supabase
        .from("users")
        .update({
          role: "mitra",
        })
        .eq("email", email);

      if (updateError) {
        return res.status(500).json({
          success: false,
          message: `Failed to update user role. Error: ${updateError.message}`,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Mitra approved successfully",
        data: user,
      });
    } catch (error) {
      console.error("Approve Mitra error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
  
}
