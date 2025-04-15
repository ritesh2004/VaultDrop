import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError.ts";
import supabase from "../config/supabase.ts";
import httpStatus from "../utils/httpStatus.json" with { type: "json" };

export interface AuthRequest extends Request {
    user?: any; // Replace 'any' with the actual user type if available
}

export const validateUser = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<any> => {
    const accessToken = req.headers['authorization']?.split(' ')[1];

    if (!accessToken) {
        return next(new ApiError(httpStatus.UNAUTHORIZED, 'Access token is missing'));
    }

    try {
        const user = await supabase.auth.getUser(accessToken);
    
        if (!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
        }
    
        req.user = user.data.user;
    
        next();
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
    }
}