import supabase from "../config/supabase.ts";
import ApiError from "../utils/ApiError.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

const registerUserService = async (email: string, password: string): Promise<any> => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        throw new ApiError(400, error.message);
    }

    return data;
}

const loginUserService = async (email: string, password: string): Promise<any> => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new ApiError(400, error.message);
    }

    return data;
}



export { registerUserService, loginUserService };