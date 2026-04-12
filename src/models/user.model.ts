import { pool } from "../config/db";
import logger from "../config/logger";
import { IInputCreateUser, IInputGetUsers } from "../interfaces/user.interface";

export const getAllUsers = async (inputData: IInputGetUsers) => {
    let result: any = {};

    if (!inputData.search && !inputData.sortField && !inputData.sortBy) {
        result = await pool.query("SELECT * FROM users LIMIT $1 OFFSET $2", [inputData.limit, inputData.skip]);
    }

    if (inputData.search && !inputData.sortField && !inputData.sortBy) {
        result = await pool.query("SELECT * FROM users WHERE username LIKE $1 LIMIT $2 OFFSET $3", [
            `%${inputData.search}%`,
            inputData.limit,
            inputData.skip,
        ]);
    }

    if (!inputData.search && inputData.sortField && inputData.sortBy) {
        result = await pool.query(
            `SELECT * FROM users ORDER BY ${inputData.sortField} ${inputData.sortBy} LIMIT $1 OFFSET $2`,
            [inputData.limit, inputData.skip],
        );
    }

    if (inputData.search && inputData.sortField && inputData.sortBy) {
        result = await pool.query(
            `SELECT * FROM users WHERE username LIKE $1 ORDER BY ${inputData.sortField} ${inputData.sortBy} LIMIT $2 OFFSET $3`,
            [`%${inputData.search}%`, inputData.limit, inputData.skip],
        );
    }

    logger.info(`Retrieved ${result.rows.length} users`);
    return result.rows;
};

export const getUserById = async (id: number) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    logger.info("Retrieved user by ID");
    return result.rows[0];
};

export const getUserByEmail = async (email: string) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    logger.info("Retrieved user by email");
    return result.rows[0];
};

export const getUserByUsername = async (username: string) => {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    logger.info("Retrieved user by username");
    return result.rows[0];
};

export const createUser = async (userData: IInputCreateUser) => {
    const result = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [
        userData.username,
        userData.email,
        userData.password,
    ]);
    logger.info("Created new user");
    return result.rows[0];
};

export const updateUser = async (id: number, username: string) => {
    const result = await pool.query("UPDATE users SET username = $1 WHERE id = $2 RETURNING *", [username, id]);
    logger.info("Updated user");
    return result.rows[0];
};

export const deleteUser = async (id: number) => {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    logger.info("Deleted user");
};

export const updateUserPassword = async (id: number, hashedPassword: string) => {
    const result = await pool.query("UPDATE users SET password = $1 WHERE id = $2 RETURNING *", [hashedPassword, id]);
    logger.info("Updated user password");
    return result.rows[0];
};
