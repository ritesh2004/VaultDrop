import { Router } from "express";
import { validateUser } from "../middlewares/auth.middleware.ts";
import fileController from "../controllers/file.controller.ts";
import upload from "../middlewares/multer.middleware.ts";
import { validate } from "../middlewares/inputValidation.middleware.ts";
import { fileUploadSchema } from "../validations/schemas/file.schema.ts";

const router: Router = Router();

router.post(
    '/upload',
    validate(fileUploadSchema),
    validateUser,
    upload.single('file'),
    fileController.fileUploadController
)

router.get(
    '/shared',
    validateUser,
    fileController.getAllSharedFilesController
)

export default router;