import { pool } from "../config/db";
import { IInputCreatePost } from "../interfaces/post.interface";

export const createPost = async (data: IInputCreatePost) => {
    const query = "INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *";
    const values = [data.title, data.content, data.authorId];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const publishPost = async (id: number) => {
    const query = "UPDATE posts SET published = true WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const unpublishPost = async (id: number) => {
    const query = "UPDATE posts SET published = false WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const getPosts = async () => {
    const query = "SELECT * FROM posts";
    const result = await pool.query(query);
    return result.rows;
};
