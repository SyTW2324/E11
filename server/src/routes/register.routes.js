"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouter = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const express = __importStar(require("express"));
const user_1 = require("../models/user");
const genAuthToken_1 = require("../utils/genAuthToken");
exports.registerRouter = express.Router();
exports.registerRouter.use(express.json());
// POST /register crear un nuevo user
exports.registerRouter.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("request " + Object.values(request.body));
        const schema = joi_1.default.object({
            username: joi_1.default.string().required(),
            email: joi_1.default.string().required(),
            password: joi_1.default.string().required(),
        });
        console.log("schema " + schema);
        const validation = schema.validate(request.body);
        if (validation.error) {
            response.status(422).send(validation.error);
            return;
        }
        let user = yield user_1.User.findOne({ username: request.body.username });
        if (user) {
            response.status(409).send("El usuario ya existe");
            return;
        }
        user = yield user_1.User.findOne({ email: request.body.email });
        if (user) {
            response.status(409).send("El email ya existe");
            return;
        }
        user = new user_1.User({
            username: request.body.username,
            password: request.body.password,
            email: request.body.email,
        });
        const salt = yield bcrypt_1.default.genSalt(10);
        user.password = yield bcrypt_1.default.hash(user.password, salt);
        const result = yield user.save();
        if (!result) {
            response.status(500).send("Error al crear el usuario");
            return;
        }
        const token = (0, genAuthToken_1.genAuthToken)(user);
        response.send(token).status(201);
    }
    catch (error) {
        console.log(error);
        response.status(500).send("Error en el servidor");
    }
}));
