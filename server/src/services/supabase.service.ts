import supabase from "../config/supabase.ts";
import ApiError from "../utils/ApiError.ts";
import httpStatus from "../utils/httpStatus.json" with { type: "json" };

const registerUserService = async (email: string, password: string): Promise<any> => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }

    return data;
}

const loginUserService = async (email: string, password: string): Promise<any> => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }

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


export {
    registerUserService,
    loginUserService,
    refreshTokenService,
    logoutService
};