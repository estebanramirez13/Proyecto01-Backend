// filepath: c:\Users\esteb\OneDrive - Universidad del Norte\Proyecto01-Backend\src\server.ts
import express from "express";
import { handleMongoConnection } from "./db";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
handleMongoConnection();

// Middleware y rutas
app.use(express.json());
app.use("/users", require("./user/v1/user.routes").default);

import authRoutes from "./auth/v1/auth.routes";
app.use("/auth", authRoutes);

import bookRoutes from "./book/v1/book.routes";
app.use("/books", bookRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}.`);
});