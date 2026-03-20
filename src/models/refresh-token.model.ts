import { pool } from "../config/db";
import { IInputCreateRefreshToken } from "../interfaces/refresh-tokens.interface";

export const createRefreshToken = async (refreshTokenData: IInputCreateRefreshToken) => {
    const query = "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)";
    await pool.query(query, [refreshTokenData.userId, refreshTokenData.token, refreshTokenData.expiresAt]);
};

export const findRefreshToken = async (token: string) => {
    const query = "SELECT * FROM refresh_tokens WHERE token = $1";
    const result = await pool.query(query, [token]);
    return result.rows[0];
};

export const revokeRefreshToken = async (token: string) => {
    const query = "UPDATE refresh_tokens SET revoked = true WHERE token = $1";
    await pool.query(query, [token]);
};
