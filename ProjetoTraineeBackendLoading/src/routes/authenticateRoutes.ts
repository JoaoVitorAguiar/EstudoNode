import { Router } from "express";
import { AuthenticateController } from "../controllers/AuthenticateController";

const authenticateRoutes = Router();
const controller = new AuthenticateController();


/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Create a new authentication
 *     tags: [Sessions]
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
 *                 format: email
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *             example:
 *               email: user@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Returns a JWT token for the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: A JWT token for the authenticated user.
 *       401:
 *         description: Incorrect Email or Password
 */
authenticateRoutes.post('/', controller.create);  // criar uma nova autenticação

export {authenticateRoutes}
