import { Router } from "express";
import { validateUser } from "../middlewares/auth.middleware.ts";
import fileController from "../controllers/file.controller.ts";
import upload from "../middlewares/multer.middleware.ts";

const router: Router = Router();

router.post(
    '/upload',
    validateUser,
    upload.single('file'),
    fileController.fileUploadController
)


export default router;