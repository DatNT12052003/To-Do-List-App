import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { IInputCreateUser, IInputGetUsers } from "../interfaces/user.interface";
import { HTTP_RESPONSE } from "../common/http-response";
import { IResponse } from "../interfaces/common.interface";
import { userResource, usersResource } from "../resources/user.resource";

export const getUsers = async (req: Request, res: Response) => {
    const users = await userService.getUsersService(req);
    const responseData: IResponse<typeof users> = {
        success: true,
        statusCode: HTTP_RESPONSE.SUCCESS.statusCode,
        message: HTTP_RESPONSE.SUCCESS.message,
        data: usersResource(users),
    };
    return res.status(HTTP_RESPONSE.SUCCESS.statusCode).json(responseData);
};

export const getUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    console.log("request.user", (req as any).user);
    const user = await userService.getUserService(id);
    const responseData: IResponse<typeof user> = {
        success: true,
        statusCode: HTTP_RESPONSE.SUCCESS.statusCode,
        message: HTTP_RESPONSE.SUCCESS.message,
        data: userResource(user),
    };
    return res.status(HTTP_RESPONSE.SUCCESS.statusCode).json(responseData);
};

export const createUser = async (req: Request, res: Response) => {
    const userData = req.body as IInputCreateUser;
    console.log("Received user data:", userData);
    const user = await userService.createUserService(userData);
    res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { username } = req.body;
    const user = await userService.updateUserService(id, username);
    res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await userService.deleteUserService(id);
    res.json({ message: "Deleted successfully" });
};
