// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import config from "./src/config/config.ts";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/schema",
    out: "./drizzle",
    breakpoints: true,
    dbCredentials: {
        url: config.DATABASE_URL || (() => { throw new Error("DATABASE_URL is not defined"); })(),
        ssl: false // Disable SSL or adjust to a compatible value
    },
});
