import { AuthRequest } from "../middlewares/auth.middleware.ts";
import { uploadFileService } from "../services/file.service.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { Response } from "express";
import ApiError from "../utils/ApiError.ts";
import httpStatus from "../utils/httpStatus.json" with { type: "json" };
import ApiResponse from "../utils/ApiResponse.ts";

const fileUploadController = asyncHandler(async (req: AuthRequest, res: Response) => {
    const file = req?.file; // Get the file path from the request
    const userId = req.user.id;
    const supabase = req.supabaseClient; // Get the Supabase client from the request

    if (!file) {
        throw new ApiError(httpStatus.BAD_REQUEST, "File is required");
    }
    console.log("File received:", file); // Log the file for debugging
    // Call your upload service here
    const result = await uploadFileService(file, userId, supabase); // Pass the Supabase client to the service

    return res.status(httpStatus.OK).json(
        new ApiResponse(httpStatus.OK, "File uploaded successfully", {
            file: result,
        }),
    );
})




export default {
    fileUploadController,
}