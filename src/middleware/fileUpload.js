import multer from "multer"
import { appError } from "../utils/appError.js"
import { v4 as uuidv4 } from 'uuid';

export const uploadFiles = (fieldsname, folderName) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + '-' + file.originalname)
        }
    })
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        } else {
            cb(new appError('image only', 400), false)
        }
    }
    const upload = multer({ storage, fileFilter });
    return upload.single(fieldsname)
}

