// filepath: c:\Users\esteb\OneDrive - Universidad del Norte\Proyecto01-Backend\src\book\v1\book.controller.ts
import Book, { BookType } from "./v1/book.model";
import { FilterQuery } from "mongoose";

export async function createBook(data: Partial<BookType>) {
    return await Book.create(data);
}

export async function readBooks(filters: Partial<BookType>) {
    // Filtrar solo las propiedades válidas del esquema
    const query: FilterQuery<BookType> = { isDeleted: false, ...(filters as FilterQuery<BookType>) };
    return await Book.find(query).exec();
}

export async function updateBook(bookId: string, data: Partial<BookType>) {
    return await Book.findByIdAndUpdate(bookId, data, { new: true }).exec();
}

export async function softDeleteBook(bookId: string) {
    return await Book.findByIdAndUpdate(bookId, { isDeleted: true }, { new: true }).exec();
}