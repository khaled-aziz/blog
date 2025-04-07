import { userSchema } from "../../../database/models/user.model.js";
import { appError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import bcrypt from "bcrypt";


export const getUser = catchError(async (req, res, next) => {
    const userId = req.user.userId;
    let user = await userSchema.findById(userId);
    if (!user) return next(new appError('user not found', 404));
    res.json({ massege: 'success', user });
})

export const deleteUser = catchError(async (req, res, next) => {
    let user = await userSchema.destroy({
        where: { id: req.user.userId }
    });
    if (!user) return next(new appError('User not found', 404));
    res.json({ massege: 'success', user });
})

export const changePassword = catchError(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.userId;
    let user = await userSchema.findById(userId);
    if (!user) return next(new appError('User not found', 404));

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid old password' });
    user.password = newPassword;
    await userSchema.update(
        user,
        {
            where: { id: userId },
        },
    );
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Password changed successfully. Please log in again.' });
});

export const updateUser = catchError(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    let user = await userSchema.update(
        { firstName, lastName, email, password },
        {
            where: { id: req.user.userId },
        },
    );
    if (!user[0]) return next(new appError('User not found', 404));
    res.json({ massege: 'success', user });
})

export const changePhoto = catchError(async (req, res, next) => {
    const { profilePic } = req.body;
    let user = await userSchema.update(
        { profilePic },
        {
            where: { id: req.user.userId },
        },
    );
    if (!user[0]) return next(new appError('User not found', 404));
    res.json({ massege: 'success', user });
})