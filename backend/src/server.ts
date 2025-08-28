import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { AuthController } from "./controller/authController";
import authRouter from "./routes/authRouter";
import productRouter from "./routes/productRouter";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../swagger";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic health check
app.get("/", (req, res) => {
  res.json({
    message: "Cafetaria Backend API",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// CORS configuration
const corsOptions = {
  origin: ["*"],
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options("*", cors(corsOptions));

app.use(helmet({ contentSecurityPolicy: false }));

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

// Static file serving (for local dev only)
if (process.env.NODE_ENV !== "production") {
  app.use("/uploads", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  });
  app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
}

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message:
        process.env.NODE_ENV === "production"
          ? "Something went wrong"
          : err.message,
    });
  }
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://127.0.0.1:${PORT}`);
    console.log(`📚 Swagger docs at http://127.0.0.1:${PORT}/api-docs`);
  });
}

// Export for Vercel
export default app;
