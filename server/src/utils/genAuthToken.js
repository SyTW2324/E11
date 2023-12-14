"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const genAuthToken = (user) => {
    const secret_key = process.env.JWT_SECRET_KEY;
    if (!secret_key) {
        throw new Error("Falta la clave secreta");
    }
    const token = jsonwebtoken_1.default.sign({
        _id: user._id,
        username: user.username,
        email: user.email,
    }, secret_key);
    return token;
};
exports.genAuthToken = genAuthToken;
exports.default = exports.genAuthToken;
