import { Request } from "express";
import * as userModel from "../models/user.model";
import { IInputCreateUser, IInputGetUsers } from "../interfaces/user.interface";
import type { TOrderBy } from "../types/common";
import { PAGINATION } from "../common/constant";

export const getUsersService = async (req: Request) => {
    const inputData: IInputGetUsers = {
        page: Number(req.query.page) || PAGINATION.DEFAULT_PAGE,
        limit: Number(req.query.limit) || PAGINATION.DEFAULT_LIMIT,
        skip: (Number(req.query.page) - 1) * Number(req.query.limit) || PAGINATION.DEFAULT_SKIP,
        search: (req.query.search as string) || "",
        sortField: (req.query.sortField as string) || "username",
        sortBy: (req.query.sortBy as TOrderBy)?.toUpperCase() === "DESC" ? "DESC" : "ASC",
    };
    return await userModel.getAllUsers(inputData);
};

export const getUserService = async (id: number) => {
    return await userModel.getUserById(id);
};

export const createUserService = async (userData: IInputCreateUser) => {
    return await userModel.createUser(userData);
};

export const updateUserService = async (id: number, username: string) => {
    return await userModel.updateUser(id, username);
};

export const deleteUserService = async (id: number) => {
    return await userModel.deleteUser(id);
};
