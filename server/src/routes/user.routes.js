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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const expresponses = __importStar(require("express"));
const mongodb = __importStar(require("mongodb"));
const user_1 = require("../models/user");
exports.userRouter = expresponses.Router();
exports.userRouter.use(expresponses.json());
// GET /users buscar todos
exports.userRouter.get("/", (_, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find({});
        if (!users) {
            throw new Error("User collection not found");
        }
        response.status(200).send(users);
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
// GET /users/:id buscar por id
exports.userRouter.get("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findOne({
            _id: new mongodb.ObjectId(request.params.id),
        });
        if (!user) {
            response.status(404).send(`User ${request.params.id} not found`);
            return;
        }
        response.status(200).send(user);
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
// GET /users/:name buscar por nombre
exports.userRouter.get("/name/:name", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findOne({
            username: request.params.name,
        });
        if (!user) {
            response.status(404).send(`User ${request.params.name} not found`);
            return;
        }
        response.status(200).send(user);
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
// DELETE
exports.userRouter.delete("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findOne({
            username: request.body.username,
        });
        if (!user) {
            response.status(404).send(`User ${request.body.username} not found`);
            return;
        }
        const deletedUser = yield user_1.User.deleteOne({
            username: request.body.username,
        });
        if (!deletedUser) {
            throw new Error("Error deleting user");
        }
        response.status(200).send(deletedUser);
    }
    catch (error) {
        response.status(500).send(error);
    }
}));
