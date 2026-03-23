import { Request, Response } from "express";
import {
    createPostService,
    getPostsService,
    publishPostService,
    unpublishPostService,
    updatePostService,
} from "../services/post.service";
import { HTTP_RESPONSE } from "../common/http-response";

export const createPostController = async (req: Request, res: Response) => {
    try {
        const post = await createPostService(req);
        if (!post) {
            return res.status(HTTP_RESPONSE.FORBIDDEN.statusCode).json({
                message: "You do not have permission to create a post",
            });
        }
        res.status(HTTP_RESPONSE.CREATED.statusCode).json(post);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR.statusCode).json({
            message: HTTP_RESPONSE.INTERNAL_SERVER_ERROR.message,
        });
    }
};

export const publishPostController = async (req: Request, res: Response) => {
    try {
        const post = await publishPostService(req);
        if (!post) {
            return res.status(HTTP_RESPONSE.FORBIDDEN.statusCode).json({
                message: "You do not have permission to publish this post",
            });
        }
        res.status(HTTP_RESPONSE.SUCCESS.statusCode).json(post);
    } catch (error) {
        console.error("Error publishing post:", error);
        res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR.statusCode).json({
            message: HTTP_RESPONSE.INTERNAL_SERVER_ERROR.message,
        });
    }
};

export const unpublishPostController = async (req: Request, res: Response) => {
    try {
        const post = await unpublishPostService(req);
        if (!post) {
            return res.status(HTTP_RESPONSE.FORBIDDEN.statusCode).json({
                message: "You do not have permission to unpublish this post",
            });
        }
        res.status(HTTP_RESPONSE.SUCCESS.statusCode).json(post);
    } catch (error) {
        console.error("Error unpublishing post:", error);
        res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR.statusCode).json({
            message: HTTP_RESPONSE.INTERNAL_SERVER_ERROR.message,
        });
    }
};

export const getPostsController = async (req: Request, res: Response) => {
    try {
        const posts = await getPostsService(req);
        if (!posts) {
            return res.status(HTTP_RESPONSE.FORBIDDEN.statusCode).json({
                message: "You do not have permission to view posts",
            });
        }
        res.status(HTTP_RESPONSE.SUCCESS.statusCode).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR.statusCode).json({
            message: HTTP_RESPONSE.INTERNAL_SERVER_ERROR.message,
        });
    }
};

export const updatePostController = async (req: Request, res: Response) => {
    try {
        const post = await updatePostService(req);
        if (!post) {
            return res.status(HTTP_RESPONSE.FORBIDDEN.statusCode).json({
                message: "You do not have permission to update this post",
            });
        }
        res.status(HTTP_RESPONSE.SUCCESS.statusCode).json(post);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR.statusCode).json({
            message: HTTP_RESPONSE.INTERNAL_SERVER_ERROR.message,
        });
    }
};
