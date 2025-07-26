import { Router } from "express";
import { AuthController } from "../controller/authController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { AdminController } from "../controller/adminController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - telephone
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               telephone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing fields or Supabase error
 */
router.post("/register", AuthController.createUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", AuthController.loginUser);

/**
 * @swagger
 * /api/auth/approve:
 *   post:
 *     summary: Approve user registration
 *     tags: [Auth]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registration approved successfully
 *       500:
 *         description: Internal server error
 */

router.post(
  "/approve",
  authMiddleware,
  roleMiddleware(["admin", "super-admin"]),
  AuthController.approveMitra
);

/**
 * @swagger
 * /api/auth/create-admin:
 *   post:
 *     summary: Register a new admin
 *     tags: [Auth]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - telephone
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               telephone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing fields or Supabase error
 */
router.post(
  "/create-admin",
  authMiddleware,
  roleMiddleware(["admin", "super-admin"]),
  AdminController.createAdmin
);

export default router;
