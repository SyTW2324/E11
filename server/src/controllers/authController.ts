import {User} from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';

const handleLogin = async (req: any, res: any) => {
    const cookies = req.cookies;

    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values((foundUser as any).roles).filter(Boolean);
        // create JWTs

        const accessTokenSecret: Secret | undefined = process.env.ACCESS_TOKEN_SECRET;

        if (!accessTokenSecret) {
            throw new Error('ACCESS_TOKEN_SECRET environment variable is not set');
        }

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            accessTokenSecret,
            { expiresIn: '10s' }
        );

        const refreshTokenSecret: Secret | undefined = process.env.REFRESH_TOKEN_SECRET;

        if (!refreshTokenSecret) {
            throw new Error('REFRESH_TOKEN_SECRET environment variable is not set');
        }

        const newRefreshToken = jwt.sign(
            { "username": foundUser.username },
            refreshTokenSecret,
            { expiresIn: '15s' }
        );

        // Changed to let keyword
        let newRefreshTokenArray =
            !cookies?.jwt
                ? (foundUser as any).refreshToken
                : (foundUser as any).refreshToken.filter((rt: any) => rt !== cookies.jwt);

        if (cookies?.jwt) {

            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({ refreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        // Saving refreshToken with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await foundUser.save();



        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ accessToken });

    } else {
        res.sendStatus(401);
    }
}

export default handleLogin;