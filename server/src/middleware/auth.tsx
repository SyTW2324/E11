import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env")});

const auth = (req: any , res: any, next:any) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access denied. Not authorized...");
    try {
        const secret_key = process.env.JWT_SECRET_KEY;
        if (!secret_key) throw new Error("JWT secret key is missing");
        const decoded = jwt.verify(token, secret_key);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("Invalid auth token...");
    }
};



module.exports = auth;