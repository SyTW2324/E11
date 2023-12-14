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
exports.loginRouter = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const express = __importStar(require("express"));
const user_1 = require("../models/user");
const genAuthToken_1 = require("../utils/genAuthToken");
exports.loginRouter = express.Router();
exports.loginRouter.use(express.json());
// POST /login crear un nuevo user
exports.loginRouter.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = joi_1.default.object({
            password: joi_1.default.string().required(),
            email: joi_1.default.string().required().email(),
        });
        const validation = schema.validate(request.body);
        if (validation.error) {
            response.status(422).send(validation.error);
            return;
        }
        let user = yield user_1.User.findOne({ email: request.body.email });
        if (!user) {
            console.log("El email no existe");
            response.status(404).send("El email no existe");
            return;
        }
        const validPassword = yield bcrypt_1.default.compare(request.body.password, user.password);
        if (!validPassword) {
            console.log("La contraseña no es válida");
            response.status(401).send("La contraseña no es válida");
            return;
        }
        const token = (0, genAuthToken_1.genAuthToken)(user);
        response.status(200).send(token);
    }
    catch (error) {
        console.log(error);
        response.status(500).send("Error en el servidor");
    }
}));
// DELETE /login eliminar un user
exports.loginRouter.delete("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = joi_1.default.object({
            password: joi_1.default.string().required(),
            email: joi_1.default.string().required().email(),
        });
        const validation = schema.validate(request.body);
        if (validation.error) {
            console.log("validation error " + validation.error);
            response.status(422).send(validation.error);
            return;
        }
        let user = yield user_1.User.findOne({ email: request.body.email });
        if (!user) {
            console.log("El email no existe");
            response.status(404).send("El email no existe");
            return;
        }
        const validPassword = yield bcrypt_1.default.compare(request.body.password, user.password);
        if (!validPassword) {
            console.log("La contraseña no es válida");
            response.status(401).send("La contraseña no es válida");
            return;
        }
        const result = yield user_1.User.deleteOne({ email: request.body.email });
        if (!result) {
            console.log("Error al eliminar el usuario");
            response.status(500).send("Error al eliminar el usuario");
            return;
        }
        response.status(200).send("Usuario eliminado");
    }
    catch (error) {
        console.log(error);
        response.status(500).send("Error en el servidor");
    }
}));
