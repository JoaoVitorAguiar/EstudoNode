import { Router } from "express";
import { BooksController } from "../controllers/BooksController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const booksRoutes = Router();
const booksController = new BooksController();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management operations
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: List all books (Admin)
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the list of all books.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */
booksRoutes.get('/', booksController.listAll); // Lista todos os livros

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get details of a specific book (Admin)
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Returns the details of the specified book.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal server error.
 */
booksRoutes.get('/:id', booksController.show); // Mostra detalhes de um livro específico

booksRoutes.use(ensureAuthenticate);

// Rotas de Admin
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book (Admin)
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer Token
 *         schema:
 *           type: string
 *           format: 'Bearer {token}'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: integer
 *                 format: int32
 *     responses:
 *       200:
 *         description: Returns the newly created book.
 *       500:
 *         description: Internal server error.
 */
booksRoutes.post('/', booksController.create); // Cria um novo livro



/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update details of a specific book (Admin)
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: integer
 *                 format: int32
 *     responses:
 *       200:
 *         description: Returns the updated details of the specified book.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal server error.
 */
booksRoutes.put('/:id', booksController.update); // Atualiza um livro específico

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a specific book (Admin)
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the deleted details of the specified book.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal server error.
 */
booksRoutes.delete('/:id', booksController.delete); // Deleta um livro específico

export { booksRoutes }
