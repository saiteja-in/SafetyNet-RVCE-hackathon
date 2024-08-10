import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error'; // Import your error handler function

// Define an interface for the payload that will be in the JWT token
interface JwtPayload {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.teja_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  if (!process.env.JWT_SECRET) {
    return next(errorHandler(500, "JWT secret is not defined"));
  }

  jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err:any, decoded:any) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }

    // Type assertion to define the type of the decoded payload
    const user= decoded as JwtPayload;
    req.body.user = user;
    next();
  });
};
