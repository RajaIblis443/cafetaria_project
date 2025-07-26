import { User } from "@supabase/supabase-js";
import { jwtInterface } from "./jwtInterface";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
