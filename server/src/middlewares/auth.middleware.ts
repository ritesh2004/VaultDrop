import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError.ts";
import httpStatus from "../utils/httpStatus.json" with { type: "json" };
import { createClient } from "@supabase/supabase-js";
import config from "../config/config.ts";

export interface AuthRequest extends Request {
    user?: any; // Replace 'any' with the actual user type if available
    supabaseClient?: any; // Replace 'any' with the actual supabase client type if available
}

export const validateUser = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<any> => {
    const accessToken = req.headers['authorization']?.split(' ')[1];

    if (!accessToken) {
        return next(new ApiError(httpStatus.UNAUTHORIZED, 'Access token is missing'));
    }

    const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY, {
        global: { headers: { Authorization: `Bearer ${accessToken}` } },
    });

    try {
        const {data, error} = await supabase.auth.getUser();
    
        if (error) {
            return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access'));
        }
        
        console.log("User Data:", data); // Log the user data for debugging
        req.user = data.user;
        req.supabaseClient = supabase; // Attach the supabase client to the request object
        
        next();
    } catch (error) {
        return next(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token'));
    }
}