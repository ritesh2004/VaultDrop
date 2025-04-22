import { z } from "zod";
import { allowed_usersField, expiring_inField, fileField, is_downloadableField, limitField } from "../fields/file.fields.ts";

export const fileUploadSchema = z.object({
    // file: fileField,
    expiring_in: expiring_inField,
    limit: limitField,
    is_downloadable: is_downloadableField,
    allowed_users: allowed_usersField,
})