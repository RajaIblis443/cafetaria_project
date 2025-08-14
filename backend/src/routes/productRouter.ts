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

/**
 * @swagger
 * /api/product/availability/{id}:
 *   put:
 *     summary: Update product availability status
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_available:
 *                 type: boolean
 *                 description: Whether the product should be available
 *     responses:
 *       200:
 *         description: Product availability updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put(
  "/availability/:id",
  authMiddleware,
  roleMiddleware(["mitra"]),
  ProductController.updateProductAvailability
);

/**
 * @swagger
 * /api/product/approve:
 *   put:
 *     summary: Approve a product (Admin only)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Product ID to approve
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Product approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product approved successfully"
 *       400:
 *         description: Product ID is required
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put(
  "/approve",
  authMiddleware,
  roleMiddleware(["admin"]),
  ProductController.approveProduct
);

/**
 * @swagger
 * /api/product/delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deleted successfully"
 *       400:
 *         description: Product ID is required
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(["mitra", "admin"]),
  ProductController.deleteProduct
);

export default router;
