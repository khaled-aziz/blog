import express from "express"
import { signin, signup } from "./auth.controller.js"
import { validation } from "../../middleware/validation.js"
import { signinSchemaValidate, userSchemaValidate } from "./auth.validation.js"
import { uploadFiles } from "../../middleware/fileUpload.js"

export const authRouter= express.Router()


authRouter
.post('/signup',uploadFiles('profilePic', 'user'), validation(userSchemaValidate), signup)
.post('/signin',  validation(signinSchemaValidate), signin)




