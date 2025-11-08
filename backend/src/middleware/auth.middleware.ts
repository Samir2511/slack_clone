import type { NextFunction, Request, Response } from "express";

export const protectRoute = (req: Request, res: Response, next: NextFunction) => {
    if(!(req as any).auth().isAuthenticated) {
        return res.status(401).json({message: "Unauthorized - you must be logged in"});
    }

    next();
}