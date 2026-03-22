import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HTTP_RESPONSE } from "../common/http-response";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(HTTP_RESPONSE.UNAUTHORIZED.statusCode).json({ message: HTTP_RESPONSE.UNAUTHORIZED.message });

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.ACCESS_SECRET!) as any;
        (req as any).user = payload;
        console.log("Authenticated user:", payload);
        next();
    } catch {
        return res.status(HTTP_RESPONSE.FORBIDDEN.statusCode).json({ message: HTTP_RESPONSE.FORBIDDEN.message });
    }
};
