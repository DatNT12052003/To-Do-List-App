import { pool } from "../config/db";
import { IInputCreateOTP, IInputUseOTP, IOTP } from "../interfaces/otp.interface";

export const createOTP = async (otp: IInputCreateOTP) => {
    const query = "INSERT INTO otps (user_id, code, type, expires_at) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [otp.userId, otp.code, otp.type, otp.expiresAt];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const getOTPByCodeAndType = async (data: IInputUseOTP) => {
    const query = `
        SELECT 
            id,
            user_id AS "userId",
            code,
            type,
            expires_at AS "expiresAt",
            is_used AS "isUsed"
        FROM otps
        WHERE code = $1 AND type = $2
    `;
    const values = [data.code, data.type];
    const result = await pool.query(query, values);
    return result.rows[0] as IOTP;
};

export const updateOTPIsUsed = async (otpId: number) => {
    const query = "UPDATE otps SET is_used = true WHERE id = $1";
    await pool.query(query, [otpId]);
};
