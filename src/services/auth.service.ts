import { Request } from "express";
import jwt from "jsonwebtoken";
import { IInputCreateUser } from "../interfaces/user.interface";
import * as userModel from "../models/user.model";
import bcrypt from "bcrypt";
import { TLoginBy } from "../types/common";
import { signAccessToken, signRefreshToken } from "../utils/jwt";
import { createRefreshToken, findRefreshToken, revokeRefreshToken } from "../models/refresh-token.model";

export const registerUserService = async (req: Request) => {
    const { username, email, password } = req.body;
    console.log("Received user data:", { username, email, password });

    if (!username || !email || !password) {
        throw new Error("Username, email, and password are required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData: IInputCreateUser = {
        username,
        email,
        password: hashedPassword,
    };

    return await userModel.createUser(userData);
};

export const loginUserService = async (req: Request) => {
    const { username, email, password } = req.body;

    let loginBy: TLoginBy;
    if (email) {
        loginBy = "EMAIL";
    } else if (username) {
        loginBy = "USERNAME";
    } else {
        throw new Error("Either username or email is required for login");
    }

    switch (loginBy) {
        case "EMAIL":
            const userByEmail = await userModel.getUserByEmail(email);
            if (!userByEmail) {
                throw new Error("User not found with the provided email");
            }

            const isPasswordValid = await bcrypt.compare(password, userByEmail.password);

            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            const accessToken = signAccessToken(userByEmail.id);
            const refreshToken = signRefreshToken(userByEmail.id);

            await createRefreshToken({
                userId: userByEmail.id,
                token: refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });

            return { accessToken, refreshToken };
        case "USERNAME":
            const userByUsername = await userModel.getUserByUsername(username);
            if (!userByUsername) {
                throw new Error("User not found with the provided username");
            }
            const isPasswordValidUsername = await bcrypt.compare(password, userByUsername.password);

            if (!isPasswordValidUsername) {
                throw new Error("Invalid password");
            }
            const accessTokenUsername = signAccessToken(userByUsername.id);
            const refreshTokenUsername = signRefreshToken(userByUsername.id);
            await createRefreshToken({
                userId: userByUsername.id,
                token: refreshTokenUsername,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });
            return { accessToken: accessTokenUsername, refreshToken: refreshTokenUsername };
        default:
            throw new Error("Invalid login method");
    }
};

export const refreshTokenService = async (refreshToken: string) => {
    const storedToken = await findRefreshToken(refreshToken);
    if (!storedToken || storedToken.revoked || storedToken.expiresAt < new Date()) {
        return { accessToken: null };
    }
    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as any;
    const userId = payload.userId;
    const accessToken = signAccessToken(userId);
    await revokeRefreshToken(refreshToken);
    return { accessToken };
};

export const logoutUserService = async (refreshToken: string) => {
    await revokeRefreshToken(refreshToken);
};
