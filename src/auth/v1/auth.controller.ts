import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../user/v1/user.model";

export async function registerUser(data: { name: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10); // Hashear la contraseña
    return await UserModel.create({ ...data, password: hashedPassword });
}

export async function loginUser(email: string, password: string) {
    const user = await UserModel.findOne({ email, isDeleted: false });
    if (!user) {
        throw new Error("User not found");
    }

    // Comparar la contraseña ingresada con la almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    return { token, user };
}