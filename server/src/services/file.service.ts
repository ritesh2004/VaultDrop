import ApiError from "../utils/ApiError.ts";
import httpStatus from "../utils/httpStatus.json" with { type: "json" };
import { Files } from "../db/schema/file.schema.ts";
import db from "../db/connect.db.ts";
import config from "../config/config.ts";
import { eq } from "drizzle-orm";


const uploadFileService = async (file: Express.Multer.File, userId: string, supabase: any, limit: number, expiring_in: number, is_downloadable: boolean, allowed_users: string) => {
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

        if (error) {
            throw new ApiError(httpStatus.BAD_REQUEST, error.message);
        }

        // E.g. https://yvrsamjwcwlutxlgfrkw.supabase.co/storage/v1/object/public/vault/public/1745230745303-IMG_20241009_113954.jpg

        const result = await db.insert(Files).values({
            fileName: file.originalname,
            fileURL: `${config.SUPABASE_URL}/storage/v1/object/public/${data?.fullPath}`,
            fileType: file.mimetype,
            fileSize: file.size,
            limit: limit || 0, // Default to 0 if not provided
            expire_in: expiring_in || 0, // Default to 0 if not provided
            isDownloadable: is_downloadable || false, // Default to false if not provided
            allowed_users: allowed_users ? JSON.parse(allowed_users) : [], // Default to empty array if not provided
            ownerId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        }).returning();

        return result[0];
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, "File upload failed");
    }
}

const getAllSharedFilesService = async (userId: string) => {
    try {
        const files = await db.select().from(Files).where(eq(Files.allowed_users, [userId])).execute();
        return files;
    }
    catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Failed to fetch files");
    }
}

export {
    uploadFileService,
    getAllSharedFilesService,
}