import { Router } from "express";
import supabaseRoutes from "./supabase.routes.ts";

const router: Router = Router();

router.use("/supabase", supabaseRoutes);

export default router;