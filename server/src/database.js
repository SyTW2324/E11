"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
try {
    (0, mongoose_1.connect)(process.env.ATLAS_URI ||
        "mongodb+srv://user:user@cluster0.2wuhxag.mongodb.net/wildle?retryWrites=true&w=majority");
    console.log("Connected to database");
}
catch (error) {
    console.error(error);
    process.exit(1);
}
