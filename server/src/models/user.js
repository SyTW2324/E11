"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
            if (!emailRegex.test(value)) {
                throw new Error("El email no es válido");
            }
        },
    },
    points: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Los puntos deben ser mayor a 0");
            }
        },
    },
    friends: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
