import ApiError from "../utils/ApiError.ts";
import httpStatus from "../utils/httpStatus.json" with { type: "json" };
import fs from "fs";

const uploadFileService = async (file: Express.Multer.File, userId: string, supabase: any) => {
    try {
        let timestamp = new Date().getTime(); // Get the current timestamp
        let fileName = `${timestamp}-${file.originalname}`; // Create a unique file name using timestamp
        const { data, error } = await supabase.storage
            .from("vault")
            .upload(`public/${fileName}`, file.buffer , {
                cacheControl: "3600",
                insert: true,
                type: file.mimetype,
                upsert: false,
                contentType: file.mimetype,
            });
        console.log("File upload result:", data, error); // Log the result for debugging

        if (error) {
            throw new ApiError(httpStatus.BAD_REQUEST, error.message);
        }

        return data;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, "File upload failed");
    }
}

export {
    uploadFileService,
}