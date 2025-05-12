// filepath: c:\Users\esteb\OneDrive - Universidad del Norte\Proyecto01-Backend\src\book\v1\book.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface BookType extends Document {
    title: string;
    author: string;
    genre: string;
    publisher: string;
    publicationDate: Date;
    isAvailable: boolean;
    isDeleted: boolean;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publisher: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    isAvailable: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
});

export default mongoose.model<BookType>("Book", BookSchema);