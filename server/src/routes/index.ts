import { Router } from "express";
import supabaseRoutes from "./supabase.routes.ts";
import fileRoutes from "./file.routes.ts";

const router: Router = Router();

router.use("/supabase", supabaseRoutes);
router.use("/file", fileRoutes);

export default router;