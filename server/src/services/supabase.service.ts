import supabase from "../config/supabase.ts";
import ApiError from "../utils/ApiError.ts";
import httpStatus from "../utils/httpStatus.json" with { type: "json" };
import db from "../db/connect.db.ts";
import { Users } from "../db/schema/user.schema.ts";
import { eq,ne } from "drizzle-orm";

const registerUserService = async (email: string, password: string, name: string, role: string): Promise<any> => {

    // Check if the user already exists
    const res = await db.select().from(Users).where(eq(Users.email, email)).execute();

    if (res.length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }

    const { user, session } = data;
    
    const results = await db.insert(Users).values({
        id: user?.id || "",
        email: user?.email || "",
        name: name|| "Anonymous", // Extract name from email or use a default
        role: (role === "user" || role === "admin") ? role : "user", // Ensure role matches expected values
        refreshToken: session?.refresh_token || "",
        createdAt: new Date(),
        updatedAt: new Date(),
    }).returning();

    return results[0]; // Return the newly created user record
}

const loginUserService = async (email: string, password: string): Promise<any> => {
    // Check if the user exists
    const res = await db.select().from(Users).where(eq(Users.email, email)).execute();

    if (res.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
    }
    // Check if the user is already logged in
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }

    const { user, session } = data;
    await db.update(Users).set({
        refreshToken: session?.refresh_token,
        updatedAt: new Date(),
    }).where(eq(Users.id, user?.id)).returning();

    return data;
}

const refreshTokenService = async (refreshToken: string): Promise<any> => {
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

    if (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }

    return data;
}

const logoutService = async (): Promise<any> => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }

    return true;
}

const getCurrentUserService = async (): Promise<any> => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }

    return data.user;
}

const getOtherUserService = async (userId: string): Promise<any> => {
    
    const result = await db.select({ id: Users.id, name: Users.name, email: Users.email }).from(Users).where(ne(Users.id, userId)).execute();

    if (result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No other users found");
    }
    return result;
}


export {
    registerUserService,
    loginUserService,
    refreshTokenService,
    logoutService,
    getCurrentUserService,
    getOtherUserService,
};