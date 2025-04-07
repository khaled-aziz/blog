import { Router } from "express";
import { changePassword, changePhoto, deleteUser, getUser, updateUser } from "./user.controller.js";
import { uploadFiles } from "../../middleware/fileUpload.js";
import { verifyToken } from "../../middleware/verify.js";
import { validation } from "../../middleware/validation.js";
import { userValidationSchema } from "./user.validation.js";


export const userRouter = Router()

userRouter
    .route('/:id')
    .get(verifyToken, getUser)
    .put(verifyToken, validation(userValidationSchema), updateUser)
    .delete(verifyToken, deleteUser);
// userRouter
//     .route('/:id/change')
//     .put('/photo', verifyToken, uploadFiles('profilePic', 'user'), changePhoto)
//     .put('/password', verifyToken, changePassword);

