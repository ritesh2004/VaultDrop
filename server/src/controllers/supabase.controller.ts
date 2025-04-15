import { AuthRequest } from '../middlewares/auth.middleware.ts';
import { loginUserService, logoutService, refreshTokenService, registerUserService } from '../services/supabase.service.ts';
import ApiError from '../utils/ApiError.ts';
import ApiResponse from '../utils/ApiResponse.ts';
import { asyncHandler } from '../utils/asyncHandler.js';
import httpStatus from '../utils/httpStatus.json' with { type: 'json' };
import { Request, Response } from 'express';

const registerUserController = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const data = await registerUserService(email, password);

    if (!data) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User registration failed');
    }

    return res.status(httpStatus.CREATED).json(
        new ApiResponse(
            httpStatus.CREATED,
            'User registered successfully',
            data
        )
    )
});

const loginUserController = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const data = await loginUserService(email, password);

    if (!data) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User login failed');
    }

    return res.status(httpStatus.OK).json(
        new ApiResponse(
            httpStatus.OK,
            'User logged in successfully',
            data
        )
    )
});

const refreshTokenController = asyncHandler(async (req: Request, res: Response) => {
    const { refresh_token } = req.body;
    const data = await refreshTokenService(refresh_token);

    if (!data) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Token refresh failed');
    }

    return res.status(httpStatus.OK).json(
        new ApiResponse(
            httpStatus.OK,
            'Token refreshed successfully',
            data
        )
    )
});

const logoutController = asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await logoutService();

    if (!data) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User logout failed');
    }

    return res.status(httpStatus.OK).json(
        new ApiResponse(
            httpStatus.OK,
            'User logged out successfully',
            null
        )
    )
});

const getCurrentUserController = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user; // Assuming you have middleware to set req.user

    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
    }

    return res.status(httpStatus.OK).json(
        new ApiResponse(
            httpStatus.OK,
            'User retrieved successfully',
            user
        )
    )
});


export default {
    registerUserController,
    loginUserController,
    refreshTokenController,
    logoutController,
    getCurrentUserController,
}