import { Request, Response, NextFunction } from "express";
import supabase from "../config/supabase";
import { UserInterface } from "../types/userInterface";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }

  // Ambil data tambahan dari tabel users
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (userError || !userData) {
    return res
      .status(401)
      .json({ success: false, message: "User data not found" });
  }

  // Gabungkan data auth user dengan data dari tabel users
  (req as any).user = {
    ...user,
    ...userData,
  };

  next();
}
