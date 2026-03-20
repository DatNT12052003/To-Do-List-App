import { Request, Response, NextFunction } from "express";
import { createUserSchema } from "../validation/schemas/users.schema";

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
    const result = createUserSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            field: result.error.issues[0].path[0],
            message: result.error.issues[0].message,
        });
    }
    next();
};
