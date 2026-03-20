import jwt from "jsonwebtoken";

const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

const accessSecret = ACCESS_SECRET || "default_access_secret";
const refreshSecret = REFRESH_SECRET || "default_refresh_secret";

export const signAccessToken = (userId: number) => {
    return jwt.sign({ userId }, accessSecret, {
        expiresIn: "15m",
    });
};

export const signRefreshToken = (userId: number) => {
    return jwt.sign({ userId }, refreshSecret, {
        expiresIn: "7d",
    });
};
