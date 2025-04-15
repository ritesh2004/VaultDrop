import { loginUserService, registerUserService } from '../services/supabase.service.ts';
import ApiError from '../utils/ApiError.ts';
import ApiResponse from '../utils/ApiResponse.ts';
import { asyncHandler } from '../utils/asyncHandler.js';

const registerUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const data = await registerUserService(email, password);

    if (!data) {
        throw new ApiError(400, 'User registration failed');
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            'User registered successfully',
            data
        )
    )
});

const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const data = await loginUserService(email, password);

    if (!data) {
        throw new ApiError(400, 'User login failed');
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            'User logged in successfully',
            data
        )
    )
});

export default {
    registerUserController,
    loginUserController,
}