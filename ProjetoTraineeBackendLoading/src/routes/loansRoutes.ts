// leanroutes.ts

import { Router } from "express";
import { LoansController } from "../controllers/LoansController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";


const loansRoutes = Router();
const loansController = new LoansController();
loansRoutes.use(ensureAuthenticate);
/**
 * @swagger
 * /loans:
 *   post:
 *     summary: Borrow a book (User)
 *     tags: [Loans]
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
 *       - in: requestBody
 *         name: body
 *         required: true
 *         description: Book ID to borrow
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookId:
 *                   type: string
 *                   example: example_book_id
 *     responses:
 *       200:
 *         description: Book borrowed successfully.
 *         content:
 *           application/json:
 *             example: {"message": "Book borrowed successfully."}
 *       400:
 *         description: Book out of stock or other validation error.
 *         content:
 *           application/json:
 *             example: {"error": "Book out of stock or other validation error."}
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *         content:
 *           application/json:
 *             example: {"error": "Unauthorized. Token is missing or invalid."}
 *       404:
 *         description: Book not found or unavailable for borrowing.
 *         content:
 *           application/json:
 *             example: {"error": "Book not found or unavailable for borrowing."}
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example: {"error": "Internal server error."}
 */
loansRoutes.post("/", loansController.borrowBook);

/**
 * @swagger
 * /loans/{id}:
 *   delete:
 *     summary: Return a borrowed book (User)
 *     tags: [Loans]
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
 *       - in: path
 *         name: id
 *         required: true
 *         description: Loan ID
 *         schema:
 *           type: string
 *           example: example_loan_id
 *     responses:
 *       200:
 *         description: Book returned successfully.
 *         content:
 *           application/json:
 *             example: {"message": "Book returned successfully."}
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *         content:
 *           application/json:
 *             example: {"error": "Unauthorized. Token is missing or invalid."}
 *       404:
 *         description: Loan not found or book not borrowed by the user.
 *         content:
 *           application/json:
 *             example: {"error": "Loan not found or book not borrowed by the user."}
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example: {"error": "Internal server error."}
 */
loansRoutes.delete("/:loanId", loansController.returnBook);

/**
 * @swagger
 * /loans:
 *   get:
 *     summary: List all loans of a user (User)
 *     tags: [Loans]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the list of all loans of the user.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */
loansRoutes.get("/", loansController.listUserLoans);
export { loansRoutes };