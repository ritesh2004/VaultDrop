import supabaseController from "../controllers/supabase.controller.ts";
import { Router } from "express";
import { loginUserSchema, resgisterUserSchema } from "../validations/schemas/supabase.schema.ts";
import { validate } from "../middlewares/inputValidation.middleware.ts";


const router: Router = Router();

router.post(
    '/register',
    validate(resgisterUserSchema),
    supabaseController.registerUserController
);

router.post(
    '/login',
    validate(loginUserSchema),
    supabaseController.loginUserController
)

export default router;