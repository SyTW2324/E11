// server/src/utils/authMiddleware.ts


import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Unauthorized: Invalid token' });
        }

        // Attach the user object to the request for further use
        (req as any).user = user;
        next();
    });
};


