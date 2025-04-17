import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
    id: text("id").primaryKey().notNull().unique(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    refreshToken: text("refreshToken"),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
});