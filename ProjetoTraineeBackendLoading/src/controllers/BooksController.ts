import { Request, Response } from "express";
import { prisma } from "../lib/prisma"
import { AppError } from "../errors/AppError";
import Zod from 'zod';

export class BooksController {
    // CRUD ADMIN
    public async listAll(request: Request, response: Response) {
        const books = await prisma.book.findMany();
        return response.status(200).json(books);
    }

    public async show(request: Request, response: Response) {
        const { id } = request.params;

        const book = await prisma.book.findFirst({
            where: { id }
        })

        if (!book) throw new AppError('Book not found', 404);

        return response.status(200).json(book);
    }

    public async create(request: Request, response: Response) {
        const bodySchema = Zod.object({
            title: Zod.string().min(3),
            amount: Zod.number().int(),
        }).strict();

        const { title, amount } = bodySchema.parse(request.body);

        const book = await prisma.book.create({
            data: {
                title,
                amount
            },
        });

        return response.status(200).json(book);
    }

    public async update(request: Request, response: Response) {
        const { id } = request.params;
        const bodySchema = Zod.object({
            title: Zod.string().min(3).nullish(),
            amount: Zod.number().int().nullish(),
        }).strict();

        const { title, amount } = bodySchema.parse(request.body);
        const bookExists = await prisma.book.findFirst({
            where: { id }
        })

        if (!bookExists) throw new AppError('Book not found', 404);

        let data = {}
        if (title) data = { title };
        if (amount) data = { ...data, amount };

        const book = await prisma.book.update({
            where: { id },
            data
        });

        return response.status(200).json(book);
    }

    public async delete(request: Request, response: Response) {
        const { id } = request.params;
        const book = await prisma.book.findUnique({
            where: { id }
        })

        if (!book) throw new AppError('Book not found', 404);

        await prisma.book.delete({
            where: { id }
        })
        return response.status(200).json(book);
    }

}