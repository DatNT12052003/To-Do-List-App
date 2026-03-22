import { Request } from "express";
import { getPermissionsByUserId } from "../models/permission.model";

export const getPermissionsByUserIdService = async (req: Request) => {
    const userId = Number(req.user?.userId);

    if (!userId) {
        return Promise.reject(new Error("User ID is required"));
    }

    return await getPermissionsByUserId(userId);
};
