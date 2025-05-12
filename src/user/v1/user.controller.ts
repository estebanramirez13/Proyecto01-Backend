import createUserAction from "./create.user.action";
import readUserAction from "./read.user.action";
import { UserType } from "./user.model";
import { CreateUserType } from "./user.types";

// DECLARE CONTROLLER FUNCTIONS
async function readUsers(): Promise<UserType[]> {
  const users = await readUserAction();

  return users;
}
async function createUser(userData: CreateUserType): Promise<UserType> {
  const createdUser = await createUserAction(userData);

  return createdUser;
}

// EXPORT CONTROLLER FUNCTIONS
export { readUsers, createUser };
// filepath: c:\Users\esteb\OneDrive - Universidad del Norte\Proyecto01-Backend\src\user\v1\user.controller.ts
import { UserModel } from "./user.model";

// Actualizar usuario
export async function updateUser(userId: string, data: Partial<UserType>) {
    return await UserModel.findByIdAndUpdate(userId, data, { new: true });
}

// Inhabilitar usuario (soft delete)
export async function softDeleteUser(userId: string) {
    return await UserModel.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
}