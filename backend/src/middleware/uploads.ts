import multer from "multer";
import path from "path";
import fs from "fs";

// Fungsi untuk memastikan direktori ada
const ensureDirectoryExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadDir = "uploads/";

    // Buat direktori jika belum ada
    ensureDirectoryExists(uploadDir);

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const mimetypeOk = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ].includes(file.mimetype);
  const extOk = [".png", ".jpg", ".jpeg", ".webp"].includes(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimetypeOk && extOk) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg, .jpeg, .webp image files are allowed!"));
  }
};

export const upload = multer({ storage, fileFilter });
