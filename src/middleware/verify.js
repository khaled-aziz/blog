import { appError } from "../utils/appError.js";
import { catchError } from "./catchError.js";
import jwt from 'jsonwebtoken'
import express from "express";


export const tokenRouter = express.Router();


export const verifyToken = catchError(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return next(new appError('Access token missing', 401))
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return next(new appError('Invalid access token', 403));
        req.user = decoded;
        
        next();
    });
});

tokenRouter.post('/refresh-token', catchError(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return next(new appError('Refresh token missing', 401));
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid refresh token' });
        const accessToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.status(200).json({ message: "success", accessToken });
    });
}));


