import { Request, Response, NextFunction } from "express";

export const checkPermissionsMiddleware = (requiredPermission: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userPermissions = req.user?.permissions || [];
        if (!userPermissions.includes(requiredPermission)) {
            return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
        }
        next();
    };
};
