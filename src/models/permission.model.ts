import { pool } from "../config/db";

export const getPermissionsByUserId = async (userId: number) => {
    const query = `SELECT DISTINCT p.name AS permission
    FROM permissions p
    JOIN role_permissions rp ON p.id = rp.permission_id
    JOIN user_roles ur ON rp.role_id = ur.role_id
    WHERE ur.user_id = $1`;

    const result = await pool.query(query, [userId]);
    const permissions = result.rows.map((row) => row.permission);
    return permissions;
};

export const getAllPermissions = async () => {
    const query = `SELECT name FROM permissions`;
    const result = await pool.query(query);
    const permissions = result.rows.map((row) => row.name);
    return permissions;
};
