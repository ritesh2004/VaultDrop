import { integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const roleEnum = pgEnum("role", ["user", "admin"]);

export const Users = pgTable("users", {
    id: text("id").primaryKey().notNull().unique(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    role: roleEnum().default("user"),
    refreshToken: text("refreshToken"),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
});