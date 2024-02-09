import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const usersRoutes = Router();
const controller = new UsersController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

// Usuário não precisa esta autenticado
/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               password_confirmation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the newly created user.
 *       409:
 *         description: User already registered.
 *       400:
 *         description: Bad request. Check the request body format.
 *       500:
 *         description: Internal server error.
 */
usersRoutes.post('/create', controller.create) 

usersRoutes.use(ensureAuthenticate);

// Usuário precisa está autenticado
/**
 * @swagger
 * /users/list:
 *   get:
 *     summary: Get the list of all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the list of users.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */
usersRoutes.get('/list', controller.list) 

/**
 * @swagger
 * /users/show/{id}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the user details.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
usersRoutes.get('/show/:id', controller.show) 

/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     summary: Update user details by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the updated user details.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
usersRoutes.put('/update/:id', controller.update)

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the deleted user details.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
usersRoutes.delete('/delete/:id', controller.delete)  

export {usersRoutes}