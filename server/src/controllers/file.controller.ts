import { AuthRequest } from "../middlewares/auth.middleware.ts";
import { getAllSharedFilesService, uploadFileService } from "../services/file.service.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { Response } from "express";
import ApiError from "../utils/ApiError.ts";
import httpStatus from "../utils/httpStatus.json" with { type: "json" };
import ApiResponse from "../utils/ApiResponse.ts";

const fileUploadController = asyncHandler(async (req: AuthRequest, res: Response) => {
    const file = req?.file; // Get the file path from the request
    const userId = req.user.id;
    const supabase = req.supabaseClient; // Get the Supabase client from the request

    const { expiring_in, allowed_users, limit, is_downloadable } = req.body; // Get the additional parameters from the request body

    if (!file) {
        throw new ApiError(httpStatus.BAD_REQUEST, "File is required");
    }
    // Call your upload service here
    const result = await uploadFileService(file, userId, supabase, limit, expiring_in, is_downloadable, allowed_users); // Pass the Supabase client to the service

    return res.status(httpStatus.OK).json(
        new ApiResponse(httpStatus.OK, "File uploaded successfully", {
            file: result,
        }),
    );
})

const getAllSharedFilesController = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user.id; // Get the user ID from the request

    const files = await getAllSharedFilesService(userId); // Call the service to get all shared files
    if (!files) {
        throw new ApiError(httpStatus.NOT_FOUND, "No files found");
    }
    return res.status(httpStatus.OK).json(
        new ApiResponse(httpStatus.OK, "Files fetched successfully", {
            files: files,
        }),
    );
})


export default {
    fileUploadController,
    getAllSharedFilesController
}