// filepath: c:\Users\esteb\OneDrive - Universidad del Norte\Proyecto01-Backend\src\auth\v1\auth.routes.ts
import { Router, Request, Response } from "express";
import { registerUser, loginUser } from "./auth.controller";

const authRoutes = Router();

authRoutes.post("/register", async (req: Request, res: Response) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: (error as Error).toString() });
    }
});

authRoutes.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await loginUser(email, password);
        res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        res.status(401).json({ message: "Invalid credentials", error: (error as Error).toString() });
    }
});

export default authRoutes;