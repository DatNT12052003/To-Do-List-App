import { Request, Response } from "express";
import * as auth from "../services/auth.service";
import * as otp from "../services/otp.service";
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
    console.log("Login request body:", req);
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
        data: { accessToken, refreshToken },
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
    console.log("Received refresh token:", refreshToken);
    if (!refreshToken) {
        return res.status(HTTP_RESPONSE.UNAUTHORIZED.statusCode).json({ message: HTTP_RESPONSE.UNAUTHORIZED.message });
    }
    const { accessToken, newRefreshToken } = await auth.refreshTokenService(refreshToken);
    if (!accessToken) {
        return res.status(HTTP_RESPONSE.FORBIDDEN.statusCode).json({ message: HTTP_RESPONSE.FORBIDDEN.message });
    }
    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(HTTP_RESPONSE.SUCCESS.statusCode).json({
        success: true,
        statusCode: HTTP_RESPONSE.SUCCESS.statusCode,
        message: HTTP_RESPONSE.SUCCESS.message,
        data: { accessToken, refreshToken: newRefreshToken },
    });
};

export const requestResetPassword = async (req: Request, res: Response) => {
    try {
        const isResetPasswordSuccess = await otp.generateOTPResetPasswordService(req);
        if (isResetPasswordSuccess) {
            const responseData: IResponse<any> = {
                success: true,
                statusCode: HTTP_RESPONSE.SUCCESS.statusCode,
                message: HTTP_RESPONSE.SUCCESS.message,
            };
            res.status(HTTP_RESPONSE.SUCCESS.statusCode).json(responseData);
        }
    } catch (error) {
        const responseData: IResponse<any> = {
            success: false,
            statusCode: HTTP_RESPONSE.BAD_REQUEST.statusCode,
            message: error instanceof Error ? error.message : HTTP_RESPONSE.BAD_REQUEST.message,
        };
        res.status(HTTP_RESPONSE.BAD_REQUEST.statusCode).json(responseData);
    }
};

export const verifyOTP = async (req: Request, res: Response) => {
    try {
        console.log("Verifying OTP with request body:", req.body);
        const isVerifySuccess = await otp.verifyOTPService(req);
        if (isVerifySuccess) {
            const responseData: IResponse<any> = {
                success: true,
                statusCode: HTTP_RESPONSE.SUCCESS.statusCode,
                message: HTTP_RESPONSE.SUCCESS.message,
            };
            res.status(HTTP_RESPONSE.SUCCESS.statusCode).json(responseData);
        }
    } catch (error) {
        const responseData: IResponse<any> = {
            success: false,
            statusCode: HTTP_RESPONSE.BAD_REQUEST.statusCode,
            message: error instanceof Error ? error.message : HTTP_RESPONSE.BAD_REQUEST.message,
        };
        res.status(HTTP_RESPONSE.BAD_REQUEST.statusCode).json(responseData);
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        await auth.resetPasswordService(req);
        const responseData: IResponse<any> = {
            success: true,
            statusCode: HTTP_RESPONSE.SUCCESS.statusCode,
            message: HTTP_RESPONSE.SUCCESS.message,
        };
        res.status(HTTP_RESPONSE.SUCCESS.statusCode).json(responseData);
    } catch (error) {
        const responseData: IResponse<any> = {
            success: false,
            statusCode: HTTP_RESPONSE.BAD_REQUEST.statusCode,
            message: error instanceof Error ? error.message : HTTP_RESPONSE.BAD_REQUEST.message,
        };
        res.status(HTTP_RESPONSE.BAD_REQUEST.statusCode).json(responseData);
    }
};
