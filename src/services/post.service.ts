import { Request } from "express";
import { createPost, getPosts, publishPost, unpublishPost } from "../models/post.model";

export const createPostService = async (req: Request) => {
    const { title, content } = req.body;
    const authorId = Number(req.user?.userId);
    const permissions = req.user?.permissions || [];
    if (!authorId || !permissions.includes("post:create")) {
        return null;
    }
    const postData = {
        title,
        content,
        authorId,
    };
    return await createPost(postData);
};

export const publishPostService = async (req: Request) => {
    const id = Number(req.params.id);
    const authorId = Number(req.user?.userId);
    const permissions = req.user?.permissions || [];
    if (!authorId || !permissions.includes("post:publish")) {
        return null;
    }
    return await publishPost(id);
};

export const unpublishPostService = async (req: Request) => {
    const id = Number(req.params.id);
    const authorId = Number(req.user?.userId);
    const permissions = req.user?.permissions || [];
    if (!authorId || !permissions.includes("post:unpublish")) {
        return null;
    }
    return await unpublishPost(id);
};

export const getPostsService = async (req: Request) => {
    const authorId = Number(req.user?.userId);
    const permissions = req.user?.permissions || [];
    if (!authorId || !permissions.includes("post:read")) {
        return null;
    }
    return await getPosts();
};
