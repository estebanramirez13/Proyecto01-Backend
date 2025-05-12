// filepath: c:\Users\esteb\OneDrive - Universidad del Norte\Proyecto01-Backend\src\db.ts
import mongoose from "mongoose";

export async function handleMongoConnection() {
    const mongoUri = process.env.MONGO_URI; // Leer la URI desde el archivo .env
    if (!mongoUri) {
        throw new Error("MONGO_URI no está definida en las variables de entorno");
    }

    try {
        await mongoose.connect(mongoUri); // Conectar a MongoDB
        console.log("Conexión a MongoDB exitosa");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1); // Finalizar el proceso si no se puede conectar
    }
}