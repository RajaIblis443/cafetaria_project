import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { upload } from "../middleware/uploads";
import { ProductController } from "../controller/productController";

const router = Router();

/**
 * @swagger
 * /api/product/post:
 *   post:
 *     summary: Create new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Missing fields
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
  "/post",
  authMiddleware,
  roleMiddleware(["mitra", "admin"]),
  upload.single("image"),
  ProductController.postProduct
);

/**
 * @swagger
 * /api/product/get:
 *   get:
 *     summary: Get all products (with optional filtering)
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: mitra_id
 *         schema:
 *           type: string
 *         description: Filter by mitra ID
 *       - in: query
 *         name: is_available
 *         schema:
 *           type: boolean
 *         description: Filter by availability
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by name (search)
 *     responses:
 *       200:
 *         description: List of filtered products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found
 *       500:
 *         description: Server error
 */
router.get("/get", ProductController.getProducts);

router.delete(
  "/post",
  authMiddleware,
  roleMiddleware(["mitra", "admin"]),
  ProductController.deleteProduct
);

export default router;
