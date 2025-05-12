import { Router, Request, Response } from "express";
import { createBook, readBooks } from "./book.controller";
import { AuthMiddleware } from "../../middleware/auth";

const bookRoutes = Router();

bookRoutes.post("/", AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const book = await createBook(req.body);
        res.status(201).json({ message: "Book created successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Error creating book", error: (error as Error).toString() });
    }
});

bookRoutes.get("/", AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const books = await readBooks(req.query);
        res.status(200).json({ message: "Books retrieved successfully", books });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books", error: (error as Error).toString() });
    }
});

export default bookRoutes;