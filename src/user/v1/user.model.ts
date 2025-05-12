import { model, Schema, Document } from "mongoose";

export interface UserType extends Document {
    name: string;
    email: string;
    password: string; // Asegúrate de que este campo esté definido
    isDeleted: boolean;
    role: string;
}

const UserSchema = new Schema<UserType>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Campo de contraseña
    isDeleted: { type: Boolean, default: false },
    role: { type: String, default: "user" },
});

export const UserModel = model<UserType>("User", UserSchema);