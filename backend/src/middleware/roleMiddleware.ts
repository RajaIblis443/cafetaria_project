import { Request, Response, NextFunction } from "express";
import supabase from "../config/supabase";

export function roleMiddleware(allowedRoles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !user.role || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: "Unautenticated" });
    }

    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (error || !data) {
      return res
        .status(403)
        .json({ success: false, message: "Failed to retrieve user role" });
    }

    if (!allowedRoles.includes(data.role)) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Access denied" });
    }

    next();
  };
}
