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

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

app.use("/uploads", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://127.0.0.1:${PORT}`);
  console.log(`📚 Swagger docs at http://127.0.0.1:${PORT}/api-docs`);
});
