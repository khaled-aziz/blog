import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { appError } from "../../utils/appError.js"
import { userSchema } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";




export const signup = catchError(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body
    let isFound = await userSchema.findOne({ where: { email } })
    if (isFound) return next(new appError('acount already exist', 409))
    bcrypt.hash(password, 8, async (err, hash) => {
        await userSchema.create({ firstName, lastName, email, password: hash })
    });
    res.json({ massege: 'success' });
})

export const signin = catchError(async (req, res, next) => {
    const { email, password } = req.body
    let user = await userSchema.findOne({ where: { email } })
    if (user && (await bcrypt.compare(password, user.password))) {
        let accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({ message: "success", accessToken })
    }
    next(new appError('incorrect email or password', 401))
})




