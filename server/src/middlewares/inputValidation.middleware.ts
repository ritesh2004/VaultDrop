import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import ApiError from "../utils/ApiError.ts";
import httpStatus from '../utils/httpStatus.json' with { type: 'json' };

export const validate = (schema: ZodSchema<any>) => {
    return async (req: Request, res:Response, next: NextFunction) => { 
        try {
            schema.parse(req.body)
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const firstErrorMessage = error.errors[0]?.message;
                next(new ApiError(httpStatus.BAD_REQUEST, firstErrorMessage));
            }
            next(error);
        }
    }
}