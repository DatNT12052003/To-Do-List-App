import { Request, Response } from "express";
import * as auth from "../services/auth.service";
import { IResponse } from "../interfaces/common.interface";
import { HTTP_RESPONSE } from "../common/http-response";
import { log } from "node:console";

export const register = async (req: Request, res: Response) => {
    try {
        const users = await auth.registerUserService(req);
        const responseData: IResponse<any> = {
            success: true,
            statusCode: HTTP_RESPONSE.CREATED.statusCode,
            message: HTTP_RESPONSE.CREATED.message,
        };
        return res.status(HTTP_RESPONSE.CREATED.statusCode).json(responseData);
    } catch (error) {
        const responseData: IResponse<null> = {
            success: false,
            statusCode: HTTP_RESPONSE.BAD_REQUEST.statusCode,
            message: error instanceof Error ? error.message : HTTP_RESPONSE.BAD_REQUEST.message,
        };
        log("Error in register controller:", error);
        return res.status(HTTP_RESPONSE.BAD_REQUEST.statusCode).json(responseData);
    }
};

export const login = async (req: Request, res: Response) => {
    const { accessToken, refreshToken } = await auth.loginUserService(req);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(HTTP_RESPONSE.SUCCESS.statusCode).json({
        success: true,
        statusCode: HTTP_RESPONSE.SUCCESS.statusCode,
        message: HTTP_RESPONSE.SUCCESS.message,
        data: { accessToken },
    });
};

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(HTTP_RESPONSE.BAD_REQUEST.statusCode).json({ message: "Refresh token is required" });
    }
    await auth.logoutUserService(refreshToken);
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(HTTP_RESPONSE.SUCCESS.statusCode).json({
        success: true,
        statusCode: HTTP_RESPONSE.SUCCESS.statusCode,
        message: HTTP_RESPONSE.SUCCESS.message,
    });
};

export const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(HTTP_RESPONSE.UNAUTHORIZED.statusCode).json({ message: HTTP_RESPONSE.UNAUTHORIZED.message });
    }
    const { accessToken } = await auth.refreshTokenService(refreshToken);
    if (!accessToken) {
        return res.status(HTTP_RESPONSE.FORBIDDEN.statusCode).json({ message: HTTP_RESPONSE.FORBIDDEN.message });
    }
    res.status(HTTP_RESPONSE.SUCCESS.statusCode).json({
        success: true,
        statusCode: HTTP_RESPONSE.SUCCESS.statusCode,
        message: HTTP_RESPONSE.SUCCESS.message,
        data: { accessToken },
    });
};
