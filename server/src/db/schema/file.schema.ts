import { pgTable,integer,varchar,boolean, serial, text, timestamp } from "drizzle-orm/pg-core";
import { Users } from "./user.schema.ts";


export const Files = pgTable("files", {
    id: serial("id").primaryKey().notNull().unique(),
    fileName: text("file_name").notNull(),
    ownerId: text("owner_id").notNull().references(() => Users.id),
    fileURL: text("file_url").notNull(),
    fileType: text("file_type").notNull(),
    fileSize: integer("file_size").notNull(),
    limit: integer("limit").default(5).notNull(),
    expire_in: integer("expiring_in").notNull(),
    allowed_users: text("allowed_users").array(),
    isDownloadable: boolean("is_downloadable").default(false).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
    deletedAt: timestamp("deletedAt", { mode: "date" }),
    isDeleted: boolean("isDeleted").default(false).notNull(),
});
