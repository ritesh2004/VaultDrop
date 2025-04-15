import { Request, Response, NextFunction } from "express";
import httpStatus from "../utils/httpStatus.json" with { type: "json" };
import config from "../config/config.js";

class ApiError extends Error {
    status: number;
    success: boolean;
    errors: Array<string | Error>;

    constructor(status: number, message: string, errors: Array<string | Error> = [], stack: string = "") {
        super(message);
        this.status = status;
        this.success = false;
        this.errors = errors;
        this.message = message;

        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = err as ApiError;
    if (config.NODE_ENV !== "development") {
        delete error.stack;
    }

    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
        success: error.success,
        message: error.message,
    });
}