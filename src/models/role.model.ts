import { pool } from "../config/db";

export const getRolesByUserId = async (userId: number) => {
    const query = `SELECT r.name AS role
    FROM roles r
    JOIN user_roles ur ON r.id = ur.role_id
    WHERE ur.user_id = $1`;

    const result = await pool.query(query, [userId]);
    const roles = result.rows.map((row) => row.role);
    return roles;
};
