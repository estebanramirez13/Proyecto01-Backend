import { Router, Request, Response } from "express";
import { createUser, readUsers, updateUser, softDeleteUser } from "./user.controller";
import { CreateUserType } from "./user.types";
import { AuthMiddleware } from "../../middleware/auth";
import { UserType } from "./user.model";

// INIT ROUTES
const userRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function GetUsers(request: Request, response: Response) {
    try {
        const users = await readUsers();
        response.status(200).json({
            message: "Success.",
            users: users,
        });
    } catch (error) {
        response.status(500).json({
            message: "Error retrieving users",
            error: (error as Error).toString(),
        });
    }
}

async function CreateUser(request: Request<CreateUserType>, response: Response) {
    if (request.body.name === undefined) {
        return response.status(400).json({
            message: "Missing fields",
        });
    }

    try {
        const users = await createUser(request.body);
        response.status(200).json({
            message: "Success.",
            users: users,
        });
    } catch (error) {
        response.status(500).json({
            message: "Failure",
            information: (error as Error).toString(),
        });
    }
}

async function GetOneUser(request: Request, response: Response) {
    try {
        const users = await readUsers();
        response.status(200).json({
            message: "Success.",
            users: users,
        });
    } catch (error) {
        response.status(500).json({
            message: "Error retrieving user",
            error: (error as Error).toString(),
        });
    }
}

async function UpdateUser(request: Request<{ id: string }, {}, Partial<UserType>>, response: Response) {
    try {
        const updatedUser = await updateUser(request.params.id, request.body);
        response.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        response.status(500).json({ message: "Error updating user", error: (error as Error).toString() });
    }
}

async function SoftDeleteUser(request: Request<{ id: string }>, response: Response) {
    try {
        const deletedUser = await softDeleteUser(request.params.id);
        response.status(200).json({ message: "User soft deleted successfully", user: deletedUser });
    } catch (error) {
        response.status(500).json({ message: "Error soft deleting user", error: (error as Error).toString() });
    }
}

// DECLARE ENDPOINTS
userRoutes.get("/", GetUsers);
userRoutes.get("/one", AuthMiddleware, GetOneUser);
userRoutes.post("/", CreateUser);
userRoutes.put("/:id", AuthMiddleware, UpdateUser);
userRoutes.delete("/:id", AuthMiddleware, SoftDeleteUser);

// EXPORT ROUTES
export default userRoutes;