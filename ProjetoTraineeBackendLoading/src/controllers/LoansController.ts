// loansController.ts

import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../errors/AppError";
import Zod from 'zod';

export class LoansController {
    public async borrowBook(request: Request, response: Response) {
        const bodySchema = Zod.object({
            bookId: Zod.string(),
        }).strict();

        const { bookId } = bodySchema.parse(request.body);
        const userId = request.userId;

        const book = await prisma.book.findUnique({
            where: { id: bookId },
        });

        if (!book) {
            throw new AppError("Book not found", 404);
        }

        if (book.amount < 1) {
            throw new AppError("Book out of print", 409); // Conflict status for out of print
        }

        await prisma.book.update({
            where: { id: bookId },
            data: {
                amount: book.amount - 1,
            },
        });

        await prisma.loan.create({
            data: {
                userId,
                bookId,
            },
        });

        response.status(200).json({ message: "Book borrowed successfully." });
    }

    public async returnBook(request: Request, response: Response) {
        const { loanId } = request.params;
        const userId = request.userId;

        const loan = await prisma.loan.findUnique({
            where: { id: loanId, userId },
        });

        const book = await prisma.book.findUnique({
            where: { id: loan?.bookId },
        });

        if (!loan) {
            throw new AppError("Loan not found", 404);
        }

        if (!book) {
            throw new AppError("Book not found", 404);
        }

        await prisma.loan.delete({
            where: { id: loanId },
        });

        await prisma.book.update({
            where: { id: loan.bookId },
            data: {
                amount: book.amount + 1,
            },
        });

        response.status(200).json({ message: "Book returned successfully." });
    }

    public async listUserLoans(request: Request, response: Response) {
        const userId = request.userId;

        const userLoans = await prisma.loan.findMany({
            where: { userId },
            include: { book: true },
        });

        return response.status(200).json(userLoans);
    }
}
